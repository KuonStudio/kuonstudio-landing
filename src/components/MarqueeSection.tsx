const MarqueeSection = () => {
  const text = "AUTONOMOUS INTELLIGENCE +++ KUON STUDIOS +++ PERPETUAL CODE +++ ";
  
  return (
    <section className="py-24 overflow-hidden border-y border-border/20">
      <div className="relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Duplicate text for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-outline tracking-tight mx-4"
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