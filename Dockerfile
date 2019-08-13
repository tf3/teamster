FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN ["npm", "install", "--production"]
COPY . .
RUN ["npm", "run", "build"]
EXPOSE 2000
CMD ["npm", "start"]