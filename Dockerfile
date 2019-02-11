FROM node:alpine

RUN apk add --no-cache --update \
  python \
  python-dev \
  py-pip \
  build-base \
  git

WORKDIR /usr/src/app
COPY package.json . 
RUN yarn
COPY . .
RUN yarn build