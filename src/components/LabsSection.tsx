import { useState } from 'react';

interface Agent {
  name: string;
  description: string;
  status: string;
  statusColor: string;
  specs: {
    latency: string;
    core: string;
    uptime: string;
  };
}

const agents: Agent[] = [
  {
    name: 'GUARDIAN',
    description: 'Reputation Defense Protocol.',
    status: 'ONLINE',
    statusColor: 'text-accent',
    specs: {
      latency: '12ms',
      core: 'GoLang',
      uptime: '99.97%',
    },
  },
  {
    name: 'SENTINEL',
    description: 'Market Watcher & Scraper.',
    status: 'DEPLOYED',
    statusColor: 'text-foreground',
    specs: {
      latency: '8ms',
      core: 'Python',
      uptime: '99.99%',
    },
  },
  {
    name: 'ORACLE',
    description: 'Predictive Logic Engine.',
    status: 'CLASSIFIED',
    statusColor: 'text-muted-foreground',
    specs: {
      latency: '???',
      core: 'Rust',
      uptime: '???',
    },
  },
];

const LabsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="protocols" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight">
            ACTIVE AGENTS
          </h2>
          <p className="mt-2 font-mono text-sm text-muted-foreground tracking-widest">
            // エージェント
          </p>
        </div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <div
              key={agent.name}
              className="agent-card relative p-8 bg-card/50 backdrop-blur-sm min-h-[280px] flex flex-col"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-hover
            >
              {/* Status indicator */}
              <div className="absolute top-4 right-4">
                <span className={`font-mono text-[10px] tracking-widest ${agent.statusColor}`}>
                  {agent.status}
                </span>
              </div>

              {/* Agent name */}
              <h3 className="font-sans font-bold text-2xl tracking-wide mb-4">
                {agent.name}
              </h3>

              {/* Description */}
              <p className="font-mono text-sm text-muted-foreground mb-auto">
                {agent.description}
              </p>

              {/* Technical specs - show on hover */}
              <div
                className={`mt-6 pt-6 border-t border-border/30 space-y-2 transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="text-accent">{agent.specs.latency}</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-muted-foreground">Core:</span>
                  <span>{agent.specs.core}</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-muted-foreground">Uptime:</span>
                  <span>{agent.specs.uptime}</span>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsSection;