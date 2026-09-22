export interface DaySlide {
  day: number;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  narration: string;
  location: string;
  country: "italy" | "egypt" | "israel" | "intro" | "closing";
  // Primary image: use the most iconic/accurate image for this location
  imageUrl: string;
  // Secondary image shown on right side (optional parallax)
  imageUrl2?: string;
  // Segundos dentro do slide em que imageUrl2 começa a aparecer (fade-in)
  imageUrl2StartSec?: number;
  color: string;
  accentColor: string;
  icon: string;
}

export const slides: DaySlide[] = [
  {
    day: 0,
    date: "",
    title: "CARAVANA PROFÉTICA",
    subtitle: "Roma • Egito • Israel",
    description:
      "Uma jornada que vai além do turismo. Dez dias em que cada lugar conta histórias milenares — e cada história pode transformar a sua vida.",
    highlights: ["10 Dias / 09 Noites", "3 Países", "Saída: 01/12/2026"],
    narration:
      "De São Paulo ao coração da Bíblia. Uma jornada de dez dias pelos lugares mais sagrados da humanidade, conduzida pelo Profeta Ricardo Strobel.",
    location: "Brasil → Itália → Egito → Israel",
    country: "intro",
    // Panorama real de Jerusalém a partir do Monte das Oliveiras — Domo da Rocha e Cidade Velha
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Panor%C3%A1mica_de_Jerusal%C3%A9n_desde_el_Monte_de_los_Olivos.jpg",
    imageUrl2: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Jerusalem-2013%282%29-Temple_Mount-Dome_of_the_Rock_%28SE_exposure%29.jpg",
    color: "#08081a",
    accentColor: "#c9a84c",
    icon: "✡️",
  },
  {
    day: 1,
    date: "01/12/2026",
    title: "Dia 1",
    subtitle: "Partida de São Paulo",
    description:
      "Encontro com o Tour Leader no Aeroporto de Guarulhos. Embarque em voo internacional com destino a Roma, Itália. Jantar e café da manhã servidos durante o voo.",
    highlights: [
      "Aeroporto Internacional de Guarulhos – GRU",
      "Check-in e trâmites de imigração",
      "Embarque em voo internacional",
      "Jantar e café da manhã incluídos no voo",
    ],
    narration:
      "A aventura começa no Aeroporto de Guarulhos. Com o coração cheio de expectativa, nossa caravana decola rumo à Itália — primeiro destino desta jornada profética que vai mudar tudo.",
    location: "São Paulo (GRU) → Roma, Itália",
    country: "italy",
    // Avião sobrevoando — imagem Unsplash verificada
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=85",
    color: "#0d0a1f",
    accentColor: "#a78bfa",
    icon: "✈️",
  },
  {
    day: 2,
    date: "02/12/2026",
    title: "Dia 2",
    subtitle: "Roma Eterna",
    description:
      "Chegada ao Aeroporto de Fiumicino. Tour completo pela Cidade Eterna, visitando o Coliseu, o Monte Palatino, a Fontana di Trevi e o Panteão. À noite, embarque para o Cairo.",
    highlights: [
      "Coliseu de Roma — Anfiteatro Flávio",
      "Monte Palatino — berço da civilização romana",
      "Fontana di Trevi — a maior fontana barroca do mundo",
      "Panteão — templo de todos os deuses",
    ],
    narration:
      "Roma nos recebe com dois mil anos gravados em cada pedra. Do Coliseu ao Panteão, da Fontana di Trevi ao Monte Palatino — a cidade que testemunhou o nascimento da Igreja cristã primitiva e o martírio dos apóstolos.",
    location: "Roma, Itália → Cairo, Egito",
    country: "italy",
    // Coliseu de Roma — Unsplash verificado | Fontana di Trevi — Unsplash verificado
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=85",
    imageUrl2: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=1920&q=85",
    color: "#1f0e00",
    accentColor: "#fb923c",
    icon: "🏛️",
  },
  {
    day: 3,
    date: "03/12/2026",
    title: "Dia 3",
    subtitle: "Cairo — O Egito Faraônico",
    description:
      "Visita ao complexo de Gizé com as três grandes pirâmides — Quéops, Quéfren e Miquerinos — e a Grande Esfinge. Tarde no Museu Egípcio com o tesouro de Tutancâmon e a sala das múmias. Encerramento no mercado Khan el Khalili.",
    highlights: [
      "Pirâmides de Quéops, Quéfren e Miquerinos",
      "Grande Esfinge de Gizé",
      "Museu Egípcio — Tutancâmon e múmias reais",
      "Mercado Khan el Khalili",
    ],
    narration:
      "No Cairo, o tempo tem uma escala diferente. As Pirâmides de Gizé, construídas há quatro mil e quinhentos anos, erguem-se diante de nós como a maior testemunha da história bíblica. Este é o Egito que José, Moisés e a família de Jesus conheceram.",
    location: "Cairo, Egito",
    country: "egypt",
    // Grande Pirâmide de Quéops — foto real (Wikimedia Commons)
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
    // Grande Esfinge de Gizé — foto real (Wikimedia Commons)
    imageUrl2: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Great_Sphinx_of_Giza_-_20080716a.jpg",
    color: "#1a0f00",
    accentColor: "#d4a017",
    icon: "🔺",
  },
  {
    day: 4,
    date: "04/12/2026",
    title: "Dia 4",
    subtitle: "Monte Sinai — A Montanha de Deus",
    description:
      "Voo Cairo → Sharm el-Sheik. Deslocamento para Saint Catherine, ao pé do Monte Sinai. Hospedagem no Mosteiro de Santa Catarina. À noite, subida ao Monte Sinai para contemplar o nascer do sol no topo — onde Deus entregou os Dez Mandamentos a Moisés.",
    highlights: [
      "Voo para Sharm el-Sheik",
      "Mosteiro de Santa Catarina",
      "Subida noturna ao Monte Sinai",
      "Nascer do sol no cume sagrado — 2.285 m de altitude",
    ],
    narration:
      "A subida noturna ao Monte Sinai é silenciosa e sagrada. Cada passo na escuridão carrega o peso de uma revelação. No topo, quando o sol rasga o horizonte no mesmo lugar onde Deus falou com Moisés, as palavras simplesmente faltam.",
    location: "Sharm el-Sheik → Monte Sinai, Egito",
    country: "egypt",
    // Foto real do Monte Sinai ao nascer do sol (Wikimedia Commons)
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/MtSinaiJune2006.JPG",
    color: "#0f0820",
    accentColor: "#c084fc",
    icon: "🌄",
  },
  {
    day: 5,
    date: "05/12/2026",
    title: "Dia 5",
    subtitle: "Entrada em Israel — Eilat",
    description:
      "Nascer do sol no Monte Sinai. Retorno ao Mosteiro de Santa Catarina e descanso. Após o almoço, viagem pelo Golfo de Aqaba rumo à fronteira com Israel. Primeira pisada em solo israelense e hospedagem em Eilat.",
    highlights: [
      "Nascer do sol no cume do Monte Sinai",
      "Mosteiro de Santa Catarina — século VI",
      "Golfo de Aqaba — Mar Vermelho",
      "Cruzamento da fronteira — entrada em Israel",
    ],
    narration:
      "Cruzamos o Golfo de Aqaba e pisamos em solo israelense pela primeira vez. Eilat, cidade à beira do Mar Vermelho, marca o início do trecho mais sagrado da nossa jornada — a terra onde as profecias ganham corpo e onde cada pedra conta uma história.",
    location: "Monte Sinai → Eilat, Israel",
    country: "israel",
    // Eilat à beira do Mar Vermelho — foto real (Wikimedia Commons)
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/Eilat_by_the_Red_Sea_%287716934936%29.jpg",
    color: "#00122e",
    accentColor: "#38bdf8",
    icon: "🇮🇱",
  },
  {
    day: 6,
    date: "06/12/2026",
    title: "Dia 6",
    subtitle: "Tabernáculo de Moisés & Mar Morto",
    description:
      "Parque Timna — réplica em tamanho real do Tabernáculo bíblico: pátio, Santo, Santo dos Santos, Arca da Aliança, Menorá e Altar de Bronze, conforme o livro do Êxodo. Depois, banho flutuante nas águas do Mar Morto. Chegada a Jerusalém.",
    highlights: [
      "Réplica do Tabernáculo em tamanho real — Parque Timna",
      "Arca da Aliança, Menorá e Altar de Bronze",
      "Banho no Mar Morto — 430m abaixo do nível do mar",
      "Chegada a Jerusalém",
    ],
    narration:
      "No Parque Timna, a réplica em tamanho real do Tabernáculo bíblico nos transporta ao deserto do Êxodo. O pátio, o Santo, o Santo dos Santos — cada detalhe construído conforme as instruções de Deus a Moisés. Ao final do dia, flutuamos nas águas minerais do Mar Morto, o ponto mais baixo da Terra.",
    location: "Eilat → Parque Timna → Mar Morto → Jerusalém",
    country: "israel",
    // Réplica do Tabernáculo no Parque Timna — imagem principal (aparece primeiro)
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Tabernacle_timna.jpg",
    // Mar Morto panorâmico — aparece ~16s depois, quando a narração menciona "flutuamos"
    imageUrl2: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Dead_Sea_morning_panorama_%283272162492%29.jpg",
    imageUrl2StartSec: 16,
    color: "#1a0d00",
    accentColor: "#f59e0b",
    icon: "🏺",
  },
  {
    day: 7,
    date: "07/12/2026",
    title: "Dia 7",
    subtitle: "Betânia • Jericó • Tel Shiloh",
    description:
      "Betânia — Túmulo de Lázaro, onde Jesus o ressuscitou. Jericó — a cidade mais antiga do mundo: Monte da Tentação, Árvore de Zaqueu, Fonte de Eliseu. Tel Shiloh — onde o Tabernáculo ficou por 369 anos e Samuel ouviu a voz de Deus pela primeira vez.",
    highlights: [
      "Túmulo de Lázaro — Betânia (Al-Azariyeh)",
      "Monte da Tentação e Árvore de Zaqueu — Jericó",
      "Fonte de Eliseu (Ain es-Sultan)",
      "Tel Shiloh — ruínas arqueológicas e mosaicos byzantinos séc. V",
    ],
    narration:
      "Em Betânia, o silêncio do túmulo de Lázaro ainda guarda o eco daquele chamado: 'Lázaro, vem para fora!' Em Jericó, a árvore de Zaqueu ainda cresce. E em Tel Shiloh, pisamos o chão onde a Arca da Aliança repousou por trezentos e sessenta e nove anos, e onde o jovem Samuel ouviu a voz de Deus.",
    location: "Betânia → Jericó → Tel Shiloh → Jerusalém",
    country: "israel",
    // Monte da Tentação em Jericó — mosteiro cravado na rocha (Wikimedia Commons)
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/Monastery_of_the_Temptation_%28Jeriho%29.jpg",
    // Árvore de Zaqueu em Jericó (Wikimedia Commons)
    imageUrl2: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Tree_of_Zacchaeus%2C_2019_%2802%29.jpg",
    color: "#0f1a00",
    accentColor: "#86efac",
    icon: "🌿",
  },
  {
    day: 8,
    date: "08/12/2026",
    title: "Dia 8",
    subtitle: "Galileia & Rio Jordão",
    description:
      "Cafarnaum — a cidade de Jesus: Sinagoga Antiga, Casa de Pedro, Igreja dos Doze Apóstolos. Barco pelo Mar da Galileia com louvor nas águas. Almoço com o tradicional Peixe de São Pedro. Batismo em Yardenit no Rio Jordão.",
    highlights: [
      "Sinagoga Antiga de Cafarnaum (séc. I)",
      "Casa de São Pedro — ruínas franciscanas",
      "Barco com louvor no Mar da Galileia",
      "Batismo nas águas do Rio Jordão — Yardenit",
    ],
    narration:
      "Navegamos pelo Mar da Galileia — as mesmas águas em que Pedro afundou e Jesus o sustentou. Em Cafarnaum, andamos onde Jesus andou. E em Yardenit, no Rio Jordão, mergulhamos nas águas onde Jesus foi batizado por João — e renovamos o pacto do nosso próprio batismo.",
    location: "Cafarnaum → Mar da Galileia → Rio Jordão",
    country: "israel",
    // Panorama real do Mar da Galileia / Lago Tiberíades (Wikimedia Commons)
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Sea_of_Galilee_%28panoramic_view%2C_ca._2006%29.jpg",
    // Yardenit — local de batismo no Rio Jordão (Wikimedia Commons)
    imageUrl2: "https://upload.wikimedia.org/wikipedia/commons/3/34/Yardenit.jpg",
    color: "#00101f",
    accentColor: "#22d3ee",
    icon: "💧",
  },
  {
    day: 9,
    date: "09/12/2026",
    title: "Dia 9",
    subtitle: "Jerusalém — A Cidade Eterna",
    description:
      "Dia inteiro em Jerusalém: Monte das Oliveiras, Getsêmani, Jardim do Túmulo, Via Dolorosa, Santo Sepulcro, Monte Sião (Última Ceia), Tanque de Betesda e Muro das Lamentações.",
    highlights: [
      "Monte das Oliveiras & Jardim do Getsêmani",
      "Via Dolorosa & Basílica do Santo Sepulcro",
      "Jardim do Túmulo (Garden Tomb)",
      "Muro das Lamentações — Kotel",
    ],
    narration:
      "Jerusalém. Uma cidade que não se visita — se experimenta. Caminhamos a Via Dolorosa passo a passo. Nos ajoelhamos no Getsêmani onde Jesus suou sangue. Tocamos as pedras do Muro das Lamentações. E no Jardim do Túmulo, o silêncio nos diz tudo aquilo que as palavras não conseguem dizer.",
    location: "Jerusalém, Israel",
    country: "israel",
    // Muro das Lamentações (Kotel) — foto real em Jerusalém (Wikimedia Commons)
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Westernwall2.jpg",
    // Panorama de Jerusalém a partir do Monte das Oliveiras (Wikimedia Commons)
    imageUrl2: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Panor%C3%A1mica_de_Jerusal%C3%A9n_desde_el_Monte_de_los_Olivos.jpg",
    color: "#200a00",
    accentColor: "#fbbf24",
    icon: "✝️",
  },
  {
    day: 10,
    date: "10/12/2026",
    title: "Dia 10",
    subtitle: "Regresso ao Brasil",
    description:
      "Saída do hotel à 01h00. Traslado ao Aeroporto Internacional Ben Gurion de Tel Aviv. Voo para Roma e conexão para São Paulo – GRU. Fim dos serviços com o coração transformado.",
    highlights: [
      "Saída às 01h00 para o aeroporto",
      "Aeroporto Ben Gurion — Tel Aviv",
      "Conexão em Roma – Fiumicino",
      "Chegada a São Paulo — Aeroporto de Guarulhos",
    ],
    narration:
      "Partimos de Tel Aviv de madrugada, carregando muito mais do que trouxemos. Não são souvenirs — é uma fé renovada, uma identidade descoberta, uma vida que não volta a ser a mesma. A Caravana Profética 2026 não é uma viagem. É uma virada.",
    location: "Tel Aviv → Roma → São Paulo (GRU)",
    country: "closing",
    // Domo da Rocha em Jerusalém — encerramento da jornada (Wikimedia Commons)
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Jerusalem-2013%282%29-Temple_Mount-Dome_of_the_Rock_%28SE_exposure%29.jpg",
    // Avião — regresso ao Brasil (Unsplash verificado)
    imageUrl2: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=85",
    color: "#08081a",
    accentColor: "#c9a84c",
    icon: "🙏",
  },
];

