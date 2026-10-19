import { useState } from 'react';

import { Skeleton } from '@/shared/components/Skeleton';
import { useRequest } from '@/shared/hooks/use-request';

import { getPromotions, type Promotion } from '../api/promotions/promotions-api';

const SKELETON_KEYS = ['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4'];
const CARD_CLASS = 'overflow-hidden rounded-card border border-white/10 bg-night-800';

/** Banner-sized placeholder; static (`pulsing` false) when nothing is coming to replace it. */
function BannerSkeleton({ pulsing }: { pulsing: boolean }) {
  return (
    <li aria-hidden="true" className={`${CARD_CLASS} aspect-square`}>
      <Skeleton animated={pulsing} className="size-full" />
    </li>
  );
}

function PromotionCard({ promotion }: { promotion: Promotion }) {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'failed'>('loading');
  if (imageStatus === 'failed') return <BannerSkeleton pulsing={false} />;

  const image = (
    <img
      src={promotion.imageUrl}
      alt={promotion.altText}
      loading="lazy"
      onLoad={() => {
        setImageStatus('loaded');
      }}
      onError={() => {
        setImageStatus('failed');
      }}
      className={`aspect-square w-full object-cover transition-opacity duration-300 ${
        imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );

  return (
    <li className={`${CARD_CLASS} group relative`}>
      {/* Visible until the image has loaded. */}
      {imageStatus === 'loading' && <Skeleton className="absolute inset-0" />}
      {promotion.linkUrl ? (
        <a
          href={promotion.linkUrl}
          {...(promotion.opensInNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
          className="relative block"
        >
          {image}
        </a>
      ) : (
        image
      )}
      {/* Veil over the banner that lightens on hover/focus; it must not capture clicks. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-200 group-focus-within:bg-black/0 group-hover:bg-black/0"
      />
    </li>
  );
}

/**
 * Promotional banners from the backend (`GET /v1/promotions`). While the request is loading, and
 * also if it fails, the section shows skeletons so the landing keeps its layout; each banner shows
 * its own skeleton until its image has loaded. If the backend answers with no promotions, the
 * section is hidden.
 */
export function PromotionGrid() {
  const { status, data } = useRequest(getPromotions);

  if (status === 'success' && data?.length === 0) return null;

  return (
    <section aria-labelledby="promotions-title" aria-busy={status === 'loading'}>
      <h2 id="promotions-title" className="mt-11 mb-4 text-[21px] text-white">
        Promociones
      </h2>
      <ul className="grid grid-cols-2 gap-3 tablet:grid-cols-4">
        {status === 'success' && data
          ? data.map((promotion) => <PromotionCard key={promotion.id} promotion={promotion} />)
          : SKELETON_KEYS.map((key) => <BannerSkeleton key={key} pulsing={status === 'loading'} />)}
      </ul>
    </section>
  );
}
