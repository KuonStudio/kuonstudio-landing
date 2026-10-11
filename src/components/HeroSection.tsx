import { useCopy, useLang } from '@/lib/i18n';
import { COUNTERS } from '@/lib/proof';

const COPY = {
  id: {
    eyebrow: 'Software studio di Jakarta · AI agent untuk bisnis',
    title: 'Agent kami menilai 342 bisnis. Cuma 14 yang dibuatkan pesan.',
    body:
      '328 sisanya ditolak sebelum satu kalimat pun ditulis. Itu Selisik, agent pencari klien yang kami pakai sendiri. Kami membangun agent seperti itu untuk kerjaan berulang di bisnismu, dan tidak ada yang terkirim sebelum timmu menekan setuju.',
    primary: 'Cek kesiapan AI bisnismu',
    secondary: 'Lihat cara kerja agent',
    contact: 'Atau ceritakan kerjaannya',
    asOf: 'Data pemakaian Selisik, 18 pencarian sampai',
  },
  en: {
    eyebrow: 'Software studio in Jakarta · AI agents for business',
    title: 'Our agent scored 342 businesses. It drafted a message for 14.',
    body:
      'The other 328 were turned down before a single sentence was written. That is Selisik, the client-finding agent we run ourselves. We build agents like it for the repetitive work in your business, and nothing goes out until your team taps approve.',
    primary: 'Check your AI readiness',
    secondary: 'See how agents work',
    contact: 'Or tell us about the work',
    asOf: 'Selisik usage data, 18 searches up to',
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
            href="#contact"
            className="mt-5 inline-flex items-center gap-2 font-display font-semibold text-[15px] text-[#141413] hover:text-[#d97757] transition-colors"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#788c5d]" aria-hidden="true" />
            {c.contact} &rarr;
          </a>
          {COUNTERS.length > 0 && (
            <div className="mt-10 border-t border-[#e8e6dc] pt-6">
              <dl className="grid grid-cols-3 gap-6">
                {COUNTERS.map((n) => (
                  <div key={n.label.id}>
                    <dt className="sr-only">{n.label[lang]}</dt>
                    <dd className="font-display font-bold text-3xl text-[#141413] tabular-nums">{n.value.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')}</dd>
                    <dd className="mt-1 text-sm text-[#141413]/60">{n.label[lang]}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-[#141413]/50">{c.asOf} {COUNTERS[0].asOf[lang]}.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
