# Use a Node.js image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install --silent

# Copy the rest of the application files
COPY . .

# Expose the port Socket.IO will run on (e.g., 4000)
EXPOSE 4000

# Start the Socket.IO server
CMD ["npm", "run", "dev"]
