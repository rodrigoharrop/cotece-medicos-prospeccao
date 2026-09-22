# PathoLab — Wireframe e Estrutura do Site

> Stack: Next.js 14 + Tailwind CSS + shadcn/ui + Supabase + Vercel

---

## ARQUITETURA DE ROTAS

```
/                          → Homepage
/servicos                  → Catálogo de exames
/servicos/[slug]           → Página de exame individual (SEO)
/interpretacao             → Hub educativo
/interpretacao/[slug]      → Artigo de interpretação
/solicitar-exame           → Formulário de solicitação
/sobre                     → Sobre o laboratório
/contato                   → Contato e localização
/login                     → Autenticação (por role)
/app/admin/               → Dashboard Admin
/app/tecnico/             → Área do Técnico
/app/veterinario/         → Portal do Veterinário
/app/clinica/             → Portal da Clínica
/app/tutor/               → Portal do Tutor
/app/financeiro/          → Área Financeiro
```

---

## HOMEPAGE — Estrutura Detalhada

### [SECTION 1] HERO
```
┌─────────────────────────────────────────────────────────┐
│  [NAV] Logo | Serviços | Interpretação | Login | CTA    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Diagnósticos Precisos.            [Imagem: Técnica +   │
│  Resultados em Tempo Real.          equipamento lab]    │
│                                                         │
│  Patologia e Hematologia Veterinárias                   │
│  para clínicas de Botucatu e região.                    │
│                                                         │
│  [Solicitar Exame]  [Ver Resultados]                    │
│                                                         │
│  ✓ Resultados online  ✓ Laudo em 24h  ✓ 50+ exames     │
└─────────────────────────────────────────────────────────┘
```
**Notas de design:**
- Background: Branco puro ou teal ultra-claro (#E8F7F7)
- Headline: Inter 700, 48px desktop / 32px mobile
- CTA primário: Botão teal sólido "#1E7B7E"
- CTA secundário: Botão outline teal
- Trust badges: ícones pequenos + texto
- Imagem: foto real do laboratório (equipamento + profissional)

---

### [SECTION 2] DIFERENCIAIS (3 cards)
```
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  🧪 Precisão  │  │  ⚡ Rapidez   │  │  📱 Digital   │
│               │  │               │  │               │
│  +50 tipos    │  │  Resultados   │  │  Acesse seus  │
│  de análises  │  │  em até 24h   │  │  laudos online│
│  com padrões  │  │  para exames  │  │  pelo celular │
│  internac.    │  │  de rotina    │  │  a qualquer   │
│               │  │               │  │  hora         │
└───────────────┘  └───────────────┘  └───────────────┘
```

---

### [SECTION 3] SERVIÇOS (grid de categorias)
```
 Hematologia   Bioquímica   Hormonais    Urinálise
 ─────────     ─────────    ─────────    ─────────
 Microbiologia  PCR/Biologia Sorologia   Citologia
 ─────────      Molecular    ─────────   ─────────
                ─────────
                
                [Ver Catálogo Completo →]
```

---

### [SECTION 4] COMO FUNCIONA (3 passos)
```
  1               2               3
  ───             ───             ───
[📋 Solicite]  [🧪 Coletamos] [📲 Receba]
Preencha o     e analisamos   o resultado
formulário     em nosso       online em
ou ligue       laboratório    até 24h
```

---

### [SECTION 5] PARA VETERINÁRIOS (B2B focus)
```
┌─────────────────────────────────────────────────┐
│  Portal exclusivo para veterinários             │
│  e clínicas parceiras                           │
│                                                 │
│  ✓ Acesso a todos os laudos dos seus pacientes  │
│  ✓ Histórico completo por animal                │
│  ✓ Notificação automática de resultados         │
│  ✓ Solicitação de exames online                 │
│  ✓ Tabela de preços exclusiva                   │
│                                                 │
│  [Cadastrar minha clínica]                      │
└─────────────────────────────────────────────────┘
```
Background: teal escuro (#1A2832), texto branco

---

### [SECTION 6] DEPOIMENTOS (Social Proof)
```
"Os laudos chegam no mesmo dia e a comunicação      "Nunca tivemos problemas com
 via WhatsApp facilita muito o dia a dia da          resultados. Precisão e rapidez
 clínica. Recomendo muito!"                          que fazem diferença no diagnóstico."
 — Dr. Washington T. Kano                           — Drª Beatriz V. de Oliveira
   Animal Care, Botucatu                              Peticas, Botucatu
```

---

### [SECTION 7] CREDENCIAIS & CONFIANÇA
```
[Logo CRMV] [Logo UNESP] [CRM Jhessica Sakoda foto + título]
"M.V. Jhessica Naomi Sakoda — CRMV SP 65582
 Especialista em Patologia e Hematologia Veterinárias
 +5 anos de experiência"
```

---

### [SECTION 8] CTA FINAL
```
┌─────────────────────────────────────────────────┐
│  Pronto para agilizar seus diagnósticos?        │
│                                                 │
│  [Solicitar Exame Agora]  [Falar no WhatsApp]   │
│                                                 │
│  📍 Av. Leonardo Villas Boas, 314-B — Botucatu  │
│  📞 (14) 3881-7371 | (14) 99847-9757            │
└─────────────────────────────────────────────────┘
```

---

### [FOOTER]
```
Logo    | Serviços         | Exames        | Links
Health  | Hematologia      | Solicitar     | Instagram
Care    | Bioquímica       | Portal Vet.   | WhatsApp
        | PCR/Biologia Mol.| Sobre Nós     | Email
        | Hormonais        | Contato       | Google Maps
        
CNPJ: 39.274.901/0001-07 | CRMV SP 65582 | © 2026 Health Care
```

---

## PÁGINA DE SERVIÇOS

### Layout
- Hero pequeno: "Nossos Exames" + breadcrumb
- Filtros por categoria (tabs ou sidebar): Hematologia, Bioquímica, PCR...
- Grid de cards (3 colunas desktop, 1 mobile)
- Cada card: ícone + nome do exame + prazo + CTA "Solicitar"
- CTA fixo no mobile: "Solicitar Exame"

---

## PORTAL DE LOGIN

### Tela de Login
```
┌───────────────────────────────────┐
│  [Logo Health Care]               │
│                                   │
│  Acesse seu portal                │
│                                   │
│  Email: [___________________]     │
│  Senha: [___________________]     │
│                                   │
│  [Entrar]                         │
│                                   │
│  Sou: ○ Veterinário/Clínica       │
│       ○ Tutor do Animal           │
│       ○ Equipe Interna            │
│                                   │
│  Esqueci minha senha              │
└───────────────────────────────────┘
```

---

## DASHBOARD DO VETERINÁRIO

### Layout Principal
```
┌─────────────────────────────────────────────────────┐
│ [Logo] Portal Veterinário    [Dr. Washington ▾] [🔔] │
├──────────┬──────────────────────────────────────────┤
│          │  Bem-vindo, Dr. Washington               │
│ Dashboard│                                          │
│ Pacientes│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│ Laudos   │  │  47  │ │  12  │ │   3  │ │  98% │   │
│ Solicitar│  │Exames│ │Pend. │ │Urgen.│ │Online│   │
│ Histórico│  │ Mês  │ │      │ │      │ │      │   │
│ Perfil   │  └──────┘ └──────┘ └──────┘ └──────┘   │
│          │                                          │
│          │  Últimos Resultados                      │
│          │  ┌────────────────────────────────────┐  │
│          │  │ 🐕 Nick — Hemograma   ✅ Disponível│  │
│          │  │ 🐈 Myau — Eletrólitos ✅ Disponível│  │
│          │  │ 🐕 Drica — Copro.     ✅ Disponível│  │
│          │  └────────────────────────────────────┘  │
└──────────┴──────────────────────────────────────────┘
```

---

## COMPONENTES UI PRINCIPAIS

### Paleta de Cores CSS Variables
```css
:root {
  --color-primary:    #1E7B7E;
  --color-primary-lt: #2D9B9D;
  --color-dark:       #1A2832;
  --color-bg:         #F4F6F8;
  --color-accent:     #E8F7F7;
  --color-success:    #27AE60;
  --color-warning:    #F39C12;
  --color-error:      #E74C3C;
  --color-white:      #FFFFFF;
  --color-gray-100:   #F8F9FA;
  --color-gray-200:   #E9ECEF;
  --color-gray-600:   #6C757D;
  --color-gray-900:   #212529;
}
```

### Botões
```
Primário:   bg-[#1E7B7E] text-white hover:bg-[#1a6a6d] px-6 py-3 rounded-lg
Secundário: border-2 border-[#1E7B7E] text-[#1E7B7E] hover:bg-[#E8F7F7]
Ghost:      text-[#1E7B7E] hover:bg-[#E8F7F7]
Danger:     bg-[#E74C3C] text-white hover:bg-[#c0392b]
```

### Cards de Exame
```
bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md 
hover:-translate-y-1 transition-all duration-300
```

### Badge de Status de Laudo
```
Disponível: bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium
Em análise: bg-yellow-100 text-yellow-800
Coletado:   bg-blue-100 text-blue-800
Urgente:    bg-red-100 text-red-800
```

---

## ANIMAÇÕES E EFEITOS

### Princípios
- Fade-in ao scroll (IntersectionObserver, 400ms ease)
- Hover em cards: translateY(-4px) + shadow upgrade (300ms)
- Hover em botões: darkening de cor (200ms)
- Loading states: skeleton screens (não spinners)
- Contadores animados na seção de stats (CountUp.js)
- Respeitar `prefers-reduced-motion`

### Efeito Hero
- Imagem com leve parallax no scroll (3–5% movimento)
- Trust badges com fade-in sequencial (200ms delay entre itens)

---

*Wireframe criado em 24/04/2026 | PathoLab SaaS*
