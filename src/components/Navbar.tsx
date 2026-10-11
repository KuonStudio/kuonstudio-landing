import { useState, useEffect } from 'react';
import { useLang, useCopy } from '@/lib/i18n';

const COPY = {
  id: {
    links: [
      { label: 'Cara kerja agent', href: '#agent' },
      { label: 'Layanan', href: '#services' },
      { label: 'Contoh', href: '#use-cases' },
      { label: 'Karya', href: '#work' },
      { label: 'Kontak', href: '#contact' },
    ],
    cta: 'Cek kesiapan AI',
    reply: 'Kami balas dalam 2 hari kerja.',
    open: 'Buka menu',
    close: 'Tutup menu',
    langLabel: 'Bahasa',
  },
  en: {
    links: [
      { label: 'How agents work', href: '#agent' },
      { label: 'Services', href: '#services' },
      { label: 'Use cases', href: '#use-cases' },
      { label: 'Work', href: '#work' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Check AI readiness',
    reply: 'We reply within 2 business days.',
    open: 'Open menu',
    close: 'Close menu',
    langLabel: 'Language',
  },
};

const LangSwitch = () => {
  const { lang, setLang } = useLang();
  const c = useCopy(COPY);
  return (
    <div className="inline-flex rounded-full border border-[#b0aea5] p-0.5 font-display text-xs font-semibold" role="group" aria-label={c.langLabel}>
      {(['id', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`min-w-[2.25rem] px-2.5 py-1.5 rounded-full uppercase transition-colors ${
            lang === l ? 'bg-[#141413] text-[#faf9f5]' : 'text-[#141413]/70 hover:text-[#141413]'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const c = useCopy(COPY);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled || menuOpen
            ? 'bg-[#faf9f5]/95 backdrop-blur border-b border-[#e8e6dc]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="wrap flex items-center justify-between gap-4 py-4">
          <a href="#top" className="font-display font-bold text-lg tracking-tight text-[#141413]">
            Kuon Studio
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {c.links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
            <LangSwitch />
            <a href="#readiness" className="btn-primary !px-5 !py-2.5 !text-sm">
              {c.cta}
            </a>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <LangSwitch />
            <button
              className="inline-flex items-center justify-center w-11 h-11 text-[#141413]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? c.close : c.open}
              aria-expanded={menuOpen}
            >
              <span className="relative block w-6 h-6" aria-hidden="true">
                <span
                  className={`absolute left-0 top-[7px] w-6 h-0.5 bg-current transition-transform duration-200 ${
                    menuOpen ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[17px] w-6 h-0.5 bg-current transition-transform duration-200 ${
                    menuOpen ? '-translate-y-[5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#faf9f5] pt-24 overflow-y-auto">
          <nav className="wrap flex flex-col gap-2 pb-10" aria-label="Mobile">
            {c.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display font-semibold text-3xl py-3 text-[#141413] border-b border-[#e8e6dc]"
              >
                {link.label}
              </a>
            ))}
            <a href="#readiness" onClick={() => setMenuOpen(false)} className="btn-primary mt-6">
              {c.cta}
            </a>
            <p className="mt-4 text-[#141413]/60">{c.reply}</p>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
