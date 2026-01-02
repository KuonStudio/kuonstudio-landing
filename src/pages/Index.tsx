import { useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LabsSection from '@/components/LabsSection';
import VisionSection from '@/components/VisionSection';
import MarqueeSection from '@/components/MarqueeSection';
import AccessSection from '@/components/AccessSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    document.title = 'Kuon Studios | We Forge Intelligence';
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Custom cursor (desktop only) */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main>
        <HeroSection />
        <LabsSection />
        <VisionSection />
        <MarqueeSection />
        <AccessSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;