FROM node:6.3-onbuild

WORKDIR /app

RUN npm install -g forever

COPY ./package.json /app/

RUN npm install

COPY . /app/

EXPOSE 3000

CMD npm start