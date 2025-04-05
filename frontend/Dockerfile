FROM python:3.9-slim

# Set working dir
WORKDIR /app

# Install node and npm
RUN apt-get update && apt-get install -y nodejs npm

# Copy only the node files first to cache better
COPY package.json package-lock.json ./

# Install node modules
RUN npm install --legacy-peer-deps

# Copy Python requirements
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt 

# Copy the rest of the app (frontend + backend)
COPY . .

# Build Next.js (which creates .next/standalone folder)
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# ✅ Run the standalone Next.js server
CMD ["node", ".next/standalone/server.js"]
