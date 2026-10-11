import { useCopy, useLang } from '@/lib/i18n';
import { waLink } from '@/lib/contact';
import { COUNTERS } from '@/lib/proof';

const COPY = {
  id: {
    eyebrow: 'Software studio di Jakarta · AI agent untuk bisnis',
    title: 'Agent kami membuang nomor WhatsApp yang dikarang AI-nya sendiri.',
    body:
      'Kalau nomornya tidak tertulis di situs sumber, Selisik, agent pencari klien kami, tidak menyimpannya. Aturan sekecil ini yang kami pasang di setiap agent untuk bisnismu, dari balas chat pesanan, rekap penjualan, follow-up leads, sampai isi data dari dokumen. Hasil kerjanya bisa dicek ke sumber, dan tidak ada yang terkirim sebelum timmu setuju.',
    primary: 'Cek kesiapan AI bisnismu',
    secondary: 'Lihat cara kerja agent',
    wa: 'Atau tanya langsung lewat WhatsApp',
    asOf: 'Diambil dari database Selisik dan Cadence per',
    waText: 'Halo Kuon Studio, saya mau tanya soal AI agent untuk bisnis saya.',
    points: [
      { accent: '#d97757', t: 'Mulai dari satu alur kerja', d: 'Pilot 2 minggu, harga tetap setelah scope.' },
      { accent: '#6a9bcc', t: 'Manusia yang menyetujui', d: 'Agent menyiapkan, staf yang memutuskan.' },
      { accent: '#788c5d', t: 'Milikmu sepenuhnya', d: 'Kode, akun, data, dan panduan jadi milikmu.' },
    ],
  },
  en: {
    eyebrow: 'Software studio in Jakarta · AI agents for business',
    title: 'Our agent throws out WhatsApp numbers its own AI made up.',
    body:
      'If a number is not written on the source website, Selisik, our client-finding agent, does not keep it. We put rules this small into every agent we build for your business, from order replies and sales recaps to lead follow-ups and data entry from documents. Every result can be checked against its source, and nothing goes out until your team approves it.',
    primary: 'Check your AI readiness',
    secondary: 'See how agents work',
    wa: 'Or ask us on WhatsApp',
    asOf: 'Taken from the Selisik and Cadence databases on',
    waText: 'Hi Kuon Studio, I would like to ask about AI agents for my business.',
    points: [
      { accent: '#d97757', t: 'Start with one workflow', d: 'A 2-week pilot, fixed price after scoping.' },
      { accent: '#6a9bcc', t: 'Humans approve', d: 'The agent prepares, your staff decides.' },
      { accent: '#788c5d', t: 'You own all of it', d: 'Code, accounts, data, and the guide are yours.' },
    ],
  },
};

const HeroSection = () => {
  const c = useCopy(COPY);
  const { lang } = useLang();
  return (
    <section id="top" className="pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow animate-rise">{c.eyebrow}</p>
          <h1 className="mt-4 font-display font-bold text-[clamp(2.1rem,5.5vw,3.6rem)] text-[#141413] animate-rise animation-delay-100">
            {c.title}
          </h1>
          <p className="mt-6 text-lg text-[#141413]/70 animate-rise animation-delay-200">{c.body}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-rise animation-delay-200">
            <a href="#readiness" className="btn-primary">
              {c.primary}
            </a>
            <a href="#agent" className="btn-secondary">
              {c.secondary}
            </a>
          </div>
          <a
            href={waLink(c.waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-display font-semibold text-[15px] text-[#141413] hover:text-[#d97757] transition-colors"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#788c5d]" aria-hidden="true" />
            {c.wa} &rarr;
          </a>
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[15px]">
            {c.points.map((p) => (
              <div key={p.t} className="border-t-2 pt-3" style={{ borderColor: p.accent }}>
                <dt className="font-display font-semibold text-[#141413]">{p.t}</dt>
                <dd className="text-[#141413]/60">{p.d}</dd>
              </div>
            ))}
          </dl>
          {COUNTERS.length > 0 && (
            <div className="mt-10 border-t border-[#e8e6dc] pt-6">
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {COUNTERS.map((n) => (
                  <div key={n.label.id}>
                    <dt className="sr-only">{n.label[lang]}</dt>
                    <dd className="font-display font-bold text-3xl text-[#141413] tabular-nums">{n.value}</dd>
                    <dd className="mt-1 text-sm text-[#141413]/60">{n.label[lang]}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-[#141413]/50">{c.asOf} {COUNTERS[0].asOf}.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
