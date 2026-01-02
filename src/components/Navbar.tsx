import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'PHILOSOPHY', href: '#philosophy' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="px-6 py-3 flex items-center justify-between gap-12 md:gap-20">
        <a href="#" className="font-sans font-bold text-xl tracking-wider" data-hover>
          KUON
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
              data-hover
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden flex flex-col gap-1.5" data-hover>
          <span className="w-5 h-px bg-foreground" />
          <span className="w-5 h-px bg-foreground" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
