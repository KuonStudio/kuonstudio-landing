const WorkSection = () => {
  return (
    <section id="work" className="py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">Selected work</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">
          Live products we&apos;ve shipped.
        </h2>
        <p className="mt-4 text-lg text-[#141413]/70">
          Running now. Open it and click around.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5">
          <article className="card-studio">
            <div className="card-accent" style={{ background: '#d97757' }} aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display font-semibold text-xl text-[#141413]">Selisik</h3>
              <span className="font-display text-xs font-semibold px-3 py-1 rounded-full bg-[#788c5d]/15 text-[#788c5d]">
                Live
              </span>
            </div>
            <p className="mt-1 font-display text-[15px] text-[#141413]/60">
              Lead research for freelancers
            </p>
            <p className="mt-3 text-[#141413]/70">
              Type a goal such as &ldquo;cafes in Bandung that need an ordering
              system&rdquo;. Selisik searches Indonesian company sites, scores
              each target 1&ndash;10 with quoted evidence, and drafts a first
              message for the ones worth contacting.
            </p>
            <ul className="mt-5 space-y-2.5">
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#d97757' }}>
                  —
                </span>
                <span>
                  You approve 2&ndash;4 search queries before the paid scan runs, with the
                  cost estimate above the Run button.
                </span>
              </li>
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#d97757' }}>
                  —
                </span>
                <span>
                  A phone number or email only appears if it is written on the source
                  page. Claims without source text are dropped.
                </span>
              </li>
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#d97757' }}>
                  —
                </span>
                <span>
                  Results persist with statuses new, contacted, replied, deal, dead.
                  A rescan refreshes the analysis and keeps your notes.
                </span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-[#e8e6dc] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <a
                href="https://selisik.kuonstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-semibold text-[#141413] hover:text-[#d97757] transition-colors"
              >
                Visit live app &rarr;
              </a>
              <p className="text-[15px] text-[#141413]/60">
                selisik.kuonstudio.com. Indonesian UI. Free account, uses your own Exa
                + LLM keys.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
