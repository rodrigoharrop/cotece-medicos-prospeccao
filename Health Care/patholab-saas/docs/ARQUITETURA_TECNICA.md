# PathoLab SaaS — Arquitetura Técnica

## Stack Tecnológica

```
Frontend:   Next.js 14 (App Router) + TypeScript
Styling:    Tailwind CSS + shadcn/ui
Backend:    Next.js API Routes + Supabase Edge Functions
Database:   PostgreSQL (Supabase) com Row Level Security
Storage:    Supabase Storage (PDFs de laudos)
Auth:       Supabase Auth (magic link + senha) com RBAC
Deploy:     Vercel (frontend) + Supabase (backend)
Email:      Resend (transacional)
WhatsApp:   Evolution API (notificações)
Analytics:  Vercel Analytics + GA4
```

---

## Estrutura de Pastas

```
patholab-saas/
├── src/
│   ├── app/
│   │   ├── (site)/                    # Site público
│   │   │   ├── page.tsx               # Homepage
│   │   │   ├── servicos/
│   │   │   │   ├── page.tsx           # Lista de exames
│   │   │   │   └── [slug]/page.tsx    # Exame individual (SEO)
│   │   │   ├── interpretacao/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── solicitar-exame/page.tsx
│   │   │   ├── sobre/page.tsx
│   │   │   └── contato/page.tsx
│   │   ├── (auth)/
│   │   │   └── login/page.tsx
│   │   └── (app)/                     # Sistema autenticado
│   │       ├── layout.tsx             # Layout com sidebar
│   │       ├── admin/
│   │       │   ├── dashboard/page.tsx
│   │       │   ├── laudos/page.tsx
│   │       │   ├── pacientes/page.tsx
│   │       │   ├── clinicas/page.tsx
│   │       │   ├── insumos/page.tsx
│   │       │   ├── financeiro/page.tsx
│   │       │   └── usuarios/page.tsx
│   │       ├── veterinario/
│   │       │   ├── dashboard/page.tsx
│   │       │   ├── laudos/page.tsx
│   │       │   └── solicitar/page.tsx
│   │       ├── clinica/
│   │       │   ├── dashboard/page.tsx
│   │       │   └── laudos/page.tsx
│   │       └── tutor/
│   │           └── laudos/page.tsx
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── site/                      # Componentes do site
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Footer.tsx
│   │   ├── app/                       # Componentes do sistema
│   │   │   ├── LaudoCard.tsx
│   │   │   ├── ExameStatusBadge.tsx
│   │   │   ├── DashboardStats.tsx
│   │   │   └── SolicitacaoForm.tsx
│   │   └── shared/
│   │       ├── Navbar.tsx
│   │       ├── Sidebar.tsx
│   │       └── WhatsAppFloat.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── utils.ts
│   │   └── constants.ts
│   └── types/
│       ├── database.types.ts          # Gerado pelo Supabase
│       └── app.types.ts
├── public/
│   ├── images/
│   └── icons/
├── supabase/
│   ├── migrations/                    # Migrações do banco
│   └── seed.sql                       # Dados iniciais
└── docs/                              # Esta pasta
```

---

## Schema do Banco de Dados (Principais Tabelas)

```sql
-- Tenants (para SaaS multi-tenant)
create table tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  cnpj text,
  phone text,
  email text,
  address jsonb,
  plan text default 'starter',
  active boolean default true,
  created_at timestamptz default now()
);

-- Usuários com role
create table profiles (
  id uuid primary key references auth.users(id),
  tenant_id uuid references tenants(id),
  full_name text,
  role text check (role in ('admin','tecnico','veterinario','clinica','tutor','financeiro')),
  crmv text,
  phone text,
  active boolean default true
);

-- Clínicas parceiras
create table clinicas (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  name text not null,
  cnpj text,
  phone text,
  email text,
  address text,
  discount_percent numeric default 0,
  created_at timestamptz default now()
);

-- Pacientes (animais)
create table pacientes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  name text not null,
  species text, -- canino, felino, equino, etc.
  breed text,
  birth_date date,
  sex text check (sex in ('macho','femea')),
  tutor_name text,
  tutor_phone text,
  clinica_id uuid references clinicas(id),
  vet_name text,
  vet_crmv text,
  created_at timestamptz default now()
);

-- Solicitações de exame
create table solicitacoes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  paciente_id uuid references pacientes(id),
  clinica_id uuid references clinicas(id),
  requested_by uuid references profiles(id),
  exames jsonb not null, -- array de exames solicitados
  status text default 'aguardando_coleta' 
    check (status in ('aguardando_coleta','coletado','em_analise','liberado','cancelado')),
  priority text default 'rotina' check (priority in ('rotina','urgente')),
  observations text,
  created_at timestamptz default now(),
  collected_at timestamptz,
  released_at timestamptz
);

-- Laudos
create table laudos (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  solicitacao_id uuid references solicitacoes(id),
  paciente_id uuid references pacientes(id),
  exam_type text not null,
  exam_name text not null,
  file_path text, -- caminho no Supabase Storage
  data jsonb, -- dados estruturados do exame
  status text default 'rascunho' check (status in ('rascunho','liberado','corrigido')),
  released_by uuid references profiles(id),
  released_at timestamptz,
  created_at timestamptz default now()
);

-- Row Level Security
alter table laudos enable row level security;

create policy "Tenant isolation" on laudos
  using (tenant_id = (select tenant_id from profiles where id = auth.uid()));

create policy "Vets see their patients only" on laudos
  for select using (
    exists (
      select 1 from solicitacoes s
      join pacientes p on p.id = s.paciente_id
      join clinicas c on c.id = p.clinica_id
      join profiles pr on pr.id = auth.uid()
      where s.id = laudos.solicitacao_id
      and pr.role = 'veterinario'
    )
  );
```

---

## Fluxo de Autenticação e Autorização

```
1. Usuário acessa /login
2. Supabase Auth valida credenciais
3. Middleware lê role do profile
4. Redireciona para /app/[role]/dashboard
5. RLS garante isolamento de dados no banco
6. Middleware.ts protege todas as rotas /app/*
```

---

## Deploy e Infraestrutura

```
Vercel (Frontend)
  └── Projeto: patholab-saas
  └── Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY
  └── Domínio: healthcare.patholab.com.br

Supabase (Backend)
  └── Project: patholab-prod
  └── Database: PostgreSQL 15
  └── Storage: buckets/laudos/{tenant_id}/{laudo_id}.pdf
  └── Auth: Email/password + Magic Link
  └── Edge Functions: send-whatsapp, send-email
```

---

*Arquitetura definida em 24/04/2026 | PathoLab SaaS*
