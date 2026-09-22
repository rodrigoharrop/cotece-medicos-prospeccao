# PathoLab SaaS — Upgrade do Sistema Manus para Multi-Tenant SaaS

> O Manus já construiu o sistema base. Este documento define o que precisa ser
> adicionado/adaptado para transformá-lo em um SaaS comercializável para outros laboratórios.

---

## O QUE O MANUS JÁ ENTREGOU ✅

### Sistema Completo (v1.0.0 — Pronto para Produção)

| Item | Status |
|------|--------|
| Site Institucional com 11 serviços | ✅ |
| Autenticação 6 perfis (Admin, Vet, Clínica, Técnico, Financeiro, Tutor) | ✅ |
| Módulo de Laudos com Rich Text + PDF + Assinatura Digital | ✅ |
| Portal de Resultados (com e sem login) | ✅ |
| Agenda de Coletas | ✅ |
| Módulo Financeiro (25 exames, NF, Pagamentos) | ✅ |
| Gestão de Estoque | ✅ |
| Upload S3 (PDFs, Imagens) | ✅ |
| Notificações por E-mail | ✅ |
| **Assistente de IA** (diagnósticos diferenciais) | ✅ |
| Dashboard Administrativo com KPIs | ✅ |
| Integração Google Drive | ✅ |
| Dark Mode | ✅ |
| 19 Tabelas de BD | ✅ |
| 5.000+ linhas de código | ✅ |

### Stack Original (Manus)
```
Frontend:  React 19 + Tailwind CSS 4 + TypeScript
Backend:   Express 4 + Node.js + tRPC 11
BD:        MySQL/TiDB + Drizzle ORM
Auth:      Manus OAuth
Storage:   AWS S3
IA:        Manus LLM API
Deploy:    Manus Platform
```

### Identidade Visual Original (Manus)
```
Primária:  #001F3F  (Azul Marinho)
Secundária #FFFFFF  (Branco)
Destaque:  #FFD700  (Amarelo)
Tipografia: Inter + Roboto
```

---

## O QUE PRECISA SER ADAPTADO PARA O SAAS 🔧

### 1. Multi-Tenancy (CRÍTICO)

O sistema atual foi feito para **um único laboratório**. Para SaaS, precisamos:

