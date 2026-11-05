export interface MilePrice {
  label: string;
  price: number;
  negotiated: boolean;
  note?: string;
  updatedAt: string;
}

export const MILE_PRICES: Record<string, MilePrice> = {
  flyingblue: {
    label: 'Flying Blue (AF/KLM)',
    price: 75,
    negotiated: false,
    note: 'Pedido Balcão de Milhas 04/11/2026 — sem negociação registrada',
    updatedAt: '2026-11-04',
  },
  american: {
    label: 'American AAdvantage / Avios',
    price: 90,
    negotiated: true,
    note: 'Valor negociado no grupo Telegram',
    updatedAt: '2026-11-04',
  },
  smiles: {
    label: 'Smiles (GOL)',
    price: 16.5,
    negotiated: true,
    note: 'Negociado ~R$16,25–16,75',
    updatedAt: '2026-11-04',
  },
  latam: {
    label: 'LATAM Pass',
    price: 25,
    negotiated: true,
    note: 'Negociado ~R$24,50–25,50',
    updatedAt: '2026-11-04',
  },
  azul: {
    label: 'Azul TudoAzul',
    price: 15,
    negotiated: true,
    note: 'Valor de mercado estimado',
    updatedAt: '2026-11-04',
  },
  turkish: {
    label: 'Turkish Miles & Smiles',
    price: 45,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
  united: {
    label: 'United MileagePlus',
    price: 55,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
  aeroplan: {
    label: 'Air Canada Aeroplan',
    price: 60,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
  delta: {
    label: 'Delta SkyMiles',
    price: 65,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
  alaska: {
    label: 'Alaska Mileage Plan',
    price: 58,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
  emirates: {
    label: 'Emirates Skywards',
    price: 70,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
  qatar: {
    label: 'Qatar Privilege Club',
    price: 55,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
  singapore: {
    label: 'Singapore KrisFlyer',
    price: 65,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
  lufthansa: {
    label: 'Lufthansa Miles&More',
    price: 58,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
  finnair: {
    label: 'Finnair Plus',
    price: 55,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
  eurobonus: {
    label: 'SAS EuroBonus',
    price: 52,
    negotiated: false,
    note: 'Estimado — verificar no grupo',
    updatedAt: '2026-11-04',
  },
};

export function getPriceForSource(source: string): MilePrice | null {
  const key = source.toLowerCase().replace(/[^a-z]/g, '');
  return MILE_PRICES[key] || null;
}

export function calcTotalBRL(miles: number, pricePerK: number): number {
  return Math.round((miles * pricePerK) / 1000);
}
