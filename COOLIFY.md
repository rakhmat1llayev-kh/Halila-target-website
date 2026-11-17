# Coolify deployment

Build from the Dockerfile and expose port `3000`. Set the health check path to `/health`.

Provide `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as encrypted Coolify secrets, using a newly rotated token. The lead endpoint is `/api/lead`.
