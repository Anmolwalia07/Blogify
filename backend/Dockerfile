FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install -g wrangler && npm install

COPY ./prisma ./
RUN npx prisma generate
COPY . .

EXPOSE 8787

CMD ["npm","run","dev"]
