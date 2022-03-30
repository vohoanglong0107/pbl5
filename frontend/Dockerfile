FROM node:17.8-alpine3.14 as dev

WORKDIR /usr/src/app

COPY package-lock.json package.json ./

RUN [ "npm", "ci" ]

# RUN [ "chown", "-R", "$(id -u):$(id -g)", "/usr/src/app" ]

CMD [ "npm", "run", "dev" ]
EXPOSE 3000