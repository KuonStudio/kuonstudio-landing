const PhilosophySection = () => {
  const principles = [
    {
      number: '01',
      title: 'PRECISION',
      description: 'Every line of code is deliberate. No bloat, no shortcuts.',
    },
    {
      number: '02',
      title: 'LONGEVITY',
      description: 'Systems built to outlast trends and scale with ambition.',
    },
    {
      number: '03',
      title: 'CRAFT',
      description: 'Software as an art form. Performance as a philosophy.',
    },
  ];

  return (
    <section id="philosophy" className="relative py-32 px-6 overflow-hidden">
      {/* Large watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-sans text-[20rem] md:text-[30rem] font-bold text-muted/5 leading-none">
          久遠
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            / PHILOSOPHY
          </span>
          <h2 className="mt-4 font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            We don't just write code.
            <br />
            <span className="text-muted-foreground">We build systems that last.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
          {principles.map((principle, index) => (
            <div
              key={principle.number}
              className="blueprint-border bg-background p-8 md:p-10 group hover:bg-card transition-colors duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="font-mono text-xs text-accent tracking-widest">
                {principle.number}
              </span>
              <h3 className="mt-4 font-sans font-bold text-2xl tracking-wide">
                {principle.title}
              </h3>
              <p className="mt-4 font-mono text-sm text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
              
              {/* Decorative corner */}
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-20 text-center">
          <blockquote className="font-mono text-lg md:text-xl text-muted-foreground italic">
            "Code is poetry. Architecture is philosophy."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
