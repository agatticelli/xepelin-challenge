FROM node:18-alpine

EXPOSE 4000
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD [ "yarn" , "start:dev"]
