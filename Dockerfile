FROM node:16-alpine

WORKDIR /code/front-end

COPY . ./

RUN npm ci 

RUN npm run build

CMD [ "npx", "serve", "build" ]