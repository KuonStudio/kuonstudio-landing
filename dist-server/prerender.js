import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { useLocation, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { createContext, useState, useEffect, useContext, useRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const KEY = "kuon_lang";
const META = {
  id: {
    title: "Kuon Studio — AI agent untuk kerjaan berulang di bisnismu",
    description: "Software studio di Jakarta. Kami membangun AI agent dan sistem yang mengambil alih kerjaan berulang, dengan timmu tetap menyetujui setiap langkah. Harga tetap setelah scope."
  },
  en: {
    title: "Kuon Studio — AI agents for the repetitive work in your business",
    description: "Software studio in Jakarta. We build AI agents and systems that take over repetitive work while your team approves every step. Fixed price after scoping."
  }
};
function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "id") return q;
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "id") return saved;
  } catch {
  }
  return "id";
}
const LangContext = createContext({ lang: "id", setLang: () => {
} });
function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  useEffect(() => {
    var _a;
    document.documentElement.lang = lang;
    document.title = META[lang].title;
    (_a = document.querySelector('meta[name="description"]')) == null ? void 0 : _a.setAttribute("content", META[lang].description);
    try {
      localStorage.setItem(KEY, lang);
    } catch {
    }
  }, [lang]);
  return /* @__PURE__ */ jsx(LangContext.Provider, { value: { lang, setLang }, children });
}
function useLang() {
  return useContext(LangContext);
}
function useCopy(copy) {
  return copy[useLang().lang];
}
const COPY$b = {
  id: {
    links: [
      { label: "Cara kerja agent", href: "#agent" },
      { label: "Layanan", href: "#services" },
      { label: "Contoh", href: "#use-cases" },
      { label: "Karya", href: "#work" },
      { label: "Kontak", href: "#contact" }
    ],
    cta: "Cek kesiapan AI",
    reply: "Kami balas dalam 2 hari kerja.",
    open: "Buka menu",
    close: "Tutup menu",
    langLabel: "Bahasa"
  },
  en: {
    links: [
      { label: "How agents work", href: "#agent" },
      { label: "Services", href: "#services" },
      { label: "Use cases", href: "#use-cases" },
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#contact" }
    ],
    cta: "Check AI readiness",
    reply: "We reply within 2 business days.",
    open: "Open menu",
    close: "Close menu",
    langLabel: "Language"
  }
};
const LangSwitch = () => {
  const { lang, setLang } = useLang();
  const c = useCopy(COPY$b);
  return /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-full border border-[#b0aea5] p-0.5 font-display text-xs font-semibold", role: "group", "aria-label": c.langLabel, children: ["id", "en"].map((l) => /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: () => setLang(l),
      "aria-pressed": lang === l,
      className: `min-w-[2.25rem] px-2.5 py-1.5 rounded-full uppercase transition-colors ${lang === l ? "bg-[#141413] text-[#faf9f5]" : "text-[#141413]/70 hover:text-[#141413]"}`,
      children: l
    },
    l
  )) });
};
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const c = useCopy(COPY$b);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        className: `fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${scrolled || menuOpen ? "bg-[#faf9f5]/95 backdrop-blur border-b border-[#e8e6dc]" : "bg-transparent border-b border-transparent"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "wrap flex items-center justify-between gap-4 py-4", children: [
          /* @__PURE__ */ jsx("a", { href: "#top", className: "font-display font-bold text-lg tracking-tight text-[#141413]", children: "Kuon Studio" }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden lg:flex items-center gap-7", "aria-label": "Primary", children: [
            c.links.map((link) => /* @__PURE__ */ jsx("a", { href: link.href, className: "nav-link", children: link.label }, link.href)),
            /* @__PURE__ */ jsx(LangSwitch, {}),
            /* @__PURE__ */ jsx("a", { href: "#readiness", className: "btn-primary !px-5 !py-2.5 !text-sm", children: c.cta })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 lg:hidden", children: [
            /* @__PURE__ */ jsx(LangSwitch, {}),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "inline-flex items-center justify-center w-11 h-11 text-[#141413]",
                onClick: () => setMenuOpen(!menuOpen),
                "aria-label": menuOpen ? c.close : c.open,
                "aria-expanded": menuOpen,
                children: /* @__PURE__ */ jsxs("span", { className: "relative block w-6 h-6", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `absolute left-0 top-[7px] w-6 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `absolute left-0 top-[17px] w-6 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`
                    }
                  )
                ] })
              }
            )
          ] })
        ] })
      }
    ),
    menuOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40 bg-[#faf9f5] pt-24 overflow-y-auto", children: /* @__PURE__ */ jsxs("nav", { className: "wrap flex flex-col gap-2 pb-10", "aria-label": "Mobile", children: [
      c.links.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href,
          onClick: () => setMenuOpen(false),
          className: "font-display font-semibold text-3xl py-3 text-[#141413] border-b border-[#e8e6dc]",
          children: link.label
        },
        link.href
      )),
      /* @__PURE__ */ jsx("a", { href: "#readiness", onClick: () => setMenuOpen(false), className: "btn-primary mt-6", children: c.cta }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-[#141413]/60", children: c.reply })
    ] }) })
  ] });
};
const WHATSAPP_NUMBER = "62818833831";
const WHATSAPP_DISPLAY = "+62 818-833-831";
const EMAIL = "social@kuonstudio.com";
function waLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
const COPY$a = {
  id: {
    eyebrow: "Software studio di Jakarta · AI agent untuk bisnis",
    title: "AI agent yang mengerjakan kerjaan berulang di bisnismu. Timmu tetap pegang kendali.",
    body: "Balas chat pesanan, rekap penjualan, follow-up leads, isi data dari dokumen: agent kami menyiapkan semuanya, timmu tinggal cek dan setujui. Tidak ada yang terkirim sendiri. Kami bangun di atas alat yang sudah kamu pakai, lalu serahkan lengkap dengan panduan dan pelatihan.",
    primary: "Cek kesiapan AI bisnismu",
    secondary: "Lihat cara kerja agent",
    wa: "Atau tanya langsung lewat WhatsApp",
    waText: "Halo Kuon Studio, saya mau tanya soal AI agent untuk bisnis saya.",
    points: [
      { accent: "#d97757", t: "Mulai dari satu alur kerja", d: "Pilot 2 minggu, harga tetap setelah scope." },
      { accent: "#6a9bcc", t: "Manusia yang menyetujui", d: "Agent menyiapkan, staf yang memutuskan." },
      { accent: "#788c5d", t: "Milikmu sepenuhnya", d: "Kode, akun, data, dan panduan jadi milikmu." }
    ]
  },
  en: {
    eyebrow: "Software studio in Jakarta · AI agents for business",
    title: "AI agents that do the repetitive work in your business. Your team stays in control.",
    body: "Order replies, sales recaps, lead follow-ups, data entry from documents: our agents prepare the work, your team checks and approves. Nothing sends itself. We build on the tools you already use, then hand everything over with a guide and training.",
    primary: "Check your AI readiness",
    secondary: "See how agents work",
    wa: "Or ask us on WhatsApp",
    waText: "Hi Kuon Studio, I would like to ask about AI agents for my business.",
    points: [
      { accent: "#d97757", t: "Start with one workflow", d: "A 2-week pilot, fixed price after scoping." },
      { accent: "#6a9bcc", t: "Humans approve", d: "The agent prepares, your staff decides." },
      { accent: "#788c5d", t: "You own all of it", d: "Code, accounts, data, and the guide are yours." }
    ]
  }
};
const HeroSection = () => {
  const c = useCopy(COPY$a);
  return /* @__PURE__ */ jsx("section", { id: "top", className: "pt-32 md:pt-40 pb-16 md:pb-24", children: /* @__PURE__ */ jsx("div", { className: "wrap", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow animate-rise", children: c.eyebrow }),
    /* @__PURE__ */ jsx("h1", { className: "mt-4 font-display font-bold text-[clamp(2.1rem,5.5vw,3.6rem)] text-[#141413] animate-rise animation-delay-100", children: c.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-[#141413]/70 animate-rise animation-delay-200", children: c.body }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-3 animate-rise animation-delay-200", children: [
      /* @__PURE__ */ jsx("a", { href: "#readiness", className: "btn-primary", children: c.primary }),
      /* @__PURE__ */ jsx("a", { href: "#agent", className: "btn-secondary", children: c.secondary })
    ] }),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: waLink(c.waText),
        target: "_blank",
        rel: "noopener noreferrer",
        className: "mt-5 inline-flex items-center gap-2 font-display font-semibold text-[15px] text-[#141413] hover:text-[#d97757] transition-colors",
        children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-[#788c5d]", "aria-hidden": "true" }),
          c.wa,
          " →"
        ]
      }
    ),
    /* @__PURE__ */ jsx("dl", { className: "mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[15px]", children: c.points.map((p) => /* @__PURE__ */ jsxs("div", { className: "border-t-2 pt-3", style: { borderColor: p.accent }, children: [
      /* @__PURE__ */ jsx("dt", { className: "font-display font-semibold text-[#141413]", children: p.t }),
      /* @__PURE__ */ jsx("dd", { className: "text-[#141413]/60", children: p.d })
    ] }, p.t)) })
  ] }) }) });
};
const COPY$9 = {
  id: {
    eyebrow: "Cara kerja agent",
    title: "Bukan chatbot. Agent mengerjakan langkahnya, manusia yang memutuskan.",
    body: "Agent membaca pesan atau dokumen yang masuk, mengecek data di sistemmu, lalu menyiapkan tindakan. Staf melihat semuanya dalam satu layar dan menekan setuju, ubah, atau tolak.",
    labels: ["1. Masuk", "2. Agent menyiapkan", "3. Staf menyetujui"],
    approve: "Setujui",
    edit: "Ubah",
    sent: "Terkirim setelah disetujui",
    note: "Contoh ilustrasi. Alur, data, dan batasnya disesuaikan saat scope.",
    scenarios: [
      {
        tab: "Pesanan WhatsApp",
        inbox: { from: "Pelanggan · WhatsApp", text: "Kak, keripik pedas 3 bungkus sama yang original 2, kirim ke Bekasi ya." },
        steps: ["Baca pesanan: 3 pedas, 2 original", "Cek stok di sistem: tersedia", "Hitung ongkir ke Bekasi", "Siapkan balasan + catatan pesanan"],
        draft: "Siap kak! 3 pedas + 2 original, total sudah termasuk ongkir ke Bekasi. Mau transfer atau QRIS?",
        approved: "Pesanan tercatat, balasan terkirim."
      },
      {
        tab: "Booking klinik",
        inbox: { from: "Pasien · formulir web", text: "Mau jadwal kontrol gigi Sabtu pagi kalau bisa." },
        steps: ["Cari slot Sabtu pagi yang kosong", "Cocokkan dokter yang praktik", "Siapkan konfirmasi + pengingat H-1"],
        draft: "Sabtu 09.30 dengan drg. jaga tersedia. Kami kirim pengingat sehari sebelumnya, ya.",
        approved: "Jadwal masuk kalender, pengingat terpasang."
      },
      {
        tab: "Follow-up leads",
        inbox: { from: "Leads · 14 kontak baru minggu ini", text: "Daftar dari form, Instagram, dan pameran." },
        steps: ["Gabungkan jadi satu daftar, buang duplikat", "Urutkan dari yang paling siap beli", "Susun draf pesan per orang"],
        draft: "14 draf follow-up siap, 5 prioritas tinggi di atas.",
        approved: "Staf sales mengirim 5 pesan pertama hari ini."
      }
    ]
  },
  en: {
    eyebrow: "How agents work",
    title: "Not a chatbot. The agent does the steps, a person makes the call.",
    body: "The agent reads incoming messages or documents, checks your system, and prepares the action. Your staff sees it all on one screen and taps approve, edit, or reject.",
    labels: ["1. In", "2. Agent prepares", "3. Staff approves"],
    approve: "Approve",
    edit: "Edit",
    sent: "Sent after approval",
    note: "Illustrative example. Flow, data, and limits are set during scoping.",
    scenarios: [
      {
        tab: "WhatsApp orders",
        inbox: { from: "Customer · WhatsApp", text: "Hi, 3 packs of spicy chips and 2 original, deliver to Bekasi please." },
        steps: ["Read the order: 3 spicy, 2 original", "Check stock in your system: available", "Calculate delivery to Bekasi", "Prepare the reply + order record"],
        draft: "Sure! 3 spicy + 2 original, total includes delivery to Bekasi. Bank transfer or QRIS?",
        approved: "Order recorded, reply sent."
      },
      {
        tab: "Clinic booking",
        inbox: { from: "Patient · web form", text: "I would like a dental check-up on Saturday morning if possible." },
        steps: ["Find an open Saturday morning slot", "Match a dentist on duty", "Prepare the confirmation + D-1 reminder"],
        draft: "Saturday 09:30 with the dentist on duty is open. We will send a reminder the day before.",
        approved: "Booked in the calendar, reminder set."
      },
      {
        tab: "Lead follow-up",
        inbox: { from: "Leads · 14 new contacts this week", text: "From the web form, Instagram, and an expo." },
        steps: ["Merge into one list, drop duplicates", "Sort by who is closest to buying", "Draft a message for each person"],
        draft: "14 follow-up drafts ready, 5 high-priority on top.",
        approved: "Sales sends the first 5 messages today."
      }
    ]
  }
};
const ACCENTS$2 = ["#d97757", "#6a9bcc", "#788c5d"];
const TEXT$1 = ["#b4532f", "#3f6f9f", "#5f7148"];
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduced;
}
const AgentDemo = () => {
  const c = useCopy(COPY$9);
  const [tab, setTab] = useState(0);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const s = c.scenarios[tab];
  const last = s.steps.length + 2;
  const shown = reduced ? last : phase;
  useEffect(() => {
    setPhase(0);
  }, [tab]);
  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setTimeout(() => setPhase((p) => p >= last ? 0 : p + 1), phase >= last ? 3200 : 1100);
    return () => window.clearTimeout(id);
  }, [phase, last, reduced, paused]);
  const accent = ACCENTS$2[tab];
  const label = TEXT$1[tab];
  return /* @__PURE__ */ jsx("section", { id: "agent", className: "py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow", children: c.eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413] max-w-3xl", children: c.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-[#141413]/70", children: c.body }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap gap-2", role: "tablist", "aria-label": c.eyebrow, children: c.scenarios.map((sc, i) => /* @__PURE__ */ jsx(
      "button",
      {
        role: "tab",
        "aria-selected": tab === i,
        onClick: () => setTab(i),
        className: `px-4 py-2 rounded-full font-display text-sm font-semibold border transition-colors ${tab === i ? "bg-[#141413] text-[#faf9f5] border-[#141413]" : "bg-white text-[#141413] border-[#e8e6dc] hover:border-[#141413]"}`,
        children: sc.tab
      },
      sc.tab
    )) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4",
        onMouseEnter: () => setPaused(true),
        onMouseLeave: () => setPaused(false),
        role: "tabpanel",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "card-studio !p-6", children: [
            /* @__PURE__ */ jsx("p", { className: "font-display text-sm font-semibold", style: { color: label }, children: c.labels[0] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl bg-[#faf9f5] border border-[#e8e6dc] p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-display text-xs font-semibold text-[#141413]/60", children: s.inbox.from }),
              /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[15px] text-[#141413]", children: s.inbox.text })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "card-studio !p-6", children: [
            /* @__PURE__ */ jsx("p", { className: "font-display text-sm font-semibold", style: { color: label }, children: c.labels[1] }),
            /* @__PURE__ */ jsx("ol", { className: "mt-4 space-y-2.5", children: s.steps.map((step, i) => {
              const done = shown > i;
              return /* @__PURE__ */ jsxs(
                "li",
                {
                  className: `flex gap-3 text-[15px] transition-opacity duration-300 ${done ? "opacity-100" : "opacity-30"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "mt-1.5 inline-block w-2.5 h-2.5 shrink-0 rounded-full transition-colors duration-300",
                        style: { background: done ? accent : "#e8e6dc" },
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-[#141413]", children: step })
                  ]
                },
                step
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "card-studio !p-6", children: [
            /* @__PURE__ */ jsx("p", { className: "font-display text-sm font-semibold", style: { color: label }, children: c.labels[2] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `mt-4 rounded-xl border p-4 transition-opacity duration-300 ${shown > s.steps.length ? "opacity-100" : "opacity-30"} ${shown >= last ? "border-[#788c5d] bg-[#788c5d]/10" : "border-[#e8e6dc] bg-white"}`,
                children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[15px] text-[#141413]", children: s.draft }),
                  shown >= last ? /* @__PURE__ */ jsxs("p", { className: "mt-3 font-display text-sm font-semibold text-[#5f7148]", children: [
                    "✓ ",
                    s.approved
                  ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", "aria-hidden": "true", children: [
                    /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 rounded-full bg-[#141413] text-[#faf9f5] font-display text-xs font-semibold", children: c.approve }),
                    /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 rounded-full border border-[#b0aea5] font-display text-xs font-semibold text-[#141413]", children: c.edit })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-[#141413]/60", children: c.sent })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-[#141413]/60", children: c.note })
  ] }) });
};
const API_URL = "https://api.kuonstudio.com/v1/chat/completions";
const COPY$8 = {
  id: {
    eyebrow: "Coba AI KuonStudio",
    title: "Tanya apa saja. Kuon mencari bukti dulu, lalu menjawab dengan sumber.",
    body: "Ini chat dengan model Kuon yang kami latih dari nol (13 juta parameter — eksperimental, bukan model raksasa). Agent di belakangnya mencari di Wikipedia dan index lokal, lalu Kuon menyusun jawaban dari bukti itu.",
    placeholder: "Coba: siapa Mr Beast?",
    send: "Kirim",
    thinking: "Kuon sedang mencari bukti…",
    disclaimer: "Model 13M eksperimental — jawaban bisa terbatas. Sumber selalu ditampilkan.",
    error: "Maaf, ada gangguan koneksi ke server Kuon. Coba lagi sebentar.",
    suggestions: ["Siapa Mr Beast?", "Apa itu RAG?", "Apa itu Kuon Studio?"],
    intro: "Halo! Aku Kuon — model kecil yang dibangun dari nol. Tanyakan sesuatu; aku akan mencari bukti dulu, lalu menjawab dari bukti itu dengan sitasi."
  },
  en: {
    eyebrow: "Try KuonStudio AI",
    title: "Ask anything. Kuon gathers evidence first, then answers with sources.",
    body: "This chat runs on Kuon, a model we trained from scratch (13M parameters — experimental, not a giant model). The agent behind it searches Wikipedia and a local index, then Kuon composes the answer from that evidence.",
    placeholder: "Try: who is Mr Beast?",
    send: "Send",
    thinking: "Kuon is gathering evidence…",
    disclaimer: "Experimental 13M model — answers can be limited. Sources are always shown.",
    error: "Sorry, the Kuon server did not respond. Please try again in a moment.",
    suggestions: ["Who is Mr Beast?", "What is RAG?", "What is Kuon Studio?"],
    intro: "Hi! I am Kuon — a small model built from scratch. Ask me something; I will gather evidence first, then answer from it with citations."
  }
};
function KuonChat() {
  const copy = useCopy(COPY$8);
  const [messages, setMessages] = useState([{ role: "assistant", content: copy.intro }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      var _a;
      (_a = scrollRef.current) == null ? void 0 : _a.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };
  const ask = async (question) => {
    var _a, _b, _c;
    const q = question.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setLoading(true);
    scrollToBottom();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "kuon-agent", messages: [{ role: "user", content: q }] })
      });
      const data = await response.json();
      const answer = ((_c = (_b = (_a = data == null ? void 0 : data.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content) ?? copy.error;
      const sources = (data == null ? void 0 : data.x_sources) ?? [];
      setMessages((prev) => [...prev, { role: "assistant", content: answer, sources }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: copy.error }]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };
  return /* @__PURE__ */ jsx("section", { id: "coba-kuon", className: "border-t border-[#e8e6dc] bg-[#faf9f5] px-6 py-20 md:px-10", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3 font-body text-xs uppercase tracking-[0.2em] text-[#d97757]", children: copy.eyebrow }),
      /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl leading-tight text-[#141413] md:text-4xl", children: copy.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-body text-base leading-relaxed text-[#141413]/70", children: copy.body }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-body text-xs text-[#141413]/50", children: copy.disclaimer }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: copy.suggestions.map((s) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => ask(s),
          className: "rounded-full border border-[#e8e6dc] bg-white px-4 py-2 font-body text-sm text-[#141413]/80 transition hover:border-[#d97757] hover:text-[#141413]",
          children: s
        },
        s
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-[32rem] flex-col overflow-hidden rounded-2xl border border-[#e8e6dc] bg-white shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { ref: scrollRef, className: "flex-1 space-y-4 overflow-y-auto p-5", children: [
        messages.map((message, index) => {
          var _a;
          return /* @__PURE__ */ jsx("div", { className: `flex ${message.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: `max-w-[85%] rounded-2xl px-4 py-3 font-body text-sm leading-relaxed ${message.role === "user" ? "bg-[#141413] text-[#faf9f5]" : "bg-[#faf9f5] text-[#141413] ring-1 ring-[#e8e6dc]"}`,
              children: [
                /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap", children: message.content }),
                !!((_a = message.sources) == null ? void 0 : _a.length) && /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-1 border-t border-[#e8e6dc] pt-2", children: message.sources.map((source, sourceIndex) => /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#141413]/50", children: [
                  "[",
                  sourceIndex + 1,
                  "]",
                  " ",
                  source.url ? /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: source.url,
                      target: "_blank",
                      rel: "noreferrer",
                      className: "underline decoration-[#e8e6dc] underline-offset-2 hover:text-[#d97757]",
                      children: source.title
                    }
                  ) : source.title
                ] }, sourceIndex)) })
              ]
            }
          ) }, index);
        }),
        loading && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-[#faf9f5] px-4 py-3 font-body text-sm text-[#141413]/50 ring-1 ring-[#e8e6dc]", children: copy.thinking }) })
      ] }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          className: "flex items-center gap-2 border-t border-[#e8e6dc] p-3",
          onSubmit: (event) => {
            event.preventDefault();
            ask(input);
          },
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                value: input,
                onChange: (event) => setInput(event.target.value),
                placeholder: copy.placeholder,
                disabled: loading,
                className: "h-11 flex-1 rounded-full border border-[#e8e6dc] bg-[#faf9f5] px-4 font-body text-sm text-[#141413] outline-none transition focus:border-[#d97757]"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: loading || !input.trim(),
                className: "h-11 rounded-full bg-[#141413] px-6 font-body text-sm text-[#faf9f5] transition hover:bg-[#141413]/90 disabled:opacity-40",
                children: copy.send
              }
            )
          ]
        }
      )
    ] })
  ] }) }) });
}
const ACCENTS$1 = ["#d97757", "#6a9bcc", "#788c5d", "#141413"];
const COPY$7 = {
  id: {
    eyebrow: "Layanan",
    title: "Empat cara kami membantu bisnismu pindah ke AI.",
    body: "Pilih satu. Setiap proyek selesai dengan kode, dokumentasi, dan sesi serah terima.",
    services: [
      {
        title: "AI agent untuk operasional",
        summary: "Agent yang mengerjakan alur kerja berulang, dengan staf yang menyetujui.",
        includes: ["Balas pesanan, booking, dan pertanyaan pelanggan", "Rekap harian dan laporan dari data yang ada", "Semua tindakan menunggu persetujuan dan tercatat"],
        fit: "Cocok kalau timmu mengetik hal yang sama setiap hari."
      },
      {
        title: "Asisten dari dokumenmu sendiri",
        summary: "Tanya-jawab yang menjawab dari SOP, katalog, dan kontrak milikmu, lengkap dengan rujukan.",
        includes: ["Jawaban menunjuk dokumen sumbernya", "Hanya membaca dokumen yang kamu izinkan", 'Bilang "tidak tahu" kalau jawabannya tidak ada'],
        fit: "Cocok kalau pertanyaan staf baru selalu jatuh ke orang yang sama."
      },
      {
        title: "Rapikan data dulu",
        summary: "Agent butuh data yang rapi. Pesanan, stok, dan pelanggan dijadikan satu sumber.",
        includes: ["Pindah dari spreadsheet ke satu sistem", "Backup otomatis setiap hari", "Hak akses per peran"],
        fit: "Cocok kalau datamu masih tersebar di chat dan spreadsheet."
      },
      {
        title: "Tambah AI ke sistem yang sudah ada",
        summary: "Sistemmu sudah jalan, tinggal diberi kemampuan AI tanpa dibongkar ulang.",
        includes: ["Audit singkat: bagian mana yang layak diotomasi", "Integrasi lewat API yang sudah ada", "Perkiraan biaya AI per bulan sebelum dibangun"],
        fit: "Cocok kalau kamu tidak mau ganti sistem, hanya mau lebih cepat."
      }
    ]
  },
  en: {
    eyebrow: "Services",
    title: "Four ways we help your business move to AI.",
    body: "Pick one. Every engagement ends with code, docs, and a handover session.",
    services: [
      {
        title: "AI agents for operations",
        summary: "Agents that run repetitive workflows, with staff approving.",
        includes: ["Replies to orders, bookings, and customer questions", "Daily recaps and reports from your existing data", "Every action waits for approval and is logged"],
        fit: "Good if your team types the same things every day."
      },
      {
        title: "Assistant built on your documents",
        summary: "Q&A that answers from your own SOPs, catalog, and contracts, with references.",
        includes: ["Answers point to the source document", "Reads only the documents you allow", 'Says "I don’t know" when the answer is not there'],
        fit: "Good if new-staff questions always land on the same person."
      },
      {
        title: "Clean up the data first",
        summary: "Agents need tidy data. Orders, stock, and customers in one source.",
        includes: ["Move from spreadsheets to one system", "Automatic daily backups", "Access levels per role"],
        fit: "Good if your data still lives in chats and spreadsheets."
      },
      {
        title: "Add AI to what you already run",
        summary: "Your system works; give it AI abilities without rebuilding it.",
        includes: ["Short audit: which parts are worth automating", "Integration through your existing APIs", "Estimated monthly AI cost before we build"],
        fit: "Good if you want speed, not a new system."
      }
    ]
  }
};
const LabsSection = () => {
  const c = useCopy(COPY$7);
  return /* @__PURE__ */ jsx("section", { id: "services", className: "py-16 md:py-24 bg-white border-y border-[#e8e6dc]", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow", children: c.eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]", children: c.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-[#141413]/70", children: c.body }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-1 md:grid-cols-2 gap-5", children: c.services.map((service, i) => /* @__PURE__ */ jsxs("article", { className: "card-studio", children: [
      /* @__PURE__ */ jsx("div", { className: "card-accent", style: { background: ACCENTS$1[i] }, "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("h3", { className: "font-display font-semibold text-xl text-[#141413]", children: service.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-[#141413]/70", children: service.summary }),
      /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-2.5", children: service.includes.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-[#141413]", children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: { color: ACCENTS$1[i] }, children: "—" }),
        /* @__PURE__ */ jsx("span", { children: item })
      ] }, item)) }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 pt-4 border-t border-[#e8e6dc] text-[15px] text-[#141413]/60", children: service.fit })
    ] }, service.title)) })
  ] }) });
};
const ACCENTS = ["#d97757", "#6a9bcc", "#788c5d", "#141413"];
const TEXT = ["#b4532f", "#3f6f9f", "#5f7148", "#5f5e58"];
const COPY$6 = {
  id: {
    eyebrow: "Contoh per jenis usaha",
    title: "Apa yang diambil alih agent, apa yang tetap dipegang manusia.",
    agent: "Agent mengerjakan",
    human: "Timmu tetap",
    cases: [
      {
        name: "F&B dan toko online",
        agent: "Membaca pesanan dari WhatsApp dan marketplace, cek stok, menyiapkan balasan dan rekap harian.",
        human: "Menyetujui balasan, menangani komplain, menentukan promo."
      },
      {
        name: "Klinik, salon, dan jasa booking",
        agent: "Mencari slot kosong, menyiapkan konfirmasi dan pengingat, merapikan catatan kunjungan.",
        human: "Keputusan medis atau layanan, kasus khusus, jadwal staf."
      },
      {
        name: "Distributor dan grosir",
        agent: "Membaca PO dan invoice dari PDF atau foto, mengisi ke sistem, menandai yang tidak cocok.",
        human: "Memeriksa selisih, harga khusus, dan kredit pelanggan."
      },
      {
        name: "Agensi dan tim sales",
        agent: "Riset calon klien, skor kecocokan, menyusun draf pesan pertama dan follow-up.",
        human: "Memilih siapa yang dihubungi, negosiasi, menutup deal."
      }
    ]
  },
  en: {
    eyebrow: "Use cases",
    title: "What the agent takes over, and what stays with people.",
    agent: "The agent does",
    human: "Your team keeps",
    cases: [
      {
        name: "F&B and online shops",
        agent: "Reads orders from WhatsApp and marketplaces, checks stock, prepares replies and a daily recap.",
        human: "Approving replies, handling complaints, deciding promotions."
      },
      {
        name: "Clinics, salons, and booking services",
        agent: "Finds open slots, prepares confirmations and reminders, tidies visit notes.",
        human: "Medical or service decisions, special cases, staff schedules."
      },
      {
        name: "Distributors and wholesale",
        agent: "Reads POs and invoices from PDFs or photos, enters them into your system, flags mismatches.",
        human: "Checking discrepancies, special prices, and customer credit."
      },
      {
        name: "Agencies and sales teams",
        agent: "Researches prospects, scores fit, drafts first messages and follow-ups.",
        human: "Choosing who to contact, negotiating, closing."
      }
    ]
  }
};
const UseCasesSection = () => {
  const c = useCopy(COPY$6);
  return /* @__PURE__ */ jsx("section", { id: "use-cases", className: "py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow", children: c.eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413] max-w-3xl", children: c.title }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-1 md:grid-cols-2 gap-5", children: c.cases.map((u, i) => /* @__PURE__ */ jsxs("article", { className: "card-studio", children: [
      /* @__PURE__ */ jsx("div", { className: "card-accent", style: { background: ACCENTS[i] }, "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("h3", { className: "font-display font-semibold text-xl text-[#141413]", children: u.name }),
      /* @__PURE__ */ jsxs("dl", { className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { className: "font-display text-sm font-semibold", style: { color: TEXT[i] }, children: c.agent }),
          /* @__PURE__ */ jsx("dd", { className: "mt-1 text-[#141413]", children: u.agent })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-[#e8e6dc]", children: [
          /* @__PURE__ */ jsx("dt", { className: "font-display text-sm font-semibold text-[#141413]/60", children: c.human }),
          /* @__PURE__ */ jsx("dd", { className: "mt-1 text-[#141413]/70", children: u.human })
        ] })
      ] })
    ] }, u.name)) })
  ] }) });
};
const COPY$5 = {
  id: {
    eyebrow: "Cek kesiapan AI",
    title: "Lima pertanyaan, satu menit. Lihat dari mana sebaiknya mulai.",
    body: "Tidak ada jawaban benar atau salah. Hasilnya saran jujur, termasuk kalau AI belum perlu.",
    questions: [
      { q: "Berapa jam sehari timmu habiskan untuk membalas, merekap, atau mengetik ulang hal yang sama?", options: ["Kurang dari 1 jam", "1 sampai 3 jam", "Lebih dari 3 jam"] },
      { q: "Data pesanan, stok, atau pelanggan saat ini ada di mana?", options: ["Chat dan kertas", "Spreadsheet", "Sudah di aplikasi atau sistem"] },
      { q: "Apakah ada aturan atau SOP tertulis untuk pekerjaan itu?", options: ["Belum ada", "Sebagian", "Ada dan dipakai"] },
      { q: "Siapa yang bisa memeriksa dan menyetujui hasil agent setiap hari?", options: ["Belum ada", "Pemilik sendiri", "Ada staf yang ditugaskan"] },
      { q: "Seberapa sering pekerjaan berulang itu terjadi?", options: ["Beberapa kali seminggu", "Setiap hari", "Setiap jam"] }
    ],
    answered: (n, total) => `${n} dari ${total} terjawab`,
    tiers: [
      { title: "Rapikan data dulu", text: "AI belum memberi hasil besar kalau datanya masih di chat dan kertas. Langkah pertama yang lebih masuk akal: satu sistem sederhana untuk pesanan dan pelanggan, dan SOP singkat.", next: "Kami bisa bantu merapikan dulu, lalu agent menyusul." },
      { title: "Siap untuk pilot", text: "Ada pekerjaan berulang yang cukup sering dan data yang bisa dibaca. Pilot 2 minggu untuk satu alur kerja paling masuk akal di sini.", next: "Kirim hasil ini, kami bantu pilih alur kerja pertamanya." },
      { title: "Siap untuk beberapa agent", text: "Pekerjaan berulangnya banyak, datanya sudah di sistem, dan ada yang menyetujui. Mulai dari alur yang paling mahal waktunya, lalu tambah satu per satu.", next: "Kirim hasil ini, kami susun urutan agent yang paling menguntungkan." }
    ],
    send: "Kirim hasil ke WhatsApp",
    reset: "Ulangi",
    waIntro: "Halo Kuon Studio, ini hasil cek kesiapan AI bisnis saya:",
    waResult: "Hasil",
    note: "Jawabanmu tidak disimpan di situs ini. Hanya terkirim kalau kamu menekan tombol WhatsApp."
  },
  en: {
    eyebrow: "AI readiness check",
    title: "Five questions, one minute. See where to start.",
    body: "No right or wrong answers. You get an honest suggestion, including when AI is not needed yet.",
    questions: [
      { q: "How many hours a day does your team spend replying, recapping, or retyping the same things?", options: ["Under 1 hour", "1 to 3 hours", "Over 3 hours"] },
      { q: "Where do your orders, stock, or customer records live today?", options: ["Chats and paper", "Spreadsheets", "Already in an app or system"] },
      { q: "Is there a written rule or SOP for that work?", options: ["Not yet", "Partly", "Yes, and it is used"] },
      { q: "Who can review and approve the agent’s work every day?", options: ["No one yet", "The owner", "An assigned staff member"] },
      { q: "How often does that repetitive work happen?", options: ["A few times a week", "Every day", "Every hour"] }
    ],
    answered: (n, total) => `${n} of ${total} answered`,
    tiers: [
      { title: "Tidy the data first", text: "AI will not do much while data lives in chats and paper. A better first step: one simple system for orders and customers, plus a short SOP.", next: "We can help tidy up first, then add agents." },
      { title: "Ready for a pilot", text: "You have repetitive work that happens often and data an agent can read. A 2-week pilot on one workflow makes the most sense.", next: "Send this result and we will help pick the first workflow." },
      { title: "Ready for several agents", text: "Lots of repetitive work, data already in a system, and someone to approve. Start with the workflow that costs the most time, then add one at a time.", next: "Send this result and we will map the most valuable order of agents." }
    ],
    send: "Send result on WhatsApp",
    reset: "Start over",
    waIntro: "Hi Kuon Studio, here is my AI readiness check:",
    waResult: "Result",
    note: "Your answers are not stored on this site. They are only sent if you tap the WhatsApp button."
  }
};
const ReadinessQuiz = () => {
  const c = useCopy(COPY$5);
  const [answers, setAnswers] = useState(() => c.questions.map(() => null));
  const done = answers.filter((a) => a !== null).length;
  const complete = done === c.questions.length;
  const score = answers.reduce((sum, a) => sum + (a ?? 0), 0);
  const blocked = answers[1] === 0 || answers[3] === 0;
  const tier = blocked || score <= 4 ? 0 : score <= 7 ? 1 : 2;
  const result = c.tiers[tier];
  const message = [
    c.waIntro,
    ...c.questions.map((q, i) => `- ${q.q} ${answers[i] !== null ? q.options[answers[i]] : "-"}`),
    `${c.waResult}: ${result.title}`
  ].join("\n");
  return /* @__PURE__ */ jsx("section", { id: "readiness", className: "py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow", children: c.eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413] max-w-3xl", children: c.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-[#141413]/70", children: c.body }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start", children: [
      /* @__PURE__ */ jsx("ol", { className: "space-y-4", children: c.questions.map((q, i) => /* @__PURE__ */ jsx("li", { className: "card-studio !p-6", children: /* @__PURE__ */ jsxs("fieldset", { children: [
        /* @__PURE__ */ jsxs("legend", { className: "font-display font-semibold text-[#141413]", children: [
          i + 1,
          ". ",
          q.q
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: q.options.map((opt, j) => {
          const on = answers[i] === j;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-pressed": on,
              onClick: () => setAnswers((a) => a.map((x, k) => k === i ? j : x)),
              className: `px-4 py-2 rounded-full border font-display text-sm font-semibold transition-colors ${on ? "bg-[#141413] text-[#faf9f5] border-[#141413]" : "bg-white text-[#141413] border-[#e8e6dc] hover:border-[#141413]"}`,
              children: opt
            },
            opt
          );
        }) })
      ] }) }, q.q)) }),
      /* @__PURE__ */ jsxs("aside", { className: "lg:sticky lg:top-24 card-studio !p-7", "aria-live": "polite", children: [
        complete ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-sm font-semibold text-[#b4532f]", children: c.waResult }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 font-display font-bold text-2xl text-[#141413]", children: result.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-[#141413]/70", children: result.text }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-[#141413]", children: result.next }),
          /* @__PURE__ */ jsx("a", { href: waLink(message), target: "_blank", rel: "noopener noreferrer", className: "btn-primary mt-6 w-full", children: c.send }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setAnswers(c.questions.map(() => null)),
              className: "mt-3 w-full font-display text-sm font-semibold text-[#141413]/70 hover:text-[#141413]",
              children: c.reset
            }
          )
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "font-display font-semibold text-[#141413]", children: c.answered(done, c.questions.length) }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 h-2 rounded-full bg-[#e8e6dc] overflow-hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#d97757] transition-all duration-300", style: { width: `${done / c.questions.length * 100}%` } }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm text-[#141413]/60", children: c.note })
      ] })
    ] })
  ] }) });
};
const COPY$4 = {
  id: {
    eyebrow: "Karya",
    title: "Agent yang kami pakai dan jalankan sendiri.",
    body: "Masih berjalan sekarang. Buka dan coba sendiri.",
    live: "Live",
    visit: "Buka aplikasi",
    products: [
      {
        name: "Selisik",
        accent: "#d97757",
        tagline: "Agent pencari klien untuk freelancer dan tim sales",
        img: "/selisik-pipeline.png",
        alt: "Halaman Pipeline Selisik: delapan calon klien contoh dengan status dan skor 1–10",
        caption: "Tampilan aplikasi dengan data contoh fiktif.",
        imgClass: "w-full",
        body: 'Tulis tujuan seperti "kafe di Bandung yang butuh sistem pemesanan". Selisik menelusuri situs bisnis di Indonesia, menilai tiap target 1–10 lewat lensa profesimu, lalu menyiapkan apa yang bisa kamu tawarkan beserta draf pesan pembukanya.',
        points: [
          "Mode Otomatis: AI menyusun 2–4 kueri dari tujuanmu dan kamu setujui dulu. Pencarian dan analisis per calon klien baru berjalan setelah disetujui, dengan perkiraan biaya di atas tombol.",
          "Sembilan profesi bawaan, dari software engineer sampai fotografer produk, plus profesi sendiri. Profesi menentukan apa yang dihitung sebagai peluang, harga, dan buktinya; untuk kreator dan desainer, Instagram ikut ditelusuri.",
          "Sumber kedua yang bisa dinyalakan: lowongan kerja. Perusahaan yang memasang lowongan sudah terbukti punya anggaran.",
          "Pesan pembuka maksimal 60 kata dan ditutup satu pertanyaan ya/tidak. Follow-up hari ke-3 dan ke-7 sudah disiapkan, dengan pengingat.",
          "Nomor dan email hanya muncul kalau tertulis di halaman sumber, termasuk halaman Kontak. Status: baru, dihubungi, dibalas, deal, mati; pindai ulang tidak menimpa catatanmu."
        ],
        url: "https://selisik.kuonstudio.com",
        host: "selisik.kuonstudio.com · masuk dengan kode email, tanpa kata sandi."
      },
      {
        name: "Cadence",
        accent: "#6a9bcc",
        tagline: "Agent ide dan naskah konten untuk akun media sosial",
        img: "/cadence-ide.png",
        alt: "Halaman Buat konten di Cadence dengan tab Carikan ide, topik akun sebagai pilihan cepat, dan daftar ide terakhir",
        caption: "",
        imgClass: "w-full",
        body: "Cadence membaca apa yang sedang dicari orang dan berita terbaru, lalu menawarkan ide konten yang cocok dengan profil akunmu. Ide yang dipilih diubah jadi naskah per adegan, siap diproduksi.",
        points: [
          "Setiap ide menautkan sumbernya. Ide tanpa sumber yang bisa dicek dibuang, begitu juga yang menyentuh topik terlarang akunmu.",
          "Profil per akun: penonton, pilar konten dan rotasinya, target posting per hari, dan contoh tulisan asli supaya gaya bicaranya mirip.",
          "Naskah dicek dari ungkapan khas tulisan AI, dan belajar dari baris yang kamu ubah sebelum dipakai."
        ],
        url: "https://cadence.kuonstudio.com",
        host: "cadence.kuonstudio.com · masuk dengan kode email 6 digit."
      }
    ]
  },
  en: {
    eyebrow: "Work",
    title: "Agents we build and run ourselves.",
    body: "Running now. Open them and click around.",
    live: "Live",
    visit: "Visit live app",
    products: [
      {
        name: "Selisik",
        accent: "#d97757",
        tagline: "Client-finding agent for freelancers and sales teams",
        img: "/selisik-pipeline.png",
        alt: "Selisik Pipeline page: eight sample leads with status and a 1–10 score",
        caption: "App screenshot with fictional sample data.",
        imgClass: "w-full",
        body: 'Type a goal such as "cafes in Bandung that need an ordering system". Selisik searches Indonesian business sites, scores each target 1–10 through the lens of your profession, then prepares what you can offer and a draft opening message.',
        points: [
          "Automatic mode: the AI turns your goal into 2–4 queries for you to approve first. Search and per-lead analysis only run after approval, with the cost estimate above the button.",
          "Nine built-in professions, from software engineer to product photographer, plus your own. The profession decides what counts as an opportunity, the price, and the evidence; for creators and designers, Instagram is searched too.",
          "An optional second source: job listings. A company that posts a job has already shown it has budget.",
          "Opening messages stay under 60 words and end with one yes/no question. Day-3 and day-7 follow-ups are prepared, with reminders.",
          "Phone numbers and emails only appear if they are written on the source page, including the Contact page. Statuses: new, contacted, replied, deal, dead; rescans never overwrite your notes."
        ],
        url: "https://selisik.kuonstudio.com",
        host: "selisik.kuonstudio.com · Indonesian UI, sign in with an email code."
      },
      {
        name: "Cadence",
        accent: "#6a9bcc",
        tagline: "Content idea and script agent for social accounts",
        img: "/cadence-ide.png",
        alt: "Cadence content page with the idea-search tab, account topics as quick picks, and the latest idea list",
        caption: "",
        imgClass: "w-full",
        body: "Cadence reads what people are searching for and recent news, then offers content ideas that fit your account profile. A chosen idea becomes a scene-by-scene script, ready for production.",
        points: [
          "Every idea links its sources. Ideas without checkable sources are dropped, and so are ideas that touch your banned topics.",
          "One profile per account: audience, content pillars and rotation, daily posting target, and real writing samples so the voice matches.",
          "Scripts are checked for tell-tale AI phrasing, and learn from the lines you edit before use."
        ],
        url: "https://cadence.kuonstudio.com",
        host: "cadence.kuonstudio.com · Indonesian UI, sign in with a 6-digit email code."
      }
    ]
  }
};
const WorkSection = () => {
  const c = useCopy(COPY$4);
  return /* @__PURE__ */ jsx("section", { id: "work", className: "py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow", children: c.eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]", children: c.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-[#141413]/70", children: c.body }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-1 gap-6", children: c.products.map((p) => /* @__PURE__ */ jsxs("article", { className: "card-studio", children: [
      /* @__PURE__ */ jsx("div", { className: "card-accent", style: { background: p.accent }, "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display font-semibold text-xl text-[#141413]", children: p.name }),
        /* @__PURE__ */ jsx("span", { className: "font-display text-xs font-semibold px-3 py-1 rounded-full bg-[#788c5d]/15 text-[#5f7148]", children: c.live })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 font-display text-[15px] text-[#141413]/60", children: p.tagline }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 w-full rounded-xl border border-[#e8e6dc] overflow-hidden bg-[#FAF8F5]", children: /* @__PURE__ */ jsx("img", { src: p.img, alt: p.alt, loading: "lazy", className: p.imgClass }) }),
      p.caption && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[#141413]/60", children: p.caption }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-[#141413]/70", children: p.body }),
      /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-2.5", children: p.points.map((pt) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-[#141413]", children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: { color: p.accent }, children: "—" }),
        /* @__PURE__ */ jsx("span", { children: pt })
      ] }, pt)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-[#e8e6dc] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: p.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "font-display font-semibold text-[#141413] hover:text-[#d97757] transition-colors",
            children: [
              c.visit,
              " →"
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-[15px] text-[#141413]/60", children: p.host })
      ] })
    ] }, p.name)) })
  ] }) });
};
const COPY$3 = {
  id: {
    eyebrow: "Mulai kecil",
    title: "Pilot AI 2 minggu: satu alur kerja, hasilnya diukur.",
    body: "Tidak perlu langsung mengubah semuanya. Kita pilih satu pekerjaan berulang, bangun agent-nya, dan ukur hasilnya di lapangan sebelum memutuskan langkah berikutnya.",
    steps: [
      { period: "Minggu 1", title: "Scope bersama", text: "Dua panggilan dan dokumen singkat: alur yang dipilih, data yang dibutuhkan, batas yang tidak boleh dilewati agent, dan cara mengukur hasil. Kamu dapat scope dan harga tetap." },
      { period: "Minggu 2", title: "Agent dipakai tim", text: "Agent jalan di alat yang sudah kamu pakai, dengan tombol setuju/ubah. Kami pantau bersama timmu dan perbaiki setiap hari." },
      { period: "Akhir pilot", title: "Ukur, lalu putuskan", text: "Laporan sebelum-sesudah dari data pilot: waktu yang dihemat, kesalahan, dan biaya AI per bulan. Lanjut, ubah, atau berhenti, keputusannya di kamu." }
    ],
    price: "Harga tetap setelah scope. Tidak ada tagihan yang membengkak di tengah jalan.",
    trustTitle: "Aman dipakai untuk bisnis",
    trust: [
      { title: "Manusia yang menyetujui", text: "Agent tidak mengirim, membayar, atau menghapus apa pun tanpa persetujuan staf." },
      { title: "Jejak lengkap", text: "Setiap langkah agent tercatat: apa yang dibaca, apa yang diusulkan, siapa yang menyetujui." },
      { title: "Data tetap milikmu", text: "Data disimpan di akunmu. Kami memakai layanan AI yang kebijakannya tidak melatih model dari data API, dan menunjukkan kebijakan itu saat scope." },
      { title: "Biaya terbuka", text: "Perkiraan biaya AI per bulan diberikan sebelum dibangun, lalu dipantau di dashboard." }
    ]
  },
  en: {
    eyebrow: "Start small",
    title: "A 2-week AI pilot: one workflow, measured results.",
    body: "No need to change everything at once. We pick one repetitive task, build the agent, and measure it in real use before you decide the next step.",
    steps: [
      { period: "Week 1", title: "Scope together", text: "Two calls and a short doc: the workflow, the data it needs, the limits the agent must not cross, and how we measure results. You get a fixed scope and price." },
      { period: "Week 2", title: "Your team uses it", text: "The agent runs in the tools you already use, with approve/edit buttons. We watch it with your team and improve it daily." },
      { period: "End of pilot", title: "Measure, then decide", text: "A before-and-after report from pilot data: time saved, errors, and monthly AI cost. Continue, adjust, or stop, the call is yours." }
    ],
    price: "Fixed price after scoping. No bills that grow halfway through.",
    trustTitle: "Safe to use in a business",
    trust: [
      { title: "Humans approve", text: "The agent does not send, pay, or delete anything without staff approval." },
      { title: "Full trail", text: "Every agent step is logged: what it read, what it proposed, who approved it." },
      { title: "Your data stays yours", text: "Data lives in your accounts. We use AI services whose policies exclude API data from model training, and show you those policies during scoping." },
      { title: "Open costs", text: "Estimated monthly AI cost before we build, then tracked on a dashboard." }
    ]
  }
};
const PilotSection = () => {
  const c = useCopy(COPY$3);
  return /* @__PURE__ */ jsx("section", { id: "process", className: "py-16 md:py-24 bg-white border-y border-[#e8e6dc]", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow", children: c.eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413] max-w-3xl", children: c.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-[#141413]/70", children: c.body }),
    /* @__PURE__ */ jsx("ol", { className: "mt-10 grid grid-cols-1 md:grid-cols-3 gap-5", children: c.steps.map((step, index) => /* @__PURE__ */ jsxs("li", { className: "card-studio", children: [
      /* @__PURE__ */ jsxs("p", { className: "font-display font-semibold text-sm text-[#b4532f]", children: [
        index + 1,
        ". ",
        step.period
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mt-2 font-display font-semibold text-lg text-[#141413]", children: step.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-[#141413]/70", children: step.text })
    ] }, step.title)) }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 font-display font-semibold text-[#141413]", children: c.price }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 bg-[#e8e6dc]/50 border border-[#e8e6dc] rounded-2xl p-7 md:p-10", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display font-semibold text-xl text-[#141413]", children: c.trustTitle }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: c.trust.map((item) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-display font-semibold text-[#141413]", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[#141413]/70", children: item.text })
      ] }, item.title)) })
    ] })
  ] }) });
};
const COPY$2 = {
  id: {
    eyebrow: "Kontak",
    title: "Ceritakan pekerjaan yang mau kamu serahkan ke AI.",
    body: "Cukup 3–5 kalimat: pekerjaan apa, siapa yang mengerjakan sekarang, dan pakai alat apa. Kami balas dalam 2 hari kerja dengan langkah berikutnya, atau jawaban jujur kalau belum cocok.",
    wa: "Chat WhatsApp",
    waText: "Halo Kuon Studio, saya mau diskusi soal AI untuk bisnis saya.",
    list: [`WhatsApp: ${WHATSAPP_DISPLAY}`, `Email: ${EMAIL}`, "Berbasis di Jakarta, bekerja jarak jauh untuk seluruh Indonesia.", "Harga tetap setelah scope."],
    name: "Nama",
    namePh: "Nama kamu",
    email: "Email kerja",
    emailHint: "Hanya dipakai untuk membalas.",
    details: "Pekerjaan yang mau diotomasi",
    detailsPh: "Contoh: setiap hari kami membalas 50 chat pesanan dan merekapnya ke spreadsheet.",
    send: "Kirim lewat email",
    sendHint: `Membuka aplikasi email ke ${EMAIL}.`,
    subject: (n) => `Pertanyaan proyek dari ${n}`
  },
  en: {
    eyebrow: "Contact",
    title: "Tell us which work you want to hand to AI.",
    body: "Send 3–5 sentences: what the work is, who does it now, and which tools you use. We reply within 2 business days with next steps, or an honest no.",
    wa: "Chat on WhatsApp",
    waText: "Hi Kuon Studio, I would like to discuss AI for my business.",
    list: [`WhatsApp: ${WHATSAPP_DISPLAY}`, `Email: ${EMAIL}`, "Based in Jakarta, working remotely across Indonesia.", "Fixed price after scoping."],
    name: "Your name",
    namePh: "Name",
    email: "Work email",
    emailHint: "Only used to reply to you.",
    details: "Work you want to automate",
    detailsPh: "Example: every day we answer 50 order chats and copy them into a spreadsheet.",
    send: "Send by email",
    sendHint: `Opens your email app addressed to ${EMAIL}.`,
    subject: (n) => `Project inquiry from ${n}`
  }
};
const AccessSection = () => {
  const c = useCopy(COPY$2);
  const [formData, setFormData] = useState({ name: "", email: "", details: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(c.subject(formData.name));
    const body = encodeURIComponent(`${c.name}: ${formData.name}
Email: ${formData.email}

${c.details}:
${formData.details}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-16 md:py-24 bg-white border-t border-[#e8e6dc]", children: /* @__PURE__ */ jsxs("div", { className: "wrap grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: c.eyebrow }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]", children: c.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-[#141413]/70", children: c.body }),
      /* @__PURE__ */ jsx("a", { href: waLink(c.waText), target: "_blank", rel: "noopener noreferrer", className: "btn-primary mt-6", children: c.wa }),
      /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-2 text-[#141413]/70", children: c.list.map((item) => /* @__PURE__ */ jsxs("li", { children: [
        "— ",
        item
      ] }, item)) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-[#faf9f5] border border-[#e8e6dc] rounded-2xl p-6 md:p-8 space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block font-display font-semibold text-[15px] text-[#141413] mb-2", children: c.name }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "name",
            type: "text",
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value }),
            required: true,
            autoComplete: "name",
            className: "field",
            placeholder: c.namePh
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block font-display font-semibold text-[15px] text-[#141413] mb-2", children: c.email }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "email",
            type: "email",
            value: formData.email,
            onChange: (e) => setFormData({ ...formData, email: e.target.value }),
            required: true,
            autoComplete: "email",
            className: "field",
            placeholder: "you@company.com"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-[#141413]/60", children: c.emailHint })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "details", className: "block font-display font-semibold text-[15px] text-[#141413] mb-2", children: c.details }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "details",
            value: formData.details,
            onChange: (e) => setFormData({ ...formData, details: e.target.value }),
            required: true,
            rows: 5,
            className: "field resize-y",
            placeholder: c.detailsPh
          }
        )
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "btn-secondary w-full", children: c.send }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#141413]/60", children: c.sendHint })
    ] })
  ] }) });
};
const COPY$1 = {
  id: {
    about: "Software studio di Jakarta. AI agent dan sistem untuk kerjaan harian bisnis, dengan manusia yang menyetujui.",
    wa: "Halo Kuon Studio, saya mau tanya.",
    base: "© 2026 Kuon Studio. Jakarta, Indonesia.",
    promise: "Dokumentasi, tes, dan serah terima di setiap proyek."
  },
  en: {
    about: "Software studio in Jakarta. AI agents and systems for daily business work, with people approving.",
    wa: "Hi Kuon Studio, I have a question.",
    base: "© 2026 Kuon Studio. Jakarta, Indonesia.",
    promise: "Docs, tests, and handover included in every project."
  }
};
const Footer = () => {
  const c = useCopy(COPY$1);
  const link = "text-[#faf9f5]/80 hover:text-[#d97757] transition-colors";
  return /* @__PURE__ */ jsx("footer", { className: "bg-[#141413] text-[#faf9f5] py-14 md:py-16", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-start justify-between gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-display font-bold text-xl", children: "Kuon Studio" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-[#faf9f5]/70 max-w-md", children: c.about })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap gap-x-8 gap-y-4", "aria-label": "Footer", children: [
        /* @__PURE__ */ jsx("a", { href: waLink(c.wa), target: "_blank", rel: "noopener noreferrer", className: link, children: "WhatsApp" }),
        /* @__PURE__ */ jsx("a", { href: `mailto:${EMAIL}`, className: link, children: "Email" }),
        /* @__PURE__ */ jsx("a", { href: "https://github.com/KuonStudio", target: "_blank", rel: "noopener noreferrer", className: link, children: "GitHub" }),
        /* @__PURE__ */ jsx("a", { href: "https://linkedin.com/company/kuonstudio", target: "_blank", rel: "noopener noreferrer", className: link, children: "LinkedIn" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 pt-6 border-t border-[#faf9f5]/15 flex flex-col sm:flex-row justify-between gap-2 text-[15px] text-[#faf9f5]/60", children: [
      /* @__PURE__ */ jsx("p", { children: c.base }),
      /* @__PURE__ */ jsx("p", { children: c.promise })
    ] })
  ] }) });
};
const COPY = {
  id: { label: "Chat WhatsApp", text: "Halo Kuon Studio, saya mau tanya soal AI untuk bisnis saya." },
  en: { label: "WhatsApp us", text: "Hi Kuon Studio, I would like to ask about AI for my business." }
};
const WhatsAppFloat = () => {
  const c = useCopy(COPY);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: waLink(c.text),
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": c.label,
      className: `fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#141413] text-[#faf9f5] pl-3 pr-4 py-3 font-display text-sm font-semibold shadow-lg transition-all duration-200 hover:bg-[#d97757] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`,
      children: [
        /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "w-5 h-5", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" }) }),
        c.label
      ]
    }
  );
};
const SKIP = { id: "Langsung ke isi", en: "Skip to content" };
const Page = () => {
  const skip = useCopy(SKIP);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen bg-[#faf9f5] text-[#141413]", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#agent",
        className: "sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-[#141413] focus:text-[#faf9f5] focus:px-4 focus:py-2 focus:rounded-full",
        children: skip
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(HeroSection, {}),
      /* @__PURE__ */ jsx(AgentDemo, {}),
      /* @__PURE__ */ jsx(KuonChat, {}),
      /* @__PURE__ */ jsx(LabsSection, {}),
      /* @__PURE__ */ jsx(UseCasesSection, {}),
      /* @__PURE__ */ jsx(ReadinessQuiz, {}),
      /* @__PURE__ */ jsx(WorkSection, {}),
      /* @__PURE__ */ jsx(PilotSection, {}),
      /* @__PURE__ */ jsx(AccessSection, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
};
const Index = () => /* @__PURE__ */ jsx(LangProvider, { children: /* @__PURE__ */ jsx(Page, {}) });
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404: attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#faf9f5]", children: /* @__PURE__ */ jsxs("div", { className: "text-center px-6", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Page not found" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display font-bold text-4xl text-[#141413]", children: "This page does not exist." }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "btn-primary mt-8", children: "Back to home" })
  ] }) });
};
function render(url) {
  const queryClient = new QueryClient();
  return renderToString(
    /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
    ] }) }) }) })
  );
}
export {
  render
};
