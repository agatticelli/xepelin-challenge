FROM node:18-alpine

EXPOSE 3000
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD [ "yarn" , "start:dev"]
