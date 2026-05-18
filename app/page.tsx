import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import PortfolioSection from '@/components/PortfolioSection';
import ReelSection from '@/components/ReelSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <ProductSection />
      <PortfolioSection />
      <ReelSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
