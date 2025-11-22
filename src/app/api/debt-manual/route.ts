// src/app/api/debt-manual/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addDebtTransaction } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { faniyaId, amount, description } = await request.json();

    if (!faniyaId || !amount || !description) {
      return NextResponse.json(
        { error: 'שדות חובה חסרים' },
        { status: 400 }
      );
    }

    await addDebtTransaction(
      faniyaId,
      parseFloat(amount),
      description,
      'manual'
    );

    return NextResponse.json({ message: 'החוב עודכן בהצלחה' });
  } catch (error) {
    console.error('שגיאה בעדכון חוב ידני:', error);
    return NextResponse.json(
      { error: 'שגיאה בעדכון חוב' },
      { status: 500 }
    );
  }
}
