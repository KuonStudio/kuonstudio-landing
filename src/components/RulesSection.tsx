import { useCopy } from '@/lib/i18n';

const SELISIK = { name: 'Selisik', accent: '#d97757', url: 'https://selisik.kuonstudio.com' };
const CADENCE = { name: 'Cadence', accent: '#6a9bcc', url: 'https://cadence.kuonstudio.com' };

// Every rule here is enforced in the Selisik or Cadence code today. Do not add one that is not.
const COPY = {
  id: {
    eyebrow: 'Aturan',
    title: 'Enam aturan yang jalan hari ini di dua agent kami.',
    body: 'Buka aplikasinya dan cek sendiri.',
    check: 'Cek di',
    rules: [
      {
        app: SELISIK,
        rule: 'Pesan pembuka paling panjang 60 kata, tanpa tautan, dan ditutup satu pertanyaan yang cukup dijawab ya atau tidak.',
      },
      {
        app: SELISIK,
        rule: 'Nomor telepon dan email cuma disimpan kalau tertulis di halaman sumbernya. Kontak yang diusulkan AI tapi tidak ada di halaman dibuang.',
      },
      {
        app: SELISIK,
        rule: 'Situs yang menjual jasa yang sama dengan profesimu dibuang sebelum dianalisis.',
      },
      {
        app: CADENCE,
        rule: 'Angka di naskah yang tidak ada di sumbernya ditandai sebelum naskah diproduksi.',
      },
      {
        app: CADENCE,
        rule: 'Ide yang maknanya mirip dengan ide yang pernah kamu tolak dibuang otomatis.',
      },
      {
        app: CADENCE,
        rule: 'Naskah yang masih memuat "merupakan", "tersebut", atau "di era" ditahan sampai kalimatnya dibersihkan.',
      },
    ],
    closing: 'Aturan untuk agent di bisnismu kami tulis bareng kamu di minggu pertama pilot.',
    cta: 'Lihat cara pilotnya',
  },
  en: {
    eyebrow: 'Rules',
    title: 'Six rules running today in our two agents.',
    body: 'Open the apps and check for yourself.',
    check: 'Check in',
    rules: [
      {
        app: SELISIK,
        rule: 'Opening messages are at most 60 words, carry no links, and end with one question that a yes or no answers.',
      },
      {
        app: SELISIK,
        rule: 'A phone number or email is kept only if it is written on the source page. Contacts the AI suggests that are not on the page are thrown out.',
      },
      {
        app: SELISIK,
        rule: 'Websites selling the same service you sell are dropped before analysis.',
      },
      {
        app: CADENCE,
        rule: 'Any number in a script that does not appear in its sources is flagged before the script is produced.',
      },
      {
        app: CADENCE,
        rule: 'Ideas whose meaning is close to an idea you already rejected are dropped automatically.',
      },
      {
        app: CADENCE,
        rule: 'Indonesian scripts that still contain stiff report words like "merupakan" or "tersebut" are held until the sentence is rewritten.',
      },
    ],
    closing: 'We write the rules for your agent with you in week one of the pilot.',
    cta: 'See how the pilot works',
  },
};

const RulesSection = () => {
  const c = useCopy(COPY);
  return (
    <section id="rules" className="py-16 md:py-24 bg-white border-y border-[#e8e6dc]">
      <div className="wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413] max-w-3xl">{c.title}</h2>
        <p className="mt-4 text-lg text-[#141413]/70 max-w-2xl">{c.body}</p>

        <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.rules.map((r, i) => (
            <li key={r.rule} className="card-studio">
              <div className="flex items-center justify-between gap-3">
                <span className="font-display font-semibold text-sm tabular-nums text-[#141413]/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <a
                  href={r.app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-display font-semibold text-xs text-[#141413]/60 hover:text-[#141413] transition-colors"
                >
                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: r.app.accent }} aria-hidden="true" />
                  {c.check} {r.app.name} &rarr;
                </a>
              </div>
              <p className="mt-4 font-display font-semibold text-lg leading-snug text-[#141413]">{r.rule}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <p className="text-lg text-[#141413] max-w-xl">{c.closing}</p>
          <a href="#process" className="btn-secondary shrink-0">
            {c.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
