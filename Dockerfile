# Stage 1: Build the React app
FROM node:14 as build

WORKDIR /usr/src/app/frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .
RUN npm run build

# Stage 2: Serve the React app with the backend
FROM node:14

RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean

WORKDIR /usr/src/app/backend

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

WORKDIR /usr/src/app
COPY python/ ./python/

RUN pip3 install --no-cache-dir -r python/requirements.txt

# Copy the built React app from the build stage to the backend's static folder
COPY --from=build /usr/src/app/frontend/build ./frontend/build

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app
WORKDIR /usr/src/app/backend
CMD ["npm", "start"]
