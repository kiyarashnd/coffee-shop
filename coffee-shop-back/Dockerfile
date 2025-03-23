FROM node:20
WORKDIR /app
COPY package*.json ./
ARG NODE_ENV
RUN npm install
RUN npm install -g nodemon
COPY . ./
COPY .env ./
ENV PORT 3000
EXPOSE $PORT
CMD ["npm", "run", "dev"]
