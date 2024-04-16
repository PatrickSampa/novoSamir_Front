FROM node:14-alpine

USER root

RUN addgroup -g 20000 app && adduser -u 20000 -G app -D app -s /bin/bash

RUN npm install -g http-server @vue/cli

WORKDIR /app

COPY . .

RUN yarn

RUN npm run build

EXPOSE 8080

USER app

CMD [ "http-server", "dist" ]
