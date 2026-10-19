import { Check } from 'lucide-react';

import { ActionRow } from '@/shared/components/ActionRow';
import { Button } from '@/shared/components/Button';
import { IconBadge } from '@/shared/components/IconBadge';
import { useFocusOnMount } from '@/shared/hooks/use-focus-on-mount';

interface ActivationSuccessProps {
  onBackHome: () => void;
}

/** Confirmation shown once the warranty is active. */
export function ActivationSuccess({ onBackHome }: ActivationSuccessProps) {
  const titleRef = useFocusOnMount<HTMLHeadingElement>();

  return (
    <div className="pt-4 pb-2 text-center">
      <IconBadge tone="success" size="2xl" className="mx-auto mb-5">
        <Check className="size-[34px]" strokeWidth={2.4} />
      </IconBadge>
      <h2 ref={titleRef} tabIndex={-1} className="mb-2.5 text-[27px] outline-hidden">
        Tu garantía quedó activa
      </h2>
      <p className="mx-auto mt-[18px] max-w-[44ch] font-light text-ink-muted">
        Consulte su póliza de garantía para conocer las condiciones y el período de cobertura de su
        producto.
      </p>

      <ActionRow align="center">
        <Button onClick={onBackHome}>Volver al inicio</Button>
      </ActionRow>
    </div>
  );
}
