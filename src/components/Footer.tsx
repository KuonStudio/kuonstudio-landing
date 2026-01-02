const Footer = () => {
  const links = [
    { label: 'EMAIL', href: 'mailto:hello@kuonstudio.com' },
    { label: 'GITHUB', href: 'https://github.com/kuonstudio' },
    { label: 'LINKEDIN', href: 'https://linkedin.com/company/kuonstudio' },
  ];

  return (
    <footer id="contact" className="py-24 px-6 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        {/* Massive text */}
        <div className="overflow-hidden mb-16">
          <h2 className="font-sans font-bold text-[12vw] md:text-[10vw] tracking-tighter leading-none text-chrome">
            KUON STUDIO
          </h2>
        </div>

        {/* Links and info */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          {/* Contact links */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group"
                data-hover
              >
                <span className="w-0 group-hover:w-4 h-px bg-accent transition-all duration-300" />
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-muted-foreground space-y-2 text-right">
            <p>© 2026 Kuon Studio. All rights reserved.</p>
            <p className="italic">"Code is Poetry."</p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-16 glow-line opacity-30" />
      </div>
    </footer>
  );
};

export default Footer;
