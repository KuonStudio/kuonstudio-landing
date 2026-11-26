export type KuonMode = "business" | "general";

export interface KuonSource {
  title: string;
  url?: string;
  snippet?: string;
}

export interface KuonChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface KuonHealth {
  status: "ok" | "waking_up";
  model?: string;
  engine?: string;
  quant?: string;
  busy?: boolean;
  queue_depth?: number;
}

export class KuonApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export async function checkKuonHealth(signal?: AbortSignal): Promise<KuonHealth> {
  try {
    const res = await fetch("/api/kuon/health", {
      method: "GET",
      signal,
    });
    if (!res.ok) {
      return { status: "waking_up" };
    }
    const data = (await res.json()) as KuonHealth;
    return data.status === "ok" ? data : { status: "waking_up" };
  } catch {
    return { status: "waking_up" };
  }
}

export interface StreamKuonOptions {
  messages: KuonChatMessage[];
  mode: KuonMode;
  signal?: AbortSignal;
  onToken: (delta: string) => void;
  onMeta?: (meta: { notes: string; sources: KuonSource[] }) => void;
}

export async function streamKuonChat(
  options: StreamKuonOptions
): Promise<{ content: string; notes: string; sources: KuonSource[] }> {
  const { messages, mode, signal, onToken, onMeta } = options;

  let res: Response;
  try {
    res = await fetch("/api/kuon/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        mode,
        stream: true,
      }),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw err;
    }
    throw new KuonApiError("waking_up", "Network error reaching Kuon 1.", 503);
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const code =
      data && typeof data === "object" && typeof data.error?.code === "string"
        ? data.error.code
        : res.status === 429
          ? "rate_limited"
          : res.status >= 500
            ? "waking_up"
            : "request_failed";
    const message =
      data && typeof data === "object" && typeof data.error?.message === "string"
        ? data.error.message
        : "Kuon 1 could not answer right now.";
    throw new KuonApiError(code, message, res.status);
  }

  const contentType = res.headers.get("Content-Type") || "";
  if (contentType.includes("text/event-stream") && res.body) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let content = "";
    let notes = "";
    let sources: KuonSource[] = [];

    const parseBlock = (block: string) => {
      for (const line of block.split("\n")) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (!raw || raw === "[DONE]") continue;
        try {
          const frame = JSON.parse(raw) as {
            choices?: Array<{ delta?: { content?: string } }>;
            x_notes?: string;
            x_sources?: KuonSource[];
          };
          const delta = frame.choices?.[0]?.delta?.content;
          if (delta) {
            content += delta;
            onToken(delta);
          }
          if (typeof frame.x_notes === "string" && frame.x_notes) {
            notes = frame.x_notes;
          }
          if (Array.isArray(frame.x_sources) && frame.x_sources.length > 0) {
            sources = frame.x_sources;
          }
        } catch {
          // Ignore malformed SSE chunk
        }
      }
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let sepIndex: number;
      while ((sepIndex = buffer.indexOf("\n\n")) !== -1) {
        const block = buffer.slice(0, sepIndex);
        buffer = buffer.slice(sepIndex + 2);
        parseBlock(block);
      }
    }
    if (buffer.trim()) {
      parseBlock(buffer);
    }

    onMeta?.({ notes, sources });
    return { content, notes, sources };
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    x_notes?: string;
    x_sources?: KuonSource[];
  };
  const content = data.choices?.[0]?.message?.content || "";
  const notes = data.x_notes || "";
  const sources = Array.isArray(data.x_sources) ? data.x_sources : [];
  if (content) onToken(content);
  onMeta?.({ notes, sources });
  return { content, notes, sources };
}
