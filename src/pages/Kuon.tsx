import Navbar from "@/components/Navbar";
import KuonShowcaseSection from "@/components/KuonShowcaseSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { LangProvider } from "@/lib/i18n";

const KuonPage = () => (
  <LangProvider>
    <div className="relative min-h-screen bg-[#faf9f5] text-[#141413]">
      <Navbar />
      <main>
        <KuonShowcaseSection standalone />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  </LangProvider>
);

export default KuonPage;
