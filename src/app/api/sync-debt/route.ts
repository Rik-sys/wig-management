// src/app/api/sync-debt/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { syncFaniyaTotalDebt, syncAllFaniyasDebt } from '@/lib/debtCalculations';

/**
 * GET - סנכרון חוב של פאנית ספציפית או כולן
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const faniyaId = searchParams.get('faniyaId');

    if (faniyaId) {
      // סנכרון פאנית אחת
      const actualDebt = await syncFaniyaTotalDebt(faniyaId);
      return NextResponse.json({
        message: 'החוב סונכרן בהצלחה',
        faniyaId,
        actualDebt,
      });
    } else {
      // סנכרון כל הפאניות
      await syncAllFaniyasDebt();
      return NextResponse.json({
        message: 'כל הפאניות סונכרנו בהצלחה',
      });
    }
  } catch (error) {
    console.error('שגיאה בסנכרון חוב:', error);
    return NextResponse.json(
      { error: 'שגיאה בסנכרון חוב' },
      { status: 500 }
    );
  }
}

/**
 * POST - סנכרון ידני (בטוח יותר)
 */
export async function POST(request: NextRequest) {
  try {
    const { faniyaId } = await request.json();

    if (faniyaId) {
      const actualDebt = await syncFaniyaTotalDebt(faniyaId);
      return NextResponse.json({
        success: true,
        actualDebt,
      });
    } else {
      await syncAllFaniyasDebt();
      return NextResponse.json({
        success: true,
        message: 'כל הפאניות סונכרנו',
      });
    }
  } catch (error) {
    console.error('שגיאה בסנכרון חוב:', error);
    return NextResponse.json(
      { error: 'שגיאה בסנכרון חוב' },
      { status: 500 }
    );
  }
}