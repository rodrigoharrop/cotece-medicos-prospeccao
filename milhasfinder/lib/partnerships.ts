// Base de parcerias e sweet spots para emissão com milhas
// Atualizado: Novembro 2026

export interface SweetSpot {
  id: string;
  title: string;
  description: string;
  carrier: string;
  program: string;
  programSource: string;
  cabin: 'Y' | 'J' | 'F' | 'Y+J' | 'all';
  milesFrom: number;
  milesTo?: number;
  tip?: string;
  warning?: string;
  region: 'domestic-br' | 'br-europe' | 'br-usa' | 'br-middleeast' | 'br-asia' | 'br-africa' | 'general';
  applicableRoutes?: string[];
  bookingWindow?: string;
  bookingUrl?: string;
}

export const DOMESTIC_SWEET_SPOTS: SweetSpot[] = [
  {
    id: 'gol-american',
    title: 'GOL via American AAdvantage',
    description: 'Emita voos domésticos GOL usando milhas AAdvantage. Tabela fixa vantajosa para trechos curtos.',
    carrier: 'G3',
    program: 'American AAdvantage',
    programSource: 'american',
    cabin: 'Y',
    milesFrom: 7500,
    milesTo: 12500,
    tip: 'Bookings próximos (janela de até 15 dias) tendem a ter mais disponibilidade e evitam a "derrubada" de assentos de parceiro que ocorre semanas antes.',
    warning: 'American pode cobrar taxa de combustível em alguns voos GOL. Verifique o total antes.',
    region: 'domestic-br',
    bookingWindow: 'Dentro de 15 dias',
    bookingUrl: 'https://www.aa.com',
  },
  {
    id: 'azul-united',
    title: 'Azul via United MileagePlus',
    description: 'United é sócio estratégico da Azul. Emita voos Azul domésticos e internacionais com milhas MileagePlus.',
    carrier: 'AD',
    program: 'United MileagePlus',
    programSource: 'united',
    cabin: 'Y+J',
    milesFrom: 8000,
    milesTo: 20000,
    tip: 'Por ser sócia, United tem acesso privilegiado ao inventário Azul. Boa alternativa quando Smiles/TudoAzul não mostram disponibilidade.',
    region: 'domestic-br',
    bookingUrl: 'https://www.united.com',
  },
  {
    id: 'azul-copa',
    title: 'Azul via Copa ConnectMiles',
    description: 'Copa é parceira da Azul. Permite emitir voos Azul domésticos e para Caribe/América Central.',
    carrier: 'AD',
    program: 'Copa ConnectMiles',
    programSource: 'connectmiles',
    cabin: 'Y',
    milesFrom: 8000,
    milesTo: 15000,
    tip: 'Útil quando não há disponibilidade via outros programas. ConnectMiles é menos concorrido.',
    region: 'domestic-br',
    bookingUrl: 'https://www.copaair.com',
  },
  {
    id: 'latam-emirates',
    title: 'LATAM via Emirates Skywards',
    description: 'Emirates tem parceria com LATAM permitindo emissões em voos LATAM domésticos e internacionais.',
    carrier: 'LA',
    program: 'Emirates Skywards',
    programSource: 'emirates',
    cabin: 'Y+J',
    milesFrom: 10000,
    milesTo: 35000,
    tip: 'Tabela fixa da Emirates para LATAM costuma ser vantajosa em executiva para destinos sul-americanos e europeus operados pela LATAM.',
    warning: 'Emirates cobra fuel surcharge mesmo em parceiros. Verifique o total em dinheiro antes de emitir.',
    region: 'domestic-br',
    bookingUrl: 'https://www.emirates.com',
  },
  {
    id: 'latam-american',
    title: 'LATAM via American AAdvantage (Oneworld)',
    description: 'LATAM é membro Oneworld. Emita com AAdvantage tanto doméstico quanto internacional.',
    carrier: 'LA',
    program: 'American AAdvantage',
    programSource: 'american',
    cabin: 'Y+J',
    milesFrom: 10000,
    milesTo: 57500,
    tip: 'Para voos LATAM Europa (GRU/GIG→MAD/LHR/CDG), AAdvantage tem tabela fixa de 57.500 milhas executiva — ótima opção.',
    region: 'br-europe',
    bookingUrl: 'https://www.aa.com',
  },
  {
    id: 'latam-avios',
    title: 'LATAM via British Airways Avios (Oneworld)',
    description: 'BA Avios emite em LATAM por ser Oneworld. Vantagem em rotas curtas pela tabela por distância.',
    carrier: 'LA',
    program: 'British Airways Avios',
    programSource: 'american',
    cabin: 'Y+J',
    milesFrom: 9000,
    milesTo: 40000,
    tip: 'Avios usa tabela por distância. Trechos curtos como GRU-BSB ou SSA-FOR podem ser muito baratos.',
    region: 'domestic-br',
    bookingUrl: 'https://www.britishairways.com',
  },
];

