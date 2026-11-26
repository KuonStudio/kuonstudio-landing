import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Paperclip,
  RefreshCw,
  RotateCcw,
  Square,
  X,
} from "lucide-react";
import { useCopy, useLang } from "@/lib/i18n";
import { waLink } from "@/lib/contact";
import {
  checkKuonHealth,
  KuonApiError,
  streamKuonChat,
  type KuonChatMessage,
  type KuonMode,
  type KuonSource,
} from "@/lib/kuonClient";

interface AttachedFile {
  name: string;
  content: string;
  truncated: boolean;
}

interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  apiContent?: string;
  attachmentName?: string;
  notes?: string;
  sources?: KuonSource[];
  streaming?: boolean;
  errorCode?: string;
}

const MAX_ATTACHMENT_CHARS = 24_000;
const ACCEPTED_FILE_TYPES = ".csv,.tsv,.txt,.md,.json,text/plain,text/csv,text/tab-separated-values";

interface PresetItem {
  label: string;
  prompt: string;
}

const COPY = {
  id: {
    eyebrow: "Kuon AI · Asisten ringan siap pasang untuk bisnismu",
    title: "Coba dulu AI yang siap kami pasang di bisnismu.",
    body: "Ini gambaran asisten AI self-hosted yang bisa bekerja langsung di atas angka, dokumen, dan obrolan timmu. Ringan di server biasa tanpa GPU mahal, bisa diajak diskusi bebas sekaligus menghitung tabel dengan rumus pasti, dan menjaga cash flow tetap aman karena bebas tagihan per token yang membengkak.",
    stats: [
      { accent: "#788c5d", value: "Ramah cash flow", label: "Jalan di server CPU biasa, tanpa GPU atau biaya per token" },
      { accent: "#6a9bcc", value: "Implementasi mudah", label: "Mulai dari satu alur kerja tanpa bongkar sistem" },
      { accent: "#d97757", value: "Andal & terukur", label: "Diskusi luwes, dokumen terbaca, angka dihitung pasti" },
    ],
    ctaPrimary: "Hubungi Kuon Studio",
    ctaFullPage: "Buka layar penuh",
    ctaBackHome: "Kembali ke Kuon Studio",
    waLabel: "Atau tanya santai lewat WhatsApp",
    waText: "Halo Kuon Studio, saya baru coba Kuon AI di website dan tertarik bahas implementasi AI untuk bisnis saya.",
    footnote:
      "Asisten AI self-hosted racikan Kuon Studio — siap disesuaikan ke dokumen dan alur kerja bisnismu.",
    playgroundTitle: "Coba Kuon AI langsung",
    statusChecking: "Memeriksa status…",
    statusOnline: "Aktif · Self-hosted CPU",
    statusBusy: "Aktif · sedang memproses",
    statusStandby: "Standby",
    modeBusiness: "Business chat",
    modeGeneral: "General QA",
    modeBusinessDesc:
      "Mode privat: diskusi strategi, baca file lampiran, dan hitung tabel KPI dengan rumus pasti.",
    modeGeneralDesc:
      "Mode terbuka: tanya apa saja secara bebas, otomatis cari sumber web terbaru untuk pertanyaan fakta.",
    reset: "Reset",
    welcomeBusiness:
      "Halo! Tanya soal strategi bisnis, tempel tabel penjualan, unggah dokumen (.md/.csv/.txt), atau pilih contoh di atas. Semua angka tabel dihitung dengan rumus pasti.",
    welcomeGeneral:
      "Halo! Tanya apa saja — mulai dari ide, tulisan, sampai berita terbaru lengkap dengan tautan sumbernya.",
    placeholderBusiness: "Tanya soal bisnis, tempel tabel, atau unggah dokumen…",
    placeholderGeneral: "Tanyakan apa saja atau cek info terbaru…",
    send: "Kirim",
    stop: "Hentikan",
    attachFile: "Lampirkan file (.csv, .tsv, .txt, .md)",
    removeFile: "Hapus lampiran",
    fileTruncated: "dipotong agar pas konteks",
    fileError: "File tidak bisa dibaca. Gunakan file teks seperti .csv, .tsv, .txt, atau .md.",
    defaultFilePrompt: "Ringkas poin utama dan angka penting dari dokumen ini.",
    notesLabel: "Catatan hitungan",
    sourcesLabel: "Sumber",
    you: "Kamu",
    kuon: "Kuon AI",
    retry: "Coba lagi",
    wakingMsg:
      "Kuon AI sedang menyiapkan layanan. Tunggu beberapa detik lalu tekan Coba lagi.",
    rateLimitMsg:
      "Terlalu banyak permintaan dalam satu menit. Tunggu sebentar lalu coba lagi.",
    notConfiguredMsg:
      "Layanan Kuon AI belum terhubung ke kunci API di environment ini.",
    contextLimitMsg:
      "Pesan terlalu panjang untuk satu percakapan. Coba ringkas teks atau tekan Reset.",
    genericErrorMsg: "Kuon AI belum bisa menjawab sekarang. Silakan coba lagi.",
    presetsBusiness: [
      {
        label: "Omzet 2 minggu",
        prompt:
          "| Periode | Omzet |\n|---|---|\n| Minggu 1 | Rp25.000.000 |\n| Minggu 2 | Rp20.000.000 |\nBerapa perubahan omzet dari Minggu 1 ke Minggu 2?",
      },
      {
        label: "Tabel produk (TSV)",
        prompt:
          "Produk\tOmzet\nKopi Susu\t15000000\nTeh Tarik\t41000000\nRoti Bakar\t10000000\nProduk mana dengan omzet tertinggi dan berapa persen porsinya?",
      },
      {
        label: "Gross margin",
        prompt:
          "Pendapatan bulan ini Rp200.000.000 dan HPP Rp140.000.000. Berapa gross margin bulan ini?",
      },
      {
        label: "Titik impas (BEP)",
        prompt:
          "Biaya tetap per bulan Rp15.000.000, harga jual per unit Rp50.000, biaya variabel per unit Rp20.000. Berapa titik impas?",
      },
      {
        label: "Uji anti-halusinasi",
        prompt: "Berapa laba bersih cabang Surabaya bulan Maret kemarin?",
      },
    ] as PresetItem[],
    presetsGeneral: [
      {
        label: "Presiden Indonesia sekarang",
        prompt: "Siapa presiden Indonesia sekarang?",
      },
      {
        label: "Identitas model",
        prompt: "Kamu dasarnya model apa?",
      },
      {
        label: "Suku bunga BI terbaru",
        prompt: "Berapa suku bunga acuan Bank Indonesia terbaru?",
      },
    ] as PresetItem[],
  },
  en: {
    eyebrow: "Kuon AI · Lightweight AI ready for your business",
    title: "Try the AI we can deploy into your business.",
    body: "This is a live preview of the self-hosted assistant we can run directly on your own numbers, documents, and team workflows. It runs on standard CPU servers with no costly GPU, thinks freely while calculating tables with exact math, and protects your cash flow with zero runaway per-token bills.",
    stats: [
      { accent: "#788c5d", value: "Cash-flow safe", label: "Standard CPU server, no GPU bills or per-token surprises" },
      { accent: "#6a9bcc", value: "Easy rollout", label: "Start with one workflow without rebuilding" },
      { accent: "#d97757", value: "Reliable & exact", label: "Natural reasoning, reads docs, exact table math" },
    ],
    ctaPrimary: "Contact Kuon Studio",
    ctaFullPage: "Open full screen",
    ctaBackHome: "Back to Kuon Studio",
    waLabel: "Or chat casually on WhatsApp",
    waText: "Hi Kuon Studio, I just tried Kuon AI on your site and would like to discuss deploying AI for my business.",
    footnote:
      "Self-hosted AI assistant crafted by Kuon Studio — ready to tailor to your documents and workflows.",
    playgroundTitle: "Try Kuon AI live",
    statusChecking: "Checking status…",
    statusOnline: "Live · Self-hosted CPU",
    statusBusy: "Live · processing",
    statusStandby: "Standby",
    modeBusiness: "Business chat",
    modeGeneral: "General QA",
    modeBusinessDesc:
      "Private mode: discuss strategy, analyze attached files, and run exact KPI formulas.",
    modeGeneralDesc:
      "Open mode: ask anything freely, with automatic live web lookup for current facts.",
    reset: "Reset",
    welcomeBusiness:
      "Hi! Ask about business strategy, paste a sales table, attach a file (.md/.csv/.txt), or pick an example above. Table figures are computed with exact formulas.",
    welcomeGeneral:
      "Hi! Ask anything — from ideas and drafts to current news with clickable sources.",
    placeholderBusiness: "Ask a business question, paste a table, or attach a file…",
    placeholderGeneral: "Ask anything or look up current facts…",
    send: "Send",
    stop: "Stop",
    attachFile: "Attach file (.csv, .tsv, .txt, .md)",
    removeFile: "Remove attachment",
    fileTruncated: "trimmed to fit",
    fileError: "Could not read that file. Use a plain text file such as .csv, .tsv, .txt, or .md.",
    defaultFilePrompt: "Summarize the key points and numbers from this document.",
    notesLabel: "Calculation notes",
    sourcesLabel: "Sources",
    you: "You",
    kuon: "Kuon AI",
    retry: "Retry",
    wakingMsg:
      "Kuon AI is starting up. Wait a few seconds and click Retry.",
    rateLimitMsg: "Too many requests in one minute. Please pause briefly and try again.",
    notConfiguredMsg:
      "The Kuon AI proxy is missing its server-side API key in this environment.",
    contextLimitMsg:
      "Message is too long for one turn. Shorten it or click Reset.",
    genericErrorMsg: "Kuon AI could not answer right now. Please try again.",
    presetsBusiness: [
      {
        label: "2-week revenue",
        prompt:
          "| Period | Revenue |\n|---|---|\n| Week 1 | Rp25,000,000 |\n| Week 2 | Rp20,000,000 |\nWhat is the percentage change in revenue from Week 1 to Week 2?",
      },
      {
        label: "Product table (TSV)",
        prompt:
          "Product\tRevenue\nIced Coffee\t15000000\nTeh Tarik\t41000000\nToast\t10000000\nWhich product has the highest revenue and what is its share?",
      },
      {
        label: "Gross margin",
        prompt:
          "Monthly revenue is Rp200,000,000 and COGS is Rp140,000,000. What is the gross margin?",
      },
      {
        label: "Break-even units",
        prompt:
          "Fixed costs are Rp15,000,000, unit selling price is Rp50,000, unit variable cost is Rp20,000. What is the break-even units?",
      },
      {
        label: "Refusal test",
        prompt: "What was the net profit for the Surabaya branch last March?",
      },
    ] as PresetItem[],
    presetsGeneral: [
      {
        label: "Current Indonesian president",
        prompt: "Who is the current president of Indonesia?",
      },
      {
        label: "Model identity",
        prompt: "What base model are you built on?",
      },
      {
        label: "Latest BI interest rate",
        prompt: "What is the latest Bank Indonesia benchmark interest rate?",
      },
    ] as PresetItem[],
  },
};

