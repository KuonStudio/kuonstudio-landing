import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { label: 'PROTOCOLS', href: '#protocols' },
    { label: 'VISION', href: '#vision' },
    { label: 'ACCESS', href: '#access' },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass' : 'bg-transparent'
        }`}
      >
        <div className="px-6 md:px-8 py-4 flex items-center justify-between gap-8 md:gap-16 lg:gap-24 flex-nowrap">
          <a href="#" className="navbar-glitch font-display font-bold text-lg md:text-xl tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap uppercase" data-hover data-text="KUON STUDIO">
            KUON STUDIO
          </a>
          
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 flex-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link font-mono text-xs tracking-widest text-muted-foreground whitespace-nowrap"
                data-hover
              >
                [ {link.label} ]
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-2" 
            onClick={() => setMenuOpen(!menuOpen)}
            data-hover
            aria-label="Toggle menu"
          >
            <span className={`menu-icon ${menuOpen ? 'open' : ''}`}>
              <span className="menu-line" />
              <span className="menu-line" />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div 
        className={`fixed inset-0 z-40 bg-background transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-12">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className={`font-display font-bold text-4xl tracking-widest text-foreground hover:text-accent transition-all duration-300 uppercase ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: menuOpen ? `${index * 100}ms` : '0ms' }}
              data-hover
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;