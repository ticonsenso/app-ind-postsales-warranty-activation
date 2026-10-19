import { Container } from '@/shared/components/Container';

/** Landing headline with the brand glow behind it. */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-[52px] pb-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 size-[760px] -translate-x-1/2 translate-y-[42%] bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_30%,transparent),transparent_62%)]"
      />
      <Container className="relative text-center">
        <h1 className="mx-auto max-w-[15ch] text-[clamp(30px,7.6vw,52px)] leading-[1.08] font-extrabold text-white">
          Tu producto ya está <span className="text-accent">en casa</span>. Ahora activa su
          respaldo.
        </h1>
        <p className="mx-auto mt-4 max-w-[46ch] text-[16.5px] font-light text-mist-400">
          Cada cliente tiene una historia, y queremos que la tuya con Indurama esté respaldada en
          todo momento. Activa tu garantía de fábrica y transforma tu experiencia accediendo a un
          soporte directo, cercano y especializado.
        </p>
      </Container>
    </section>
  );
}
