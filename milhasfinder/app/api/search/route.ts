import { NextRequest, NextResponse } from 'next/server';
import { MILE_PRICES, getPriceForSource, calcTotalBRL } from '@/lib/mile-prices';

const SEATS_AERO_KEY = process.env.SEATS_AERO_API_KEY || '';

interface SearchParams {
  origin: string;
  destinations: string[];
  dateOut: string;
  dateEnd?: string;
  pax: number;
  cabin: string;
  nonstopOnly: boolean;
  wantMiles: boolean;
}

interface AwardResult {
  id: string;
  date: string;
  origin: string;
  dest: string;
  source: string;
  sourceLabel: string;
  miles: number;
  seats: number;
  direct: boolean;
  airlines: string;
  milePrice: number | null;
  totalBRL: number | null;
  lastSeen: string;
}

async function searchSeatsAero(params: SearchParams): Promise<AwardResult[]> {
  const results: AwardResult[] = [];

  for (const dest of params.destinations) {
    const url = new URL('https://seats.aero/partnerapi/search');
    url.searchParams.set('origin_airport', params.origin.toUpperCase());
    url.searchParams.set('destination_airport', dest.toUpperCase());
    url.searchParams.set('cabins', params.cabin === 'business' ? 'business' : params.cabin === 'first' ? 'first' : 'economy');
    url.searchParams.set('start_date', params.dateOut);
    if (params.dateEnd) url.searchParams.set('end_date', params.dateEnd);
    if (params.nonstopOnly) url.searchParams.set('only_direct_flights', 'true');
    url.searchParams.set('order_by', 'lowest_mileage');
    url.searchParams.set('take', '50');

    try {
      const res = await fetch(url.toString(), {
        headers: { 'Partner-Authorization': SEATS_AERO_KEY },
        next: { revalidate: 300 },
      });

      if (!res.ok) {
        console.error('Seats.aero error:', res.status, await res.text());
        continue;
      }

      const data = await res.json();
      const items = data.data || [];

      for (const item of items) {
        const cabinKey = params.cabin === 'first' ? 'F' : params.cabin === 'economy' ? 'Y' : 'J';
        const available = item[`${cabinKey}Available`];
        if (!available) continue;

        const miles = parseInt(item[`${cabinKey}MileageCost`] || '0', 10);
        const seats = item[`${cabinKey}RemainingSeats`] || 0;
        const direct = item[`${cabinKey}Direct`] || false;
        const airlines = item[`${cabinKey}Airlines`] || '';

        if (miles === 0) continue;

        const mileInfo = getPriceForSource(item.Source);
        const totalBRL = mileInfo ? calcTotalBRL(miles, mileInfo.price) : null;

        results.push({
          id: item.ID,
          date: item.Date,
          origin: item.Route?.OriginAirport || params.origin,
          dest: item.Route?.DestinationAirport || dest,
          source: item.Source,
          sourceLabel: mileInfo?.label || item.Source,
          miles,
          seats,
          direct,
          airlines,
          milePrice: mileInfo?.price || null,
          totalBRL,
          lastSeen: item.ComputedLastSeen || '',
        });
      }
    } catch (err) {
      console.error('fetch error', err);
    }
  }

  // Sort by totalBRL asc (nulls last), then by miles
  results.sort((a, b) => {
    if (a.totalBRL !== null && b.totalBRL !== null) return a.totalBRL - b.totalBRL;
    if (a.totalBRL !== null) return -1;
    if (b.totalBRL !== null) return 1;
    return a.miles - b.miles;
  });

  return results;
}

export async function POST(req: NextRequest) {
  // Auth check
  const auth = req.headers.get('x-app-token');
  if (auth !== process.env.APP_PASSWORD) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  if (!SEATS_AERO_KEY) {
    return NextResponse.json({ error: 'SEATS_AERO_API_KEY não configurada' }, { status: 500 });
  }

  let body: SearchParams;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  if (!body.origin || !body.destinations?.length || !body.dateOut) {
    return NextResponse.json({ error: 'Campos obrigatórios: origin, destinations, dateOut' }, { status: 400 });
  }

  try {
    const awards = await searchSeatsAero(body);

    return NextResponse.json({
      awards,
      milePrices: MILE_PRICES,
      searchedAt: new Date().toISOString(),
      params: body,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro interno na busca' }, { status: 500 });
  }
}
