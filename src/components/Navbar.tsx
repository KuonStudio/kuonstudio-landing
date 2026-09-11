import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'How we work', href: '#process' },
    { label: 'Results', href: '#results' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled || menuOpen
            ? 'bg-[#faf9f5]/95 backdrop-blur border-b border-[#e8e6dc]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="wrap flex items-center justify-between py-4">
          <a href="#top" className="font-display font-bold text-lg tracking-tight text-[#141413]">
            Kuon Studio
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary !px-5 !py-2.5 !text-sm">
              Start a project
            </a>
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#141413]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#faf9f5] pt-24">
          <nav className="wrap flex flex-col gap-2" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display font-semibold text-3xl py-3 text-[#141413] border-b border-[#e8e6dc]"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary mt-6">
              Start a project
            </a>
            <p className="mt-4 text-[#141413]/60">We reply within 2 business days.</p>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
