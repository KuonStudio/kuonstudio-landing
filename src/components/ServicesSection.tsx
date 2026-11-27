import { useCopy } from '@/lib/i18n';

const ACCENTS = ['#d97757', '#6a9bcc', '#788c5d'];

const COPY = {
  id: {
    eyebrow: 'Layanan',
    title: 'Tiga cara kami mulai.',
    services: [
      {
        title: 'Agent operasional',
        summary: 'Agent yang mencatat pesanan, menyiapkan balasan, dan merekap harian, dengan staf yang menyetujui setiap tindakan.',
      },
      {
        title: 'Asisten dari dokumenmu',
        summary: 'Tanya-jawab dari SOP, katalog, dan kontrak milikmu. Jawaban menunjuk dokumen sumbernya, dan bilang “tidak tahu” kalau jawabannya tidak ada.',
      },
      {
        title: 'Integrasi ke sistem yang ada',
        summary: 'Sistemmu tetap jalan. Kami audit bagian yang layak diotomasi, sambungkan lewat API, dan beri perkiraan biaya AI per bulan sebelum dibangun.',
      },
    ],
    note: 'Setiap proyek selesai dengan kode, dokumentasi, dan sesi serah terima.',
  },
  en: {
    eyebrow: 'Services',
    title: 'Three ways we start.',
    services: [
      {
        title: 'Operations agent',
        summary: 'An agent that logs orders, drafts replies, and writes the daily recap, with your staff approving every action.',
      },
      {
        title: 'Assistant from your documents',
        summary: 'Questions answered from your own SOPs, catalog, and contracts. Answers point to the source document and say “I don’t know” when the answer is not there.',
      },
      {
        title: 'Integration with what you run',
        summary: 'Your system stays. We audit which parts are worth automating, connect through your APIs, and estimate the monthly AI cost before we build.',
      },
    ],
    note: 'Every project ends with code, docs, and a handover session.',
  },
};

const ServicesSection = () => {
  const c = useCopy(COPY);
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">{c.title}</h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {c.services.map((service, i) => (
            <article key={service.title} className="card-studio">
              <div className="card-accent" style={{ background: ACCENTS[i] }} aria-hidden="true" />
              <h3 className="font-display font-semibold text-lg text-[#141413]">{service.title}</h3>
              <p className="mt-2 text-[#141413]/70">{service.summary}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[15px] text-[#141413]/60">{c.note}</p>
      </div>
    </section>
  );
};

export default ServicesSection;
