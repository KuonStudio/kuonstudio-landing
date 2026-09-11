import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LabsSection from '@/components/LabsSection';
import WorkSection from '@/components/WorkSection';
import VisionSection from '@/components/VisionSection';
import MarqueeSection from '@/components/MarqueeSection';
import AccessSection from '@/components/AccessSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-[#faf9f5] text-[#141413]">
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-[#141413] focus:text-[#faf9f5] focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <HeroSection />
        <LabsSection />
        <WorkSection />
        <VisionSection />
        <MarqueeSection />
        <AccessSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
