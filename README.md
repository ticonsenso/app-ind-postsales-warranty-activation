# Indurama · Micrositio de garantías (Front)

SPA en React + TypeScript + Tailwind para que un cliente registre la garantía de su producto:
identificación → producto → factura → confirmación. Sigue el
[estándar de desarrollo React](./estandar-desarrollo-react.md). El diseño de referencia es
[el mockup](./indurama-micrositio-garantias-v2.html).

> **Estado:** integrado con el backend (`GarantiasIndurama`) en clientes y productos. La lectura de
> factura, la activación de la garantía y el escaneo con cámara siguen **simulados (mock)**.
> **El backend es la fuente de verdad**: los modelos de la API no se cambian desde el front; el
> front se adapta a ellos.

## Cómo correrlo

Requiere Node ≥ 20.19 y el backend corriendo (por defecto en `http://localhost:3000`, con
`CORS_ALLOWED_ORIGINS=http://localhost:5173`).

```bash
npm install
npm run dev          # http://localhost:5173
npm test             # Vitest + Testing Library
npm run lint         # ESLint (react-hooks, jsx-a11y, typescript-eslint)
npm run typecheck
npm run format       # Prettier (incluye orden de clases de Tailwind)
npm run build
```

> Si `npm install` no instala las devDependencies, revisa que `NODE_ENV` no esté en `production`
> en tu variable de entorno global.

### Configuración

Copiar [`.env.example`](./.env.example) a `.env` (ignorado por Git) y completarlo. Todo lo que
empieza con `VITE_` viaja al navegador: nunca poner secretos. Las `VITE_` se validan al arrancar
([`config/env.ts`](./src/config/env.ts)): si falta una, la app falla de inmediato. Para valores
locales usar `.env.local` (ignorado por Git).

| Variable              | Obligatoria | Descripción                                                  |
| --------------------- | ----------- | ------------------------------------------------------------ |
| `VITE_API_BASE_URL`   | Sí          | Origen del backend, sin `/v1` (se agrega en el cliente HTTP) |
| `VITE_API_TIMEOUT_MS` | No (15000)  | Timeout de cada petición                                     |

### Lo que sigue simulado (mocks)

Solo queda simulado el escaneo del código de barras; el valor vive en
[`barcode-scanner.ts`](./src/features/warranty/device/barcode-scanner.ts) y se borra al
integrar el decodificador.

| Paso       | Valor                   | Resultado                               |
| ---------- | ----------------------- | --------------------------------------- |
| 2 Producto | botón "Abrir la cámara" | Simula el escaneo y devuelve `90002756` |

## Decisiones del proyecto (estándar, "Decisiones obligatorias")

| Decisión              | Elección                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| Construcción / render | Vite, SPA (sin SSR)                                                                                  |
| Enrutamiento          | React Router (data router). El flujo de garantía se carga con _lazy_ en su propio chunk              |
| Estado                | Local por defecto. Datos del registro en un `useReducer` + Context montado en la ruta del flujo      |
| Formularios           | `react-hook-form` + `zod` (esquemas reutilizables entre formularios y respuestas de API)             |
| Componentes / estilos | Componentes propios en `shared/components` sobre **Tailwind v4**. Tokens en `config/theme/theme.css` |
| Cliente HTTP          | Axios, una sola instancia en `shared/api/http-client.ts` (base URL, timeout, errores normalizados)   |
| Pruebas               | Vitest + Testing Library (comportamiento) con la API simulada por MSW. E2E: pendiente                |
| Errores               | Error boundary del router (`RouteErrorPage`, incluye 404); errores de API normalizados en `ApiError` |
| Observabilidad        | **Pendiente** (hay un `TODO` en `RouteErrorPage`)                                                    |
| Actualización deps    | **Pendiente** (Dependabot o Renovate al crear el repositorio)                                        |

Datos personales: el estado del flujo vive **solo en memoria**. Nunca se persiste en
`localStorage`/`sessionStorage` (estándar §9); salir del flujo lo descarta.

## Estructura

```
src/
  app/                 router, layout raíz, página de error
  config/              env.ts (variables validadas), routes.ts, site.ts, theme/theme.css (tokens)
  features/
    landing/           landing de posventa
    warranty/          flujo de registro
      components/      un contenedor por paso (*Step) + componentes de presentación
      hooks/           un hook por responsabilidad (lookup, validación, escaneo, OCR, activación…)
      schemas/         zod: formularios y modelos del front
      api/             una carpeta por módulo del back: su `<módulo>-api.ts`, `*-dto.schema.ts` y test
      device/          cámara de la factura y escáner de código de barras (no pasan por el back)
      state/           reducer, contexto y reglas de acceso a cada paso
  shared/              componentes, hooks, utils y `api/` (cliente HTTP) sin lógica de negocio
  test/                setup de Vitest y API simulada (MSW)
```

Una feature solo importa de otra por su `index.ts` y `shared/` no importa de `features/`
(ambas reglas las verifica ESLint).

