import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang, useCopy } from '@/lib/i18n';

const COPY = {
  id: {
    links: [
      { label: 'Kuon AI', hash: '#kuon' },
      { label: 'Contoh agent', hash: '#agent' },
      { label: 'Karya', hash: '#work' },
      { label: 'Kontak', hash: '#contact' },
    ],
    cta: 'Bahas proyek',
    reply: 'Kami balas dalam 2 hari kerja.',
    quiz: 'Cek kesiapan AI bisnismu',
    open: 'Buka menu',
    close: 'Tutup menu',
    langLabel: 'Bahasa',
  },
  en: {
    links: [
      { label: 'Kuon AI', hash: '#kuon' },
      { label: 'Agent example', hash: '#agent' },
      { label: 'Our work', hash: '#work' },
      { label: 'Contact', hash: '#contact' },
    ],
    cta: 'Start a project',
    reply: 'We reply within 2 business days.',
    quiz: 'Check your AI readiness',
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
  const location = useLocation();
  const c = useCopy(COPY);
  const isHome = location.pathname === '/';
  const resolveHref = (hash: string) => (isHome ? hash : `/${hash}`);

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
          {isHome ? (
            <a href="#top" className="font-display font-bold text-lg tracking-tight text-[#141413]">
              Kuon Studio
            </a>
          ) : (
            <Link to="/" className="font-display font-bold text-lg tracking-tight text-[#141413]">
              Kuon Studio
            </Link>
          )}

          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {c.links.map((link) => (
              <a key={link.hash} href={resolveHref(link.hash)} className="nav-link">
                {link.label}
              </a>
            ))}
            <LangSwitch />
            <a href={resolveHref('#contact')} className="btn-primary !px-5 !py-2.5 !text-sm">
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
                key={link.hash}
                href={resolveHref(link.hash)}
                onClick={() => setMenuOpen(false)}
                className="font-display font-semibold text-3xl py-3 text-[#141413] border-b border-[#e8e6dc]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={resolveHref('#contact')}
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-6"
            >
              {c.cta}
            </a>
            <Link
              to="/cek-kesiapan"
              onClick={() => setMenuOpen(false)}
              className="mt-2 font-display text-sm font-semibold text-[#141413]/70 hover:text-[#141413]"
            >
              {c.quiz}
            </Link>
            <p className="mt-4 text-[#141413]/60">{c.reply}</p>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
