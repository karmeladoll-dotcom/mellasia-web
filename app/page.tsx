import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedWorkSection from '@/components/FeaturedWorkSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import AudienceSection from '@/components/AudienceSection';
import StudioSection from '@/components/StudioSection';
import LabTeaserSection from '@/components/LabTeaserSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <FeaturedWorkSection />
      <CapabilitiesSection />
      <AudienceSection />
      <StudioSection />
      <LabTeaserSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
