
FROM node:lts-alpine3.13 as node
WORKDIR /app

COPY . .
RUN npm install 
RUN  npm run build:ssr
RUN npm run serve:ssr
RUN  npm audit fix




FROM nginx:1.17.1-alpine as nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=node /app/dist/theTipTop-front /usr/share/nginx/html


