#stage 1
FROM node:lts-alpine3.13 as node

WORKDIR /usr/src/theTipTop-front

COPY . .
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
RUN  npm run build --prod


### STAGE 2: Run ###
FROM nginx:1.17.1-alpine

COPY --from=build /usr/src/app/dist/theTipTop-front /usr/share/nginx/html


