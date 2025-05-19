FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Vite's default dev server port
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev"]
