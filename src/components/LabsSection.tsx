const services = [
  {
    accent: '#d97757',
    title: 'Systems behind the scenes',
    summary: 'Order, stock, and payment records in one place, always up to date.',
    includes: ['One record for orders, stock, and payments', 'Automatic backups every day', 'Access levels so staff only see their part'],
    fit: 'Good if your data still lives in spreadsheets.',
  },
  {
    accent: '#6a9bcc',
    title: 'Apps your team and customers use',
    summary: 'Simple dashboards and portals that work on a phone.',
    includes: ['Dashboard with search, filter, and Excel export', 'Forms that save halfway and validate input', 'Layout that works on small screens'],
    fit: 'Good if operations run on chat and screenshots.',
  },
  {
    accent: '#788c5d',
    title: 'Automation with human approval',
    summary: 'Repetitive follow-ups and summaries drafted for you. Nothing sends itself.',
    includes: ['Leads and messages triaged into one list', 'Answers drafted from your own documents', 'Your team approves everything before it goes out'],
    fit: 'Good if your team retypes the same things daily.',
  },
  {
    accent: '#141413',
    title: 'Fix and take over messy systems',
    summary: 'For software that is slow, fragile, or nobody wants to touch.',
    includes: ['Audit with a fix list sorted by priority', 'Speed and cost improvements with before-and-after numbers', 'Sessions so your team can own it after'],
    fit: 'Good if every small change feels risky.',
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
                {service.fit}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsSection;
