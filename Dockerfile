FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]