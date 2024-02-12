FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM caddy:alpine

WORKDIR /app

COPY --from=builder /app/build/. /app/.

COPY ./.docker/Caddyfile /etc/caddy/Caddyfile
