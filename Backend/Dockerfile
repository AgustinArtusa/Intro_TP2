FROM node:22.13.1-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate
COPY . /app
CMD ["npm","run","dev"]