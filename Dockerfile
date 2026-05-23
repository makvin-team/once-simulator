# syntax=docker/dockerfile:1.7

# ---------- Stage 1: build the Vite SPA ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies with a clean, reproducible install
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the source and build
COPY . .
RUN npm run build

# ---------- Stage 2: serve the static bundle with nginx ----------
FROM nginx:1.27-alpine AS final

# Replace the default site config with our SPA-aware config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
