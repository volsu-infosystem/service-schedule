FROM node:12.13-alpine As development

RUN apk add g++ make python

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.* ./

RUN yarn

COPY . .

FROM node:12.13-alpine as production

RUN apk add g++ make python

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app .

COPY . .

RUN yarn build

CMD ["yarn", "start"]