FROM node:12.13-alpine As development

RUN apk add g++ make python

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.* ./

RUN yarn

COPY . .

FROM node:12.13-alpine as production

RUN apk add g++ make python

WORKDIR /usr/src/app

COPY --from=development /usr/src/app .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]