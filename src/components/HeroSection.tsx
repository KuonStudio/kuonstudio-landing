const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Abstract wireframe background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px] animate-rotate-slow">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-accent/20 animate-pulse-scale" />
          {/* Middle ring */}
          <div className="absolute inset-[15%] rounded-full border border-accent/15" />
          {/* Inner ring */}
          <div className="absolute inset-[30%] rounded-full border border-accent/10" />
          {/* Core */}
          <div className="absolute inset-[45%] rounded-full bg-accent/5 wireframe-glow" />
          {/* Cross lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
          {/* Diagonal lines */}
          <div className="absolute inset-0 origin-center rotate-45">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
          </div>
          <div className="absolute inset-0 origin-center -rotate-45">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-5">
        {/* Main headline */}
        <h1 className="hero-title font-display font-black text-[clamp(2rem,8vw,6rem)] tracking-tight leading-[1.1] opacity-0 animate-fade-up uppercase">
          WE FORGE INTELLIGENCE.
        </h1>
        
        {/* Japanese subtitle - Blood Red */}
        <p className="japan-text mt-6 md:mt-8 text-[clamp(1.25rem,4vw,2.5rem)] text-accent tracking-[0.2em] opacity-0 animate-fade-up animation-delay-100 font-display font-bold">
          久遠スタジオ
        </p>
        
        {/* Description */}
        <div className="mt-8 md:mt-12 max-w-xl mx-auto opacity-0 animate-fade-up animation-delay-200">
          <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed tracking-wide">
            Kuon Studios is a research facility for autonomous systems. 
            We automate the complex, defend the reputation, and predict the unseen.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-500">
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;