/** Application paths. Feature code links to each other through these constants only. */
export const ROUTES = {
  home: '/',
  warranty: {
    root: '/garantia',
    identification: '/garantia/identificacion',
    product: '/garantia/producto',
    invoice: '/garantia/factura',
    confirmation: '/garantia/confirmacion',
  },
} as const;
