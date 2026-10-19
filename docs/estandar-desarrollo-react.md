# Estándar de Desarrollo — React y TypeScript

**Versión:** 1.0 · **Propietario:** Arquitectura Empresarial · **Última actualización:** 2026/08/07 · **Próxima revisión programada:** Revisión periódica alineada a la política semestral de baseline tecnológico (matriz, sección 10) · **Documento base:** Matriz corporativa de stack tecnológico admitido v2.1 (sección 6.2)

## Historial de versiones

| Versión | Fecha      | Autor      | Cambios                     |
| ------- | ---------- | ---------- | ---------------------------- |
| 1.0     | 2026/08/07 | CFERNANDEZ | Creación inicial del documento. |

**Stack:** React · TypeScript · Bundler del proyecto (p. ej. Vite, Webpack) · Librería de UI / Design System corporativo · Cliente HTTP (p. ej. Axios)

> Esta guía complementa la Matriz corporativa de stack tecnológico admitido (en especial las secciones 4, 6.2, 8 y 9). Ante cualquier conflicto entre este documento y la matriz, **prevalece la matriz**. React es una alternativa aprobada al frontend corporativo por defecto (Angular); su uso fuera de las categorías ya autorizadas requiere aprobación de Arquitectura Empresarial (matriz, sección 6.2).

### Decisiones obligatorias del proyecto (matriz, sección 6.2)

Antes de iniciar, todo proyecto React debe definir y documentar explícitamente: framework de construcción/renderizado, enrutamiento, gestión de estado, librería de componentes, estrategia de pruebas, manejo de errores, observabilidad frontend, estructura del proyecto y estrategia de actualización. Este documento da los lineamientos por defecto para cada punto; el proyecto registra sus decisiones concretas (p. ej. en su README, matriz sección 4.4).

---

## Cómo usar este documento

### Clasificación de reglas

- **[MUST]** — obligatorio.
- **[SHOULD]** — recomendado; su ausencia debe justificarse.
- **[GATE]** — verificable de forma automática por CI.

---

## 1. Principios

### MUST
- Componentes con responsabilidad única.
- DRY (incluye no duplicar librerías que resuelven lo mismo).
- Seguridad por defecto: nada sensible en el cliente.
- Separación entre presentación, estado y datos.
- Accesibilidad como requisito, no como extra.
- TypeScript en todo el código nuevo (matriz, sección 6.2).

### SHOULD
- KISS / YAGNI.
- Estado mínimo y local por defecto.
- Código expresivo y predecible.

> **El frontend no impone seguridad, solo experiencia.** Ocultar un botón, deshabilitar un campo o filtrar una tabla es UX, nunca control de acceso. Toda autorización real vive en el backend.

---

## 2. Convenciones de TypeScript

**[MUST] [GATE]**
- `strict: true` en `tsconfig`.
- `any` **prohibido** salvo justificación explícita en comentario. Preferir `unknown` y estrechar el tipo, o tipar la forma real del dato.
- Props y estado de componentes tipados explícitamente; sin tipos estructurales anónimos repetidos entre componentes.
- **No hacer aritmética de dinero con `number`/float en el cliente.** El backend es la fuente de verdad de todo importe; el total ya llega calculado. Si el cliente debe formatear o sumar valores visibles, usar enteros en centavos o una librería de decimales, nunca operar sobre floats directamente.
- **Formateo de moneda con `Intl.NumberFormat`** (locale y currency desde configuración); nunca concatenación manual ni redondeo casero.

**[SHOULD]**
- Evitar `as` (type assertion); si es inevitable, justificar.
- Esquemas de validación reutilizables como contrato compartido entre formularios y respuestas de API.

> **Validar en runtime los datos de la API es [MUST], no solo recomendación** — ver el punto de aplicación obligatorio en la sección 10 (Data Fetching). El tipado estático no protege contra una respuesta real distinta a la esperada.

