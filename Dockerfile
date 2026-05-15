# ── Build stage ──
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies separately to leverage Docker cache
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── Production stage ──
FROM nginx:1.27-alpine

# Static files from build
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config for SPA fallback + caching
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -q -O- http://localhost/ > /dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
