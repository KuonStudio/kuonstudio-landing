const groups = [
  { label: 'Backend', items: 'Go · Postgres · Redis · NATS' },
  { label: 'Frontend', items: 'React · TypeScript · Tailwind' },
  { label: 'Platform', items: 'Docker · CI · Object storage · Backups' },
  { label: 'AI', items: 'LLM APIs · Embeddings · Review queues' },
];

const MarqueeSection = () => {
  return (
    <section id="stack" className="py-16 md:py-24 bg-white border-y border-[#e8e6dc]">
      <div className="wrap">
        <p className="eyebrow">Stack</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">
          Tools we reach for.
        </h2>
        <p className="mt-4 text-lg text-[#141413]/70">
          Few tools, used well. If your team already runs something else, we adapt.
        </p>
        <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((group) => (
            <div key={group.label} className="border-t-2 border-[#141413] pt-4">
              <dt className="font-display font-semibold text-[#141413]">{group.label}</dt>
              <dd className="mt-1 text-[#141413]/70">{group.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default MarqueeSection;