### 2.1 Documentación del código — [MUST]
- Se rige por la sección 4.5 de la matriz corporativa: TSDoc/JSDoc en funciones, hooks y componentes públicos, salvo código simple y autoexplicativo. No es necesario profundizar más aquí; ver la sección 4.5 de la matriz para el formato exacto (primera frase, límite de palabras, `@author`/`@since`).

---

## 3. Estructura del Proyecto

Organización por **feature**, no por tipo de archivo.

```
src/
  app/            # store, router, providers, theme
  features/
    <feature>/
      components/
      hooks/
      api/        # llamadas API + validación en runtime
      state/
      # + carpetas propias de la feature si hacen falta (p. ej. `device/` para hardware
      # del navegador que no pasa por el back)
  shared/
    components/    # UI reutilizable sin lógica de negocio
    hooks/
    utils/
    api/           # instancia del cliente HTTP, interceptores
    constants/
  config/          # env, theme
```

- Carpetas en **kebab-case**. Archivos en **kebab-case**, salvo los componentes React, que van en `PascalCase.tsx` (ver sección 4) — es la única excepción a la convención de archivos.
- **[MUST]** Una feature no depende de detalles internos de otra feature (no importar directamente desde dentro de otra carpeta de `features/`). La comunicación entre features se realiza mediante contratos o APIs públicas explícitas de cada feature (p. ej. su `index.ts`, un hook exportado, o el store cuando el dato es realmente compartido) — `shared/` y el store son opciones válidas, no la única forma de desacoplar.

---

## 4. Convenciones de Nombres

- **Idioma [MUST]:** código en inglés. Sin espanglish.
- **Excepción de dominio [SHOULD]:** términos de negocio sin equivalente claro pueden mantenerse en su forma original, documentados y usados de forma consistente.
- **Componentes:** `PascalCase` → `DataTable`; archivo `PascalCase.tsx`.
- **Hooks:** `camelCase` con prefijo `use` → `useDataTable`.
- **Variables/funciones:** `camelCase`; funciones con verbo → `formatCurrency`.
- **Constantes:** `UPPER_SNAKE_CASE` → `DEFAULT_PAGE_SIZE`.

---

## 5. Componentes React

**[MUST]**
- Componentes de función y Hooks. Sin componentes de clase.
- **Sin lógica de negocio en el componente.** Reglas de negocio, validaciones y transformaciones que determinan un resultado o afectan el estado persistido viven en hooks, servicios o utils — nunca en el backend por conveniencia.
  - **Excepción explícita:** cálculos puramente de **presentación**, que no persisten ni se reenvían al backend, y solo existen para facilitar la lectura al usuario (formatear un total ya calculado, concatenar un nombre completo, decidir un color según un estado) sí pueden vivir en el componente. La distinción es si el cálculo **decide o valida algo del negocio** (no permitido en el componente) vs. si solo **da formato a un dato que ya llegó calculado** (permitido).
- Respetar las **Reglas de Hooks** `[GATE]` (`eslint-plugin-react-hooks`).
- Separar **presentación** (recibe props) de **contenedores** (conectan estado/datos).

### 5.1 Keys en listas — [MUST]
- **Prohibido usar `index` como `key`**, salvo en listas **completamente estáticas** que nunca se reordenan, filtran ni mutan. En cualquier lista dinámica, usar un id estable del dato.

**[SHOULD]**
- Componentes pequeños con una sola responsabilidad; extraer subcomponentes antes de que un archivo se vuelva inmanejable.
- Evitar prop drilling profundo.

---

## 6. useEffect

`useEffect` es la mayor fuente de código incorrecto en React. Se usa **solo para sincronizar con sistemas externos**, no para lógica que puede ocurrir durante el render.

**[MUST] — No usar `useEffect` para:**
- **Derivar estado** de props u otro estado (calcularlo directamente en render).
- **Cálculos** (usar el valor calculado, o `useMemo` con criterio).
- **Sincronizar props → estado** (fuente única de verdad; no copiar props a estado).

