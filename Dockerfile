
FROM node:lts-alpine3.13 as node-build
WORKDIR /app

COPY . .
RUN npm install 
RUN  npm run build:ssr
RUN  npm audit fix




FROM nginx:1.17.1-alpine as nginx-client-browser
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=node-build /app/dist/theTipTop-front/browser /usr/share/nginx/html


FROM node:lts-alpine3.11 AS node-ssr-server
COPY — from=node-build /app/dist /app/dist/
COPY ./package.json /app/package.json
WORKDIR /app
EXPOSE 4000
CMD npm run serve:ssr
