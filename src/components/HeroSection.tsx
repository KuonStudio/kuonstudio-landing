const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Global Wireframe Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Main rotating globe */}
        <div className="relative w-[140vw] max-w-[1400px] h-[140vw] max-h-[1400px] animate-rotate-slow">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" />

          {/* Multiple orbital rings */}
          <div className="absolute inset-0 rounded-full border border-accent/25 animate-pulse-scale wireframe-glow" />
          <div className="absolute inset-[8%] rounded-full border border-accent/20" />
          <div className="absolute inset-[16%] rounded-full border border-accent/15" />
          <div className="absolute inset-[24%] rounded-full border border-accent/12" />
          <div className="absolute inset-[32%] rounded-full border border-accent/10" />
          <div className="absolute inset-[40%] rounded-full border border-accent/8" />

          {/* Core reactor */}
          <div className="absolute inset-[48%] rounded-full bg-accent/10 wireframe-glow animate-pulse-glow" />
          <div className="absolute inset-[49%] rounded-full border-2 border-accent/30" />

          {/* Latitude lines (horizontal) */}
          <div className="absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
          <div className="absolute top-[35%] left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/12 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          <div className="absolute top-[65%] left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/12 to-transparent" />
          <div className="absolute top-[80%] left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

          {/* Longitude lines (vertical) */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
          <div className="absolute left-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/12 to-transparent" />
          <div className="absolute left-[35%] top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
          <div className="absolute left-[65%] top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
          <div className="absolute left-[80%] top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/12 to-transparent" />

          {/* Diagonal grid */}
          <div className="absolute inset-0 origin-center rotate-45">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/8 to-transparent" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/8 to-transparent" />
          </div>
          <div className="absolute inset-0 origin-center -rotate-45">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/8 to-transparent" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/8 to-transparent" />
          </div>

          {/* Scanning line effect */}
          <div className="absolute inset-0 animate-scan-line">
            <div className="absolute top-0 left-0 w-full h-px bg-accent/30 shadow-glow-line" />
          </div>
        </div>

        {/* Secondary counter-rotating layer */}
        <div className="absolute inset-0 flex items-center justify-center animate-rotate-reverse">
          <div className="relative w-[100vw] max-w-[1000px] h-[100vw] max-h-[1000px]">
            {/* Orbital rings counter-rotation */}
            <div className="absolute inset-[15%] rounded-full border border-accent/8" />
            <div className="absolute inset-[30%] rounded-full border border-accent/6" />

            {/* Tracking dots */}
            <div className="absolute top-[20%] left-[20%] w-1 h-1 rounded-full bg-accent animate-pulse-glow" />
            <div className="absolute top-[30%] right-[25%] w-1 h-1 rounded-full bg-accent animate-pulse-glow animation-delay-100" />
            <div className="absolute bottom-[35%] left-[30%] w-1 h-1 rounded-full bg-accent animate-pulse-glow animation-delay-200" />
            <div className="absolute bottom-[25%] right-[20%] w-1 h-1 rounded-full bg-accent animate-pulse-glow animation-delay-300" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-5">
        {/* Main headline */}
        <h1 className="hero-glitch font-display font-black text-[clamp(2rem,8vw,6rem)] tracking-tight leading-[1.1] opacity-0 animate-fade-up uppercase">
          WE FORGE INTELLIGENCE.
        </h1>

        {/* Japanese subtitle - Blood Red */}
        <p className="japan-glitch mt-6 md:mt-8 text-[clamp(1.25rem,4vw,2.5rem)] text-accent tracking-[0.2em] opacity-0 animate-fade-up animation-delay-100 font-display font-bold">
          久遠スタジオ
        </p>
        
        {/* Description */}
        <div className="mt-8 md:mt-12 max-w-xl mx-auto opacity-0 animate-fade-up animation-delay-200">
          <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed tracking-wide">
            Kuon Studio is a research facility for autonomous systems. 
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