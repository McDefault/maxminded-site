FROM node:12-alpine AS builder
COPY . ./maxminded-site
WORKDIR /maxminded-site
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /maxminded-site/dist/maxminded-site/ /usr/share/nginx/html
