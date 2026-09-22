/**
 * Dados da Caravana dos Tabernáculos 2026
 * Roteiro oficial extraído do documento XDreams Travel
 * 21 Set → 02 Out 2026 | 12 Dias / 11 Noites
 * Líderes: Ap. Renê Terra Nova + Ap. Carlos Huston Rocha
 */

export const TAB_VIDEO_FPS = 30;
export const TAB_TRANSITION = Math.round(TAB_VIDEO_FPS * 1.2); // 36 frames

export interface TabSlide {
  id: string;
  type: "intro" | "country" | "closing";
  dayBadge: string;
  flag: string;
  country: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  location: string;
  imageUrl: string;
  imageUrl2?: string;
  imageUrl2StartSec?: number;
  /** Foto de retrato de líder — aparece no canto inferior direito */
  portraitUrl?: string;
  /** Legenda abaixo do retrato */
  portraitCaption?: string;
  /** Segundo depois do início do slide em que o retrato aparece */
  portraitStartSec?: number;
  color: string;
  accentColor: string;
  icon: string;
  narration: string;
}

// Duração de cada slide em segundos — ajustada ao timing da narração (~2min total)
const DURATIONS_SEC = [20, 28, 20, 30, 21];

export const TAB_SLIDE_DURATIONS: number[] = DURATIONS_SEC.map(s =>
  Math.round(s * TAB_VIDEO_FPS)
);

