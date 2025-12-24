// src/lib/debtCalculations.ts
import { prisma } from '@/lib/prisma';

/**
 * מחשב את החוב הכולל של פאנית מכל הטרנזקציות
 */
export async function calculateTotalDebt(faniyaId: string): Promise<number> {
  const transactions = await prisma.debtTransaction.findMany({
    where: { faniyaId },
  });

  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

/**
 * מחשב חוב עד תאריך מסוים
 */
export async function calculateDebtUntilDate(
  faniyaId: string,
  endDate: Date
): Promise<number> {
  const transactions = await prisma.debtTransaction.findMany({
    where: {
      faniyaId,
      createdAt: {
        lte: endDate,
      },
    },
  });

  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

/**
 * מחשב חוב בטווח תאריכים (לחודש ספציפי)
 */
export async function calculateDebtForMonth(
  faniyaId: string,
  year: number,
  month: number
): Promise<{
  previousMonthDebt: number;
  currentMonthTransactions: number;
  currentMonthDebt: number;
  transactions: any[];
}> {
  // תאריכי התחלה וסיום של החודש
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);
  const endOfPreviousMonth = new Date(year, month - 1, 0, 23, 59, 59);

  // חוב מחודש קודם (כל הטרנזקציות עד סוף החודש הקודם)
  const previousMonthDebt = await calculateDebtUntilDate(
    faniyaId,
    endOfPreviousMonth
  );

  // טרנזקציות של החודש הנוכחי
  const currentMonthTransactions = await prisma.debtTransaction.findMany({
    where: {
      faniyaId,
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // סכום טרנזקציות החודש
  const currentMonthAmount = currentMonthTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  // חוב נוכחי = חוב קודם + טרנזקציות החודש
  const currentMonthDebt = previousMonthDebt + currentMonthAmount;

  return {
    previousMonthDebt,
    currentMonthTransactions: currentMonthAmount,
    currentMonthDebt,
    transactions: currentMonthTransactions,
  };
}

/**
 * מסנכרן את totalDebt בפאנית עם המציאות מ-DebtTransactions
 */
export async function syncFaniyaTotalDebt(faniyaId: string): Promise<number> {
  const actualDebt = await calculateTotalDebt(faniyaId);

  await prisma.faniya.update({
    where: { id: faniyaId },
    data: { totalDebt: actualDebt },
  });

  return actualDebt;
}

/**
 * מסנכרן את כל הפאניות במערכת
 */
export async function syncAllFaniyasDebt(): Promise<void> {
  const faniyas = await prisma.faniya.findMany({
    select: { id: true },
  });

  for (const faniya of faniyas) {
    await syncFaniyaTotalDebt(faniya.id);
  }
}