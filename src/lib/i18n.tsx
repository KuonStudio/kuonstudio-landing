import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'id' | 'en';

const KEY = 'kuon_lang';

const META: Record<Lang, { title: string; description: string }> = {
  id: {
    title: 'Kuon Studio — AI agent untuk penjualan, layanan pelanggan, dan operasional',
    description:
      'Software studio di Jakarta. Kami membuat AI agent untuk kerjaan berulang di bisnis, dengan staf yang menyetujui setiap langkah. Kuon AI, model bahasa buatan kami, bisa dicoba langsung.',
  },
  en: {
    title: 'Kuon Studio — AI agents for sales, customer service and operations',
    description:
      'Software studio in Jakarta. We build AI agents for repetitive business work, with staff approving every step. Kuon AI, our own language model, is free to try.',
  },
};

/** ?lang=en wins, then the saved choice; Indonesian by default. */
function initialLang(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'id') return q;
    const saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'id') return saved;
  } catch {
    /* storage can be blocked; fall through */
  }
  return 'id';
}

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'id', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = META[lang].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', META[lang].description);
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Pick the copy for the current language: const c = useCopy(COPY). */
export function useCopy<T>(copy: Record<Lang, T>): T {
  return copy[useLang().lang];
}
