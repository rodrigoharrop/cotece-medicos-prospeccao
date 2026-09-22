# PathoLab SaaS — Escopo Completo do Projeto

> **Cliente inicial:** Health Care - Patologia e Hematologia Veterinárias  
> **Responsável:** M.V. Jhessica Naomi Sakoda — CRMV SP 65582  
> **CNPJ:** 39.274.901/0001-07 (J.N SAKODA LTDA)  
> **Endereço:** Av. Leonardo Villas Boas, 314-B, Vila Nova, Botucatu/SP — CEP 18608-227  
> **Contato:** (14) 3881-7371 / (14) 99847-9757 | healthcare.laudos@gmail.com  
> **Agência:** Agência Xdigital — agenciaxdigital.com.br  
> **Data de Início:** Abril 2026  

---

## 1. VISÃO DO PRODUTO

O **PathoLab** é uma plataforma SaaS (Software as a Service) de gestão laboratorial veterinária que resolve três problemas críticos:

1. **Acesso a laudos** — veterinários não têm canal digital para acessar resultados
2. **Solicitação de exames** — processo feito por telefone ou presencialmente
3. **Gestão interna** — sem controle centralizado de insumos, estoque, orçamentos e vendas

### Modelo de Negócio
- **Tier 1 (Cliente):** Sistema customizado para Health Care (instância dedicada)
- **Tier 2 (SaaS Multi-tenant):** Mesma plataforma licenciada para outros laboratórios veterinários

---

## 2. MÓDULOS DO SISTEMA

### 2.1 Laudos & Resultados
- Upload de laudos (PDF, imagem, dados estruturados)
- Histórico completo por paciente (animal + tutor + clínica)
- Acesso online seguro para veterinários via portal
- Assinatura digital do MV responsável
- Envio automático via WhatsApp, e-mail e SMS
- Notificações de liberação de resultados

### 2.2 Solicitação de Exames
- Formulário digital integrado ao site
- Ficha de requisição digital (substituindo o papel atual)
- Acompanhamento de status em tempo real
- Notificações automáticas (coleta recebida, em análise, liberado)
- Rastreamento de amostras

### 2.3 Catálogo de Exames
Baseado nos laudos reais do laboratório:

**Hematologia**
- Hemograma Completo
- Tipagem Sanguínea
- Teste de Compatibilidade Sanguínea
- Proteína Plasmática

**Bioquímica Sanguínea**
- Eletrólitos (Na, K, Ca, P, Cl)
- Perfil Renal (Uréia, Creatinina, SDMA)
- Perfil Hepático (ALT/TGP, AST/TGO, FA, GGT)
- Perfil Lipídico (Colesterol, HDL, Triglicérides)
- Glicose, Proteínas Totais, Albumina, Globulinas
- CK, Ferro Sérico, Magnésio, Lipase, Amilase, Bilirrubinas

**Hormonais**
- T4 Total (Tiroxina)
- TSH (Hormônio Estimulante da Tireoide)
- Cortisol (Basal + Supressão com Dexametasona)

**Urinálise**
- Urina I (completa)
- Sedimentoscopia
- Densidade Urinária
- UPC (Relação Proteína:Creatinina Urinária)

**Parasitológico**
- Coproparasitológico (simples, 3 amostras, OPG)
- Raspado de pele
- Pesquisa de Malassezia
- Pesquisa de Ectoparasitas — conduto

**Microbiologia**
- Cultura Bacteriana + Antibiograma
- Cultura Fúngica

**Biologia Molecular (PCR)**
- FeLV (Vírus da Leucemia Felina)
- FIV (Imunodeficiência Felina)
- PIF (Peritonite Infecciosa Felina)
- Mycoplasma spp.
- Anaplasma spp.
- Babesia sp.
- Ehrlichia spp.
- Parvovirus Canino
- Cinomose
- Leishmaniose spp.

**Sorologia**
- Leishmaniose (ELISA Quantitativo)

**Citologia**
- Efusão Cavitária (Pleural, Abdominal)
- Citologia de Nódulos/Massas
- Análise de Líquidos Biológicos

### 2.4 Vendas & Orçamentos
- Geração de orçamentos em PDF com logo da empresa
- Tabela de preços por tipo de clínica
- Registro de vendas com data/hora/responsável
- Controle de pagamentos (pago, pendente, inadimplente)
- Painel financeiro básico (faturamento diário, semanal, mensal)
- Relatório de receita por tipo de exame e por clínica

### 2.5 Gestão de Insumos
- Controle de estoque de reagentes e materiais
- Alertas automáticos de estoque mínimo
- Relatório de consumo por período
- Cadastro de fornecedores
- Gestão de lotes e validades

### 2.6 Gestão de Usuários e Permissões