**[MUST] — Usar `useEffect` solo para:**
- Efectos externos (DOM imperativo, analítica).
- Suscripciones.
- Timers / intervalos.
- Llamadas a APIs no ligadas a un evento.

**[MUST]**
- Todo efecto que crea algo cancelable (subscription, timer, request) devuelve su función de **cleanup**.
- Dependencias completas y correctas (`react-hooks/exhaustive-deps` en `[GATE]`); no silenciar la regla sin justificación.

> Un `useEffect` que copia props a estado o que calcula un derivado es un antipatrón, no una excepción legítima.

---

## 7. Hooks Personalizados

**[MUST]**
- **Un hook, una responsabilidad.** Prohibidos los hooks "God" que orquestan medio módulo. Si un hook hace fetching + formateo + navegación + validación, se divide.
- **API pequeña y estable.** Un hook devuelve un contrato reducido y predecible:

```ts
const { data, loading, error } = useResource();
```

**[SHOULD]**
- Nombrar por lo que representan, no por cómo se implementan.
- Reutilizables y testeables de forma aislada.

---

## 8. Estado

Regla rectora: **el estado más local posible**.

**[MUST]**
- Clasificar el estado:
  - UI efímero (abierto/cerrado, input no compartido) → `useState` local.
  - Estado de servidor (datos de la API) → cache de servicio o librería de *data fetching*; **no** duplicado a mano en varios lugares.
  - Global compartido y transversal → una única fuente de verdad (Context o una librería de gestión de estado centralizada, según la tabla 8.1).
- **Inmutabilidad**: el estado se modifica solo a través de los mecanismos previstos por la herramienta elegida (reducers, setters).
- **No almacenar estado derivado**: se calcula con selectores memorizados.

### 8.1 Context vs. librería de estado global — [MUST]

| Usar **Context**                     | Usar librería de estado global                  |
| ------------------------------------ | ----------------------------------------------- |
| Theme                                 | Estado compartido complejo con muchas acciones  |
| Auth provider / sesión                | Datos que cambian con frecuencia y muchos consumidores |
| Configuración de app                  | Estado que requiere selectores, middleware o devtools |

- Context es para inyectar valores estables y de baja frecuencia de cambio. Un Context que cambia constantemente re-renderiza a todos sus consumidores: eso es un caso de librería de estado global (o de estado local), no de Context.

**[SHOULD]**
- Selectores centralizados por feature; los componentes no acceden a la forma cruda del store.
- Un solo enfoque de *data fetching* para datos de servidor; no mezclar un cliente HTTP manual con una librería de *server-state* para el mismo tipo de dato.

---

## 9. Persistencia de Estado en el Cliente

Cuando el proyecto persiste estado en `localStorage`/`sessionStorage` (por ejemplo con una librería de persistencia de estado), es un vector de seguridad directo.

**[MUST — Crítico]**
- **Nunca persistir** tokens (JWT/refresh), credenciales ni datos personales/financieros sensibles. El almacenamiento del navegador es legible por cualquier script; un XSS lo exfiltra completo.
- **Whitelist explícita** de qué se persiste. Persistir todo el store por defecto es un error.
- Persistir solo estado de **UI/preferencias** no sensibles (tema, idioma, tamaño de página).

**[MUST]**
- **Versionar** el estado persistido y definir **migraciones**.
- Manejar el estado de **rehidratación** para no renderizar con datos a medio cargar.

**[SHOULD]**
- Tokens de sesión idealmente en cookies `httpOnly` del backend; si deben vivir en el cliente, **solo en memoria**, no persistidos.

---

## 10. Data Fetching

