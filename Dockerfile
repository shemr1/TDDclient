FROM node:20.9.0
WORKDIR /app
COPY package.json package-lock.json ./
COPY public public
COPY src src
RUN npm ci
COPY . .
EXPOSE 3000
CMD [ "npm", "start"]

