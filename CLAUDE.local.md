# Memory bank local — Front del micrositio de garantías Indurama

Archivo personal (excluido de git vía `.git/info/exclude`). Complementa, no reemplaza, al
[README](README.md) y al [estándar React](docs/estandar-desarrollo-react.md): leerlos antes de
cambios no triviales.

## Qué es

SPA React + TypeScript + Vite + Tailwind v4 donde un cliente registra la garantía de su producto en
4 pasos: identificación → producto → factura → confirmación. Backend: repo hermano
`../GarantiasIndurama` (NestJS, BFF hacia Creatio y Azure OpenAI).

**El backend es la fuente de verdad**: el front se adapta a los contratos de la API, nunca al revés.
Si un contrato no alcanza, se discute el cambio en el backend.

## Comandos

```bash
npm run dev | typecheck | lint | format | build
NODE_ENV=test npx vitest run      # ver "Trampas del entorno"
```

Verificación mínima antes de dar algo por terminado: `npx tsc -b`, `npx eslint <archivos>`,
`npx prettier --write <archivos>` y los tests.

## Estructura y convenciones

- `src/app` (router, layout, error page) · `src/config` (env validado, rutas, tema) ·
  `src/features/<feature>` (`components/ hooks/ schemas/ services/ state/`) · `src/shared`
  (`api/ components/ hooks/ lookups/ utils/`) · `src/test` (setup, MSW).
- Lo genérico va en `shared/`; `shared/` **nunca** importa de `features/`. Si un hook compartido
  necesita tocar un formulario, recibe callbacks (p. ej. `useLocationCascade({ onReset })`), no el
  `setValue` tipado de un feature.
- Formularios: `react-hook-form` + `zod`. HTTP: solo vía `shared/api/http-client.ts`.
- Datos personales solo en memoria: prohibido `localStorage`/`sessionStorage` (estándar §9).
- Imports con alias `@/` para cruzar carpetas; relativos dentro del mismo feature.
- Comentarios de código en inglés; textos de UI en español.
- **Textos de UI en español neutro (tuteo, sin regionalismos).** Migración desde voseo completa
  el 2026-10-09. Texto nuevo: "Ingresa…", "Encuentras…", nunca "Ingresá…", "Encontrás…".
- Diseño de referencia: `indurama-micrositio-garantias-v5.html` (prototipo, sin versionar).

## Lookups País / Provincia / Ciudad

- `src/shared/lookups/countries.ts` (`COUNTRIES`), `provinces.ts` (`getProvinceByCountry`),
  `cities.ts` (`getCityByProvince`). **Archivos generados** desde exports xlsx de Creatio: no editar
  a mano; regenerar con [.local/lookups/README.md](.local/lookups/README.md).
- Ya vienen agrupados por id del padre: no construir índices encima. Para resolver id → nombre se
  busca dentro del grupo usando el id del padre (ver `LocationFields.tsx`).
- Clave `''` = registros sin padre en Creatio (no aparecen en la cascada).
- Ids = GUIDs de Creatio. En el contrato del backend van con sufijo `Id` (`CountryId`, `RegionId`,
  `CityId`): así se escriben las columnas lookup en OData v4 de Creatio. Cualquier lookup nuevo del
  contrato sigue la misma convención `<Columna>Id`.
- `paises.js` (país emisor del documento, otros ids) NO es el lookup de país de residencia.
- Datos con errores conocidos de origen (no corregir en el front): provincias `ESMERALAS`,
  `LOS RIOS MOCACHE`, `PICHINCHA RUMINAHUI`; LETICIA/BONGARA bajo AMAZONAS (Colombia).
- Los xlsx en `src/shared/lookups/` no se versionan.

## Git

- Commits: `tipo(número_de_tarea): descripción` en español (matriz corporativa §9.8). Tipos: feat,
  fix, docs, style, refactor, test, chore. Si no hay número de tarea, `tipo: descripción`.
- **Nunca** agregar a Claude como autor/coautor (sin `Co-Authored-By`, sin "Generated with Claude
  Code" en PRs).
- Commits chicos y por tema; si un archivo mezcla dos temas, separarlos en commits distintos.
- Commitear o pushear solo cuando el usuario lo pide. No versionar `.env`, xlsx ni `.local/`.

## Trampas del entorno

- El shell tiene `NODE_ENV=production` global: los tests fallan con `React.act is not a function`
  y `npm install` puede saltear devDependencies. Prefijar `NODE_ENV=test` / `NODE_ENV=development`.
- Windows + `core.autocrlf`: los avisos "LF will be replaced by CRLF" son ruido, no errores.
- Al 2026-10-08 pasan los 110 tests. Si algo falla, comparar contra el estado anterior con
  `git stash` antes de asumir que lo rompió un cambio nuevo.
