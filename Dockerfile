FROM node:16-alpine3.11

ENV MONGO_INITDB_ROOT_USERNAME=admin \
    MONGO_INITDB_ROOT_PASSWORD=password 

RUN mkdir -p /home/app

COPY ./app /home/app 

WORKDIR /home/app

RUN npm install

CMD ["node","/home/app/server.js"]