export const INTERNATIONAL_SWEET_SPOTS: SweetSpot[] = [
  {
    id: 'br-europe-turkish',
    title: 'Brasil → Europa via Turkish Miles&Smiles',
    description: 'Turkish emite voos da Turkish Airlines (IST como hub) com tabela fixa muito vantajosa para executiva.',
    carrier: 'TK',
    program: 'Turkish Miles & Smiles',
    programSource: 'turkish',
    cabin: 'J',
    milesFrom: 45000,
    milesTo: 60000,
    tip: 'GRU/FOR→IST→qualquer Europa: ~45.000-60.000 milhas executiva. Conexão em Istambul. Uma das melhores tabelas do mercado.',
    warning: 'Turkish cobra fuel surcharge nos próprios voos. Pode sair ~USD 150-300 em taxas.',
    region: 'br-europe',
    applicableRoutes: ['GRU-IST', 'FOR-IST', 'GIG-IST', 'SSA-IST', 'REC-IST'],
    bookingUrl: 'https://www.turkishairlines.com',
  },
  {
    id: 'br-europe-flyingblue',
    title: 'Brasil → Europa via Flying Blue (AF/KLM)',
    description: 'Air France e KLM têm voos diretos do Brasil para Paris e Amsterdam. Promoções mensais frequentes.',
    carrier: 'AF',
    program: 'Flying Blue (Air France/KLM)',
    programSource: 'flyingblue',
    cabin: 'J',
    milesFrom: 50000,
    milesTo: 100000,
    tip: 'Monitore as promoções mensais Promo Rewards — executiva GRU/FOR→CDG/AMS pode cair para 50-60k milhas.',
    region: 'br-europe',
    applicableRoutes: ['GRU-CDG', 'GRU-AMS', 'FOR-CDG', 'FOR-AMS', 'GIG-CDG'],
    bookingUrl: 'https://www.flyingblue.com',
  },
  {
    id: 'br-europe-aeroplan',
    title: 'Brasil → Europa via Aeroplan (Air Canada)',
    description: 'Aeroplan é dos programas mais flexíveis — emite em Star Alliance (Lufthansa, Swiss, TAP, etc.) com tabela fixa.',
    carrier: 'AC',
    program: 'Air Canada Aeroplan',
    programSource: 'aeroplan',
    cabin: 'J',
    milesFrom: 55000,
    milesTo: 75000,
    tip: 'GRU→FRA via Lufthansa, GRU→ZRH via Swiss, GRU→LIS via TAP — tudo emitível por Aeroplan. Sem fuel surcharge na maioria dos parceiros.',
    region: 'br-europe',
    bookingUrl: 'https://www.aircanada.com/aeroplan',
  },
  {
    id: 'br-europe-united',
    title: 'Brasil → Europa via United MileagePlus',
    description: 'United emite em toda Star Alliance para Europa. Boa opção para rotas Lufthansa, Swiss, TAP.',
    carrier: 'UA',
    program: 'United MileagePlus',
    programSource: 'united',
    cabin: 'J',
    milesFrom: 60000,
    milesTo: 80000,
    tip: 'GRU→EWR→FRA (United + Lufthansa) ou GRU→LIS→MAD (TAP) são conexões frequentes.',
    region: 'br-europe',
    bookingUrl: 'https://www.united.com',
  },
  {
    id: 'br-middleeast-turkish',
    title: 'Brasil → Oriente Médio via Turkish',
    description: 'Turkish com hub em IST cobre todo o Oriente Médio (DXB, DOH, AUH, TLV, AMM).',
    carrier: 'TK',
    program: 'Turkish Miles & Smiles',
    programSource: 'turkish',
    cabin: 'J',
    milesFrom: 50000,
    milesTo: 65000,
    tip: 'Para Israel (TLV), Jordânia (AMM), Dubai (DXB): voe via Istambul. Turkish tem boa frequência.',
    region: 'br-middleeast',
    bookingUrl: 'https://www.turkishairlines.com',
  },
  {
    id: 'br-usa-american',
    title: 'Brasil → EUA via American AAdvantage',
    description: 'American tem voos diretos GRU/GIG→MIA/JFK/ORD. Tabela saver para executiva transatlântica.',
    carrier: 'AA',
    program: 'American AAdvantage',
    programSource: 'american',
    cabin: 'J',
    milesFrom: 50000,
    milesTo: 70000,
    tip: 'Saver executiva GRU→MIA→JFK: 57.500 milhas. Disponibilidade limitada mas quando abre vale muito.',
    region: 'br-usa',
    applicableRoutes: ['GRU-MIA', 'GRU-JFK', 'GIG-MIA', 'FOR-MIA'],
    bookingUrl: 'https://www.aa.com',
  },
  {
    id: 'br-asia-singapore',
    title: 'Brasil → Ásia via Singapore KrisFlyer',
    description: 'KrisFlyer emite em voos Singapore Airlines e parceiros Star Alliance para Ásia.',
    carrier: 'SQ',
    program: 'Singapore KrisFlyer',
    programSource: 'singapore',
    cabin: 'J',
    milesFrom: 85000,
    milesTo: 110000,
    tip: 'GRU→FRA→SIN ou GRU→EWR→NRT. KrisFlyer tem tabela fixa vantajosa para Ásia em executiva.',
    region: 'br-asia',
    bookingUrl: 'https://www.singaporeair.com/krisflyer',
  },
];

