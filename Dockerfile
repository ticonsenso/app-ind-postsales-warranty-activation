# Imagen base: sustituir por la imagen corporativa aprobada del registro (matriz, sección 9.1).
ARG NODE_IMAGE=node:24-alpine
ARG NGINX_IMAGE=nginxinc/nginx-unprivileged:1.28-alpine

FROM ${NODE_IMAGE} AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html ./
COPY public ./public
COPY src ./src
# Sin archivos .env en la imagen: las VITE_* se hornean con sus valores por defecto
# (VITE_API_BASE_URL vacía = mismo origen; la app agrega /v1 sola).
RUN npm run build

# Etapa de servicio: nginx sin privilegios, usuario no root dedicado (matriz, sección 9.1).
# Puerto fijo 8080: es el que declaran el Service, los probes y el HealthCheckPolicy
# del overlay en gitops/fluxcd.
FROM ${NGINX_IMAGE}
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