export const VIDEO_FPS = 30;
export const TRANSITION_DURATION = Math.round(VIDEO_FPS * 1.2); // 36 frames = 1.2s

// Duração real de cada narração em segundos (gerada via ElevenLabs)
export const AUDIO_DURATIONS: Record<number, number> = {
  0: 12.96,
  1: 13.79,
  2: 18.00,
  3: 21.45,
  4: 19.72,
  5: 21.26,
  6: 23.72,
  7: 23.72,
  8: 21.13,
  9: 23.72,
  10: 19.64,
};

// Cada slide dura exatamente o tempo do seu áudio + 2s de respiro
// Vídeo total: ~3m49s com todos os áudios tocando por completo
const SLIDE_BUFFER_SEC = 2.0;
export const SLIDE_DURATIONS: number[] = [
  Math.round((12.96 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 00 — 449f
  Math.round((13.79 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 01 — 474f
  Math.round((18.00 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 02 — 600f
  Math.round((21.45 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 03 — 704f
  Math.round((19.72 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 04 — 652f
  Math.round((21.26 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 05 — 698f
  Math.round((23.72 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 06 — 772f
  Math.round((23.72 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 07 — 772f
  Math.round((21.13 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 08 — 694f
  Math.round((23.72 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 09 — 772f
  Math.round((19.64 + SLIDE_BUFFER_SEC) * VIDEO_FPS), // 10 — 649f
];

// Mantido para compatibilidade com componentes que usam duração única
export const SLIDE_DURATION = SLIDE_DURATIONS[0];
