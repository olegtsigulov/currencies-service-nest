FROM node:12.16.2-alpine3.11

RUN mkdir -p /usr/src/currecnies-service
WORKDIR /usr/src/currecnies-service

ENV NPM_CONFIG_LOGLEVEL warn
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
