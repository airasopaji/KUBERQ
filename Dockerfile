# ============================================================================
# KuberQ Production Multi-Stage Dockerfile (200+ Concurrency Tuned)
# ============================================================================

FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# ============================================================================
# Final Production Runtime Stage
# ============================================================================
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production \
    PORT=4500 \
    WEB_CONCURRENCY=max

# Install PM2 globally and tini for proper POSIX signal handling
RUN apk add --no-cache dumb-init curl && \
    npm install -g pm2 && \
    addgroup -g 1001 -S kuberq && \
    adduser -S -u 1001 -G kuberq kuberq

COPY --from=builder --chown=kuberq:kuberq /usr/src/app ./

# Create data & log directories with correct permissions
RUN mkdir -p data/logs && chown -R kuberq:kuberq data

USER kuberq

EXPOSE 4500

# Health check against 0ms /healthz endpoint
HEALTHCHECK --interval=20s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -fsS http://localhost:${PORT}/healthz || exit 1

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server.js"]
