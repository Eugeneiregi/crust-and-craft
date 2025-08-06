import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/HeroSection";
import { MenuPreview } from "@/components/MenuPreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MenuPreview />
      <Footer />
    </div>
  );
};

export default Index;
