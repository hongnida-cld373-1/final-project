FROM node:18-alpine

WORKDIR /usr/src/app

# Copy ONLY package files first (for caching)
COPY project/package*.json ./

RUN npm install --omit=dev

# Copy app source
COPY project/ .

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /usr/src/app

USER appuser

EXPOSE 5000

CMD ["node", "server.js"]