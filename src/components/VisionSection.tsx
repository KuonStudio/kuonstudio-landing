const steps = [
  {
    period: 'Week 1',
    title: 'Scope together',
    text: 'Two calls and a short doc: goals, users, must-haves, and what we will not build. You get a fixed scope and price.',
  },
  {
    period: 'Week 2 and onward',
    title: 'Build in slices',
    text: 'Working software every 1–2 weeks on a preview link you can click. You try it, comment, and reprioritize. No big reveal at the end.',
  },
  {
    period: 'Final week',
    title: 'Hand over',
    text: 'Docs, tests, deploy notes, and a walkthrough call. Your team can run it without us. Support after that is optional.',
  },
];

const principles = [
  {
    title: 'Ready for daily use',
    text: 'Logins, backups, and error handling are part of the price, not extras.',
  },
  {
    title: 'Simple where it counts',
    text: 'Common, proven tools before exotic ones. Easy to find people who can maintain it.',
  },
  {
    title: 'You own everything',
    text: 'Your accounts, your files, and a plain guide to run it in under 15 minutes.',
  },
];

const VisionSection = () => {
  return (
    <section id="process" className="py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">How we work</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">
          Small steps, working software.
        </h2>

        <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <li key={step.title} className="card-studio">
              <p className="font-display font-semibold text-sm text-[#d97757]">
                {index + 1}. {step.period}
              </p>
              <h3 className="mt-2 font-display font-semibold text-lg text-[#141413]">{step.title}</h3>
              <p className="mt-2 text-[#141413]/70">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 bg-[#e8e6dc]/50 border border-[#e8e6dc] rounded-2xl p-7 md:p-10">
          <h3 className="font-display font-semibold text-xl text-[#141413]">What you can expect</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((item) => (
              <div key={item.title}>
                <p className="font-display font-semibold text-[#141413]">{item.title}</p>
                <p className="mt-1.5 text-[#141413]/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
