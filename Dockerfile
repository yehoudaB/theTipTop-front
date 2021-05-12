#stage 1
FROM node:lts-alpine3.13 as node

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/theTipTop-front /usr/share/nginx/html
EXPOSE 80

