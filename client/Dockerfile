FROM node:12-alpine

ENV APP_ROOT /usr/src/app
WORKDIR ${APP_ROOT}

COPY ./package*.json ./

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python && \
    npm install --quiet node-gyp -g &&\
    npm install --quiet && \
    apk del native-deps

ADD . ${APP_ROOT}
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]