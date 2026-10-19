import { redirect, type RouteObject } from 'react-router';

import { ROUTES } from '@/config/routes';
import { LandingPage } from '@/features/landing';
import { PageLoader } from '@/shared/components/PageLoader';

import { RootLayout } from './RootLayout';
import { RouteErrorPage } from './RouteErrorPage';

// The warranty flow pulls in the form and validation libraries, which the landing does not need,
// so it is split into its own chunk. The data router shows `HydrateFallback` while it downloads.
const loadWarranty = () => import('@/features/warranty');

export const appRoutes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    HydrateFallback: PageLoader,
    children: [
      { path: ROUTES.home, element: <LandingPage /> },
      {
        path: ROUTES.warranty.root,
        lazy: async () => ({ Component: (await loadWarranty()).WarrantyLayout }),
        children: [
          { index: true, loader: () => redirect(ROUTES.warranty.identification) },
          {
            path: ROUTES.warranty.identification,
            lazy: async () => ({ Component: (await loadWarranty()).IdentificationStep }),
          },
          {
            path: ROUTES.warranty.product,
            lazy: async () => ({ Component: (await loadWarranty()).ProductStep }),
          },
          {
            path: ROUTES.warranty.invoice,
            lazy: async () => ({ Component: (await loadWarranty()).InvoiceStep }),
          },
          {
            path: ROUTES.warranty.confirmation,
            lazy: async () => ({ Component: (await loadWarranty()).ConfirmationStep }),
          },
        ],
      },
    ],
  },
];
