import { useCopy } from '@/lib/i18n';
import { EMAIL, waLink } from '@/lib/contact';

const COPY = {
  id: {
    about: 'Software studio di Jakarta. AI agent dan sistem untuk kerjaan harian bisnis, dengan manusia yang menyetujui.',
    wa: 'Halo Kuon Studio, saya mau tanya.',
    base: '© 2026 Kuon Studio. Jakarta, Indonesia.',
    promise: 'Dokumentasi, tes, dan serah terima di setiap proyek.',
  },
  en: {
    about: 'Software studio in Jakarta. AI agents and systems for daily business work, with people approving.',
    wa: 'Hi Kuon Studio, I have a question.',
    base: '© 2026 Kuon Studio. Jakarta, Indonesia.',
    promise: 'Docs, tests, and handover included in every project.',
  },
};

const Footer = () => {
  const c = useCopy(COPY);
  const link = 'text-[#faf9f5]/80 hover:text-[#d97757] transition-colors';
  return (
    <footer className="bg-[#141413] text-[#faf9f5] py-14 md:py-16">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div>
            <p className="font-display font-bold text-xl">Kuon Studio</p>
            <p className="mt-2 text-[#faf9f5]/70 max-w-md">{c.about}</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Footer">
            <a href={waLink(c.wa)} target="_blank" rel="noopener noreferrer" className={link}>
              WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`} className={link}>
              Email
            </a>
            <a href="https://github.com/KuonStudio" target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
            <a href="https://linkedin.com/company/kuonstudio" target="_blank" rel="noopener noreferrer" className={link}>
              LinkedIn
            </a>
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-[#faf9f5]/15 flex flex-col sm:flex-row justify-between gap-2 text-[15px] text-[#faf9f5]/60">
          <p>{c.base}</p>
          <p>{c.promise}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