| Perfil      | Permissões                                                                    |
|-------------|-------------------------------------------------------------------------------|
| Admin       | Acesso total ao sistema                                                       |
| Técnico     | Upload de laudos, gestão de amostras, insumos                                 |
| Veterinário | Solicitação de exames, acesso a laudos dos seus pacientes                     |
| Clínica     | Portal da clínica: laudos dos pacientes, histórico, solicitações              |
| Tutor       | Acesso a laudos do seu pet (somente leitura)                                  |
| Financeiro  | Orçamentos, vendas, relatórios financeiros, insumos                           |

### 2.7 Painel Executivo (Dashboard)
- Volume de exames por dia/semana/mês
- Métricas de faturamento
- Exames por tipo (ranking)
- Clínicas parceiras (ranking por volume)
- Tempo médio de liberação de resultados
- Taxa de exames repetidos
- KPIs personalizáveis

---

## 3. SITE INSTITUCIONAL

### 3.1 Páginas
1. **Homepage** — apresentação, diferenciais, CTA de solicitação
2. **Serviços** — catálogo completo de exames com descrições
3. **Interpretação** — conteúdo educativo sobre cada tipo de exame
4. **Login** — portal de acesso ao sistema (por perfil)
5. **Solicitar Exame** — formulário digital integrado
6. **Sobre** — história, equipe, estrutura, certificações
7. **Contato & Localização** — mapa, telefone, WhatsApp

### 3.2 Recursos Técnicos
- Mobile-first, 100% responsivo
- SEO On-page otimizado para buscas locais (Botucatu, região)
- Performance (Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms)
- Google Analytics 4 com eventos customizados
- Meta Pixel (preparado para campanhas futuras)
- SSL + Segurança (HTTPS, headers de segurança)
- WhatsApp flutuante
- Schema markup para laboratório veterinário
- Open Graph para redes sociais

### 3.3 Stack Tecnológica Recomendada
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Backend/API:** Next.js API Routes + Supabase
- **Database:** PostgreSQL (via Supabase)
- **Storage:** Supabase Storage (laudos em PDF)
- **Auth:** Supabase Auth (com suporte a roles)
- **Deploy:** Vercel
- **Email:** Resend
- **WhatsApp:** Evolution API ou Twilio

---

## 4. PRESENÇA NO INSTAGRAM

### 4.1 Configuração Inicial
- Otimização do perfil (bio, link na bio, foto de perfil, nome de usuário)
- Templates visuais para o feed (paleta alinhada à marca)
- Destaques do perfil organizados

### 4.2 Pilares de Conteúdo
1. **Educativo** — quando solicitar cada exame, interpretação de resultados
2. **Institucional** — bastidores, equipe, estrutura do laboratório
3. **Cases** — resultados de sucesso (sem dados sensíveis)
4. **Serviços** — exames disponíveis, diferenciais, banco de sangue

### 4.3 Entregáveis
- 12 posts base prontos para publicar
- Roteiros de legenda completos
- Calendário editorial mensal
- Templates replicáveis para conteúdo futuro

---

## 5. CRONOGRAMA

| Fase | Descrição                    | Período      | Marco                                    |
|------|------------------------------|--------------|------------------------------------------|
| F1   | Briefing & Alinhamento       | Semana 1     | Documento de briefing validado           |
| F2   | Sistema de Gestão            | Sem. 2–8     | Sistema em produção                      |
| F3   | Site Institucional           | Sem. 4–9     | Site publicado + SEO                     |
| F4   | Instagram Orgânico           | Sem. 6–12    | Perfil + 12 posts base                   |
| F5   | Lançamento & Ativação        | Semana 10    | Go-live + primeiros cadastros            |
| F6   | Relatório + Plano de Mídia   | Sem. 12–16   | Relatório + proposta Meta/Google Ads     |

*Fases 2 e 3 são paralelas. Meta Ads + Google Ads a partir do mês 4.*

---

## 6. ESTRUTURA SAAS MULTI-TENANT

Para escalar além do cliente inicial, a plataforma deve suportar múltiplos laboratórios:

### 6.1 Arquitetura Multi-tenant
```
patholab.com.br           → Landing page SaaS (captação de novos labs)
[slug].patholab.com.br    → Instância por laboratório (ex: healthcare.patholab.com.br)
app.patholab.com.br       → Painel admin da plataforma
```

### 6.2 Isolamento de Dados
- Row Level Security (RLS) no Supabase por `tenant_id`
- Storage buckets separados por laboratório
- Domínios customizados opcionais

### 6.3 Planos de Preço (SaaS)

