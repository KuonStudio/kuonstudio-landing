const outcomes = [
  {
    accent: '#d97757',
    title: 'See your business clearly',
    text: 'Sales, stock, or cash in one dashboard, updated daily. No more asking three people for one number.',
    example: 'Example: yesterday’s sales by branch, on your phone.',
  },
  {
    accent: '#6a9bcc',
    title: 'Faster service for customers',
    text: 'Order, booking, or complaint flows that work on a phone. Customers stop waiting, your team stops retyping.',
    example: 'Example: a customer portal instead of back-and-forth chat.',
  },
  {
    accent: '#788c5d',
    title: 'Less repetitive work',
    text: 'Follow-ups, recaps, and data entry drafted automatically. Your team checks and approves, nothing sends itself.',
    example: 'Example: leads from every channel triaged into one list.',
  },
  {
    accent: '#141413',
    title: 'Nothing depends on one person',
    text: 'Backups, access control, and plain documentation. If someone leaves, the system keeps running.',
    example: 'Example: a 15-minute guide to run it yourself.',
  },
];

const MarqueeSection = () => {
  return (
    <section id="results" className="py-16 md:py-24 bg-white border-y border-[#e8e6dc]">
      <div className="wrap">
        <p className="eyebrow">Results</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">
          What changes for your business.
        </h2>
        <p className="mt-4 text-lg text-[#141413]/70">
          No technical terms. This is what you notice in the first month.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {outcomes.map((outcome) => (
            <article key={outcome.title} className="card-studio">
              <div className="card-accent" style={{ background: outcome.accent }} aria-hidden="true" />
              <h3 className="font-display font-semibold text-xl text-[#141413]">{outcome.title}</h3>
              <p className="mt-2 text-[#141413]/70">{outcome.text}</p>
              <p className="mt-4 pt-4 border-t border-[#e8e6dc] text-[15px] text-[#141413]/60">
                {outcome.example}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
