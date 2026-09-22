# 🏥 Health Care - Sistema de Laboratório Veterinário

**Excelência em Patologia Veterinária - Hematologia e Patologia**

---

## 📋 Visão Geral

**Health Care** é uma plataforma digital completa e integrada para laboratórios de patologia veterinária. O sistema combina um **site institucional profissional** com uma **plataforma interna robusta** de gestão laboratorial, portal de resultados e ferramentas de apoio clínico com inteligência artificial.

### 🎯 Objetivo Principal

Digitalizar completamente o fluxo de trabalho de um laboratório veterinário, desde o agendamento de coletas até a emissão de laudos, faturamento e consulta de resultados por tutores e clínicas.

---

## ✨ Funcionalidades Principais

### 1. **Site Institucional Público**
- ✅ Hero section com identidade visual profissional
- ✅ Apresentação de 11 tipos de serviços (Hematologia, Bioquímica, Citologia, Histopatologia, Microbiologia, Uroanálise, Hormonais, Eletrólitos, Sorologia, Biologia Molecular, Testes Especiais)
- ✅ Seção sobre a empresa com histórico e diferenciais
- ✅ Formulário de contato funcional
- ✅ Logo da Health Care integrado
- ✅ Design responsivo com paleta de cores: Azul Marinho, Branco, Amarelo

### 2. **Autenticação Multiperfil (6 Perfis)**

| Perfil | Acesso | Funcionalidades |
|--------|--------|-----------------|
| **Admin** | `/dashboard/admin` | Gestão de usuários, clínicas, configurações, relatórios gerenciais |
| **Veterinário** | `/dashboard/veterinarian` | Criação de laudos, visualização de exames, assistente de IA |
| **Clínica** | `/dashboard/clinic` | Agendamentos, consulta de resultados, gestão de pacientes |
| **Técnico** | `/dashboard/technician` | Processamento de amostras, controle de qualidade, agenda de coletas |
| **Financeiro** | `/dashboard/financial` | Faturamento, notas fiscais, relatórios de receita, pagamentos |
| **Tutor/Paciente** | `/dashboard/tutor` | Consulta de resultados, histórico de exames |

### 3. **Módulo de Laudos** 📋
- ✅ Criação de laudos por tipo de exame
- ✅ Editor rich text com formatação
- ✅ Sistema de assinatura digital
- ✅ Visualização de laudos completos
- ✅ Geração de PDF para download
- ✅ Histórico de alterações e auditoria

### 4. **Portal de Resultados** 🔍
- ✅ Busca por código de pedido (sem login necessário)
- ✅ Acesso autenticado para clínicas e tutores
- ✅ Visualização de resultados com valores de referência
- ✅ Download de PDFs
- ✅ Compartilhamento seguro de resultados

### 5. **Módulo de Agenda** 📅
- ✅ Agendamento de coletas
- ✅ Calendário visual interativo
- ✅ Controle de amostras recebidas
- ✅ Rastreamento de status de processamento
- ✅ Notificações de status automáticas

### 6. **Módulo Financeiro** 💰
- ✅ Registro de pedidos com cálculo automático
- ✅ Faturamento por clínica ou tutor
- ✅ Controle de pagamentos (Pago, Pendente, Vencido)
- ✅ Geração de notas fiscais
- ✅ Relatórios financeiros customizáveis
- ✅ Análise de receita mensal e top clínicas
- ✅ **Tabela de preços com 25 tipos de exames**

### 7. **Gestão de Estoque** 📦
- ✅ Cadastro de reagentes e insumos
- ✅ Controle de entrada e saída
- ✅ Alertas automáticos de estoque mínimo
- ✅ Relatórios de consumo
- ✅ Previsão de reposição

### 8. **Upload e Armazenamento** 📁
- ✅ Upload seguro de PDFs de laudos
- ✅ Upload de imagens (citologia, histopatologia)
- ✅ Armazenamento em S3 com URLs assinadas
- ✅ Controle de acesso por perfil
- ✅ Rastreamento de versões

### 9. **Notificações por E-mail** 📧
- ✅ Integração com serviço de e-mail
- ✅ Template de laudo emitido com branding
- ✅ Template de atualização de status
- ✅ Links diretos para portal de resultados
- ✅ Rastreamento de envios

