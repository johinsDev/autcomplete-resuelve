FROM node:10.13-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm i lerna -g --loglevel notice

COPY package.json yarn.lock lerna.json ./
COPY packages/web/package.json packages/web/yarn.lock  ./packages/web/

RUN lerna bootstrap

ADD . ./

EXPOSE 3000

# CMD ["yarn", "run", "start:web"]
