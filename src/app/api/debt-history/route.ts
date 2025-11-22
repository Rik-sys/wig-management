// src/app/api/debt-history/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDebtHistory } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const faniyaId = searchParams.get('faniyaId');

    if (!faniyaId) {
      return NextResponse.json(
        { error: 'faniyaId חסר' },
        { status: 400 }
      );
    }

    const history = await getDebtHistory(faniyaId);

    return NextResponse.json(history);
  } catch (error) {
    console.error('שגיאה בטעינת היסטוריית חוב:', error);
    return NextResponse.json(
      { error: 'שגיאה בטעינת נתונים' },
      { status: 500 }
    );
  }
}