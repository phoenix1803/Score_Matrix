
FROM python:3.9-slim
WORKDIR /app
RUN apt-get update && apt-get install -y nodejs npm
COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt 
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]