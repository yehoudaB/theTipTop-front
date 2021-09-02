
FROM node:lts-alpine3.13 as node-server
WORKDIR /app

COPY . .
RUN npm install 
RUN  npm run build:ssr
RUN  npm audit fix
RUN npm run serve:ssr
EXPOSE 4000


FROM nginx:1.17.1-alpine as nginx-client-browser
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=node-server /app/dist/theTipTop-front/browser /usr/share/nginx/html


