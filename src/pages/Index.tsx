import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AgentDemo from '@/components/AgentDemo';
import LabsSection from '@/components/LabsSection';
import UseCasesSection from '@/components/UseCasesSection';
import ReadinessQuiz from '@/components/ReadinessQuiz';
import WorkSection from '@/components/WorkSection';
import PilotSection from '@/components/PilotSection';
import AccessSection from '@/components/AccessSection';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { LangProvider, useCopy } from '@/lib/i18n';

const SKIP = { id: 'Langsung ke isi', en: 'Skip to content' };

const Page = () => {
  const skip = useCopy(SKIP);
  return (
    <div className="relative min-h-screen bg-[#faf9f5] text-[#141413]">
      <a
        href="#agent"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-[#141413] focus:text-[#faf9f5] focus:px-4 focus:py-2 focus:rounded-full"
      >
        {skip}
      </a>

      <Navbar />

      <main>
        <HeroSection />
        <AgentDemo />
        <LabsSection />
        <UseCasesSection />
        <ReadinessQuiz />
        <WorkSection />
        <PilotSection />
        <AccessSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

const Index = () => (
  <LangProvider>
    <Page />
  </LangProvider>
);

export default Index;
