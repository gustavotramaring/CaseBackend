# Use uma imagem base do Node.js
FROM node:18-alpine

# Configure o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários
COPY package.json package-lock.json ./ 

# Instale as dependências do projeto
RUN npm install

# Baixe o script wait-for-it.sh
RUN apk add --no-cache curl && \
    curl -o /wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /wait-for-it.sh

# Instalar o bash
RUN apk add --no-cache bash

# Copie o código fonte para o contêiner
COPY . . 
COPY ./prisma ./prisma

# Gere o cliente do Prisma
RUN npx prisma generate

# Exponha a porta que o Fastify está ouvindo
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["./wait-for-it.sh", "betteredge_db:3306", "--", "npm", "start"]
