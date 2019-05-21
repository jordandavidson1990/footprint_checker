FROM node:8

WORKDIR /usr/src/

COPY . .
# RUN mongo < ./server/db/seeds.js
RUN npm install

EXPOSE 3000

# What to do to start the container
CMD ["npm", "start"]