Los enlaces externos (sitio de Indurama, documentos legales, repuestos, catálogo) y los datos de
contacto se configuran en `src/config/site.ts`. Qué enlaces faltan definir y dónde aparece cada uno:
[docs/referencias-externas.md](./docs/referencias-externas.md).

## Componentes reutilizables (`shared/components`)

| Componente                                          | Origen en el mockup                                       |
| --------------------------------------------------- | --------------------------------------------------------- |
| `Button`                                            | `.btn`, `.btn-sec`, `.btn-sm` (con estado `loading`)      |
| `TextField`                                         | `.campo` (label, pista, error accesible)                  |
| `Checkbox`                                          | `.check`                                                  |
| `Alert`                                             | `.aviso` (info / ok / error)                              |
| `Panel`, `PanelHeader`                              | `.panel` + título y subtítulo                             |
| `DataList`                                          | `.datos` (resumen de factura y de confirmación)           |
| `Stepper`                                           | `.pasos` (barra en móvil, pasos numerados en escritorio)  |
| `FileDropzone`                                      | `.dropzone` (label + input oculto, accesible por teclado) |
| `ProgressBar`                                       | `.barra` / `.riel`                                        |
| `Sheet`                                             | `.sheet` (`<dialog>` nativo: bottom sheet en móvil)       |
| `IconBadge`                                         | `.ico` (cards, opciones, escáner, éxito)                  |
| `SiteHeader`                                        | `.nav` / `.nav-claro`                                     |
| `Container`, `TextDivider`, `AppLink`, `PageLoader` | `.wrap`, `.separador`, enlaces                            |

## Integración con el backend

Todas las respuestas del back vienen envueltas en `{ data, message, error, statusCode }`. Los DTO
usan los nombres de columna de Creatio (`Name`, `INDApellido`, ...): se validan en runtime con zod
(`api/<módulo>/*-dto.schema.ts`) y se traducen al modelo del front **solo en el servicio**. Los
límites de validación de los formularios (`constants.ts`) reflejan los del back.

Cada carpeta de `api/` refleja un módulo (controller) del back y lleva su nombre; las funciones
usan el vocabulario del front (`Customer`, no `Client`).

| Carpeta               | Servicio del front                | Endpoint                                    | Resultado                                                                                     |
| --------------------- | --------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `clients/`            | `getCustomer(documentNumber)`     | `GET /v1/clients/:identification`           | cliente, o `{ found: false }` si `CLIENT_NOT_FOUND`                                           |
| `products/`           | `getProductBySerialNumber(serie)` | `GET /v1/products/serial/:serialNumber`     | producto (`id`, `code`, `name`), o `null` si `SERIAL_NOT_FOUND` o `PRODUCT_NOT_FOUND`         |
| `invoice-extraction/` | `extractInvoice(file, options)`   | `POST /v1/warranties/invoice-extraction`    | datos leídos de la factura; lo que no se pudo leer llega como `null`                          |
| `warranties/`         | `createWarranty(request, key)`    | `POST /v1/warranties` (multipart + factura) | garantía registrada (`warrantyId`); `PURCHASE_DATE_IN_FUTURE` o `CLIENT_ALREADY_EXISTS` (422) |

- **Idempotencia.** `POST /v1/warranties` exige `Idempotency-Key` (UUID v4).
  `useWarrantyActivation` conserva la clave mientras los datos no cambien (un reintento tras un
  corte de red no duplica el registro) y genera una nueva si el usuario edita algo.
- **Registro atómico.** El paso 1 solo busca: no escribe nada en el CRM. Un cliente nuevo viaja
  como `newClient[...]` en `POST /v1/warranties` y el back crea su cuenta junto con la garantía
  (si algo falla, borra todo). Un cliente existente viaja como `clientId`: ve sus datos en solo
  lectura y solo puede aceptar los consentimientos que el CRM tenga pendientes (los demás se
  muestran marcados y bloqueados). Si al confirmar otro registró esa identificación, el back
  responde `CLIENT_ALREADY_EXISTS` y la confirmación ofrece volver al paso 1.
- **Errores.** El interceptor convierte cualquier falla en `ApiError` con el código estable del back
  (`error`) o `NETWORK_ERROR`, `TIMEOUT`, `INVALID_RESPONSE`. La UI muestra textos propios, nunca
  el mensaje del back.
- **Sin autenticación:** los endpoints son públicos por diseño (ver `PENDIENTES.md` del back).

Un endpoint nuevo del back va en `api/<módulo>/<módulo>-api.ts` con su `<módulo>-dto.schema.ts`,
conservando la validación de la respuesta (estándar §10). Lo que solo usa el navegador o el
hardware, sin pasar por el back, va en `device/`.

## Presupuesto de bundle (baseline, 2026-09-21)

Chunk de entrada 555 kB (170 kB gzip: React + React Router). Chunk `warranty` 191 kB (57 kB gzip,
incluye axios, react-hook-form y zod). Umbral configurado en `vite.config.ts`; hay que apretarlo,
no subirlo.
