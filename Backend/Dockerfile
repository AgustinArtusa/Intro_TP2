FROM node:22.13.1-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma db push
COPY . /app
CMD ["npm","run","dev"]