export const CONNECTION_HUBS = [
  { iata: 'IST', city: 'Istambul', programs: ['turkish'], airlines: ['TK'], note: 'Melhor hub para Europa Oriental, Oriente Médio e Ásia via Turkish' },
  { iata: 'LIS', city: 'Lisboa', programs: ['flyingblue', 'aeroplan', 'united'], airlines: ['TP', 'LA'], note: 'Hub natural saindo do Brasil — sem visto para brasileiros' },
  { iata: 'CDG', city: 'Paris', programs: ['flyingblue'], airlines: ['AF'], note: 'Hub AF/KLM — conecta toda Europa' },
  { iata: 'MAD', city: 'Madri', programs: ['american', 'aeroplan'], airlines: ['IB', 'LA'], note: 'Iberia/LATAM — Oneworld, bom para Europa e América do Sul' },
  { iata: 'FRA', city: 'Frankfurt', programs: ['united', 'aeroplan', 'lufthansa'], airlines: ['LH'], note: 'Hub Lufthansa Star Alliance — Europa Central e Ásia' },
  { iata: 'AMS', city: 'Amsterdam', programs: ['flyingblue'], airlines: ['KL'], note: 'Hub KLM Flying Blue — alternativa a Paris' },
  { iata: 'MIA', city: 'Miami', programs: ['american'], airlines: ['AA'], note: 'Hub principal AA para América do Sul — conexão EUA/Caribe' },
  { iata: 'DXB', city: 'Dubai', programs: ['emirates'], airlines: ['EK'], note: 'Hub Emirates — Oriente Médio, África e Ásia' },
  { iata: 'DOH', city: 'Doha', programs: ['qatar'], airlines: ['QR'], note: 'Hub Qatar Airways — Oriente Médio, África e Ásia' },
  { iata: 'GRU', city: 'São Paulo', programs: ['smiles', 'latam', 'azul'], airlines: ['G3', 'LA', 'AD'], note: 'Principal hub do Brasil — maior oferta de voos internacionais' },
];

