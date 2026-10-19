import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http } from 'msw';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { readSerialNumberFromFrame } from '@/shared/barcode/indurama-serial-number';
import { mockCamera } from '@/test/camera';
import {
  API_URL,
  CLIENT_FIXTURE,
  EXISTING_DOCUMENT,
  EXISTING_PRODUCT_CODE,
  failure,
  INVOICE_FIXTURE,
  PROMOTION_FIXTURE,
  success,
} from '@/test/msw/handlers';
import { server } from '@/test/msw/server';

import { appRoutes } from './routes';

vi.mock('@/shared/barcode/indurama-serial-number', () => ({ readSerialNumberFromFrame: vi.fn() }));

type User = ReturnType<typeof userEvent.setup>;

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const DOCUMENT_LABEL = 'Cédula o RUC';

interface RecordedWarrantyPost {
  key: string | null;
  fields: Record<string, string>;
  hasFile: boolean;
}

/** Records every `POST /warranties`; `respond(attempt)` (1-based) may override the success. */
function recordWarrantyPosts(
  respond: (attempt: number) => ReturnType<typeof failure> | undefined = () => undefined,
) {
  const posts: RecordedWarrantyPost[] = [];
  server.use(
    http.post(`${API_URL}/warranties`, async ({ request }) => {
      const key = request.headers.get('idempotency-key');
      const fields: Record<string, string> = {};
      let hasFile = false;
      for (const [name, value] of await request.formData()) {
        if (typeof value === 'string') fields[name] = value;
        else if (name === 'invoice') hasFile = true;
      }
      posts.push({ key, fields, hasFile });
      return respond(posts.length) ?? success({ warrantyId: key }, 201);
    }),
  );
  return posts;
}

