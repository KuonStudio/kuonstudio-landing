import Navbar from '@/components/Navbar';
import ReadinessQuiz from '@/components/ReadinessQuiz';
import Footer from '@/components/Footer';
import { LangProvider } from '@/lib/i18n';

const CekKesiapan = () => (
  <LangProvider>
    <div className="relative min-h-screen bg-[#faf9f5] text-[#141413] pt-24">
      <Navbar />
      <main>
        <ReadinessQuiz standalone />
      </main>
      <Footer />
    </div>
  </LangProvider>
);

export default CekKesiapan;
