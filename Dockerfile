FROM node:16-alpine

WORKDIR /code/front-end/

COPY package*.json /code/front-end/

RUN npm install

COPY . /code/front-end/

CMD ["npm", "start"]