function renderApp(path: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

const invoiceFile = (name: string, type: string) => new File(['invoice'], name, { type });

async function acceptConsents(user: User) {
  await user.click(screen.getByRole('checkbox', { name: /Política de privacidad/ }));
  await user.click(screen.getByRole('checkbox', { name: /Términos y condiciones de uso/ }));
}

async function search(user: User, documentNumber: string) {
  const field = await screen.findByLabelText(DOCUMENT_LABEL);
  await user.clear(field);
  await user.type(field, documentNumber);
  await user.click(screen.getByRole('button', { name: /Buscar (mis datos|de nuevo)/ }));
}

async function completeIdentification(user: User) {
  await search(user, EXISTING_DOCUMENT);
  await screen.findByText(/Cliente encontrado/);
  await acceptConsents(user);
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
}

/** Opens a searchable dropdown, filters it and picks the option. */
async function pickOption(user: User, label: string, search: string, option: string) {
  await user.click(screen.getByLabelText(label));
  await user.type(screen.getByRole('combobox', { name: `Buscar ${label.toLowerCase()}` }), search);
  await user.click(screen.getByRole('option', { name: option }));
}

async function fillNewCustomer(user: User, documentNumber = '1712345678') {
  await search(user, documentNumber);
  await screen.findByText(/No encontramos este documento/);
  await user.type(screen.getByLabelText('Nombre'), 'Carlos');
  await user.type(screen.getByLabelText('Apellido'), 'Mendoza');
  await user.type(screen.getByLabelText('Correo electrónico'), 'carlos.mendoza@example.com');
  await user.type(screen.getByLabelText('Teléfono'), '+593 99 876 5432');
  // Each dropdown enables the next: país -> provincia -> ciudad.
  await pickOption(user, 'País', 'ecua', 'Ecuador');
  await pickOption(user, 'Provincia', 'azu', 'Azuay');
  await pickOption(user, 'Ciudad', 'cuen', 'CUENCA');
  await acceptConsents(user);
}

async function completeProduct(user: User, code = EXISTING_PRODUCT_CODE) {
  await user.type(await screen.findByLabelText('Número de serie'), code);
  await user.click(screen.getByRole('button', { name: 'Validar producto' }));
  await screen.findByText('Producto identificado.');
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
}

async function uploadInvoice(user: User, file: File) {
  await user.upload(await screen.findByLabelText(/Toma una foto o elige un archivo/), file);
}

/** From the product step to the review of step 4. */
async function continueToConfirmation(user: User) {
  await completeProduct(user);
  await uploadInvoice(user, invoiceFile('factura.pdf', 'application/pdf'));
  await screen.findByText(/Leímos la factura correctamente/);
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  await screen.findByRole('heading', { name: 'Revisa antes de activar' });
}

describe('landing', () => {
  it('shows the promotions from the backend, opening their link in a new tab', async () => {
    renderApp('/');

    const image = await screen.findByAltText(PROMOTION_FIXTURE.INDTextoAlternativo);

    expect(screen.getByRole('heading', { name: 'Promociones' })).toBeInTheDocument();
    expect(image.closest('a')).toHaveAttribute('href', PROMOTION_FIXTURE.INDLinkDestino);
    expect(image.closest('a')).toHaveAttribute('target', '_blank');
  });

  it('keeps skeletons in the promotions section when the request fails', async () => {
    server.use(http.get(`${API_URL}/promotions`, () => failure(500, 'INTERNAL_SERVER_ERROR')));
    renderApp('/');

    await waitFor(() => {
      expect(document.querySelector('section[aria-busy="false"]')).toBeInTheDocument();
    });
    expect(screen.getByRole('heading', { name: 'Promociones' })).toBeInTheDocument();
    expect(screen.queryByAltText(PROMOTION_FIXTURE.INDTextoAlternativo)).not.toBeInTheDocument();
    expect(document.querySelectorAll('section ul li[aria-hidden="true"]')).toHaveLength(4);
  });

  it('hides the promotions section when there are none', async () => {
    server.use(http.get(`${API_URL}/promotions`, () => success([])));
    renderApp('/');

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Promociones' })).not.toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /Empezar el registro/ })).toBeInTheDocument();
  });

  it('opens the contact options from the technical service card', async () => {
    const user = userEvent.setup();
    renderApp('/');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(
      screen.getByRole('button', { name: /Solicitar instalación o servicio técnico/ }),
    );

    const dialog = screen.getByRole('dialog', { name: /¿Cómo prefieres contactarnos?/ });
    expect(within(dialog).getByRole('link', { name: /Llamar al 024001600/ })).toHaveAttribute(
      'href',
      'tel:024001600',
    );
    expect(within(dialog).getByRole('link', { name: /Escribir por WhatsApp/ })).toHaveAttribute(
      'target',
      '_blank',
    );
  });

  it('starts the warranty registration', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('link', { name: /Empezar el registro/ }));

    expect(await screen.findByRole('heading', { name: 'Empecemos por ti' })).toBeInTheDocument();
  });
});