**[MUST]**
- **Una única instancia** del cliente HTTP en `shared/api/` con `baseURL` desde configuración, `timeout` e interceptores.
- **Interceptor de request:** adjunta autenticación de forma centralizada.
- **Interceptor de response:** normaliza errores; no propaga el error crudo del backend a la UI.
- **Cancelación:** toda solicitud que pueda quedar activa después de que su consumidor deje de necesitarla (componente desmontado, nueva búsqueda que reemplaza la anterior) debe ser cancelable, mediante el mecanismo que soporte la herramienta usada — `AbortController` con un cliente HTTP manual, o el mecanismo propio de la librería de *data fetching* adoptada (evita *setState* sobre desmontados y *race conditions*).
- Validar la respuesta en runtime antes de meterla al estado.

**[SHOULD]**
- Reintentos solo para errores idempotentes/transitorios con backoff; nunca reintentar operaciones no idempotentes sin garantía del backend.

---

## 11. Routing

**[MUST]**
- **Code splitting** (`lazy`) en rutas o dependencias cuyo impacto en el tamaño del bundle lo justifique (ver presupuesto de bundle, sección 16.2); no es una obligación ciega en cada ruta de cualquier tamaño.
- **Rutas protegidas** por guard de autenticación **para UX**, recordando que la autorización real la impone el backend.
- Estrategia de contención de errores de render (Error Boundaries, sección 18); la granularidad (por ruta, por sección, o global) la decide el diseño de la aplicación.

**[SHOULD]**
- `params` validados; no confiar en valores crudos.

---

## 12. Lazy Loading y Suspense

**[MUST]**
- Todo `React.lazy` **debe estar envuelto en `<Suspense>`** con un fallback definido.
- El fallback es intencional (skeleton/loader coherente), no un texto suelto.

**[SHOULD]**
- Cuando el enrutador gestiona su propio estado de carga (*data router*), usar ese mecanismo en lugar de envolver manualmente en `Suspense` para la misma ruta; no mezclar ambos enfoques.
- Cargar con `lazy` librerías y vistas pesadas que no se necesitan de inmediato.

---

## 13. UI y Sistema de Diseño

**[MUST]**
- **Tema centralizado** en `config/theme`, usando el mecanismo de theming de la librería de UI corporativa. Colores, tipografía, espaciado y breakpoints salen del tema; prohibido hardcodear colores hex sueltos.
- Estilos vía el mecanismo de la librería de UI (props de estilo, `styled`, CSS modules); sin hojas globales ad-hoc que compitan con el sistema de diseño.
- **Abstraer estilos repetidos.** Un bloque de estilos que se repite en muchos componentes se convierte en **componente reutilizable o variante del tema**.

**[SHOULD]**
- Componentes envoltorio propios (`AppButton`, `AppDialog`) para consistencia.

### 13.1 Datasets grandes (tablas, grids) — [MUST]
- **Datasets grandes → servidor, siempre.** Prohibido filtrar, ordenar o transformar decenas de miles de registros en el cliente. Paginación, filtrado y ordenamiento **del lado del servidor**; aprovechar la virtualización del componente de tabla.
- **No crear funciones inline en renderizadores de celda** cuando puedan definirse fuera y reutilizarse; una función nueva por celda en cada render multiplica el trabajo en datasets grandes.

---

## 14. Formularios y Validación

**[MUST]**
- Validar en el cliente **para UX**, sabiendo que el backend re-valida todo. La validación del cliente nunca es la de seguridad.
- Reutilizar los esquemas de validación (sección 2) para formularios y respuestas.

**[SHOULD]**
- Estado de formulario con librería dedicada (p. ej. `react-hook-form`) en formularios no triviales.
- Mensajes de error accesibles y asociados al campo (`aria-describedby`).

---

## 15. Seguridad Frontend

