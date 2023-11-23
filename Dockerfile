FROM node:20.9.0-alpine as base
WORKDIR /app
COPY package.json package-lock.json ./
COPY public public
COPY src src
RUN npm ci

FROM base as Dev
EXPOSE 3000
COPY --from=base /app/node_modules ./node_modules
COPY . .
CMD [ "npm", "start"]

