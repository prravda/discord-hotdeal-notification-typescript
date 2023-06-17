FROM node:18.16.0-alpine

CMD ["npm", "install", "-g", "npm@9.6.7"]

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN npm i

COPY . /app

CMD ["npx", "ts-node", "app.ts"]