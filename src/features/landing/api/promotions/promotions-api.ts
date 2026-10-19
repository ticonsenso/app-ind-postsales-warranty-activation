import { parseApiData } from '@/shared/api/api-response';
import { httpClient } from '@/shared/api/http-client';

import { promotionsDtoSchema } from './promotions-dto.schema';

/** Promotion banner as the landing shows it. */
export interface Promotion {
  id: string;
  name: string;
  imageUrl: string;
  altText: string;
  /** Destination of the banner; `null` when it has none or it is not a web link. */
  linkUrl: string | null;
  opensInNewTab: boolean;
}

const ALLOWED_PROTOCOLS = ['http:', 'https:'];

/** The URL itself when it is an absolute http(s) URL, otherwise `null` (blocks `javascript:` and the like). */
function toWebUrl(value: string | null): string | null {
  if (value === null) return null;
  try {
    const url = new URL(value);
    return ALLOWED_PROTOCOLS.includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

/**
 * Lists the promotions to show (`GET /v1/promotions`). The backend already filters the active and
 * in-force ones and sorts them, and caches the table.
 *
 * The URLs come from the CRM, so only http(s) ones are kept: a promotion without a valid image is
 * dropped, and an invalid link just makes the banner non-clickable.
 *
 * @param signal - Cancels the request
 * @returns The promotions, in display order
 * @throws {ApiError} When the request fails or the response does not match the contract
 */
export async function getPromotions(signal?: AbortSignal): Promise<Promotion[]> {
  const response = await httpClient.get<unknown>('/promotions', { signal });
  return parseApiData(promotionsDtoSchema, response.data).flatMap((dto) => {
    const imageUrl = toWebUrl(dto.INDImageUrl);
    if (imageUrl === null) return [];
    return [
      {
        id: dto.Id,
        name: dto.INDName,
        imageUrl,
        altText: dto.INDTextoAlternativo,
        linkUrl: toWebUrl(dto.INDLinkDestino),
        opensInNewTab: dto.INDNuevaPestania,
      },
    ];
  });
}
