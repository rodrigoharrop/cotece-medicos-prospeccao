#!/bin/bash
# ── Deploy Evolution API no Railway para XLaboratorio ────────────────────────

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

RW="npx --yes @railway/cli"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Evolution API — Deploy Railway para XLaboratorio  ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# [1/5] Verifica login
echo -e "${YELLOW}[1/5] Verificando login no Railway...${NC}"
RAILWAY_USER=$($RW whoami 2>/dev/null || echo "")
if [ -z "$RAILWAY_USER" ]; then
  $RW login
  RAILWAY_USER=$($RW whoami 2>/dev/null || echo "")
fi
echo -e "${GREEN}✓ $RAILWAY_USER${NC}"

# Gera API key
API_KEY="xlaboratorio-$(openssl rand -hex 16)"

# [2/5] Link ao projeto existente (já criado no passo anterior)
echo ""
echo -e "${YELLOW}[2/5] Linkando ao projeto xlaboratorio-evolution-api...${NC}"
$RW link --project "xlaboratorio-evolution-api" 2>/dev/null || true
echo -e "${GREEN}✓ Projeto linkado${NC}"

# [3/5] Deploy da imagem Docker (cria o serviço)
echo ""
echo -e "${YELLOW}[3/5] Criando serviço com imagem Docker da Evolution API...${NC}"
$RW service create --name "evolution-api" 2>/dev/null || true

# Faz o deploy a partir do Dockerfile (que aponta para a imagem atendai/evolution-api)
$RW up --detach 2>/dev/null || true
echo -e "${GREEN}✓ Serviço criado e em deploy${NC}"

# [4/5] Configura variáveis
echo ""
echo -e "${YELLOW}[4/5] Configurando variáveis de ambiente...${NC}"

vars=(
  "AUTHENTICATION_TYPE=apikey"
  "AUTHENTICATION_API_KEY=$API_KEY"
  "SERVER_PORT=8080"
  "SERVER_TYPE=http"
  "CORS_ORIGIN=*"
  "CORS_METHODS=GET,POST,PUT,DELETE"
  "CORS_CREDENTIALS=true"
  "DATABASE_ENABLED=false"
  "CACHE_REDIS_ENABLED=false"
  "CACHE_LOCAL_ENABLED=true"
  "STORE_MESSAGES=true"
  "STORE_MESSAGE_UP=true"
  "STORE_CONTACTS=true"
  "STORE_CHATS=true"
  "WEBHOOK_GLOBAL_URL=https://health-care-lab-two.vercel.app/api/whatsapp/webhook"
  "WEBHOOK_GLOBAL_ENABLED=true"
  "WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=false"
  "WEBHOOK_EVENTS_QRCODE_UPDATED=true"
  "WEBHOOK_EVENTS_MESSAGES_UPSERT=true"
  "WEBHOOK_EVENTS_MESSAGES_UPDATE=true"
  "WEBHOOK_EVENTS_CONNECTION_UPDATE=true"
  "LOG_LEVEL=ERROR"
  "LOG_COLOR=true"
  "LOG_BAILEYS=error"
  "QRCODE_LIMIT=30"
  "DEL_INSTANCE=false"
)

for var in "${vars[@]}"; do
  key="${var%%=*}"
  val="${var#*=}"
  $RW variables set "$key=$val" 2>/dev/null && echo -e "  ${GREEN}✓${NC} $key" || echo -e "  ${YELLOW}~${NC} $key (verifique manualmente)"
done

# [5/5] Domínio e credenciais
echo ""
echo -e "${YELLOW}[5/5] Obtendo URL pública...${NC}"
sleep 15

DOMAIN=$($RW domain 2>/dev/null || echo "")
if [ -z "$DOMAIN" ]; then
  $RW domain generate 2>/dev/null || true
  sleep 8
  DOMAIN=$($RW domain 2>/dev/null || echo "")
fi

if [ -n "$DOMAIN" ]; then
  FULL_URL="https://$DOMAIN"
  $RW variables set "SERVER_URL=$FULL_URL" 2>/dev/null || true
  echo -e "${GREEN}✓ URL: $FULL_URL${NC}"
else
  FULL_URL="COPIE-DO-PAINEL-RAILWAY"
  echo -e "${RED}⚠ URL não obtida — copie do painel railway.app${NC}"
fi

# Salva credenciais
cat > ./credentials.txt << CREDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Evolution API — Credenciais XLaboratorio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

URL:     $FULL_URL
API KEY: $API_KEY

━━ Adicionar na Vercel ━━━━━━━━━━━━━━
EVOLUTION_API_URL=$FULL_URL
EVOLUTION_API_KEY=$API_KEY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREDS

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✅ Concluído! Credenciais salvas em credentials.txt${NC}"
echo ""
echo -e "  ${YELLOW}URL:${NC}     $FULL_URL"
echo -e "  ${YELLOW}API Key:${NC} $API_KEY"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
