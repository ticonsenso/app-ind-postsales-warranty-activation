import { useState } from 'react';

import { EXTERNAL_LINKS } from '@/config/site';
import { Container } from '@/shared/components/Container';
import { SiteHeader } from '@/shared/components/SiteHeader';

import { PromotionGrid } from './PromotionGrid';
import { ContactSheet } from './ContactSheet';
import { HeroSection } from './HeroSection';
import { LandingFooter } from './LandingFooter';
import { ServicesSection } from './ServicesSection';

/** After-sales landing: entry point to the warranty registration and other services. */
export function LandingPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openContact = () => {
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-night-900 text-mist-100 selection:bg-accent">
      <SiteHeader
        tone="dark"
        linkLabel="Ir a indurama.com"
        linkHref={EXTERNAL_LINKS.website}
        linkNewTab
      />
      <main>
        <HeroSection />
        <Container>
          <ServicesSection onRequestTechnicalService={openContact} />
          <PromotionGrid />
        </Container>
      </main>
      <LandingFooter onRequestTechnicalService={openContact} />
      <ContactSheet
        open={isContactOpen}
        onClose={() => {
          setIsContactOpen(false);
        }}
      />
    </div>
  );
}
