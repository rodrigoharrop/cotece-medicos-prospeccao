import { NextResponse } from 'next/server';
import { MILE_PRICES } from '@/lib/mile-prices';

export async function GET() {
  return NextResponse.json(MILE_PRICES);
}