function renderFormattedInline(text: string): Array<string | JSX.Element> {
  const parts: Array<string | JSX.Element> = [];
  const tokenRe = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = tokenRe.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    const tok = match[0];
    if (tok.startsWith("**") && tok.endsWith("**")) {
      parts.push(
        <strong key={key++} className="font-semibold text-[#141413]">
          {tok.slice(2, -2)}
        </strong>
      );
    } else if (tok.startsWith("`") && tok.endsWith("`")) {
      parts.push(
        <code
          key={key++}
          className="rounded bg-[#faf9f5] border border-[#e8e6dc] px-1.5 py-0.5 font-mono text-[13px] text-[#141413]"
        >
          {tok.slice(1, -1)}
        </code>
      );
    } else if (tok.startsWith("*") && tok.endsWith("*")) {
      parts.push(
        <em key={key++} className="italic">
          {tok.slice(1, -1)}
        </em>
      );
    }
    lastIdx = match.index + tok.length;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }
  return parts;
}

function NotesDisclosure({ label, notes }: { label: string; notes: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mt-2.5 rounded-lg border border-[#e8e6dc] bg-[#faf9f5] text-xs">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-1.5 font-display font-medium text-[#141413]/75 hover:text-[#141413]"
      >
        <span>{label}</span>
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {open && (
        <pre className="border-t border-[#e8e6dc] px-3 py-2 font-mono text-[11.5px] leading-relaxed text-[#141413]/80 whitespace-pre-wrap break-words">
          {notes}
        </pre>
      )}
    </div>
  );
}

interface KuonShowcaseSectionProps {
  standalone?: boolean;
}

const KuonShowcaseSection = ({ standalone = false }: KuonShowcaseSectionProps) => {
  const { lang } = useLang();
  const c = useCopy(COPY);

  const [mode, setMode] = useState<KuonMode>("business");
  const [status, setStatus] = useState<"checking" | "online" | "busy" | "standby">("checking");
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    checkKuonHealth(controller.signal).then((health) => {
      if (health.status === "ok") {
        setStatus(health.busy ? "busy" : "online");
      } else {
        setStatus("standby");
      }
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setFileError(null);
    try {
      const text = (await file.text()).trim();
      if (!text || text.includes("\u0000")) {
        setFileError(c.fileError);
        return;
      }
      const truncated = text.length > MAX_ATTACHMENT_CHARS;
      const content = truncated ? text.slice(0, MAX_ATTACHMENT_CHARS).trimEnd() : text;
      setAttachedFile({ name: file.name, content, truncated });
    } catch {
      setFileError(c.fileError);
    }
  };

  const handleModeChange = (nextMode: KuonMode) => {
    if (nextMode === mode) return;
    abortRef.current?.abort();
    setIsStreaming(false);
    setMode(nextMode);
    setMessages([]);
    setLastPrompt(null);
    setFileError(null);
  };

  const handleReset = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
    setMessages([]);
    setLastPrompt(null);
    setAttachedFile(null);
    setFileError(null);
  };

  const handleStop = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
    setMessages((prev) =>
      prev.map((m) => (m.streaming ? { ...m, streaming: false } : m))
    );
  };

  const mapErrorMessage = (code: string): string => {
    if (code === "waking_up") return c.wakingMsg;
    if (code === "rate_limited") return c.rateLimitMsg;
    if (code === "not_configured") return c.notConfiguredMsg;
    if (code === "context_length_exceeded") return c.contextLimitMsg;
    return c.genericErrorMsg;
  };

  const sendMessage = async (
    rawPrompt: string,
    isRetry = false,
    overrideAttachment: AttachedFile | null = null
  ) => {
    const fileToUse = isRetry ? null : (overrideAttachment ?? attachedFile);
    const trimmedInput = rawPrompt.trim();
    if (!trimmedInput && !fileToUse) return;
    if (isStreaming) return;

    const displayPrompt = trimmedInput || c.defaultFilePrompt;
    const apiPrompt = fileToUse
      ? `[Attachment: ${fileToUse.name}]\n${fileToUse.content}\n[/Attachment]\n${displayPrompt}`
      : trimmedInput;

    const historyForApi: KuonChatMessage[] = messages
      .filter((m) => !m.errorCode && (m.apiContent || m.content).trim().length > 0)
      .map((m) => ({ role: m.role, content: m.apiContent || m.content }));

    const nextHistory: KuonChatMessage[] = isRetry
      ? [
          ...historyForApi.filter(
            (m, i) => !(i === historyForApi.length - 1 && m.role === "user" && m.content === apiPrompt)
          ),
          { role: "user", content: apiPrompt },
        ]
      : [...historyForApi, { role: "user", content: apiPrompt }];

    const userMsgId = `u-${Date.now()}`;
    const assistantMsgId = `a-${Date.now() + 1}`;

    setLastPrompt(apiPrompt);
    setInput("");
    setAttachedFile(null);
    setFileError(null);
    setIsStreaming(true);

    setMessages((prev) => {
      const cleaned = isRetry ? prev.filter((m) => !m.errorCode) : prev;
      const base =
        isRetry && cleaned[cleaned.length - 1]?.role === "user"
          ? cleaned
          : [
              ...cleaned,
              {
                id: userMsgId,
                role: "user" as const,
                content: displayPrompt,
                apiContent: apiPrompt,
                attachmentName: fileToUse?.name,
              },
            ];
      return [
        ...base,
        {
          id: assistantMsgId,
          role: "assistant" as const,
          content: "",
          streaming: true,
        },
      ];
    });

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await streamKuonChat({
        messages: nextHistory,
        mode,
        signal: controller.signal,
        onToken: (delta) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, content: m.content + delta } : m
            )
          );
        },
        onMeta: ({ notes, sources }) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, notes, sources } : m
            )
          );
        },
      });
      setStatus("online");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content: result.content || m.content,
                notes: result.notes || m.notes,
                sources: result.sources.length ? result.sources : m.sources,
                streaming: false,
              }
            : m
        )
      );
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, streaming: false } : m
          )
        );
      } else {
        const code = err instanceof KuonApiError ? err.code : "waking_up";
        if (code === "waking_up") setStatus("standby");
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: mapErrorMessage(code),
                  errorCode: code,
                  streaming: false,
                }
              : m
          )
        );
      }
    } finally {
      abortRef.current = null;
      setIsStreaming(false);
    }
  };

  const presets = mode === "business" ? c.presetsBusiness : c.presetsGeneral;
  const welcomeText = mode === "business" ? c.welcomeBusiness : c.welcomeGeneral;
  const placeholder = mode === "business" ? c.placeholderBusiness : c.placeholderGeneral;

  const statusMeta =
    status === "online"
      ? { dot: "bg-[#788c5d]", text: c.statusOnline }
      : status === "busy"
        ? { dot: "bg-[#6a9bcc]", text: c.statusBusy }
        : status === "standby"
          ? { dot: "bg-[#d97757]", text: c.statusStandby }
          : { dot: "bg-[#b0aea5]", text: c.statusChecking };

  return (
    <section
      id="kuon"
      className={standalone ? "pt-28 md:pt-36 pb-16 md:pb-24" : "pt-28 md:pt-36 pb-16 md:pb-20"}
    >
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left column: Kuon 1 story, benchmarks, and navigation */}
          <div className="lg:col-span-5">
            <p className="eyebrow !text-[#5f7148] animate-rise">{c.eyebrow}</p>
            <h1 className="mt-3 font-display font-bold text-[clamp(2rem,4.3vw,3.1rem)] text-[#141413] animate-rise animation-delay-100">
              {c.title}
            </h1>
            <p className="mt-5 text-[17px] text-[#141413]/75 animate-rise animation-delay-200">
              {c.body}
            </p>

            <dl className="mt-7 grid grid-cols-3 gap-3 text-sm animate-rise animation-delay-200">
              {c.stats.map((stat) => (
                <div
                  key={stat.value}
                  className="border-t-2 pt-3"
                  style={{ borderColor: stat.accent }}
                >
                  <dt className="font-display font-semibold text-[#141413] text-[15px]">
                    {stat.value}
                  </dt>
                  <dd className="mt-0.5 text-[13px] leading-snug text-[#141413]/65">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-3 animate-rise animation-delay-200">
              {standalone ? (
                <>
                  <Link to="/#contact" className="btn-primary !px-5 !py-3 !text-[15px]">
                    {c.ctaPrimary}
                  </Link>
                  <Link to="/" className="btn-secondary !px-5 !py-3 !text-[15px]">
                    &larr; {c.ctaBackHome}
                  </Link>
                </>
              ) : (
                <>
                  <a href="#contact" className="btn-primary !px-5 !py-3 !text-[15px]">
                    {c.ctaPrimary}
                  </a>
                  <Link to="/kuon" className="btn-secondary !px-5 !py-3 !text-[15px]">
                    {c.ctaFullPage} &rarr;
                  </Link>
                </>
              )}
            </div>

            <a
              href={waLink(c.waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-display font-semibold text-[14.5px] text-[#141413] hover:text-[#d97757] transition-colors"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-[#788c5d]" aria-hidden="true" />
              {c.waLabel} &rarr;
            </a>

            <p className="mt-3 text-sm text-[#141413]/60">{c.footnote}</p>
          </div>

          {/* Right column: Live Kuon 1 chat playground */}
          <div className="lg:col-span-7">
            <div className="card-studio !p-5 sm:!p-6">
              <div
                className="card-accent !mb-4"
                style={{ background: "#788c5d" }}
                aria-hidden="true"
              />

              {/* Playground header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-display font-semibold text-base text-[#141413]">
                    {c.playgroundTitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8e6dc] bg-[#faf9f5] px-2.5 py-0.5 font-display text-xs text-[#141413]/75">
                    <span className={`h-2 w-2 rounded-full ${statusMeta.dot}`} aria-hidden="true" />
                    {statusMeta.text}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="inline-flex rounded-full border border-[#e8e6dc] bg-[#faf9f5] p-0.5 font-display text-xs font-medium"
                    role="tablist"
                    aria-label="Kuon 1 mode"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === "business"}
                      onClick={() => handleModeChange("business")}
                      className={`rounded-full px-3 py-1 transition-colors ${
                        mode === "business"
                          ? "bg-[#141413] text-[#faf9f5]"
                          : "text-[#141413]/70 hover:text-[#141413]"
                      }`}
                    >
                      {c.modeBusiness}
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === "general"}
                      onClick={() => handleModeChange("general")}
                      className={`rounded-full px-3 py-1 transition-colors ${
                        mode === "general"
                          ? "bg-[#141413] text-[#faf9f5]"
                          : "text-[#141413]/70 hover:text-[#141413]"
                      }`}
                    >
                      {c.modeGeneral}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    title={c.reset}
                    aria-label={c.reset}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e8e6dc] text-[#141413]/70 transition-colors hover:border-[#141413] hover:text-[#141413]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Active mode description */}
              <p className="mt-3 rounded-xl bg-[#faf9f5] border border-[#e8e6dc] px-3.5 py-2 text-[13.5px] leading-snug text-[#141413]/75 max-w-none">
                {mode === "business" ? c.modeBusinessDesc : c.modeGeneralDesc}
              </p>

              {/* Preset chips */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {presets.map((preset) => (
                  <button
                    key={`${lang}-${mode}-${preset.label}`}
                    type="button"
                    disabled={isStreaming}
                    onClick={() => sendMessage(preset.prompt)}
                    className="rounded-full border border-[#e8e6dc] bg-white px-3 py-1 font-display text-xs font-medium text-[#141413]/80 transition-colors hover:border-[#788c5d] hover:bg-[#788c5d]/10 hover:text-[#141413] disabled:opacity-50"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Chat transcript */}
              <div
                ref={listRef}
                className="mt-4 h-[310px] sm:h-[340px] overflow-y-auto rounded-xl border border-[#e8e6dc] bg-[#faf9f5] p-3.5 space-y-3"
                aria-live="polite"
              >
                {/* Welcome message */}
                <div className="flex flex-col items-start">
                  <span className="font-display text-[11px] font-semibold uppercase tracking-wide text-[#5f7148] mb-1">
                    {c.kuon}
                  </span>
                  <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-[#e8e6dc] bg-white px-3.5 py-2.5 text-[15px] leading-relaxed text-[#141413]">
                    {welcomeText}
                  </div>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <span
                      className={`font-display text-[11px] font-semibold uppercase tracking-wide mb-1 ${
                        msg.role === "user" ? "text-[#141413]/55" : "text-[#5f7148]"
                      }`}
                    >
                      {msg.role === "user" ? c.you : c.kuon}
                    </span>

                    <div
                      className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap break-words ${
                        msg.role === "user"
                          ? "rounded-tr-sm bg-[#141413] text-[#faf9f5]"
                          : msg.errorCode
                            ? "rounded-tl-sm border border-[#d97757]/50 bg-[#d97757]/10 text-[#141413]"
                            : "rounded-tl-sm border border-[#e8e6dc] bg-white text-[#141413]"
                      }`}
                    >
                      {msg.attachmentName && (
                        <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-lg bg-[#faf9f5]/15 px-2.5 py-1 font-display text-xs text-[#faf9f5]">
                          <FileText className="h-3.5 w-3.5 shrink-0" />
                          <span>{msg.attachmentName}</span>
                        </div>
                      )}
                      {msg.attachmentName ? (
                        <div>{msg.content}</div>
                      ) : msg.role === "assistant" && msg.content ? (
                        renderFormattedInline(msg.content)
                      ) : (
                        msg.content || (msg.streaming ? "…" : "")
                      )}
                      {msg.streaming && (
                        <span
                          className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-[#788c5d] align-middle"
                          aria-hidden="true"
                        />
                      )}

                      {msg.notes && (
                        <NotesDisclosure label={c.notesLabel} notes={msg.notes} />
                      )}

                      {msg.sources && msg.sources.some((s) => Boolean(s.url)) && (
                        <div className="mt-2.5 border-t border-[#e8e6dc] pt-2">
                          <p className="font-display text-[11px] font-semibold uppercase tracking-wide text-[#141413]/55">
                            {c.sourcesLabel}
                          </p>
                          <ul className="mt-1 space-y-1">
                            {msg.sources
                              .filter((src) => Boolean(src.url))
                              .map((src, idx) => (
                                <li key={`${src.url}-${idx}`} className="text-xs">
                                  <a
                                    href={src.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-display text-[#5f7148] hover:text-[#d97757] underline decoration-[#788c5d]/40 underline-offset-2"
                                  >
                                    <span>
                                      [{idx + 1}] {src.title}
                                    </span>
                                    <ExternalLink className="h-3 w-3 shrink-0" />
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {msg.errorCode && lastPrompt && (
                        <div className="mt-2.5">
                          <button
                            type="button"
                            onClick={() => sendMessage(lastPrompt, true)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#141413] px-3 py-1 font-display text-xs font-semibold text-[#faf9f5] transition-colors hover:bg-[#d97757]"
                          >
                            <RefreshCw className="h-3 w-3" />
                            {c.retry}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Attached file preview / error */}
              {attachedFile && (
                <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-[#788c5d]/40 bg-[#788c5d]/10 px-3 py-2 text-xs font-display text-[#141413]">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 shrink-0 text-[#5f7148]" />
                    <span className="truncate font-semibold">{attachedFile.name}</span>
                    {attachedFile.truncated && (
                      <span className="text-[#141413]/60 shrink-0">({c.fileTruncated})</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    aria-label={c.removeFile}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#141413]/70 hover:bg-[#141413]/10 hover:text-[#141413] shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              {fileError && (
                <p className="mt-2 text-xs font-display text-[#b4532f]">{fileError}</p>
              )}

              {/* Composer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="mt-3 flex items-end gap-2"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_FILE_TYPES}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isStreaming}
                  onClick={() => fileInputRef.current?.click()}
                  title={c.attachFile}
                  aria-label={c.attachFile}
                  className="inline-flex h-[54px] w-[46px] items-center justify-center rounded-xl border border-[#e8e6dc] bg-white text-[#141413]/70 transition-colors hover:border-[#788c5d] hover:text-[#141413] disabled:opacity-40 shrink-0"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <textarea
                  rows={2}
                  maxLength={2000}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder={placeholder}
                  aria-label={placeholder}
                  className="field !min-h-[54px] !py-2.5 !text-[15px] resize-none flex-1"
                />
                {isStreaming ? (
                  <button
                    type="button"
                    onClick={handleStop}
                    aria-label={c.stop}
                    className="inline-flex h-[54px] items-center justify-center gap-1.5 rounded-xl bg-[#d97757] px-4 font-display text-sm font-semibold text-[#faf9f5] transition-colors hover:bg-[#141413] shrink-0"
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                    <span className="hidden sm:inline">{c.stop}</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim() && !attachedFile}
                    aria-label={c.send}
                    className="inline-flex h-[54px] items-center justify-center gap-1.5 rounded-xl bg-[#141413] px-4 font-display text-sm font-semibold text-[#faf9f5] transition-colors hover:bg-[#788c5d] disabled:opacity-40 disabled:hover:bg-[#141413] shrink-0"
                  >
                    <ArrowUp className="h-4 w-4" />
                    <span className="hidden sm:inline">{c.send}</span>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KuonShowcaseSection;