describe('warranty registration', () => {
  it('completes the whole flow for an existing customer', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');

    // Step 1: the known customer arrives prefilled and read-only.
    await search(user, EXISTING_DOCUMENT);
    await screen.findByText(/Cliente encontrado/);
    expect(screen.getByLabelText('Nombre')).toHaveValue('María Fernanda');
    for (const label of ['Nombre', 'Apellido', 'Correo electrónico', 'Teléfono']) {
      expect(screen.getByLabelText(label)).toHaveAttribute('readonly');
    }
    expect(screen.getByLabelText('Correo electrónico')).toHaveValue('mf.sanchez@correo.com');

    // Consents gate the "Continuar" button.
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();
    await acceptConsents(user);
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'Continuar' }));

    // Step 2: the product comes from the CRM.
    expect(
      await screen.findByRole('heading', { name: '¿Qué producto vas a registrar?' }),
    ).toBeInTheDocument();
    await user.type(screen.getByLabelText('Número de serie'), EXISTING_PRODUCT_CODE);
    await user.click(screen.getByRole('button', { name: 'Validar producto' }));
    expect(await screen.findByText('Producto identificado.')).toBeInTheDocument();
    expect(screen.getByText('Heladera')).toBeInTheDocument();
    expect(screen.getByText(`Serie ${EXISTING_PRODUCT_CODE}`)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Continuar' }));

    // Step 3: the invoice data is read by the backend.
    expect(
      await screen.findByRole('heading', { name: 'Sube la factura de compra' }),
    ).toBeInTheDocument();
    await uploadInvoice(user, invoiceFile('factura.pdf', 'application/pdf'));
    await screen.findByText(/Leímos la factura correctamente/);
    expect(screen.getByText('14 de julio de 2026')).toBeInTheDocument();
    expect(screen.getByText('001-002-000032451')).toBeInTheDocument();
    expect(screen.getByText('Marcimex S.A.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Continuar' }));

    // Step 4: review, then register the warranty in the CRM.
    const warrantyPosts = recordWarrantyPosts();
    expect(
      await screen.findByRole('heading', { name: 'Revisa antes de activar' }),
    ).toBeInTheDocument();
    expect(screen.getByText('María Fernanda Sánchez Ordóñez')).toBeInTheDocument();
    expect(screen.getByText('Heladera')).toBeInTheDocument();
    expect(screen.getByText(EXISTING_PRODUCT_CODE)).toBeInTheDocument();
    expect(screen.getByText('14/07/2026')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Activar garantía' }));

    expect(
      await screen.findByRole('heading', { name: 'Tu garantía quedó activa' }),
    ).toBeInTheDocument();
    expect(warrantyPosts).toHaveLength(1);
    expect(warrantyPosts[0]?.key).toMatch(UUID_V4);
    expect(warrantyPosts[0]?.fields).toEqual({
      clientId: CLIENT_FIXTURE.Id,
      INDPP: 'true',
      INDTyC: 'true',
      productId: '0c1d2e3f-0000-4000-8000-000000000001',
      serialNumber: EXISTING_PRODUCT_CODE,
      invoiceNumber: '001-002-000032451',
      purchaseDate: '2026-07-14',
      storeName: 'Marcimex S.A.',
    });
    expect(warrantyPosts[0]?.hasFile).toBe(true);
  });

  it('retries a failed activation with the same idempotency key', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await completeIdentification(user);
    await completeProduct(user);
    await uploadInvoice(user, invoiceFile('factura.pdf', 'application/pdf'));
    await screen.findByText(/Leímos la factura correctamente/);
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    const warrantyPosts = recordWarrantyPosts((attempt) =>
      attempt === 1 ? failure(500, 'CREATIO_UNAVAILABLE') : undefined,
    );

    await user.click(await screen.findByRole('button', { name: 'Activar garantía' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/No pudimos completar la operación/);
    await user.click(screen.getByRole('button', { name: 'Activar garantía' }));

    expect(
      await screen.findByRole('heading', { name: 'Tu garantía quedó activa' }),
    ).toBeInTheDocument();
    expect(warrantyPosts).toHaveLength(2);
    expect(warrantyPosts[1]?.key).toBe(warrantyPosts[0]?.key);
  });

  it('explains why the backend rejected a purchase date in the future', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await completeIdentification(user);
    await completeProduct(user);
    await uploadInvoice(user, invoiceFile('factura.pdf', 'application/pdf'));
    await screen.findByText(/Leímos la factura correctamente/);
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    recordWarrantyPosts(() => failure(422, 'PURCHASE_DATE_IN_FUTURE'));

    await user.click(await screen.findByRole('button', { name: 'Activar garantía' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/posterior a hoy/);
  });

  it('shows an existing customer read-only, even the data the CRM does not have', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(`${API_URL}/clients/:identification`, () =>
        success({ ...CLIENT_FIXTURE, INDApellido: null, Phone: null, INDCorreo: null }),
      ),
    );
    renderApp('/garantia/identificacion');

    await search(user, EXISTING_DOCUMENT);
    await screen.findByText(/Cliente encontrado/);

    expect(screen.getByLabelText('Apellido')).toHaveValue('');
    expect(screen.getByLabelText('Apellido')).toHaveAttribute('readonly');
    expect(screen.getByLabelText('Correo electrónico')).toHaveAttribute('readonly');
    expect(screen.getByLabelText('Teléfono')).toHaveAttribute('readonly');

    // The missing data does not block them: only the consents are required.
    await acceptConsents(user);
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(
      await screen.findByRole('heading', { name: '¿Qué producto vas a registrar?' }),
    ).toBeInTheDocument();
  });

  it('locks the consents the CRM already has and sends them with the warranty', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(`${API_URL}/clients/:identification`, () =>
        success({ ...CLIENT_FIXTURE, INDPP: true, INDTyC: false }),
      ),
    );
    renderApp('/garantia/identificacion');
    await search(user, EXISTING_DOCUMENT);
    await screen.findByText(/Cliente encontrado/);

    const privacy = screen.getByRole('checkbox', { name: /Política de privacidad/ });
    const terms = screen.getByRole('checkbox', { name: /Términos y condiciones de uso/ });
    expect(privacy).toBeChecked();
    expect(privacy).toBeDisabled();
    expect(terms).not.toBeChecked();
    expect(terms).toBeEnabled();

    await user.click(terms);
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    await continueToConfirmation(user);
    const warrantyPosts = recordWarrantyPosts();
    await user.click(screen.getByRole('button', { name: 'Activar garantía' }));

    await screen.findByRole('heading', { name: 'Tu garantía quedó activa' });
    expect(warrantyPosts[0]?.fields).toMatchObject({
      clientId: CLIENT_FIXTURE.Id,
      INDPP: 'true',
      INDTyC: 'true',
    });
  });

  it('registers a new customer together with the warranty, not before', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');

    await fillNewCustomer(user);
    expect(screen.getByLabelText('Nombre')).not.toHaveAttribute('readonly');
    // Any request to the clients endpoints other than the search would fail the test (MSW).
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(
      await screen.findByRole('heading', { name: '¿Qué producto vas a registrar?' }),
    ).toBeInTheDocument();

    await continueToConfirmation(user);
    expect(screen.getByText('Carlos Mendoza')).toBeInTheDocument();
    const warrantyPosts = recordWarrantyPosts();
    await user.click(screen.getByRole('button', { name: 'Activar garantía' }));

    expect(
      await screen.findByRole('heading', { name: 'Tu garantía quedó activa' }),
    ).toBeInTheDocument();
    expect(warrantyPosts).toHaveLength(1);
    expect(warrantyPosts[0]?.key).toMatch(UUID_V4);
    expect(warrantyPosts[0]?.fields).toEqual({
      'newClient[Name]': 'Carlos',
      'newClient[INDApellido]': 'Mendoza',
      'newClient[Phone]': '+593 99 876 5432',
      'newClient[INDCorreo]': 'carlos.mendoza@example.com',
      'newClient[INDNumeroIdentificacion]': '1712345678',
      'newClient[CountryId]': '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
      'newClient[RegionId]': 'e730c7da-f566-4198-b7b2-cbf5bf84dc17',
      'newClient[CityId]': '9f694e54-dbf0-4cf6-a5eb-8f68e41718dd',
      INDPP: 'true',
      INDTyC: 'true',
      productId: '0c1d2e3f-0000-4000-8000-000000000001',
      serialNumber: EXISTING_PRODUCT_CODE,
      invoiceNumber: '001-002-000032451',
      purchaseDate: '2026-07-14',
      storeName: 'Marcimex S.A.',
    });
  });

  it('keeps what a new customer typed when coming back to the first step', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await fillNewCustomer(user);
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    await user.click(await screen.findByRole('button', { name: 'Atrás' }));

    expect(await screen.findByText(/No encontramos este documento/)).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toHaveValue('Carlos');
    expect(screen.getByLabelText('Ciudad')).toHaveTextContent('CUENCA');
    await user.click(screen.getByRole('button', { name: 'Continuar' }));

    expect(
      await screen.findByRole('heading', { name: '¿Qué producto vas a registrar?' }),
    ).toBeInTheDocument();
  });

  it('accepts a passport as identification', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');

    await search(user, 'AB-123456');

    expect(await screen.findByText(/No encontramos este documento/)).toBeInTheDocument();
  });

  it('sends the customer back to search when someone registered the document in the meantime', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await fillNewCustomer(user);
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    await continueToConfirmation(user);
    recordWarrantyPosts(() =>
      failure(
        422,
        'CLIENT_ALREADY_EXISTS',
        'Ya existe un cliente registrado con esa identificación.',
      ),
    );

    await user.click(screen.getByRole('button', { name: 'Activar garantía' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/Vuelve al paso 1/);
    await user.click(screen.getByRole('button', { name: 'Volver al paso 1' }));
    expect(await screen.findByRole('heading', { name: 'Empecemos por ti' })).toBeInTheDocument();
  });

  it('shows a generic error when the customer lookup fails', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(`${API_URL}/clients/:identification`, () => failure(500, 'CREATIO_UNAVAILABLE')),
    );
    renderApp('/garantia/identificacion');

    await search(user, EXISTING_DOCUMENT);

    expect(await screen.findByRole('alert')).toHaveTextContent(/No pudimos completar la operación/);
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('rejects a malformed identification before searching', async () => {
    const user = userEvent.setup();
    let requests = 0;
    server.use(
      http.get(`${API_URL}/clients/:identification`, () => {
        requests += 1;
        return failure(404, 'CLIENT_NOT_FOUND');
      }),
    );
    renderApp('/garantia/identificacion');

    await search(user, '12 34 56');

    expect(
      await screen.findByText('La identificación solo puede tener letras, números y guiones.'),
    ).toBeInTheDocument();
    expect(requests).toBe(0);
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('asks a new customer for their data before moving on', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');

    await search(user, '1712345678');
    await screen.findByText(/No encontramos este documento/);
    await acceptConsents(user);
    await user.click(screen.getByRole('button', { name: 'Continuar' }));

    expect(await screen.findByText('El nombre es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El correo electrónico no es válido.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Empecemos por ti' })).toBeInTheDocument();
  });

  it('rejects a product code that the CRM does not have', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await completeIdentification(user);

    await user.type(await screen.findByLabelText('Número de serie'), '00000000');
    await user.click(screen.getByRole('button', { name: 'Validar producto' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/No encontramos un producto/);
    expect(screen.getByLabelText('Número de serie')).toBeInvalid();
    expect(screen.queryByText('Producto identificado.')).not.toBeInTheDocument();
  });

  it('shows a generic error when the product lookup fails', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(`${API_URL}/products/serial/:serialNumber`, () => failure(429, 'TOO_MANY_REQUESTS')),
    );
    renderApp('/garantia/identificacion');
    await completeIdentification(user);

    await user.type(await screen.findByLabelText('Número de serie'), EXISTING_PRODUCT_CODE);
    await user.click(screen.getByRole('button', { name: 'Validar producto' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/No pudimos completar la operación/);
  });

  it('rejects a malformed product code before searching', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await completeIdentification(user);

    await user.type(await screen.findByLabelText('Número de serie'), 'AB-12');
    await user.click(screen.getByRole('button', { name: 'Validar producto' }));

    expect(
      await screen.findByText('El número de serie solo puede tener letras y números.'),
    ).toBeInTheDocument();
  });

  it('does not let the user type spaces into the product code', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await completeIdentification(user);

    const field = await screen.findByLabelText('Número de serie');
    await user.type(field, 'AB 12');

    expect(field).toHaveValue('AB12');
  });

  it('blocks an invoice whose purchase date could not be read', async () => {
    server.use(
      http.post(`${API_URL}/warranties/invoice-extraction`, () =>
        success({ ...INVOICE_FIXTURE, issueDate: null }),
      ),
    );
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await completeIdentification(user);
    await completeProduct(user);

    await uploadInvoice(user, invoiceFile('factura.jpg', 'image/jpeg'));

    expect(await screen.findByRole('alert')).toHaveTextContent(/No pudimos leer todos los datos/);
    expect(screen.getByText('No pudimos leerlo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();
  });

  it('asks for a clearer photo when the backend cannot read the invoice', async () => {
    server.use(
      http.post(`${API_URL}/warranties/invoice-extraction`, () =>
        failure(422, 'INVOICE_UNREADABLE'),
      ),
    );
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await completeIdentification(user);
    await completeProduct(user);

    await uploadInvoice(user, invoiceFile('factura.jpg', 'image/jpeg'));

    expect(await screen.findByRole('alert')).toHaveTextContent(/Sube una foto más nítida/);
    expect(screen.getByLabelText(/Toma una foto o elige un archivo/)).toBeInTheDocument();
  });

  it('rejects an invoice file of an unsupported type', async () => {
    // The native `accept` filter is bypassed on purpose: a user can still drop any file.
    const user = userEvent.setup({ applyAccept: false });
    renderApp('/garantia/identificacion');
    await completeIdentification(user);
    await completeProduct(user);

    await uploadInvoice(user, invoiceFile('notes.txt', 'text/plain'));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'El archivo debe ser una imagen JPG, PNG, WebP o un PDF.',
    );
  });

  it('keeps the identified product when going back and forth', async () => {
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await completeIdentification(user);
    await completeProduct(user);

    await user.click(await screen.findByRole('button', { name: 'Atrás' }));

    expect(await screen.findByText('Producto identificado.')).toBeInTheDocument();
  });

  it('sends the user to the first incomplete step when a step is opened out of order', async () => {
    const router = renderApp('/garantia/factura');

    expect(await screen.findByRole('heading', { name: 'Empecemos por ti' })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/garantia/identificacion');
  });
});

