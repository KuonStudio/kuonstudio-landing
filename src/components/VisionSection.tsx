const VisionSection = () => {
  return (
    <section id="vision" className="py-20 md:py-32 px-5 md:px-6 border-y border-border/20">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <p className="font-mono text-sm text-accent tracking-widest mb-6 md:mb-8 opacity-0 animate-fade-up">
          [ VISION ]
        </p>

        {/* Main headline */}
        <h2 className="font-display font-black text-[clamp(1.75rem,6vw,4.5rem)] tracking-tight mb-10 md:mb-16 opacity-0 animate-fade-up animation-delay-100 uppercase">
          THE ERA OF AUTONOMY.
        </h2>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
          {/* Left - Key quote */}
          <div className="relative">
            <blockquote className="font-display font-bold text-[clamp(1.5rem,5vw,3.5rem)] leading-tight text-foreground/90 opacity-0 animate-fade-up animation-delay-200 uppercase">
              "FLESH DECAYS.
              <br />
              <span className="text-accent">CODE ENDURES."</span>
            </blockquote>
            
            {/* Decorative line */}
            <div className="absolute -left-6 top-0 h-full w-px bg-gradient-to-b from-accent via-accent/50 to-transparent hidden lg:block" />
          </div>

          {/* Right - Body text */}
          <div className="flex flex-col justify-center">
            <p className="font-mono text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed opacity-0 animate-fade-up animation-delay-300">
              Traditional software waits for input. We build systems that act. 
            </p>
            <p className="font-mono text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed mt-4 md:mt-6 opacity-0 animate-fade-up animation-delay-400">
              In a world of noise, Kuon Studios engineers the silence of perfect efficiency.
            </p>

            {/* Decorative element */}
            <div className="mt-8 md:mt-12 flex items-center gap-4 opacity-0 animate-fade-up animation-delay-500">
              <div className="w-12 h-px bg-accent" />
              <span className="font-mono text-xs text-accent tracking-widest">久遠</span>
              <div className="w-12 h-px bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
