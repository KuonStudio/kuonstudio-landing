const Footer = () => {
  return (
    <footer className="py-24 px-6 border-t border-border/20">
      <div className="max-w-7xl mx-auto">
        {/* Massive typographic lockup */}
        <div className="mb-16 group" data-hover>
          {/* KUON - Extra large */}
          <h2 className="font-sans font-extrabold text-[18vw] md:text-[15vw] tracking-[0.15em] leading-none text-muted-foreground/30 group-hover:text-accent transition-colors duration-500">
            KUON
          </h2>
          {/* STUDIOS - Stretched to match width */}
          <p className="font-sans font-bold text-[6vw] md:text-[5vw] tracking-[1.2em] md:tracking-[1.5em] leading-none text-muted-foreground/30 group-hover:text-accent transition-colors duration-500 -mt-2 md:-mt-4">
            STUDIOS
          </p>
        </div>

        {/* Footer info */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          {/* Links */}
          <div className="flex gap-8">
            <a
              href="mailto:hello@kuonstudios.com"
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300"
              data-hover
            >
              EMAIL
            </a>
            <a
              href="https://github.com/kuonstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300"
              data-hover
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/company/kuonstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300"
              data-hover
            >
              LINKEDIN
            </a>
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 Kuon Studios. Jakarta, ID. All Systems Nominal.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;