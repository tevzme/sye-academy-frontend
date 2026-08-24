# --- Stage 1: Dependency Installation ---
FROM harbor-private.aeonth.com/public-images/node:20.10.0-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./

RUN npm config set strict-ssl false
RUN npm config set registry="https://sonatype.aeonth.com/repository/sye-npm-proxy/" 
RUN rm -f package-lock.json
RUN npm -v
RUN npm install

# --- Stage 2: Next.js Build ---
FROM harbor-private.aeonth.com/public-images/node:20.10.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN chmod -R 755 .
RUN npm run build

# --- Stage 3: Run Server ---
FROM harbor-private.aeonth.com/public-images/node:20.10.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copy only necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

CMD ["node_modules/.bin/next", "start", "-p", "8080"]
