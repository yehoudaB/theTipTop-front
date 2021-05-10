#stage 1
FROM node:lts-alpine3.13 as node
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/theTipTop-front /usr/share/nginx/html