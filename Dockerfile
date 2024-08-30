FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]

LABEL org.opencontainers.image.source=https://github.com/krisamin/portfolio-front