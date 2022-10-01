FROM node:16.16.0-alpine

COPY . /app

WORKDIR /app

RUN npm ci

EXPOSE 5001

CMD ["npm", "start"]
