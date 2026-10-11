import { useCopy, useLang } from '@/lib/i18n';
import { waLink } from '@/lib/contact';
import { LOG, RESULTS, type LogLine } from '@/lib/proof';

const COPY = {
  id: {
    eyebrow: 'Hasil di bisnis klien',
    title: 'Diukur dari data pilot, sebelum dan sesudah agent jalan.',
    before: 'Sebelum',
    after: 'Sesudah',
    human: 'Tetap di tangan tim',
    wa: 'Hitung untuk bisnisku',
    waText: (task: string, b: string, a: string) =>
      `Halo Kuon Studio, saya lihat "${task}" dari ${b} jadi ${a}. Bisnis saya punya kerjaan serupa, bisa dihitung untuk kami?`,
    logTitle: 'Log kerja agent',
    logBody: 'Potongan log asli, nama dan isi pesan disamarkan. Baris yang ditolak sengaja kami biarkan.',
    outcome: { approved: 'disetujui', edited: 'diubah staf', rejected: 'ditolak staf' },
  },
  en: {
    eyebrow: 'Results at client businesses',
    title: 'Measured from pilot data, before and after the agent went live.',
    before: 'Before',
    after: 'After',
    human: 'Still done by the team',
    wa: 'Work it out for my business',
    waText: (task: string, b: string, a: string) =>
      `Hi Kuon Studio, I saw "${task}" go from ${b} to ${a}. My business has similar work, can you work it out for us?`,
    logTitle: 'Agent work log',
    logBody: 'An excerpt of a real log, with names and message content masked. We left the rejected lines in on purpose.',
    outcome: { approved: 'approved', edited: 'edited by staff', rejected: 'rejected by staff' },
  },
};

// Lighter tints of the brand accents, for text on the dark log panel.
const OUTCOME_COLOR: Record<LogLine['outcome'], string> = {
  approved: '#a9bd8c',
  edited: '#9cc0e4',
  rejected: '#e8946f',
};

const fmt = (n: number, lang: string) => n.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US');

const ResultsSection = () => {
  const c = useCopy(COPY);
  const { lang } = useLang();
  if (RESULTS.length === 0 && LOG.length === 0) return null;

  return (
    <section id="results" className="py-16 md:py-24">
      <div className="wrap">
        {RESULTS.length > 0 && (
          <>
            <p className="eyebrow">{c.eyebrow}</p>
            <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413] max-w-3xl">{c.title}</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {RESULTS.map((r) => {
                const unit = r.unit[lang];
                const b = `${fmt(r.before, lang)} ${unit}`;
                const a = `${fmt(r.after, lang)} ${unit}`;
                const max = Math.max(r.before, r.after) || 1;
                return (
                  <article key={r.client.id + r.task.id} className="card-studio flex flex-col">
                    <p className="text-sm text-[#141413]/60">{r.client[lang]}</p>
                    <h3 className="mt-1 font-display font-semibold text-xl text-[#141413]">{r.task[lang]}</h3>
                    <dl className="mt-6 space-y-3">
                      {[
                        { label: c.before, value: b, n: r.before, color: '#b0aea5' },
                        { label: c.after, value: a, n: r.after, color: '#d97757' },
                      ].map((row) => (
                        <div key={row.label}>
                          <div className="flex items-baseline justify-between gap-3">
                            <dt className="text-sm text-[#141413]/60">{row.label}</dt>
                            <dd className="font-display font-bold text-2xl tabular-nums text-[#141413]">{row.value}</dd>
                          </div>
                          <div className="mt-1.5 h-2 rounded-full bg-[#e8e6dc]" aria-hidden="true">
                            <div
                              className="h-2 rounded-full"
                              style={{ width: `${Math.max(2, (row.n / max) * 100)}%`, background: row.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-5 text-[15px] text-[#141413]/70">
                      <span className="font-display font-semibold text-[#141413]">{c.human}: </span>
                      {r.human[lang]}
                    </p>
                    {r.quote && (
                      <blockquote className="mt-4 border-l-2 border-[#d97757] pl-4 font-serif italic text-[#141413]/80">
                        &ldquo;{r.quote[lang]}&rdquo;
                      </blockquote>
                    )}
                    <a
                      href={waLink(c.waText(r.task[lang], b, a))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto pt-6 font-display font-semibold text-[15px] text-[#141413] hover:text-[#d97757] transition-colors"
                    >
                      {c.wa} &rarr;
                    </a>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {LOG.length > 0 && (
          <div className={RESULTS.length > 0 ? 'mt-14' : ''}>
            <h3 className="font-display font-semibold text-xl text-[#141413]">{c.logTitle}</h3>
            <p className="mt-2 text-[#141413]/70 max-w-2xl">{c.logBody}</p>
            <ol className="mt-6 rounded-2xl bg-[#141413] text-[#faf9f5] p-5 md:p-7 font-mono text-[13px] md:text-sm leading-relaxed overflow-x-auto">
              {LOG.map((l, i) => (
                <li key={i} className="grid grid-cols-[3.5rem_1fr] gap-x-3 py-1.5 border-b border-white/10 last:border-0">
                  <span className="text-white/40 tabular-nums">{l.time}</span>
                  <span>
                    {l.text[lang]}{' '}
                    <span style={{ color: OUTCOME_COLOR[l.outcome] }}>
                      · {c.outcome[l.outcome]}
                    </span>
                    {l.note && <span className="block text-white/60">&ldquo;{l.note[lang]}&rdquo;</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsSection;
