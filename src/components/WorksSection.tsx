const projects = [
  {
    id: 1,
    title: 'NEXUS ENGINE',
    subtitle: 'Distributed Task Orchestration',
    stack: ['Go', 'Redis', 'gRPC'],
    year: '2025',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'AXIOM AI',
    subtitle: 'Autonomous Agent Framework',
    stack: ['Python', 'LangChain', 'Vector DB'],
    year: '2025',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'FLUX ANALYTICS',
    subtitle: 'Real-time Data Pipeline',
    stack: ['Go', 'Kafka', 'ClickHouse'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'PHANTOM MESH',
    subtitle: 'Zero-Trust Network Layer',
    stack: ['Rust', 'WireGuard', 'eBPF'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80',
  },
];

const WorksSection = () => {
  return (
    <section id="work" className="py-32 overflow-hidden">
      <div className="px-6 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-16">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
              / PORTFOLIO
            </span>
            <h2 className="mt-4 font-sans font-bold text-4xl md:text-5xl tracking-tight">
              SELECTED WORKS
              <span className="ml-4 text-muted-foreground">/ プロジェクト</span>
            </h2>
          </div>
          <span className="hidden md:block font-mono text-xs text-muted-foreground">
            [{projects.length.toString().padStart(2, '0')} PROJECTS]
          </span>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div className="horizontal-scroll px-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] group"
          >
            <div className="relative overflow-hidden blueprint-border bg-card">
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="font-mono text-xs space-y-2">
                    <p className="text-muted-foreground">STACK:</p>
                    <div className="flex gap-3">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 border border-accent/50 text-accent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Year badge */}
                <div className="absolute top-4 right-4 font-mono text-xs text-muted-foreground">
                  {project.year}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 border-t border-border/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-sans font-bold text-xl tracking-wide">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-muted-foreground">
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
