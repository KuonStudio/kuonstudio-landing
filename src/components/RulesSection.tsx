import { useCopy } from '@/lib/i18n';
import { waLink } from '@/lib/contact';

const SELISIK = { name: 'Selisik', accent: '#d97757', url: 'https://selisik.kuonstudio.com' };
const CADENCE = { name: 'Cadence', accent: '#6a9bcc', url: 'https://cadence.kuonstudio.com' };

// Every rule here is enforced in the Selisik or Cadence code today. Do not add one that is not.
const COPY = {
  id: {
    eyebrow: 'Detail kecil',
    title: 'Kami tidak menulis "akurat" atau "aman" di sini. Ini aturannya.',
    body: 'Semua aturan di bawah jalan sekarang di dua agent yang kami pakai sendiri setiap hari. Buka aplikasinya dan cek.',
    why: 'Buat bisnismu',
    check: 'Cek di',
    rules: [
      {
        app: SELISIK,
        rule: 'Pesan pembuka paling panjang 60 kata, tanpa tautan, dan ditutup satu pertanyaan yang cukup dijawab ya atau tidak.',
        why: 'Pertanyaan yang gampang dijawab lebih sering dibalas. Tawaran jasa baru dikirim setelah mereka membalas.',
      },
      {
        app: SELISIK,
        rule: 'Calon klien dengan skor 1 sampai 5 tidak dibuatkan draf pesan.',
        why: 'Timmu tidak buang waktu menghubungi bisnis yang tidak cocok.',
      },
      {
        app: SELISIK,
        rule: 'Situs yang menjual jasa yang sama dengan profesimu dibuang sebelum dianalisis.',
        why: 'Kompetitor tidak masuk daftar calon klien, dan biaya AI tidak terpakai untuk mereka.',
      },
      {
        app: CADENCE,
        rule: 'Angka di naskah yang tidak ada di sumbernya ditandai sebelum naskah diproduksi.',
        why: 'Akunmu tidak ikut menyebar statistik karangan.',
      },
      {
        app: CADENCE,
        rule: 'Ide yang maknanya mirip dengan ide yang pernah kamu tolak dibuang otomatis.',
        why: 'Cukup sekali menolak. Ide yang sama tidak datang lagi dengan judul lain.',
      },
      {
        app: CADENCE,
        rule: 'Naskah yang masih memuat "merupakan", "tersebut", atau "di era" ditahan sampai kalimatnya dibersihkan.',
        why: 'Penonton cepat mengenali tulisan AI. Naskah yang lolos terdengar seperti orang ngobrol.',
      },
    ],
    closing: 'Aturan seperti ini kami tulis bareng kamu di minggu pertama pilot, sebelum agent-nya dibangun.',
    wa: 'Tanya aturan untuk bisnismu',
    waText: 'Halo Kuon Studio, saya baca soal agent yang membuang nomor WA karangan AI. Untuk bisnis saya, aturan seperti itu kira-kira apa ya?',
  },
  en: {
    eyebrow: 'Small details',
    title: 'You will not find "accurate" or "safe" on this page. Here are the rules instead.',
    body: 'Every rule below runs today in the two agents we use ourselves every day. Open the apps and check.',
    why: 'For your business',
    check: 'Check in',
    rules: [
      {
        app: SELISIK,
        rule: 'Opening messages are at most 60 words, carry no links, and end with one question that a yes or no answers.',
        why: 'Easy questions get more replies. The actual offer goes out only after they reply.',
      },
      {
        app: SELISIK,
        rule: 'Leads scored 1 to 5 get no draft message.',
        why: 'Your team does not spend time on businesses that are a poor fit.',
      },
      {
        app: SELISIK,
        rule: 'Websites selling the same service you sell are dropped before analysis.',
        why: 'Competitors stay off your lead list, and no AI cost is spent on them.',
      },
      {
        app: CADENCE,
        rule: 'Any number in a script that does not appear in its sources is flagged before the script is produced.',
        why: 'Your account does not spread made-up statistics.',
      },
      {
        app: CADENCE,
        rule: 'Ideas whose meaning is close to an idea you already rejected are dropped automatically.',
        why: 'Reject once. The same idea does not come back under a new title.',
      },
      {
        app: CADENCE,
        rule: 'Indonesian scripts that still contain stiff report words like "merupakan" or "tersebut" are held until the sentence is rewritten.',
        why: 'Viewers spot AI writing fast. Scripts that pass sound like a person talking.',
      },
    ],
    closing: 'We write rules like these with you in week one of the pilot, before the agent is built.',
    wa: 'Ask which rules fit your business',
    waText: 'Hi Kuon Studio, I read about the agent that drops WhatsApp numbers its AI made up. What would rules like that look like for my business?',
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
            <li key={r.rule} className="card-studio flex flex-col">
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
              <div className="mt-auto pt-5">
                <p className="mt-0 border-t border-[#e8e6dc] pt-4 text-[15px] text-[#141413]/70">
                  <span className="font-display font-semibold text-[#141413]">{c.why}: </span>
                  {r.why}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <p className="text-lg text-[#141413] max-w-xl">{c.closing}</p>
          <a href={waLink(c.waText)} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
            {c.wa}
          </a>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
