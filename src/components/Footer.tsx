const Footer = () => {
  return (
    <footer className="bg-[#141413] text-[#faf9f5] py-14 md:py-16">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div>
            <p className="font-display font-bold text-xl">Kuon Studio</p>
            <p className="mt-2 text-[#faf9f5]/70 max-w-md">
              Software studio in Jakarta. Systems, apps, and automations for daily operations.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Footer">
            <a href="mailto:hello@kuonstudio.com" className="text-[#faf9f5]/80 hover:text-[#d97757] transition-colors">
              Email
            </a>
            <a
              href="https://github.com/KuonStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#faf9f5]/80 hover:text-[#d97757] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/company/kuonstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#faf9f5]/80 hover:text-[#d97757] transition-colors"
            >
              LinkedIn
            </a>
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-[#faf9f5]/15 flex flex-col sm:flex-row justify-between gap-2 text-[15px] text-[#faf9f5]/60">
          <p>© 2026 Kuon Studio. Jakarta, Indonesia.</p>
          <p>Docs, tests, and handover included in every project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
