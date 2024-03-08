# Stage 1: Build the application
FROM node:20.11 AS builder

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm cache clean --force


RUN npm install

COPY . .

RUN npm run build

# ... (previous content)

# Stage 2: Run Prisma commands
FROM builder AS prisma

WORKDIR /usr/src/app

# Add necessary dependencies for Prisma
RUN npm install -g prisma wait-for-it

# Copy the whole project to include necessary files
COPY . .

# set env
ENV DATABASE_URL=mysql://root:151515@mysql:3316/uniplato

# Wait for the MySQL service to be ready before running Prisma commands
CMD ["wait-for-it", "mysql:3316", "--", "npx", "prisma", "generate", "&&", "npx", "prisma", "migrate", "dev"]

# Stage 3: Final image
FROM node:20.11

WORKDIR /usr/src/app

# Copy built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy Prisma artifacts from the prisma stage
COPY --from=prisma /usr/src/app/prisma ./prisma

# Copy package.json and package-lock.json
COPY package*.json /usr/src/app/

# Install only production dependencies
RUN npm install --only=production

# Expose the port that your Fastify app is running on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