const BR_AIRPORTS = ['FOR','GRU','GIG','CGH','VCP','SSA','REC','BSB','BEL','MAO','POA','CWB','FLN','NAT','MCZ','THE','SLZ','JPA','PVH','STM','MCP','CGR','CGB','AJU','VIX','UDI','CNF','GYN','IGU','RAO','LDB','SDU'];
const EUROPE_AIRPORTS = ['CDG','ORY','LHR','LGW','MAD','BCN','LIS','OPO','FRA','MUC','BER','AMS','ZRH','GVA','VIE','FCO','MXP','VCE','ATH','IST','CPH','ARN','OSL','HEL','DUB','BRU','PRG','WAW','BUD','OTP'];
const MIDDLEEAST_AIRPORTS = ['DXB','AUH','DOH','KWI','AMM','TLV'];
const USA_AIRPORTS = ['JFK','EWR','LGA','LAX','ORD','MIA','ATL','BOS','IAD','DFW','SFO','SEA'];
const ASIA_AIRPORTS = ['SIN','HKG','NRT','HND','ICN','PEK','PVG','BKK','DEL','BOM','KUL'];

export function getStrategiesForRoute(origin: string, destinations: string[]): {
  sweetSpots: SweetSpot[];
  connectionHubs: typeof CONNECTION_HUBS;
  region: string;
  tips: string[];
} {
  const dest = destinations[0] || '';
  const all = [...DOMESTIC_SWEET_SPOTS, ...INTERNATIONAL_SWEET_SPOTS];

  const originBR = BR_AIRPORTS.includes(origin);
  const destBR = BR_AIRPORTS.includes(dest);
  const isDomestic = originBR && destBR;

  let region: SweetSpot['region'] = 'general';
  if (isDomestic) region = 'domestic-br';
  else if (EUROPE_AIRPORTS.includes(dest)) region = 'br-europe';
  else if (MIDDLEEAST_AIRPORTS.includes(dest)) region = 'br-middleeast';
  else if (USA_AIRPORTS.includes(dest)) region = 'br-usa';
  else if (ASIA_AIRPORTS.includes(dest)) region = 'br-asia';

  const sweetSpots = all.filter(s => s.region === region || s.region === 'general');

  const relevantHubs = isDomestic
    ? []
    : region === 'br-europe'
    ? CONNECTION_HUBS.filter(h => ['IST','LIS','CDG','MAD','FRA','AMS'].includes(h.iata))
    : region === 'br-middleeast'
    ? CONNECTION_HUBS.filter(h => ['IST','DXB','DOH'].includes(h.iata))
    : region === 'br-usa'
    ? CONNECTION_HUBS.filter(h => ['MIA'].includes(h.iata))
    : CONNECTION_HUBS.slice(0, 4);

  const tips: string[] = [];
  if (isDomestic) {
    tips.push('Para voos domésticos, GOL via American e LATAM via Emirates costumam ter as melhores tabelas fixas.');
    tips.push('Azul via United aproveita a parceria estratégica — verifique quando Smiles não mostrar disponibilidade.');
    tips.push('Bookings GOL via American dentro de 15 dias têm mais chances de disponibilidade de parceiro.');
  }
  if (region === 'br-europe') {
    tips.push('Para Europa, considere conexão em Lisboa (TAP/LATAM) — sem visto para brasileiros e hub natural.');
    tips.push('Turkish via Istambul tem uma das melhores tabelas de executiva — verifique taxas antes de emitir.');
    tips.push('Flying Blue lança promoções mensais (Promo Rewards) — pode valer esperar pela oferta certa.');
  }
  if (region === 'br-middleeast') {
    tips.push('Para Israel e Oriente Médio, Turkish via IST é quase sempre a rota mais viável saindo do Brasil.');
  }
  if (region === 'br-usa') {
    tips.push('American tem os melhores voos diretos Brasil-EUA. Verifique também United via GRU-EWR.');
  }

  return { sweetSpots, connectionHubs: relevantHubs, region, tips };
}
