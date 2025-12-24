// src/app/api/debt-calculations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { calculateDebtForMonth } from '@/lib/debtCalculations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const faniyaId = searchParams.get('faniyaId');
    const year = parseInt(searchParams.get('year') || '');
    const month = parseInt(searchParams.get('month') || '');

    if (!faniyaId || !year || !month) {
      return NextResponse.json(
        { error: 'חסרים פרמטרים: faniyaId, year, month' },
        { status: 400 }
      );
    }

    const debtData = await calculateDebtForMonth(faniyaId, year, month);

    return NextResponse.json(debtData);
  } catch (error) {
    console.error('שגיאה בחישוב חוב:', error);
    return NextResponse.json(
      { error: 'שגיאה בחישוב חוב' },
      { status: 500 }
    );
  }
}