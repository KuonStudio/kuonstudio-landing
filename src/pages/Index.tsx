import { useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LabsSection from '@/components/LabsSection';
import MarqueeSection from '@/components/MarqueeSection';
import CTASection from '@/components/CTASection';
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
        <MarqueeSection />
        <CTASection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;