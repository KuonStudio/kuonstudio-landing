import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RefreshCw,
  RotateCcw,
  Square,
} from "lucide-react";
import { useCopy, useLang } from "@/lib/i18n";
import {
  checkKuonHealth,
  KuonApiError,
  streamKuonChat,
  type KuonChatMessage,
  type KuonMode,
  type KuonSource,
} from "@/lib/kuonClient";

interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  notes?: string;
  sources?: KuonSource[];
  streaming?: boolean;
  errorCode?: string;
}

interface PresetItem {
  label: string;
  prompt: string;
}

const COPY = {
  id: {
    eyebrow: "Kuon 1 · Model bahasa buatan sendiri",
    title: "Model bahasa 307 MB buatan sendiri. Jawab dari bukti, bukan menebak.",
    body: "Kuon 1 kami latih sendiri dari nol untuk bahasa Indonesia dan Inggris. Jalan di CPU 4 core tanpa GPU, menghitung tabel dengan rumus pasti, dan mengaku terus terang saat data tidak cukup.",
    stats: [
      { accent: "#788c5d", value: "307 MB INT8", label: "CPU 4 core, tanpa GPU" },
      { accent: "#6a9bcc", value: "100% jujur", label: "8/8 data kosong ditolak" },
      { accent: "#d97757", value: "15/16 tepat", label: "6,2% halusinasi uji" },
    ],
    ctaPrimary: "Lihat layanan AI agent",
    ctaFullPage: "Buka halaman penuh",
    ctaBackHome: "Kembali ke Kuon Studio",
    footnote:
      "Dijalankan langsung oleh model Kuon 1 (295,8 juta parameter). Tanpa LLM pihak ketiga di balik layar.",
    playgroundTitle: "Coba Kuon 1 langsung",
    statusChecking: "Memeriksa status…",
    statusOnline: "Aktif · CPU INT8",
    statusBusy: "Aktif · sedang memproses",
    statusStandby: "Standby (auto-pause)",
    modeBusiness: "Business chat",
    modeGeneral: "General QA",
    modeBusinessDesc:
      "Mode privat: cek tabel, hitung KPI dengan rumus pasti, tanpa pencarian web luar.",
    modeGeneralDesc:
      "Mode pencarian web: cari sumber terbaru lewat Exa AI lalu rangkum beserta tautannya.",
    reset: "Reset",
    welcomeBusiness:
      "Halo! Tempel tabel penjualan, angka KPI, atau pilih contoh di atas. Kuon 1 menghitung dengan rumus pasti dan menolak menebak kalau datanya belum ada.",
    welcomeGeneral:
      "Mode General QA aktif. Tanyakan fakta atau berita terbaru, Kuon 1 akan mencari sumber langsung lewat web dan menyertakan tautannya.",
    placeholderBusiness: "Tempel tabel omzet atau tanyakan KPI bisnis…",
    placeholderGeneral: "Tanyakan fakta atau berita terbaru…",
    send: "Kirim",
    stop: "Hentikan",
    notesLabel: "Catatan hitungan",
    sourcesLabel: "Sumber",
    you: "Kamu",
    kuon: "Kuon 1",
    retry: "Coba lagi",
    wakingMsg:
      "Server demo Kuon 1 sedang menyala dari mode hemat (auto-pause). Tunggu beberapa detik lalu tekan Coba lagi.",
    rateLimitMsg:
      "Terlalu banyak permintaan dalam satu menit. Tunggu sebentar lalu coba lagi.",
    notConfiguredMsg:
      "Server demo Kuon 1 belum terhubung ke kunci API di environment ini.",
    contextLimitMsg:
      "Pesan melebihi batas konteks 1.024 token. Coba ringkas teks atau tekan Reset.",
    genericErrorMsg: "Kuon 1 belum bisa menjawab sekarang. Silakan coba lagi.",
    scopeNote:
      "Batas konteks 1.024 token. Dirancang untuk tabel, KPI, dan dokumen bisnis ringkas. Server demo tidur otomatis setelah 30 menit tidak dipakai.",
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
    eyebrow: "Kuon 1 · Built from scratch",
    title: "A 307 MB language model built from scratch. Answers from evidence, never guesses.",
    body: "We trained Kuon 1 from scratch for Indonesian and English. It runs on a 4-core CPU with no GPU, checks tables with exact math, and says clearly when the data is missing.",
    stats: [
      { accent: "#788c5d", value: "307 MB INT8", label: "4-core CPU, no GPU" },
      { accent: "#6a9bcc", value: "100% honest", label: "8/8 missing-data checks" },
      { accent: "#d97757", value: "15/16 exact", label: "6.2% eval hallucination" },
    ],
    ctaPrimary: "See AI agent services",
    ctaFullPage: "Open full playground",
    ctaBackHome: "Back to Kuon Studio",
    footnote:
      "Served directly by Kuon 1 (295.8M parameters). No third-party LLM behind the curtain.",
    playgroundTitle: "Try Kuon 1 live",
    statusChecking: "Checking status…",
    statusOnline: "Live · CPU INT8",
    statusBusy: "Live · processing",
    statusStandby: "Standby (auto-pause)",
    modeBusiness: "Business chat",
    modeGeneral: "General QA",
    modeBusinessDesc:
      "Private mode: reads tables, runs exact KPI formulas, no external web search.",
    modeGeneralDesc:
      "Web search mode: looks up live sources via Exa AI and answers with citations.",
    reset: "Reset",
    welcomeBusiness:
      "Hi! Paste a sales table, KPI numbers, or pick an example above. Kuon 1 computes with exact formulas and refuses to guess when data is missing.",
    welcomeGeneral:
      "General QA mode is on. Ask a current question and Kuon 1 will search the live web and attach clickable sources.",
    placeholderBusiness: "Paste a revenue table or ask a business KPI question…",
    placeholderGeneral: "Ask a factual or current-events question…",
    send: "Send",
    stop: "Stop",
    notesLabel: "Calculation notes",
    sourcesLabel: "Sources",
    you: "You",
    kuon: "Kuon 1",
    retry: "Retry",
    wakingMsg:
      "The Kuon 1 demo server is waking up from standby (auto-pause). Wait a few seconds and click Retry.",
    rateLimitMsg: "Too many requests in one minute. Please pause briefly and try again.",
    notConfiguredMsg:
      "The Kuon 1 demo proxy is missing its server-side API key in this environment.",
    contextLimitMsg:
      "Message exceeds the 1,024-token context budget. Shorten it or click Reset.",
    genericErrorMsg: "Kuon 1 could not answer right now. Please try again.",
    scopeNote:
      "1,024-token context limit. Built for tables, KPIs, and concise business docs. Demo server auto-pauses after 30 minutes idle.",
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
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
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

  const handleModeChange = (nextMode: KuonMode) => {
    if (nextMode === mode) return;
    abortRef.current?.abort();
    setIsStreaming(false);
    setMode(nextMode);
    setMessages([]);
    setLastPrompt(null);
  };

  const handleReset = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
    setMessages([]);
    setLastPrompt(null);
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

  const sendMessage = async (rawPrompt: string, isRetry = false) => {
    const prompt = rawPrompt.trim();
    if (!prompt || isStreaming) return;

    const historyForApi: KuonChatMessage[] = messages
      .filter((m) => !m.errorCode && m.content.trim().length > 0)
      .map((m) => ({ role: m.role, content: m.content }));

    const nextHistory: KuonChatMessage[] = isRetry
      ? [
          ...historyForApi.filter(
            (m, i) => !(i === historyForApi.length - 1 && m.role === "user" && m.content === prompt)
          ),
          { role: "user", content: prompt },
        ]
      : [...historyForApi, { role: "user", content: prompt }];

    const userMsgId = `u-${Date.now()}`;
    const assistantMsgId = `a-${Date.now() + 1}`;

    setLastPrompt(prompt);
    setInput("");
    setIsStreaming(true);

    setMessages((prev) => {
      const cleaned = isRetry ? prev.filter((m) => !m.errorCode) : prev;
      const base =
        isRetry && cleaned[cleaned.length - 1]?.role === "user"
          ? cleaned
          : [...cleaned, { id: userMsgId, role: "user" as const, content: prompt }];
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
                  <Link to="/#services" className="btn-primary !px-5 !py-3 !text-[15px]">
                    {c.ctaPrimary}
                  </Link>
                  <Link to="/" className="btn-secondary !px-5 !py-3 !text-[15px]">
                    &larr; {c.ctaBackHome}
                  </Link>
                </>
              ) : (
                <>
                  <a href="#services" className="btn-primary !px-5 !py-3 !text-[15px]">
                    {c.ctaPrimary}
                  </a>
                  <Link to="/kuon" className="btn-secondary !px-5 !py-3 !text-[15px]">
                    {c.ctaFullPage} &rarr;
                  </Link>
                </>
              )}
            </div>

            <p className="mt-4 text-sm text-[#141413]/60">{c.footnote}</p>
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
                      {msg.content || (msg.streaming ? "…" : "")}
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

              {/* Composer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="mt-3 flex items-end gap-2"
              >
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
                    disabled={!input.trim()}
                    aria-label={c.send}
                    className="inline-flex h-[54px] items-center justify-center gap-1.5 rounded-xl bg-[#141413] px-4 font-display text-sm font-semibold text-[#faf9f5] transition-colors hover:bg-[#788c5d] disabled:opacity-40 disabled:hover:bg-[#141413] shrink-0"
                  >
                    <ArrowUp className="h-4 w-4" />
                    <span className="hidden sm:inline">{c.send}</span>
                  </button>
                )}
              </form>

              <p className="mt-2.5 text-[12.5px] leading-snug text-[#141413]/55 max-w-none">
                {c.scopeNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KuonShowcaseSection;
