FROM node:12 As build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run clean
RUN npm run build

FROM node:12 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 4000
CMD ["npm", "run", "start"]