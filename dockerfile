# dockerfile for node server
FROM node:latest
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# bundle app source
COPY . .
EXPOSE 3000
CMD ["npm", "start"]