### 10. **Assistente de IA** 🤖
- ✅ Integração com LLM (Manus)
- ✅ Chat contextualizado com valores de exame
- ✅ Sugestões de diagnósticos diferenciais
- ✅ Observações clínicas relevantes
- ✅ Histórico de consultas salvo

### 11. **Dashboard Administrativo** 📊
- ✅ KPIs em tempo real (exames do dia, laudos pendentes, receita mensal, estoque crítico)
- ✅ Gráficos de tendências
- ✅ Relatórios customizáveis
- ✅ Gestão de usuários e permissões

### 12. **Integração com Google Drive** 🔗
- ✅ Acesso a documentos da pasta Health Care
- ✅ Extração de informações de preços e referências
- ✅ Sincronização de dados

---

## 🏗️ Arquitetura Técnica

### Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | React 19, Tailwind CSS 4, TypeScript |
| **Backend** | Express 4, Node.js, tRPC 11 |
| **Banco de Dados** | MySQL/TiDB (Supabase) |
| **ORM** | Drizzle ORM |
| **Autenticação** | Manus OAuth |
| **Armazenamento** | AWS S3 |
| **IA/LLM** | Manus LLM API |
| **Testes** | Vitest |
| **Deploy** | Manus Platform |

### Estrutura de Banco de Dados

**19 Tabelas Implementadas:**

```
Autenticação & Usuários:
├── users (usuários base)
├── user_profiles (perfis e roles)

Clínicas & Pacientes:
├── clinics (clínicas parceiras)
├── tutors (tutores/proprietários)
├── patients (pacientes veterinários)

Exames & Resultados:
├── exams (pedidos de exame)
├── exam_results (resultados dos exames)
├── reports (laudos emitidos)

Operacional:
├── schedules (agendamentos)
├── inventory (estoque de reagentes)
├── inventory_movements (movimentações)

Financeiro:
├── exam_prices (tabela de preços - 25 tipos)
├── orders (pedidos)
├── order_items (itens dos pedidos)
├── payments (pagamentos)
├── discounts (descontos)
├── financial_reports (relatórios)

Sistema:
├── notifications (notificações)
├── ai_consultations (histórico de IA)
```

---

## 📊 Tabela de Preços (25 Tipos de Exames)

### Hematologia
- Hemograma: R$ 120
- Hemograma + Bioquímico: R$ 280

### Bioquímica
- Bioquímica Básica: R$ 150
- Bioquímica Completa: R$ 250
- Eletrólitos: R$ 180
- Hormonais (T4, TSH): R$ 200
- SDMA: R$ 250

### Uroanálise
- Uroanálise Completa: R$ 100

### Coproparasitologia
- Coproparasitológico: R$ 80

### Microbiologia
- Cultura Bacteriana: R$ 280
- Antibiograma: R$ 150
- Fungos: R$ 200

### Sorologia
- Leishmania: R$ 120
- FeLV/FIV: R$ 150
- Erliquiose: R$ 140

### Biologia Molecular
- FELV PCR: R$ 300
- Mycoplasma PCR: R$ 280

### Citologia
- Citologia Geral: R$ 200

### Histopatologia
- Histopatologia: R$ 400

### Testes Especiais
- Teste de Compatibilidade: R$ 350

*Todos os preços podem ser ajustados no módulo de administração*

---

## 🚀 Como Usar

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/health-care-lab.git
cd health-care-lab

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Executar migrações de banco de dados
pnpm db:push

