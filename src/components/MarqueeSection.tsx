const MarqueeSection = () => {
  const text = "AUTONOMOUS INTELLIGENCE +++ KUON STUDIO +++ PERPETUAL CODE +++ ";
  
  return (
    <section className="py-12 md:py-24 overflow-hidden border-y border-border/20">
      <div className="relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Duplicate text for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display font-bold text-[clamp(2rem,8vw,6rem)] text-outline tracking-tight mx-4 uppercase"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;