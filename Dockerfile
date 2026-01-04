# -------- Builder --------
FROM node:20-alpine AS builder
WORKDIR /repo

# pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# (Optional) if you use Next Image Optimization with native deps in alpine
# RUN apk add --no-cache libc6-compat

# Copy only what we need for dependency install layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy workspace packages/apps (needed for turbo build graph)
COPY packages ./packages
COPY apps ./apps
COPY tooling ./tooling
# COPY templates ./templates

# Install
RUN pnpm install --frozen-lockfile

# Build only the target app (and its deps)
ARG APP_NAME=seed-next-pages
RUN pnpm turbo run build --filter "${APP_NAME}"

# -------- Runner --------
FROM node:20-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000

ARG APP_DIR=apps/seed-next-pages

WORKDIR /app

# Copy standalone bundle + static + public into a single folder
COPY --from=builder /repo/${APP_DIR}/.next/standalone ./standalone
COPY --from=builder /repo/${APP_DIR}/.next/static ./standalone/.next/static
COPY --from=builder /repo/${APP_DIR}/public ./standalone/public

# Start script that works even if server.js is nested (monorepo builds)
RUN printf '%s\n' \
  '#!/bin/sh' \
  'set -eu' \
  'cd /app/standalone' \
  'SERVER_JS=$(find . -maxdepth 5 -type f -name server.js | head -n 1 || true)' \
  'if [ -z "${SERVER_JS}" ]; then' \
  '  echo "ERROR: server.js not found in standalone output." >&2' \
  '  echo "Listing top-level:" >&2' \
  '  ls -la >&2' \
  '  echo "Listing 2 levels:" >&2' \
  '  find . -maxdepth 2 -type f -print >&2' \
  '  exit 1' \
  'fi' \
  'echo "Starting Next standalone: ${SERVER_JS}"' \
  'exec node "${SERVER_JS}"' \
  > /app/start.sh \
  && chmod +x /app/start.sh

EXPOSE 3000
CMD ["/app/start.sh"]


