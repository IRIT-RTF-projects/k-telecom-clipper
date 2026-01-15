FROM node:20-alpine

WORKDIR /app


COPY package*.json ./

RUN npm install
RUN npm rebuild esbuild --build-from-source || true

# Копируем весь проект
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
