FROM node:17.8-alpine3.14 as dev

ENV PORT 8000

WORKDIR /usr/src/app

COPY package-lock.json package.json ./

RUN [ "npm", "ci" ]

CMD [ "npm", "run", "dev" ]
EXPOSE 8000