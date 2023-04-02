FROM node:current-alpine3.16

WORKDIR /app
ADD . .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]