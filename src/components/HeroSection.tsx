import { useCopy } from '@/lib/i18n';
import { waLink } from '@/lib/contact';

const COPY = {
  id: {
    eyebrow: 'Software studio di Jakarta · AI agent untuk bisnis',
    title: 'AI agent yang mengerjakan kerjaan berulang di bisnismu. Timmu tetap pegang kendali.',
    body:
      'Balas chat pesanan, rekap penjualan, follow-up leads, isi data dari dokumen: agent kami menyiapkan semuanya, timmu tinggal cek dan setujui. Tidak ada yang terkirim sendiri. Kami bangun di atas alat yang sudah kamu pakai, lalu serahkan lengkap dengan panduan dan pelatihan.',
    primary: 'Cek kesiapan AI bisnismu',
    secondary: 'Lihat cara kerja agent',
    wa: 'Atau tanya langsung lewat WhatsApp',
    waText: 'Halo Kuon Studio, saya mau tanya soal AI agent untuk bisnis saya.',
    points: [
      { accent: '#d97757', t: 'Mulai dari satu alur kerja', d: 'Pilot 2 minggu, harga tetap setelah scope.' },
      { accent: '#6a9bcc', t: 'Manusia yang menyetujui', d: 'Agent menyiapkan, staf yang memutuskan.' },
      { accent: '#788c5d', t: 'Milikmu sepenuhnya', d: 'Kode, akun, data, dan panduan jadi milikmu.' },
    ],
  },
  en: {
    eyebrow: 'Software studio in Jakarta · AI agents for business',
    title: 'AI agents that do the repetitive work in your business. Your team stays in control.',
    body:
      'Order replies, sales recaps, lead follow-ups, data entry from documents: our agents prepare the work, your team checks and approves. Nothing sends itself. We build on the tools you already use, then hand everything over with a guide and training.',
    primary: 'Check your AI readiness',
    secondary: 'See how agents work',
    wa: 'Or ask us on WhatsApp',
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
