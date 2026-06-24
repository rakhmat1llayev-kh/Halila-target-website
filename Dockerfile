# Lightweight production image for the Halila lead site.
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies first (better layer caching).
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the app.
COPY . .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Provide TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID at runtime, e.g.:
#   docker run -p 3000:3000 \
#     -e TELEGRAM_BOT_TOKEN=xxx -e TELEGRAM_CHAT_ID=-100xxx halila-lead-site
CMD ["node", "server.js"]
