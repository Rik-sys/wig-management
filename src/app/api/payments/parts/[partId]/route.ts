import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addDebtTransaction } from '@/lib/utils';

export async function DELETE(request: NextRequest) {
  try {
    // קבל את ה-ID מה-URL
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const partId = pathParts[pathParts.length - 1];

    if (!partId || partId === 'parts') {
      return NextResponse.json({ error: 'חסר ID' }, { status: 400 });
    }

    // 1. מצא את החלק
    const part = await prisma.paymentPart.findUnique({
      where: { id: partId },
      include: {
        payment: {
          include: {
            paymentParts: true
          }
        }
      }
    });

    if (!part) {
      return NextResponse.json({ error: 'חלק לא נמצא' }, { status: 404 });
    }

    const payment = part.payment;
    const partAmount = part.amount;

    // 2. אם זה החלק היחיד - מחק את כל התשלום
    if (payment.paymentParts.length === 1) {
      await prisma.payment.delete({
        where: { id: payment.id }
      });

      // ✅ הוסף לחוב באמצעות הפונקציה הקיימת
      await addDebtTransaction(
        payment.faniyaId,
        partAmount, // סכום חיובי = מוסיף לחוב
        `ביטול תשלום מלא: ₪${partAmount.toFixed(2)}`,
        'payment',
        payment.id
      );

      return NextResponse.json({
        message: 'התשלום כולו נמחק',
        deletedPayment: true,
        deletedAmount: partAmount
      });
    }

    // 3. מחק רק את החלק הזה
    await prisma.paymentPart.delete({
      where: { id: partId }
    });

    // 4. עדכן את הסכום הכולל
    const newTotal = payment.totalAmount - partAmount;
    await prisma.payment.update({
      where: { id: payment.id },
      data: { totalAmount: newTotal }
    });

    // 5. ✅ הוסף לחוב באמצעות הפונקציה הקיימת
    await addDebtTransaction(
      payment.faniyaId,
      partAmount, // סכום חיובי = מוסיף לחוב
      `ביטול חלק מתשלום (${part.paymentType}): ₪${partAmount.toFixed(2)}`,
      'payment',
      partId
    );

    return NextResponse.json({
      message: 'חלק התשלום נמחק בהצלחה',
      deletedPayment: false,
      deletedAmount: partAmount,
      newTotal: newTotal
    });

  } catch (error) {
    console.error('שגיאה במחיקת חלק תשלום:', error);
    return NextResponse.json({ 
      error: 'שגיאה במחיקה',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

