
FROM node:lts-alpine3.13 as node
WORKDIR /app

COPY . .
RUN npm install 
RUN  npm run build --prod

FROM nginx:1.17.1-alpine as nginx

COPY --from=node /app/dist/theTipTop-front /usr/share/nginx/html


