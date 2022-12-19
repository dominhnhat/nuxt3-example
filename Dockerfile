# Install dependencies only when needed
FROM node:19.2-alpine AS deps
WORKDIR /src
COPY package.json ./
COPY .npmrc ./
RUN apk --no-cache add curl
RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;
RUN pnpm install

# Rebuild the source code only when needed
FROM node:19.2-alpine AS builder
WORKDIR /src
COPY . .
COPY --from=deps /src/node_modules ./node_modules
RUN apk --no-cache add curl
RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;
# RUN yarn generate
RUN pnpm run build

# Production image, copy all the files and run nuxt
FROM node:19.2-alpine AS runner
ENV HOST 0.0.0.0
WORKDIR /src

COPY --from=builder /src/.output ./.output
# COPY --from=builder /src/dist ./dist

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]

