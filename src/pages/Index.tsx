import { useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PhilosophySection from '@/components/PhilosophySection';
import WorksSection from '@/components/WorksSection';
import TechStackSection from '@/components/TechStackSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Kuon Studio | Engineering Eternity';
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
        <PhilosophySection />
        <WorksSection />
        <TechStackSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
