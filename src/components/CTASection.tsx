const CTASection = () => {
  return (
    <section id="access" className="py-48 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Small label */}
        <p className="font-mono text-sm text-muted-foreground tracking-widest mb-8 opacity-0 animate-fade-up">
          READY TO AUTOMATE?
        </p>

        {/* Main headline */}
        <h2 className="font-sans font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-16 opacity-0 animate-fade-up animation-delay-100">
          DEPLOY YOUR AGENT.
        </h2>

        {/* CTA Button */}
        <div className="opacity-0 animate-fade-up animation-delay-200">
          <a
            href="mailto:hello@kuonstudios.com"
            className="btn-red-outline inline-block"
            data-hover
          >
            INITIATE CONTACT
          </a>
        </div>

        {/* Decorative lines */}
        <div className="mt-24 flex items-center justify-center gap-4">
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-accent/50" />
          <div className="w-2 h-2 bg-accent/50 rotate-45" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-accent/50" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;