**[MUST — Crítico]**
- **El bundle expone todo.** Cualquier variable de entorno pública (prefijo del bundler, p. ej. `VITE_*`) y todo lo empaquetado es **público**. **Prohibido** secretos, API keys privadas o credenciales en el frontend.
- **XSS:** `dangerouslySetInnerHTML` prohibido salvo justificación; si es inevitable, sanitizar con una librería dedicada (p. ej. DOMPurify) antes de inyectar.
- **Storage:** sin tokens ni PII en `localStorage`/`sessionStorage` (sección 9).
- **Archivos subidos por el usuario:** tratar todo archivo que el usuario suba (Excel, PDF, imágenes, etc.) como **no confiable** al parsearlo o previsualizarlo en el cliente; una librería de parseo con vulnerabilidades conocidas sobre un archivo malicioso es un vector de ataque.

**[SHOULD]**
- **CSP** definida.
- No incrustar HTML/URLs de terceros sin validar.
- Escaneo de secretos también en este repo (`gitleaks` en CI) `[GATE]`.

---

## 16. Performance

**[MUST]**
- **Code splitting** en rutas o librerías cuyo impacto en el bundle lo justifique (ver sección 11).
- **Virtualización** en listas/tablas grandes.

### 16.1 Memoización — [SHOULD]
- **La memoización debe justificarse mediante medición o evidencia de impacto en rendimiento.** No se memoiza por defecto ni "por si acaso".
- Memoizar donde haya render costoso, listas grandes, o referencias que rompen `React.memo` aguas abajo.

### 16.2 Bundle — [GATE]
- Definir un **presupuesto de bundle inicial** medible y verificarlo en CI.
- **El número se fija midiendo el baseline actual y apretándolo progresivamente (ratchet)**, no eligiendo una cifra arbitraria.

---

## 17. Accesibilidad (a11y)

**[MUST]**
- **Usar el elemento semántico correcto.** Un botón es `<button>`, no un `<div onClick>`. Prohibido simular controles interactivos con `div`/`span`.
- Elementos interactivos accesibles por teclado con roles/labels correctos.
- Imágenes con `alt`; formularios con labels asociados.

**[SHOULD]**
- `eslint-plugin-jsx-a11y` activo `[GATE]`.
- Verificación con herramienta automatizada de a11y (p. ej. axe) en vistas clave.

---

## 18. Manejo de Errores

**[MUST]**
- **Error boundaries** para contener fallos de render; la granularidad (global, por ruta o por sección) la decide el diseño de la aplicación, pero debe existir al menos una estrategia de contención — no dejar la app entera sin ningún boundary.
- **Un Error Boundary no reemplaza el manejo de errores de negocio.** Solo captura errores lanzados **durante el render**; no atrapa errores de callbacks async, promesas ni eventos. Los errores de negocio/red se manejan explícitamente en los servicios.
- Errores mostrados al usuario: mensajes claros y no técnicos; el detalle va a monitoreo, no a pantalla.
- Nunca exponer respuestas crudas del backend, stack traces ni URLs internas en la UI.

**[SHOULD]**
- Integración con monitoreo de errores (p. ej. Sentry u homólogo), sin datos sensibles.

---

## 19. Configuración

**[MUST]**
- Configuración desde variables de entorno públicas del bundler y `config/`.
- **Validar la configuración al arranque**: si falta una variable requerida, fallar visiblemente en build/inicio.
- Sin URLs, endpoints ni valores de ambiente hardcodeados.

---

## 20. Estilo, Lint y Formato

**[GATE]**
- **ESLint** sin errores (`react-hooks`, `exhaustive-deps`, `jsx-a11y`, reglas de import, reglas de TypeScript).
- **Prettier** como formateador único.
- Sin `console.log` en producción; sin imports/variables sin uso; sin código muerto.
- **Análisis estático:** el código se analiza con el **Quality Profile por defecto de SonarQube** de la instancia corporativa (code smells, bugs, vulnerabilidades, duplicación — mapeadas a OWASP Top 10, CWE, SANS Top 25). El pipeline **bloquea el merge** según el **Quality Gate** asignado al proyecto (alineado a criticidad, no necesariamente el gate por defecto de SonarQube). La **cobertura** se rige por la sección 9.6 de la matriz.

