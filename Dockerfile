FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy all project files (Safe with .dockerignore)
COPY project/ .

# Security: Create and use a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# Ensure the user owns the directory to avoid permission issues
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

EXPOSE 5000

# Start the application
CMD ["node", "app.js"]