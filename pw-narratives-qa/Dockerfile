FROM mcr.microsoft.com/playwright:v1.36.2-jammy

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9323

EXPOSE 9323

CMD [ "npm", "run", "test" ]