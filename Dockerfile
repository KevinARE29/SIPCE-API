FROM node:12.14
# Set a directory for the app
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy all source files to the container
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
