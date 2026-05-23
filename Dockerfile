# syntax=docker/dockerfile:1.7

# ---------- Stage 1: build the Vite SPA ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies with a clean, reproducible install
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Build-time secret: Gemini TTS API key for the case-context narration.
# Passed via `docker build --build-arg VITE_GEMINI_API_KEY=...`.
# Defaults to empty so the build still succeeds without it (the speaker
# button just stays hidden in the resulting bundle).
#
# WARNING: this value is baked into the JS bundle and is readable to
# anyone who opens devtools on the deployed app. Restrict the key by
# HTTP referrer in Google Cloud, or move the call behind a serverless
# proxy. ARG scope is this stage only — the value does NOT appear in
# the final nginx image's `docker history`.
ARG VITE_GEMINI_API_KEY="AIzaSyC2boLhLMpTYeSuyFWxLwCdgj_8HqHxDbM"
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

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
