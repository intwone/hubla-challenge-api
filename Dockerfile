FROM node:16.15.0-alpine

LABEL version="1.0" description="node image"

WORKDIR /usr/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
