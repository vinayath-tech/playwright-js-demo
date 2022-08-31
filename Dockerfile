FROM mcr.microsoft.com/playwright:v1.22.0-focal

USER root

WORKDIR /app

COPY package.json ./

COPY . ./

RUN npm install

CMD ["npm","run","test"]
# RUN npm run test