**a) Adicionar tabela `tenants`**
```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,  -- ex: "healthcare-botucatu"
  plan TEXT DEFAULT 'starter',  -- starter | pro | business | enterprise
  active BOOLEAN DEFAULT true,
  custom_domain TEXT,          -- ex: "sistema.healthcarelab.com.br"
  settings JSONB,              -- cores, logo, configurações
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**b) Adicionar `tenant_id` em TODAS as tabelas existentes**
- users, clinics, patients, exams, reports, schedules, inventory, etc.

**c) Row Level Security (RLS)**
- Todos os queries filtram por `tenant_id` do usuário logado

**d) Roteamento por subdomínio**
```
healthcare.patholab.com.br  → tenant_id = "health-care-botucatu"
labvet-sp.patholab.com.br   → tenant_id = "labvet-sp"
```

### 2. Landing Page SaaS (NOVA PÁGINA)

Página de marketing para captar novos laboratórios:
- URL: `patholab.com.br` (ou `laborvet.com.br`)
- Seções: Hero, Problema, Solução, Módulos, Preços, Depoimentos, CTA
- CTA principal: "Teste 14 dias grátis"
- Case de sucesso: Health Care como cliente #1

### 3. Onboarding Automatizado (NOVO)

Quando um novo laboratório se cadastra:
1. Cria tenant + subdomínio automaticamente
2. Popula tabelas com dados de exemplo
3. Configura tabela de preços padrão (baseada nos 25 exames)
4. Envia e-mail de boas-vindas com credenciais

### 4. Planos e Billing (NOVO)

| Plano | Preço | Exames/mês | Usuários |
|-------|-------|------------|----------|
| Starter | R$ 497/mês | 200 | 3 |
| Pro | R$ 997/mês | 1.000 | 10 |
| Business | R$ 1.997/mês | 5.000 | 30 |
| Enterprise | Consultar | Ilimitado | Ilimitado |

**Integração de pagamento:** Stripe ou Pagar.me

### 5. Admin Super (NOVO)

Painel para a Agência Xdigital gerenciar todos os tenants:
- Lista de laboratórios ativos
- Uso por tenant (exames, storage, usuários)
- Gerenciamento de planos
- Métricas globais

---

## MELHORIAS DE PRODUTO PRIORITÁRIAS 🚀

### Para o cliente Health Care (Versão 1.1)

| Melhoria | Impacto | Esforço |
|----------|---------|---------|
| Envio de laudo via WhatsApp | Alto | Médio |
| Portal de resultados por QR Code | Alto | Baixo |
| Assinatura digital avançada (ICP-Brasil) | Médio | Alto |
| Rastreamento de amostras em tempo real | Alto | Médio |
| Integração com labs de apoio (VetDNA, Provet) | Alto | Alto |
| App mobile (PWA primeiro) | Médio | Médio |

### Para o SaaS (Versão 2.0)

| Feature | Impacto no SaaS | Esforço |
|---------|-----------------|---------|
| White-label completo (cores, logo, domínio) | Crítico | Médio |
| API pública para integrações | Alto | Alto |
| Marketplace de clínicas | Alto | Alto |
| BI/Analytics avançado | Médio | Alto |
| Integração com equipamentos (ASTM/HL7) | Alto | Muito Alto |

---

## ROADMAP DE EVOLUÇÃO

### Fase 1 — Estabilizar para Health Care (Semanas 1–4)
- [ ] Deploy em produção (substituir Manus Platform)
- [ ] Migrar auth de Manus OAuth para Supabase Auth
- [ ] Configurar S3 próprio (AWS ou Supabase Storage)
- [ ] Implementar WhatsApp notifications
- [ ] QA completo dos 12 módulos

### Fase 2 — Multi-tenancy (Semanas 5–10)
- [ ] Adicionar tenant_id em todas as tabelas
- [ ] Implementar RLS
- [ ] Roteamento por subdomínio
- [ ] Admin super-tenant

### Fase 3 — Landing Page SaaS (Semanas 8–12)
- [ ] Design e desenvolvimento da landing page
- [ ] Onboarding automatizado
- [ ] Sistema de billing (Stripe)
- [ ] Case study Health Care publicado

### Fase 4 — Escala (Mês 4+)
- [ ] Programa de afiliados (clínicas indicam outros labs)
- [ ] App mobile PWA
- [ ] API pública documentada
- [ ] Integrações com equipamentos

---

## SITE INSTITUCIONAL — UPGRADE VISUAL

### Problema Identificado
O site gerado pelo Manus usa a paleta Azul Marinho + Amarelo. Baseado na análise
dos melhores sites de laboratórios veterinários (Antech, IDEXX, Provet), recomendamos
uma abordagem mais moderna.

### Opção A: Manter Identidade Manus (Menos Esforço)
Melhorar o site existente com:
- Fotos profissionais reais do laboratório
- Seção de credenciais (CRMV, UNESP parceria)
- Depoimentos das 7 clínicas parceiras
- Animações sutis (fade-in, hover)
- Melhor hierarquia tipográfica

### Opção B: Redesign com Insights dos Melhores Labs (Mais Impacto)
Nova paleta baseada em pesquisa de mercado:
```
Primária:  #1E7B7E  (Teal — padrão do setor)
Dark:      #001F3F  (Azul Marinho — mantém identidade)
Destaque:  #FFD700  (Amarelo — mantém identidade)
Bg:        #F4F6F8  (Cinza claro)
```
Combina a identidade da Health Care com as melhores práticas do setor.

---

## TABELA DE PREÇOS CONFIRMADA (do Manus)

| Exame | Preço |
|-------|-------|
| Hemograma | R$ 120 |
| Hemograma + Bioquímico | R$ 280 |
| Bioquímica Básica | R$ 150 |
| Bioquímica Completa | R$ 250 |
| Eletrólitos | R$ 180 |
| Hormonais (T4, TSH) | R$ 200 |
| SDMA | R$ 250 |
| Uroanálise Completa | R$ 100 |
| Coproparasitológico | R$ 80 |
| Cultura Bacteriana | R$ 280 |
| Antibiograma | R$ 150 |
| Fungos | R$ 200 |
| Leishmania (sorologia) | R$ 120 |
| FeLV/FIV | R$ 150 |
| Erliquiose | R$ 140 |
| FeLV PCR | R$ 300 |
| Mycoplasma PCR | R$ 280 |
| Citologia Geral | R$ 200 |
| Histopatologia | R$ 400 |
| Teste de Compatibilidade | R$ 350 |

---

## URLS DO SISTEMA (conforme Manus)

```
Site Público:         /
Portal Resultados:    /results        (sem login — busca por código)
Laudos:               /reports
Agenda:               /schedule
Estoque:              /inventory
Upload:               /upload
Assistente IA:        /ai-assistant
Dashboard Admin:      /dashboard/admin
Dashboard Vet.:       /dashboard/veterinarian
Dashboard Clínica:    /dashboard/clinic
Dashboard Técnico:    /dashboard/technician
Dashboard Financeiro: /dashboard/financial
Dashboard Tutor:      /dashboard/tutor
```

---

*Documento criado em 24/04/2026 | PathoLab SaaS — Agência Xdigital*
