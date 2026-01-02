const techCategories = [
  {
    category: 'BACKEND',
    items: ['Go', 'Python', 'Rust', 'Node.js'],
  },
  {
    category: 'DATA',
    items: ['PostgreSQL', 'Redis', 'Elasticsearch', 'ClickHouse'],
  },
  {
    category: 'INFRASTRUCTURE',
    items: ['Docker', 'Kubernetes', 'Terraform', 'Hetzner'],
  },
  {
    category: 'AI / ML',
    items: ['LangChain', 'OpenAI', 'Vector DBs', 'RAG Systems'],
  },
];

const TechStackSection = () => {
  return (
    <section className="py-32 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            / CAPABILITIES
          </span>
          <h2 className="mt-4 font-sans font-bold text-4xl md:text-5xl tracking-tight">
            THE ARSENAL
          </h2>
        </div>

        {/* HUD-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="blueprint-border bg-background p-6 relative group"
            >
              {/* Status indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] text-accent">ACTIVE</span>
              </div>

              {/* Category header */}
              <div className="mb-6 pb-4 border-b border-border/50">
                <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                  SYS.{(categoryIndex + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-sans font-bold text-lg tracking-wide">
                  {category.category}
                </h3>
              </div>

              {/* Tech items */}
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="font-mono text-sm text-muted-foreground flex items-center gap-3 group-hover:text-foreground transition-colors duration-300"
                    style={{ transitionDelay: `${itemIndex * 50}ms` }}
                  >
                    <span className="text-accent">→</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Corner decoration */}
              <div className="absolute bottom-0 left-0 w-16 h-px bg-gradient-to-r from-accent/50 to-transparent" />
              <div className="absolute bottom-0 left-0 h-16 w-px bg-gradient-to-t from-accent/50 to-transparent" />
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="font-mono text-sm text-muted-foreground">
            // Always exploring new technologies. Always optimizing.
          </p>
          <div className="font-mono text-xs text-muted-foreground flex items-center gap-4">
            <span className="px-3 py-1 border border-border/50">v2.0.26</span>
            <span>SYSTEM STATUS: OPERATIONAL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
