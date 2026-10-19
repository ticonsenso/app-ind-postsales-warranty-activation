import { FileText, MessageSquare, ShoppingCart, Wrench } from 'lucide-react';

import { CONTACT, EXTERNAL_LINKS } from '@/config/site';

import { RegisterWarrantyCard } from './RegisterWarrantyCard';
import { ServiceCard } from './ServiceCard';

interface ServicesSectionProps {
  /** Opens the "how do you prefer to contact us" sheet. */
  onRequestTechnicalService: () => void;
}

/** Primary registration card followed by the secondary after-sales services. */
export function ServicesSection({ onRequestTechnicalService }: ServicesSectionProps) {
  return (
    <div className="py-2">
      <RegisterWarrantyCard />

      <div className="grid gap-3 tablet:grid-cols-2">
        <ServiceCard
          icon={Wrench}
          title="Solicitar instalación o servicio técnico"
          description="Deja tu equipo en manos de nuestros técnicos expertos. Agenda la visita de nuestro Centro de Servicio Autorizado para garantizar una instalación segura, mantenimiento o reparación."
          onSelect={onRequestTechnicalService}
        />
        <ServiceCard
          icon={MessageSquare}
          title="Hablar con un asesor"
          description="Estamos aquí para escucharte y resolver tus requerimientos. Recibe atención ágil y personalizada a través de nuestro call center o por WhatsApp, de lunes a sábado."
          href={CONTACT.callCenter.href}
        />
        <ServiceCard
          icon={ShoppingCart}
          title="Comprar repuestos y accesorios"
          description="Mantén tu electrodoméstico funcionando como el primer día. Adquiere repuestos 100 % originales y accesorios diseñados para prolongar la vida útil de tu equipo con total garantía."
          href={EXTERNAL_LINKS.spareParts}
        />
        <ServiceCard
          icon={FileText}
          title="Catálogo y manuales"
          description="Conoce cada detalle de tu equipo. Descarga las fichas técnicas, los manuales de uso y las guías prácticas paso a paso para aprovechar al máximo tu producto."
          href={EXTERNAL_LINKS.catalog}
        />
      </div>
    </div>
  );
}