describe('product label scan', () => {
  const found = { status: 'found', serialNumber: EXISTING_PRODUCT_CODE } as const;

  beforeEach(() => {
    mockCamera();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Reflect.deleteProperty(navigator, 'mediaDevices');
  });

  async function openScanner(user: User) {
    renderApp('/garantia/identificacion');
    await completeIdentification(user);
    await user.click(await screen.findByRole('button', { name: 'Abrir la cámara' }));
    return screen.getByRole('dialog', { name: 'Escanear la etiqueta' });
  }

  it('identifies the product once two frames read the same serial, without a photo', async () => {
    vi.mocked(readSerialNumberFromFrame).mockResolvedValue(found);
    const user = userEvent.setup();
    const camera = await openScanner(user);

    expect(within(camera).queryByRole('button', { name: 'Tomar foto' })).not.toBeInTheDocument();
    expect(await screen.findByText('Producto identificado.')).toBeInTheDocument();
    expect(screen.getByText(`Serie ${EXISTING_PRODUCT_CODE}`)).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(
      vi.mocked(readSerialNumberFromFrame).mock.calls.map(([, binarizer]) => binarizer),
    ).toEqual(['LocalAverage', 'FixedThreshold']);
  });

  it('guides the user while the label is being scanned', async () => {
    vi.mocked(readSerialNumberFromFrame).mockResolvedValue({ status: 'no-barcode' });
    const user = userEvent.setup();
    const camera = await openScanner(user);

    expect(within(camera).getByRole('status')).toHaveTextContent(
      'Apunta al código de barras rotulado «Número de serie».',
    );
  });

  it('closes the camera without filling the serial when cancelled', async () => {
    vi.mocked(readSerialNumberFromFrame).mockResolvedValue({ status: 'no-barcode' });
    const user = userEvent.setup();
    const camera = await openScanner(user);
    expect(document.documentElement.style.overflow).toBe('hidden');

    await user.click(within(camera).getByRole('button', { name: 'Cancelar' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Número de serie')).toHaveValue('');
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('clears the serial typed before, and its message, when the camera opens', async () => {
    vi.mocked(readSerialNumberFromFrame).mockResolvedValue({ status: 'no-barcode' });
    const user = userEvent.setup();
    renderApp('/garantia/identificacion');
    await completeIdentification(user);
    await user.type(await screen.findByLabelText('Número de serie'), '00000000');
    await user.click(screen.getByRole('button', { name: 'Validar producto' }));
    expect(await screen.findByText(/No encontramos un producto/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Abrir la cámara' }));

    expect(screen.getByLabelText('Número de serie')).toHaveValue('');
    expect(screen.queryByText(/No encontramos un producto/)).not.toBeInTheDocument();
  });

  it('closes the camera and explains the failure when the reader cannot run', async () => {
    vi.mocked(readSerialNumberFromFrame).mockRejectedValue(new Error('wasm failed'));
    const user = userEvent.setup();
    await openScanner(user);

    expect(await screen.findByRole('alert')).toHaveTextContent(/No pudimos completar la operación/);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('invoice camera', () => {
  let getUserMedia: ReturnType<typeof mockCamera>;

  beforeEach(() => {
    getUserMedia = mockCamera();
    URL.createObjectURL = vi.fn(() => 'blob:invoice');
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Reflect.deleteProperty(navigator, 'mediaDevices');
  });

  async function goToInvoiceStep(user: User) {
    renderApp('/garantia/identificacion');
    await completeIdentification(user);
    await completeProduct(user);
  }

  it('opens a full-screen camera and reads the photo taken', async () => {
    const user = userEvent.setup();
    await goToInvoiceStep(user);

    await user.click(await screen.findByRole('button', { name: 'Tomar foto' }));
    expect(getUserMedia.mock.calls[0]?.[0]).toMatchObject({
      video: { facingMode: { ideal: 'environment' } },
    });
    const camera = screen.getByRole('dialog', { name: 'Tomar foto de la factura' });
    await user.click(within(camera).getByRole('button', { name: 'Tomar foto' }));

    expect(await screen.findByText(/Leímos la factura correctamente/)).toBeInTheDocument();
    expect(screen.getByText('001-002-000032451')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the camera without reading anything when cancelled', async () => {
    const user = userEvent.setup();
    await goToInvoiceStep(user);

    await user.click(await screen.findByRole('button', { name: 'Tomar foto' }));
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tomar foto' })).toBeInTheDocument();
  });

  it('asks to try again in a minute when the reading service is busy', async () => {
    server.use(
      http.post(`${API_URL}/warranties/invoice-extraction`, () =>
        failure(500, 'OPENAI_RATE_LIMITED'),
      ),
    );
    const user = userEvent.setup();
    await goToInvoiceStep(user);

    await uploadInvoice(user, invoiceFile('factura.pdf', 'application/pdf'));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /ocupado\. Intenta nuevamente en un minuto/,
    );
  });

  it('explains what to do when the camera cannot be opened', async () => {
    getUserMedia.mockRejectedValue(new DOMException('denied', 'NotAllowedError'));
    const user = userEvent.setup();
    await goToInvoiceStep(user);

    await user.click(await screen.findByRole('button', { name: 'Tomar foto' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/No pudimos acceder a la cámara/);
  });
});

describe('unknown routes', () => {
  it('shows a friendly not-found page', async () => {
    renderApp('/no-existe');

    expect(
      await screen.findByRole('heading', { name: 'No encontramos esta página' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/');
  });
});
