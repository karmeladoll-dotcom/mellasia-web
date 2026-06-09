import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProductSection from '@/components/ProductSection';
import PortfolioSection from '@/components/PortfolioSection';
import ReelSection from '@/components/ReelSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import GoldParticles from '@/components/GoldParticles';

export default function Home() {
  return (
    <>
      <GoldParticles />
      <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <PortfolioSection />
      <ReelSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
      </main>
    </>
  );
}
