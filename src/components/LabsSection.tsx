const services = [
  {
    accent: '#d97757',
    title: 'Backend and infrastructure',
    summary: 'Go APIs and workers that stay up when traffic spikes.',
    includes: ['REST or gRPC API with auth and roles', 'Postgres schema, migrations, and backups', 'Docker deploy with logs and health checks'],
    stack: 'Go · Postgres · Redis · Docker',
  },
  {
    accent: '#6a9bcc',
    title: 'Web apps and dashboards',
    summary: 'React apps for operations, reporting, and customer portals.',
    includes: ['Dashboard with search, filter, and export', 'Form flows with validation and states', 'Responsive layout that works on phones'],
    stack: 'React · TypeScript · Tailwind',
  },
  {
    accent: '#788c5d',
    title: 'AI agents and automation',
    summary: 'Automations that draft the work and let your team approve it.',
    includes: ['Inbox, lead, or document triage with review queue', 'RAG over your docs with cited answers', 'Usage and cost limits per workspace'],
    stack: 'LLM APIs · Queues · Postgres',
  },
  {
    accent: '#141413',
    title: 'Rescue and consulting',
    summary: 'For systems that are slow, fragile, or nobody wants to touch.',
    includes: ['Code and infra audit with fix list by priority', 'Slow-query and cost pass with before/after numbers', 'Handover sessions so your team can own it'],
    stack: 'Audit · Performance · Handover',
  },
];

const LabsSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white border-y border-[#e8e6dc]">
      <div className="wrap">
        <p className="eyebrow">Services</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">
          Four ways to work with us.
        </h2>
        <p className="mt-4 text-lg text-[#141413]/70">
          Pick one. Every engagement ends with code, docs, and a walkthrough.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service) => (
            <article key={service.title} className="card-studio">
              <div className="card-accent" style={{ background: service.accent }} aria-hidden="true" />
              <h3 className="font-display font-semibold text-xl text-[#141413]">{service.title}</h3>
              <p className="mt-2 text-[#141413]/70">{service.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[#141413]">
                    <span aria-hidden="true" style={{ color: service.accent }}>
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-4 border-t border-[#e8e6dc] text-[15px] text-[#141413]/60">
                {service.stack}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsSection;