| Plano        | Preço/mês | Usuários | Exames/mês | Recursos                                  |
|--------------|-----------|----------|------------|-------------------------------------------|
| **Starter**  | R$ 497    | 3        | 200        | Laudos, Solicitações, Portal Básico       |
| **Pro**      | R$ 997    | 10       | 1.000      | + Financeiro, Insumos, Dashboard          |
| **Business** | R$ 1.997  | 30       | 5.000      | + White-label, API, Suporte Prioritário   |
| **Enterprise**| Consultar | Ilimitado| Ilimitado  | + Multi-unidade, SLA, Onboarding dedicado |

### 6.4 Landing Page SaaS (patholab.com.br)
Seções:
1. Hero com headline clara e demo/screenshot
2. Dores do mercado (problema que resolve)
3. Funcionalidades principais (3–4 módulos)
4. Planos e preços
5. Depoimentos de clientes (Health Care como case #1)
6. FAQ
7. CTA final: "Comece Grátis" (trial 14 dias)

---

## 7. IDENTIDADE VISUAL

### 7.1 Paleta de Cores
```
Primária:   #1E7B7E  (teal — saúde, ciência, confiança)
Secundária: #2D9B9D  (teal claro — ação)
Escura:     #1A2832  (azul muito escuro — texto principal)
Neutra:     #F4F6F8  (cinza claro — fundos)
Destaque:   #E8F7F7  (teal ultra-claro — highlights)
Sucesso:    #27AE60  (verde — resultados normais)
Alerta:     #F39C12  (âmbar — atenção)
Erro:       #E74C3C  (vermelho — valores críticos)
```

### 7.2 Tipografia
- **Headlines:** Inter 700 (32–48px)
- **Subtítulos:** Inter 600 (20–28px)
- **Corpo:** Inter 400 (16px, line-height 1.6)
- **Small:** Inter 400 (14px)
- **Labels/Badges:** Inter 500 (12px, uppercase)

### 7.3 Tom de Voz
- Profissional mas acolhedor
- Linguagem de benefício (não técnica)
- Confiante e preciso
- Empatia com tutores e veterinários

---

## 8. INTEGRAÇÕES FUTURAS

| Integração        | Finalidade                              | Prioridade |
|-------------------|-----------------------------------------|------------|
| WhatsApp API      | Envio de laudos e notificações          | Alta       |
| Google Maps       | Localização no site                     | Alta       |
| Meta Pixel        | Retargeting e campanhas                 | Alta       |
| Google Analytics 4| Análise de comportamento                | Alta       |
| Resend/SendGrid   | E-mails transacionais                   | Média      |
| Stripe/Pagar.me   | Pagamentos online                       | Média      |
| VetDNA API        | Lab de apoio (já parceiro)              | Média      |
| IDEXX/Provet API  | Labs de apoio externos                  | Baixa      |
| HL7 FHIR          | Interoperabilidade com outros sistemas  | Baixa      |

---

## 9. CLÍNICAS PARCEIRAS IDENTIFICADAS

Baseado nos laudos reais do laboratório:

| Clínica           | Veterinário(a) Principal          | Tipo de Exames mais solicitados     |
|-------------------|-----------------------------------|-------------------------------------|
| Animal Center     | Drª Caroline Muniz Cunha          | PCR, Microbiologia, Bioquímica      |
| Animal Care       | Dr. Washington T. Kano            | Hemograma, Bioquímica, Urinálise    |
| Peticas           | Drª Beatriz Venâncio de Oliveira  | Hormonais (T4, TSH, Cortisol)       |
| FMVZ - UNESP      | Drª Larissa Onuki Zeferino        | Compatibilidade Sanguínea, Citologia|
| Quaresma          | Drª Sarah P. Scarelli             | Efusão Cavitária                    |
| Petland           | Drª Aline Marque da S. Batista    | SDMA, Função Renal                  |
| Colosso           | Drª Carla Cristina Ferreira Borba | Sorologia, Leishmaniose             |

---

## 10. MÉTRICAS DE SUCESSO (KPIs)

### Produto
- Tempo médio de liberação de laudo: meta < 24h para rotina
- Taxa de laudos acessados online: meta > 80%
- NPS de clínicas parceiras: meta > 70

### Marketing
- Clínicas cadastradas no sistema: meta 20 no primeiro trimestre
- Visitas mensais ao site: meta 500 no primeiro mês, 2.000 no 6º mês
- Conversões via WhatsApp: meta 10% das visitas
- Seguidores Instagram: meta +100/mês orgânico

### Negócio
- Receita recorrente (SaaS): meta R$ 5.000/mês até o 12º mês
- Churn < 5% ao mês
- CAC (Custo de Aquisição de Cliente SaaS) < R$ 500
- LTV > R$ 6.000 por laboratório

---

*Documento criado em 24/04/2026 | Agência Xdigital × Health Care*
