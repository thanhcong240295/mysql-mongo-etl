# Using node version 14.21-alpine
FROM node:14.21-alpine

WORKDIR /maon-mysql-mongo-etl

COPY package.json /maon-mysql-mongo-etl

RUN yarn install

COPY . /maon-mysql-mongo-etl

CMD yarn dev