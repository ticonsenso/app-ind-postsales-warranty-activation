import { http } from 'msw';
import { describe, expect, it } from 'vitest';

import { API_URL, failure, PROMOTION_FIXTURE, success } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';

import { getPromotions } from './promotions-api';

describe('getPromotions (GET /v1/promotions)', () => {
  it('maps the Creatio columns to the promotion model', async () => {
    await expect(getPromotions()).resolves.toEqual([
      {
        id: PROMOTION_FIXTURE.Id,
        name: 'Lavadora 3KG',
        imageUrl: 'https://cdn.example.com/lavadora.png',
        altText: 'Lavadora de 3 kilos',
        linkUrl: 'https://indurama.com/lavadora',
        opensInNewTab: true,
      },
    ]);
  });

  it('resolves an empty list when there are no promotions', async () => {
    server.use(http.get(`${API_URL}/promotions`, () => success([])));

    await expect(getPromotions()).resolves.toEqual([]);
  });

  it('keeps the banner but drops a link that is not http(s)', async () => {
    server.use(
      http.get(`${API_URL}/promotions`, () =>
        success([{ ...PROMOTION_FIXTURE, INDLinkDestino: 'javascript:alert(1)' }]),
      ),
    );

    await expect(getPromotions()).resolves.toMatchObject([{ linkUrl: null }]);
  });

  it('drops a promotion whose image is not an http(s) URL', async () => {
    server.use(
      http.get(`${API_URL}/promotions`, () =>
        success([{ ...PROMOTION_FIXTURE, INDImageUrl: 'data:text/html,x' }]),
      ),
    );

    await expect(getPromotions()).resolves.toEqual([]);
  });

  it('rejects with INVALID_RESPONSE when the payload does not match the contract', async () => {
    server.use(http.get(`${API_URL}/promotions`, () => success([{ Id: 1 }])));

    await expect(getPromotions()).rejects.toMatchObject({ code: 'INVALID_RESPONSE' });
  });

  it('rejects with the backend error code on failures', async () => {
    server.use(http.get(`${API_URL}/promotions`, () => failure(429, 'TOO_MANY_REQUESTS')));

    await expect(getPromotions()).rejects.toMatchObject({ code: 'TOO_MANY_REQUESTS', status: 429 });
  });
});
