import { useState } from 'react';

interface Agent {
  name: string;
  description: string;
  status: string;
  statusColor: string;
  metrics: {
    latency: string;
    uptime: string;
    threats: string;
  };
}

const agents: Agent[] = [
  {
    name: 'GUARDIAN',
    description: 'Automated reputation management and crisis aversion. It never sleeps.',
    status: 'ONLINE',
    statusColor: 'text-accent',
    metrics: {
      latency: '12ms',
      uptime: '99.99%',
      threats: '0',
    },
  },
  {
    name: 'SENTINEL',
    description: '24/7 Market data scraping and competitor tracking. It sees everything.',
    status: 'DEPLOYED',
    statusColor: 'text-foreground',
    metrics: {
      latency: '8ms',
      uptime: '99.97%',
      threats: '3 BLOCKED',
    },
  },
  {
    name: 'ORACLE',
    description: 'Data-driven logic engines for forecasting trends. It knows before you do.',
    status: 'CLASSIFIED',
    statusColor: 'text-muted-foreground',
    metrics: {
      latency: '???',
      uptime: '???',
      threats: 'REDACTED',
    },
  },
];

const LabsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="protocols" className="py-20 md:py-32 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-10 md:mb-16">
          <h2 className="font-sans font-bold text-[clamp(1.5rem,5vw,3rem)] tracking-tight">
            OPERATIONAL CAPABILITIES
          </h2>
          <p className="mt-2 font-mono text-sm text-muted-foreground tracking-widest">
            // プロトコル
          </p>
        </div>

        {/* Agent cards - single column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {agents.map((agent, index) => (
            <div
              key={agent.name}
              className="agent-card relative p-6 md:p-8 bg-card/50 backdrop-blur-sm min-h-[260px] md:min-h-[300px] flex flex-col"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              data-hover
            >
              {/* Status indicator */}
              <div className="absolute top-4 right-4">
                <span className={`font-mono text-[10px] tracking-widest ${agent.statusColor}`}>
                  [{agent.status}]
                </span>
              </div>

              {/* Agent name */}
              <h3 className="font-sans font-bold text-2xl tracking-wide mb-4">
                {agent.name}
              </h3>

              {/* Description */}
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-auto">
                {agent.description}
              </p>

              {/* System Metrics - show on hover */}
              <div
                className={`mt-6 pt-6 border-t border-border/30 transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <p className="font-mono text-[10px] text-accent tracking-widest mb-3">
                  SYSTEM METRICS
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-accent">
                  <span>LATENCY: {agent.metrics.latency}</span>
                  <span>UPTIME: {agent.metrics.uptime}</span>
                  <span>THREATS: {agent.metrics.threats}</span>
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