#!/bin/sh
# Railway injeta $PORT dinamicamente — usamos como SERVER_PORT
export SERVER_PORT=${PORT:-8080}
export SERVER_URL=${SERVER_URL:-https://xlaboratorio-evolution-api-production.up.railway.app}
echo "Iniciando Evolution API na porta $SERVER_PORT..."
exec node /evolution/dist/main.js
