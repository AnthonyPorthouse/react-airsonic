FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM caddy:alpine

COPY --from=builder /app/build/. /usr/share/caddy/.

COPY ./.docker/Caddyfile /etc/caddy/Caddyfile