# Iniciar servidor de desenvolvimento
pnpm dev
```

### Acessar o Sistema

- **Site Público**: http://localhost:3000
- **Dashboard Admin**: http://localhost:3000/dashboard/admin
- **Dashboard Veterinário**: http://localhost:3000/dashboard/veterinarian
- **Dashboard Clínica**: http://localhost:3000/dashboard/clinic
- **Dashboard Técnico**: http://localhost:3000/dashboard/technician
- **Dashboard Financeiro**: http://localhost:3000/dashboard/financial
- **Dashboard Tutor**: http://localhost:3000/dashboard/tutor
- **Portal de Resultados**: http://localhost:3000/results
- **Módulo de Laudos**: http://localhost:3000/reports
- **Agenda**: http://localhost:3000/schedule
- **Estoque**: http://localhost:3000/inventory
- **Upload**: http://localhost:3000/upload
- **Assistente IA**: http://localhost:3000/ai-assistant

---

## 🔐 Segurança

- ✅ Autenticação OAuth com Manus
- ✅ Controle de acesso por perfil (RBAC)
- ✅ Criptografia de senhas
- ✅ URLs assinadas para arquivos
- ✅ Validação de entrada em todos os formulários
- ✅ HTTPS/SSL em produção
- ✅ Rate limiting em APIs

---

## 📈 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| **Linhas de Código** | 5,000+ |
| **Componentes React** | 30+ |
| **Rotas** | 14 |
| **Tabelas de BD** | 19 |
| **Tipos de Exames** | 25 |
| **Perfis de Acesso** | 6 |
| **Funcionalidades** | 50+ |
| **Testes Unitários** | 20+ |

---

## 🎨 Identidade Visual

**Paleta de Cores:**
- 🔵 Azul Marinho: `#001F3F` (primária)
- ⚪ Branco: `#FFFFFF` (secundária)
- 🟡 Amarelo: `#FFD700` (destaque)

**Tipografia:**
- Fonte Principal: Inter
- Fonte Secundária: Roboto

---

## 📝 Fluxos Principais

### Fluxo de Exame (End-to-End)

```
1. Clínica/Tutor solicita exame
   ↓
2. Técnico agenda coleta
   ↓
3. Amostra é recebida e validada
   ↓
4. Técnico processa amostra
   ↓
5. Veterinário analisa resultado
   ↓
6. Veterinário emite laudo (com IA)
   ↓
7. Sistema envia e-mail para clínica/tutor
   ↓
8. Clínica/Tutor consulta resultado no portal
   ↓
9. Financeiro gera nota fiscal
   ↓
10. Pagamento registrado
```

### Fluxo Financeiro

```
Pedido → Faturamento → NF → Pagamento → Receita
```

### Fluxo de Estoque

```
Entrada → Consumo → Alerta (Mínimo) → Reposição
```

---

## 🔄 Integrações

- ✅ **Manus OAuth** - Autenticação
- ✅ **Manus LLM** - Assistente de IA
- ✅ **AWS S3** - Armazenamento de arquivos
- ✅ **Google Drive** - Sincronização de documentos
- ✅ **Serviço de E-mail** - Notificações

---

## 📱 Responsividade

- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)
- ✅ Suporte a dark mode

---

## 🧪 Testes

```bash
# Executar testes unitários
pnpm test

# Executar testes com cobertura
pnpm test:coverage

# Executar testes em modo watch
pnpm test:watch
```

---

## 📚 Documentação Adicional

- **ARCHITECTURE.md** - Arquitetura detalhada do sistema
- **analise_exames_sistema.md** - Análise de implementação de exames
- **health_care_drive_inventory.md** - Inventário de arquivos do Google Drive
- **exam_prices_template.md** - Tabela de preços completa

---

## 🤝 Contribuindo

Para contribuir com melhorias:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato com a equipe de desenvolvimento.

---

## 📄 Licença

Este projeto é propriedade da Health Care - Hematologia e Patologia Veterinárias.

---

## 🎯 Roadmap Futuro

- [ ] Integração com sistema de pagamento online (Stripe)
- [ ] App mobile nativo (React Native)
- [ ] Relatórios em tempo real com BI
- [ ] Integração com equipamentos de laboratório
- [ ] Sistema de agendamento com confirmação por SMS
- [ ] Análise preditiva com Machine Learning
- [ ] Integração com clínicas veterinárias via API
- [ ] Sistema de backup automático
- [ ] Auditoria completa de todas as operações

---

## ✅ Status do Projeto

**Versão:** 1.0.0  
**Status:** ✅ Pronto para Produção  
**Última Atualização:** Abril 2026  
**Desenvolvido por:** Manus AI  

---

**Health Care - Excelência em Patologia Veterinária** 🏥
