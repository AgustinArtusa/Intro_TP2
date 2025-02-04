FROM node:22.13.1-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
CMD ["npm","run","start"]