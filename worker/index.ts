interface AssetsFetcher {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetsFetcher;
  KUON_API_URL?: string;
  KUON_API_KEY?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  messages?: unknown;
  mode?: unknown;
  stream?: unknown;
}

const DEFAULT_KUON_API_URL =
  "https://8000-agrbr7h3tj3mllx3kbndcqyuwm.instabox.tech";

const MAX_MESSAGES = 12;
const MAX_LATEST_CHARS = 2000;
const MAX_ATTACHMENT_MSG_CHARS = 26_000;
const MAX_HISTORY_CHARS = 1200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 14;
const HEALTH_TIMEOUT_MS = 8_000;
const CHAT_TIMEOUT_MS = 90_000;

const rateLimitBuckets = new Map<string, number[]>();

function jsonResponse(
  payload: unknown,
  status = 200,
  extraHeaders?: Record<string, string>
): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function getClientIp(request: Request): string {
  const cfIp = request.headers.get("CF-Connecting-IP");
  if (cfIp) return cfIp.trim();
  const forwarded = request.headers.get("X-Forwarded-For");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const existing = rateLimitBuckets.get(ip) ?? [];
  const recent = existing.filter((ts) => ts > cutoff);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitBuckets.set(ip, recent);
  if (rateLimitBuckets.size > 500) {
    for (const [key, timestamps] of rateLimitBuckets.entries()) {
      const kept = timestamps.filter((ts) => ts > cutoff);
      if (kept.length === 0) {
        rateLimitBuckets.delete(key);
      } else {
        rateLimitBuckets.set(key, kept);
      }
    }
  }
  return false;
}

function resolveApiBase(env: Env): string {
  return (env.KUON_API_URL || DEFAULT_KUON_API_URL).replace(/\/+$/, "");
}

function sanitizeMessages(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw)) return null;
  const cleaned: ChatMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const role = rec.role;
    const content = typeof rec.content === "string" ? rec.content.trim() : "";
    if ((role === "user" || role === "assistant") && content.length > 0) {
      cleaned.push({ role, content });
    }
  }
  if (cleaned.length === 0) return null;
  const sliced = cleaned.slice(-MAX_MESSAGES);
  const last = sliced[sliced.length - 1];
  if (last.role !== "user") return null;
  const maxForLast = last.content.startsWith("[Attachment:")
    ? MAX_ATTACHMENT_MSG_CHARS
    : MAX_LATEST_CHARS;
  if (last.content.length > maxForLast) return null;

  return sliced.map((msg, idx) => {
    if (idx === sliced.length - 1) return msg;
    const cap = msg.content.startsWith("[Attachment:")
      ? MAX_ATTACHMENT_MSG_CHARS
      : MAX_HISTORY_CHARS;
    return { role: msg.role, content: msg.content.slice(0, cap) };
  });
}

async function handleHealth(env: Env): Promise<Response> {
  const baseUrl = resolveApiBase(env);
  try {
    const res = await fetch(`${baseUrl}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS),
    });
    if (!res.ok) {
      return jsonResponse(
        {
          status: "waking_up",
          error: {
            code: "waking_up",
            message: "Kuon 1 server is waking up from standby.",
          },
        },
        503
      );
    }
    const data = await res.json();
    return jsonResponse(data, 200);
  } catch {
    return jsonResponse(
      {
        status: "waking_up",
        error: {
          code: "waking_up",
          message: "Kuon 1 server is currently standby or unreachable.",
        },
      },
      503
    );
  }
}

async function handleChat(request: Request, env: Env): Promise<Response> {
  if (!env.KUON_API_KEY) {
    return jsonResponse(
      {
        error: {
          code: "not_configured",
          message: "Kuon 1 API key is not configured on the server.",
        },
      },
      503
    );
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return jsonResponse(
      {
        error: {
          code: "rate_limited",
          message: "Too many requests. Please wait a minute before trying again.",
        },
      },
      429,
      { "Retry-After": "60" }
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return jsonResponse(
      { error: { code: "bad_request", message: "Invalid JSON body." } },
      400
    );
  }

  const messages = sanitizeMessages(body.messages);
  if (!messages) {
    return jsonResponse(
      {
        error: {
          code: "invalid_messages",
          message: `Messages must end with a non-empty user message under ${MAX_LATEST_CHARS} characters.`,
        },
      },
      400
    );
  }

  const mode = body.mode === "general" ? "general" : "business";
  const wantsStream = body.stream !== false;
  const maxTokens = 360;

  const upstreamPayload: Record<string, unknown> = {
    model: "kuon-1",
    messages,
    stream: wantsStream,
    temperature: 0.4,
    max_tokens: maxTokens,
  };
  if (mode === "business") {
    upstreamPayload.x_kuon_mode = "business";
  }

  const baseUrl = resolveApiBase(env);
  let upstream: Response;
  try {
    upstream = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.KUON_API_KEY}`,
      },
      body: JSON.stringify(upstreamPayload),
      signal: AbortSignal.timeout(CHAT_TIMEOUT_MS),
    });
  } catch {
    return jsonResponse(
      {
        error: {
          code: "waking_up",
          message: "Kuon 1 server is waking up. Please try again in a few seconds.",
        },
      },
      503
    );
  }

  if (upstream.status === 502 || upstream.status === 503 || upstream.status === 504) {
    return jsonResponse(
      {
        error: {
          code: "waking_up",
          message: "Kuon 1 server is starting up from auto-pause. Please retry shortly.",
        },
      },
      503
    );
  }

  if (!upstream.ok) {
    const errBody = await upstream.json().catch(() => null);
    const errMsg =
      errBody &&
      typeof errBody === "object" &&
      "error" in errBody &&
      typeof (errBody as { error?: { message?: unknown } }).error?.message === "string"
        ? (errBody as { error: { message: string } }).error.message
        : "Kuon 1 could not complete the request.";
    const errCode =
      errBody &&
      typeof errBody === "object" &&
      "error" in errBody &&
      typeof (errBody as { error?: { code?: unknown } }).error?.code === "string"
        ? (errBody as { error: { code: string } }).error.code
        : "upstream_error";
    return jsonResponse(
      { error: { code: errCode, message: errMsg } },
      upstream.status === 400 ? 400 : 502
    );
  }

  const contentType = upstream.headers.get("Content-Type") || "";
  if (contentType.includes("text/event-stream") && upstream.body) {
    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  }

  const data = await upstream.text();
  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/kuon/health") {
      if (request.method !== "GET") {
        return jsonResponse({ error: { code: "method_not_allowed", message: "Use GET." } }, 405);
      }
      return handleHealth(env);
    }

    if (url.pathname === "/api/kuon/chat") {
      if (request.method !== "POST") {
        return jsonResponse({ error: { code: "method_not_allowed", message: "Use POST." } }, 405);
      }
      return handleChat(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
