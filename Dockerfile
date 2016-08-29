FROM node:6-onbuild

WORKDIR /app

<<<<<<< HEAD
RUN npm install -g forever

=======
>>>>>>> 195fcb2b9f6bcce7977787ce05765c7694199f3f
COPY . /app/

EXPOSE 3000

<<<<<<< HEAD
CMD forever server.js
=======
CMD npm start
>>>>>>> 195fcb2b9f6bcce7977787ce05765c7694199f3f
