const HeroSection = () => {
  return (
    <section id="top" className="pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow animate-rise">Software studio in Jakarta</p>
          <h1 className="mt-4 font-display font-bold text-[clamp(2.25rem,6vw,4rem)] text-[#141413] animate-rise animation-delay-100">
            Software that removes your daily busywork.
          </h1>
          <p className="mt-6 text-lg text-[#141413]/70 animate-rise animation-delay-200">
            Kuon Studio builds the systems behind your operations: one place for
            sales and stock, portals your customers can use themselves, and
            follow-ups that draft themselves. You get the system, the guide, and
            training for your team.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-rise animation-delay-200">
            <a href="#contact" className="btn-primary">
              Start a project
            </a>
            <a href="#services" className="btn-secondary">
              See services
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[15px]">
            <div className="border-t-2 border-[#d97757] pt-3">
              <dt className="font-display font-semibold text-[#141413]">Scope in a week</dt>
              <dd className="text-[#141413]/60">Fixed scope and price before we build.</dd>
            </div>
            <div className="border-t-2 border-[#6a9bcc] pt-3">
              <dt className="font-display font-semibold text-[#141413]">Built in slices</dt>
              <dd className="text-[#141413]/60">Working software every 1–2 weeks.</dd>
            </div>
            <div className="border-t-2 border-[#788c5d] pt-3">
              <dt className="font-display font-semibold text-[#141413]">Training included</dt>
              <dd className="text-[#141413]/60">Guide and walkthrough so your team can run it.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
