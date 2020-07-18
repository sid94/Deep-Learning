FROM node:13.13.0-alpine
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]