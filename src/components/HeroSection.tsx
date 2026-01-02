const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Main headline */}
        <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none opacity-0 animate-fade-up">
          ENGINEERING ETERNITY
        </h1>
        
        {/* Japanese subtitle */}
        <p className="mt-6 text-2xl md:text-3xl text-muted-foreground tracking-widest opacity-0 animate-fade-up animation-delay-100">
          久遠のコード
        </p>
        
        {/* Description */}
        <div className="mt-12 max-w-2xl mx-auto opacity-0 animate-fade-up animation-delay-200">
          <div className="glow-line mb-6 animate-pulse-glow" />
          <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed tracking-wide">
            A high-performance software house forging digital legacies.
            <br />
            Specializing in <span className="text-foreground">Golang</span>, <span className="text-foreground">Distributed Systems</span>, and <span className="text-foreground">AI Agents</span>.
          </p>
          <div className="glow-line mt-6 animate-pulse-glow" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-500">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
