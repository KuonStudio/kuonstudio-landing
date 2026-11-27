import { useCopy } from '@/lib/i18n';
import { waLink } from '@/lib/contact';

const COPY = {
  id: {
    eyebrow: 'Software studio · Jakarta',
    title: 'Kami membuat AI agent untuk tim penjualan, layanan pelanggan, dan operasional.',
    body:
      'Kalau pesanan masuk lewat WhatsApp, siapa yang menyalinnya ke daftar pesanan? Kami membuat agent yang mencatat pesanan dan menyiapkan balasan di alat yang sudah timmu pakai.',
    primary: 'Bahas proyek lewat WhatsApp',
    primaryText: 'Halo Kuon Studio, saya mau bahas proyek AI agent untuk bisnis saya.',
    secondary: 'Coba Kuon AI',
    secondaryHref: '#kuon',
    points: [
      { accent: '#d97757', t: 'Pilot 2 minggu', d: 'Harga tetap setelah lingkup kerja disepakati.' },
      { accent: '#6a9bcc', t: 'Staf yang menyetujui', d: 'Agent menyiapkan, timmu memutuskan.' },
      { accent: '#788c5d', t: 'Kode dan data milikmu', d: 'Serah terima lengkap dengan panduan.' },
    ],
  },
  en: {
    eyebrow: 'Software studio · Jakarta',
    title: 'We build AI agents for sales, customer service and operations teams.',
    body:
      'When an order comes in on WhatsApp, who copies it into the order sheet? We build agents that log the order and draft a reply in the tools your team already uses.',
    primary: 'Discuss a project on WhatsApp',
    primaryText: 'Hi Kuon Studio, I would like to discuss an AI agent project for my business.',
    secondary: 'Try Kuon AI',
    secondaryHref: '#kuon',
    points: [
      { accent: '#d97757', t: '2-week pilot', d: 'Fixed price once the scope is agreed.' },
      { accent: '#6a9bcc', t: 'Your staff approve', d: 'The agent prepares, your team decides.' },
      { accent: '#788c5d', t: 'You own the code', d: 'Handover includes code and a guide.' },
    ],
  },
};

const HeroSection = () => {
  const c = useCopy(COPY);
  return (
    <section className="pt-28 md:pt-36 pb-10 md:pb-14 bg-white border-b border-[#e8e6dc]">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="mt-4 font-display font-bold text-[clamp(1.85rem,4.4vw,3rem)] text-[#141413]">
            {c.title}
          </h1>
          <p className="mt-6 text-lg text-[#141413]/70">{c.body}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={waLink(c.primaryText)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {c.primary}
            </a>
            <a href={c.secondaryHref} className="btn-secondary">
              {c.secondary} &rarr;
            </a>
          </div>
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
