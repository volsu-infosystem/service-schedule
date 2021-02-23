FROM node:12.13-alpine As development

RUN apk add g++ make python

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.* ./

RUN yarn

COPY . .

FROM node:12.13-alpine as production

RUN apk add g++ make python

ARG DEBAG='production'
ENV DEBAG=${DEBAG}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.* ./

RUN yarn

RUN yarn build

COPY . .

CMD ["yarn", "start"]