export const tabSlides: TabSlide[] = [

  // ── 0 — INTRO ────────────────────────────────────────────────────────────
  {
    id: "intro",
    type: "intro",
    dayBadge: "21 SET — 02 OUT DE 2026",
    flag: "✡️",
    country: "",
    title: "CARAVANA\nTABERNÁCULOS",
    subtitle: "Igrejas do Apocalipse + Tabernáculos",
    description: "Uma Jornada Profética. Uma Experiência que Marca a Eternidade.",
    highlights: [
      "12 Dias / 11 Noites",
      "Turquia & Israel",
      "Festa dos Tabernáculos ICEJ",
    ],
    location: "São Paulo → Turquia → Israel → São Paulo",
    imageUrl: "tab/terra-santa-jerusalem.jpg",
    imageUrl2: "tab/banner-oficial-rene.jpg",
    color: "#050a1a",
    accentColor: "#c9a84c",
    icon: "✨",
    narration:
      "De São Paulo ao coração da profecia. Uma jornada única que une as Sete Igrejas do Apocalipse na Turquia à Terra Santa de Israel — com a Festa dos Tabernáculos conduzida pelo Apóstolo Renê Terra Nova.",
  },

  // ── 1 — TURQUIA: 7 IGREJAS ───────────────────────────────────────────────
  {
    id: "turquia",
    type: "country",
    dayBadge: "DIAS 2 & 3 • 22–23 SET",
    flag: "🇹🇷",
    country: "TURQUIA",
    title: "7 IGREJAS DO\nAPOCALIPSE",
    subtitle: "Nos passos do Apóstolo João",
    description:
      "Pérgamo, Tiatira, Sardis, Filadélfia, Laodicéia, Esmirna e Éfeso — sete mensagens eternas que ecoam para a Igreja de hoje.",
    highlights: [
      "🧱 Igreja Vermelha de Pérgamo — Bergama",
      "🏛️ Sardis ao lado do Templo de Ártemis",
      "⛪ Filadélfia & Laodicéia em Pamukkale",
      "📜 Éfeso — cidade de Paulo e do Apóstolo João",
    ],
    location: "Pérgamo → Tiatira → Sardis → Filadélfia → Laodicéia → Izmir",
    imageUrl: "tab/turquia-efeso.jpg",
    imageUrl2: "tab/turquia-anfiteatro.jpg",
    imageUrl2StartSec: 12,
    color: "#1a0800",
    accentColor: "#f59e0b",
    icon: "🏛️",
    narration:
      "Na Turquia, percorremos os passos de João — o exilado de Patmos que viu o céu aberto. Pérgamo, Tiatira, Sardis, Filadélfia, Laodicéia. Sete igrejas. Sete mensagens. Um chamado que atravessa vinte séculos e ecoa diretamente para a Igreja de hoje.",
  },

  // ── 2 — GALILEIA & JORDÃO ────────────────────────────────────────────────
  {
    id: "galileia",
    type: "country",
    dayBadge: "DIAS 4 & 5 • 24–25 SET",
    flag: "🇮🇱",
    country: "ISRAEL",
    title: "GALILEIA &\nRIO JORDÃO",
    subtitle: "Onde tudo começou",
    description:
      "Mar da Galileia, Cafarnaum, Monte das Bem-Aventuranças, Magdala e batismo nas águas sagradas do Jordão.",
    highlights: [
      "⛵ Passeio de barco no Mar da Galileia",
      "✝️ Cafarnaum, Tabgha & Monte das Bem-Aventuranças",
      "📜 Magdala — Sinagoga do Século I",
      "💧 Batismo em Yardenit — Rio Jordão",
    ],
    location: "Tel Aviv → Tiberíades → Yardenit → Deserto da Judeia → Jerusalém",
    imageUrl: "tab/terra-santa-galileia.jpg",
    imageUrl2: "tab/terra-santa-deserto.jpg",
    imageUrl2StartSec: 11,
    portraitUrl: "tab/batismo-jordao.jpg",
    portraitCaption: "Ap. Huston Rocha • Batismo no Rio Jordão",
    portraitStartSec: 9,
    color: "#001a2e",
    accentColor: "#38bdf8",
    icon: "💧",
    narration:
      "Na Galileia, navegamos pelo mesmo mar em que Jesus caminhou sobre as águas. Em Cafarnaum, pisamos onde Ele fez seus primeiros milagres. E em Yardenit, renovamos o pacto do batismo nas águas do Rio Jordão.",
  },

  // ── 3 — JERUSALÉM: FESTA DOS TABERNÁCULOS ────────────────────────────────
  {
    id: "jerusalem",
    type: "country",
    dayBadge: "DIAS 5–9 • 25–29 SET",
    flag: "✝️",
    country: "JERUSALÉM",
    title: "FESTA DOS\nTABERNÁCULOS",
    subtitle: "Participação oficial ICEJ",
    description:
      "Monte das Oliveiras, Getsêmani, Via Dolorosa, Jardim do Túmulo e a histórica Marcha de Jerusalém com cristãos de todo o mundo.",
    highlights: [
      "🕍 Monte das Oliveiras & Getsêmani",
      "✝️ Via Dolorosa & Jardim do Túmulo",
      "🎺 Abertura da Festa em Qumran",
      "🚶 Marcha de Jerusalém — Evento ICEJ",
    ],
    location: "Jerusalém — Sucah, City, Eventos ICEJ, Região de Gaza",
    imageUrl: "tab/terra-santa-monte-oliveiras.jpg",
    // Ap. Huston pregando em Jerusalém — aparece como fundo ao fundo a ~8s
    imageUrl2: "tab/ap-huston-jerusalem.jpg",
    imageUrl2StartSec: 8,
    // Selfie da Marcha — aparece no canto quando narrador diz "Marcha de Jerusalém"
    portraitUrl: "tab/ap-rene-huston-marcha.jpg",
    portraitCaption: "Ap. Renê Terra Nova & Ap. Huston Rocha • Marcha de Jerusalém",
    portraitStartSec: 21,
    color: "#1a0d00",
    accentColor: "#fbbf24",
    icon: "🕍",
    narration:
      "Em Jerusalém, participamos da Festa dos Tabernáculos — o encontro de cristãos de todo o mundo para celebrar, profetizar e orar por Israel. Do Monte das Oliveiras ao Jardim do Túmulo, da Via Dolorosa à Marcha de Jerusalém com a ICEJ — cada passo é história, cada pedra é profecia.",
  },

  // ── 4 — CTA / ENCERRAMENTO ───────────────────────────────────────────────
  {
    id: "closing",
    type: "closing",
    dayBadge: "",
    flag: "🙏",
    country: "",
    title: "VAGAS\nLIMITADAS",
    subtitle: "Garanta já sua vaga",
    description:
      "A Caravana dos Tabernáculos 2026 não é uma viagem. É um encontro com o eterno.",
    highlights: [
      "12 Dias / 11 Noites",
      "Saída: 21/09/2026 de São Paulo",
      "Ap. Renê Terra Nova + Ap. Carlos Huston Rocha",
      "www.xdreamstravel.com.br",
    ],
    location: "São Paulo → Roma → Turquia → Israel → São Paulo",
    imageUrl: "tab/terra-santa-jerusalem.jpg",
    imageUrl2: "tab/terra-santa-muralhas.jpg",
    color: "#03030f",
    accentColor: "#c9a84c",
    icon: "🙏",
    narration:
      "Vagas limitadas. A Caravana dos Tabernáculos 2026 não é uma viagem. É um encontro com o eterno. Garanta sua vaga em www.xdreamstravel.com.br",
  },
];
