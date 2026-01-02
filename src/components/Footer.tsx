const Footer = () => {
  return (
    <footer className="py-16 md:py-24 px-5 md:px-6 border-t border-border/20">
      <div className="max-w-7xl mx-auto">
        {/* Typographic lockup - Professional size */}
        <div className="mb-10 md:mb-12 group" data-hover>
          {/* KUON - Professional size */}
          <h2 className="font-display font-black text-[clamp(1.5rem,5vw,3rem)] tracking-[0.15em] md:tracking-[0.2em] leading-none text-muted-foreground/30 group-hover:text-accent transition-colors duration-500 uppercase">
            KUON
          </h2>
          {/* STUDIO - Matched to KUON width */}
          <p className="font-display font-bold text-[clamp(0.625rem,2vw,1rem)] tracking-[0.6em] md:tracking-[0.9em] lg:tracking-[1.1em] leading-none text-muted-foreground/30 group-hover:text-accent transition-colors duration-500 uppercase">
            STUDIO
          </p>
        </div>

        {/* Footer info */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8">
          {/* Links */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            <a
              href="mailto:hello@kuonstudios.com"
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300 min-h-[44px] flex items-center"
              data-hover
            >
              EMAIL
            </a>
            <a
              href="https://github.com/kuonstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300 min-h-[44px] flex items-center"
              data-hover
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/company/kuonstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300 min-h-[44px] flex items-center"
              data-hover
            >
              LINKEDIN
            </a>
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 Kuon Studio. Jakarta, ID. All Systems Nominal.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;