# Use a base Node.js image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install --silent

# Copy the rest of the application files
COPY . .

# Expose the port your server is running on (assuming it’s running on port 3000)
EXPOSE 8000

# Command to run your backend server (change this according to your actual start script)
CMD ["npm", "run", "dev"]