---

## 21. Dependencias

**[GATE]**
- Lockfile obligatorio.
- `npm audit` en CI.
- Escaneo automático (Dependabot **o** Renovate).

**[SHOULD]**
- Justificar toda dependencia nueva; vigilar el impacto en el bundle.
- **Deduplicar librerías redundantes** que resuelven lo mismo (p. ej. dos librerías de gráficos, dos librerías de exportación): deuda técnica activa.

---

## 22. Testing

**[MUST]**
- Unitarias, de integración y E2E conforme a la sección 9.6 de la matriz corporativa, según el nivel de criticidad del proyecto — no se redefine aquí un criterio distinto.
- Framework de pruebas con soporte de componentes (p. ej. Vitest o Jest) + React Testing Library; E2E con Playwright o Cypress.
- Simulación de la API en pruebas (p. ej. MSW); no golpear el backend real.
- Probar como unidad las utilidades de formateo de valores monetarios (sección 2), no solo los componentes que las usan.

### 22.1 Comportamiento, no implementación — [MUST]
Los tests verifican **lo que el usuario observa**, no los detalles internos.

```ts
// Incorrecto: testear implementación.
expect(useState).toHaveBeenCalled();

// Correcto: testear comportamiento.
expect(button).toBeDisabled();
```

**[GATE]**
- Cobertura mínima conforme a la sección 9.6 de la matriz corporativa, según el nivel de criticidad.
- El merge se bloquea con tests fallidos o build roto.

---

## 23. Control de Versiones y CI/CD

Ver sección 9.8 de la matriz corporativa para nomenclatura de ramas, commits y flujo de merge. El pipeline debe cumplir la **sección 9.2 de la matriz** en lo que aplica a frontend (compilación, pruebas con cobertura, análisis estático, análisis de dependencias, detección de secretos; sin despliegues manuales a producción).

**[GATE]** Adicionalmente, específico de este stack:
1. Lint + formato.
2. Análisis estático con SonarQube (Quality Profile de la instancia corporativa, sección 20).
3. Presupuesto/análisis de bundle.

---

## 24. Glosario

- **Feature-based structure**: organización por dominio funcional en vez de por tipo técnico.
- **Presentational vs container**: componente que solo renderiza a partir de props vs componente que conecta datos/estado.
- **Selector memorizado**: función que deriva datos del store y solo recalcula si sus entradas cambian.
- **Estado derivado**: valor calculable a partir de otro estado; se calcula, no se almacena.
- **Cleanup (useEffect)**: función que un efecto devuelve para deshacer suscripciones, timers o requests.
- **Rehidratación**: restaurar el estado guardado desde almacenamiento al iniciar la app.
- **Code splitting**: dividir el bundle para cargar código solo cuando se necesita.
- **Virtualización**: renderizar solo las filas/elementos visibles de una lista larga.
- **Presupuesto de bundle**: límite de tamaño definido y verificado en CI.
- **XSS**: inyección de scripts maliciosos.
- **CSP**: política que restringe de dónde carga recursos el navegador, mitigando XSS.
- **AbortController**: mecanismo del navegador para cancelar peticiones en curso.
- **MSW (Mock Service Worker)**: intercepta peticiones de red en tests para simular la API.
- **Error Boundary**: componente que captura errores lanzados durante el render.

---

## Conclusión

El frontend define cómo se presenta y manipula la información, sin ser la frontera de seguridad real: esa frontera vive en el backend. Este estándar define cómo el cliente debe mostrar y manejar los datos sin corromperlos, sin exponer secretos que —en un bundle público— nunca serían secretos, y con criterios de rendimiento y accesibilidad medibles. Las reglas se apoyan en medición y comportamiento, no en la versión de turno de React. Toda excepción a un `[MUST]` se justifica técnicamente y se aprueba en revisión de código.
