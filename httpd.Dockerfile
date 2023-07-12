FROM node:lts-alpine as build-stage
RUN npm install -g npm@9.8.0
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build


FROM httpd:2.4 as production-stage
COPY --from=build-stage /app/dist /usr/local/apache2/htdocs/
COPY httpd.conf /usr/local/apache2/conf/httpd.conf