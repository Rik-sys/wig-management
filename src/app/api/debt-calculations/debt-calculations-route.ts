// src/app/api/debt-calculations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const faniyaId = searchParams.get('faniyaId');
    const year = parseInt(searchParams.get('year') || '');
    const month = parseInt(searchParams.get('month') || '');

    if (!faniyaId || !year || !month) {
      return NextResponse.json(
        { error: 'faniyaId, year, ו-month חסרים' },
        { status: 400 }
      );
    }

    // 1️⃣ טעינת כל ה-DebtTransactions של הפאנית
    const allDebtTransactions = await prisma.debtTransaction.findMany({
      where: { faniyaId },
      orderBy: { createdAt: 'asc' }
    });

    // 2️⃣ סינון עדכוני חוב לחודש הנבחר
    const monthDebtTransactions = allDebtTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() + 1 === month
      );
    });

    // 3️⃣ חישוב חוב מחודש קודם
    // כל העדכונים שקרו לפני תחילת החודש הנוכחי
    const startOfMonth = new Date(year, month - 1, 1);
    const previousDebtTransactions = allDebtTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate < startOfMonth;
    });

    // סכום כל העדכונים עד תחילת החודש = חוב מחודש קודם
    const previousMonthDebt = previousDebtTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    // 4️⃣ חישוב חוב נוכחי
    // חוב מחודש קודם + כל העדכונים של החודש הנוכחי
    const currentMonthDebt = allDebtTransactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59);
        return transactionDate <= endOfMonth;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    return NextResponse.json({
      debtTransactions: monthDebtTransactions,
      previousMonthDebt,
      currentMonthDebt
    });

  } catch (error) {
    console.error('שגיאה בחישובי חוב:', error);
    return NextResponse.json(
      { error: 'שגיאה בטעינת נתוני חוב' },
      { status: 500 }
    );
  }
}
