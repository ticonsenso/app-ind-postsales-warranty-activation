# Referencias externas del micrositio

Todos los enlaces que salen del micrositio (sitio de Indurama, documentos legales, repuestos,
catálogo) y los datos de contacto se configuran en un solo archivo:

**[`src/config/site.ts`](../src/config/site.ts)**

Cada valor se usa en todos los lugares del sitio donde aparece ese enlace. Si se cambia en este
archivo, se actualiza en todo el sitio y no hace falta tocar ningún otro.

> Los valores quedan fijos al compilar. Después de modificarlos hay que generar un nuevo build
> (`npm run build`) y volver a desplegar el sitio.

## Pendientes de definir

Estos enlaces todavía no tienen dirección. Hoy apuntan a `#`: se ven en pantalla, pero al tocarlos
no llevan a ningún lado.

| Enlace                         | Se configura en                               | Dónde aparece                                                                                           |
| ------------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Política de uso de cookies     | [`cookiesPolicy`](../src/config/site.ts#L21)  | Pie de la página de inicio (columna "Legales") y pie del formulario de garantía ("Política de cookies") |
| Protección de datos personales | [`dataProtection`](../src/config/site.ts#L22) | Pie de la página de inicio (columna "Legales")                                                          |
| Preguntas frecuentes           | [`faq`](../src/config/site.ts#L23)            | Pie de la página de inicio                                                                              |
| Catálogo y manuales            | [`catalog`](../src/config/site.ts#L24)        | Tarjeta "Catálogo y manuales" de la página de inicio                                                    |

## Enlaces ya configurados

| Enlace                 | Se configura en                                   | Valor actual                                      | Dónde aparece                                                                         |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Sitio de Indurama      | [`website`](../src/config/site.ts#L17)            | `https://www.indurama.com/`                       | Botón "Ir a indurama.com" del encabezado de inicio y pie del formulario de garantía   |
| Repuestos y accesorios | [`spareParts`](../src/config/site.ts#L18)         | `https://www.indurama.com/repuestos`              | Tarjeta "Comprar repuestos y accesorios" y pie de la página de inicio                 |
| Política de privacidad | [`privacyPolicy`](../src/config/site.ts#L19)      | `https://www.indurama.com/politicas-de-uso-datos` | Pie de la página de inicio, pie del formulario y casilla de aceptación del formulario |
| Términos y condiciones | [`termsAndConditions`](../src/config/site.ts#L20) | `https://www.indurama.com/terminos-y-condiciones` | Pie de la página de inicio, pie del formulario y casilla de aceptación del formulario |

## Datos de contacto

También están en [`src/config/site.ts`](../src/config/site.ts), en `CONTACT`. Cada uno tiene dos
valores: `label` es el texto que se muestra y `href` es lo que se abre al tocarlo. Si se cambia el
número, hay que cambiar los dos.

| Contacto    | Se configura en                          | Valor actual                                | Dónde aparece                                                                               |
| ----------- | ---------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Call center | [`callCenter`](../src/config/site.ts#L5) | `024001600` → `tel:024001600`               | Tarjeta "Hablar con un asesor" y ventana "¿Cómo prefieres contactarnos?" (servicio técnico) |
| WhatsApp    | [`whatsapp`](../src/config/site.ts#L6)   | `0999303030` → `https://wa.me/593999303030` | Ventana "¿Cómo prefieres contactarnos?" (servicio técnico)                                  |

El enlace de WhatsApp usa el número en formato internacional, sin el `0` inicial y sin espacios ni
signos: `https://wa.me/593` + número. Por ejemplo, `0999303030` queda `https://wa.me/593999303030`.

## Cómo cambiar un enlace

1. Abrir [`src/config/site.ts`](../src/config/site.ts).
2. Reemplazar el valor entre comillas de la clave que corresponda, por ejemplo:

   ```ts
   cookiesPolicy: 'https://www.indurama.com/ruta-al-documento.pdf',
   ```

3. Usar siempre la dirección completa, empezando por `https://`.
4. Generar un nuevo build y desplegar.
