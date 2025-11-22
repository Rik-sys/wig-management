// // // src/app/api/payments/[id]/route.ts
// // import { NextRequest, NextResponse } from 'next/server';
// // import { prisma } from '@/lib/prisma';
// // import { updateFaniyaDebt } from '@/lib/utils';

// // interface RouteParams {
// //   params: Promise<{ id: string }>;
// // }

// // // DELETE - מחיקת תשלום
// // export async function DELETE(request: NextRequest, { params }: RouteParams) {
// //   try {
// //     const { id } = await params;
    
// //     // קבלת פרטי התשלום לפני המחיקה (כדי לדעת את faniyaId)
// //     const payment = await prisma.payment.findUnique({
// //       where: { id }
// //     });

// //     if (!payment) {
// //       return NextResponse.json(
// //         { error: 'תשלום לא נמצא' },
// //         { status: 404 }
// //       );
// //     }

// //     // מחיקת התשלום והחלקים שלו (בטרנזקציה)
// //     await prisma.$transaction(async (tx) => {
// //       // מחיקת כל חלקי התשלום
// //       await tx.paymentPart.deleteMany({
// //         where: { paymentId: id }
// //       });
      
// //       // מחיקת התשלום עצמו
// //       await tx.payment.delete({
// //         where: { id }
// //       });
// //     });

// //     // עדכון חוב הפאנית
// //     await updateFaniyaDebt(payment.faniyaId);

// //     return NextResponse.json({ 
// //       message: 'תשלום נמחק בהצלחה',
// //       faniyaId: payment.faniyaId 
// //     });
// //   } catch (error) {
// //     console.error('שגיאה במחיקת תשלום:', error);
// //     return NextResponse.json(
// //       { error: 'שגיאה במחיקת תשלום' },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { adjustFaniyaDebt } from '@/lib/utils';

// interface RouteParams {
//   params: Promise<{ id: string }>;
// }

// // DELETE - מחיקת תשלום
// export async function DELETE(request: NextRequest, { params }: RouteParams) {
//   try {
//     const { id } = await params;
    
//     // קבלת פרטי התשלום לפני המחיקה (כדי לדעת את faniyaId והסכום)
//     const payment = await prisma.payment.findUnique({
//       where: { id }
//     });

//     if (!payment) {
//       return NextResponse.json(
//         { error: 'תשלום לא נמצא' },
//         { status: 404 }
//       );
//     }

//     // מחיקת התשלום והחלקים שלו (בטרנזקציה)
//     await prisma.$transaction(async (tx) => {
//       // מחיקת כל חלקי התשלום
//       await tx.paymentPart.deleteMany({
//         where: { paymentId: id }
//       });
      
//       // מחיקת התשלום עצמו
//       await tx.payment.delete({
//         where: { id }
//       });
//     });

//     // ✅ הוסף בחזרה את סכום התשלום לחוב (כי מחקנו תשלום)
//     await adjustFaniyaDebt(payment.faniyaId, payment.totalAmount);

//     return NextResponse.json({ 
//       message: 'תשלום נמחק בהצלחה',
//       faniyaId: payment.faniyaId 
//     });
//   } catch (error) {
//     console.error('שגיאה במחיקת תשלום:', error);
//     return NextResponse.json(
//       { error: 'שגיאה במחיקת תשלום' },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addDebtTransaction } from '@/lib/utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// DELETE - מחיקת תשלום
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    const payment = await prisma.payment.findUnique({
      where: { id }
    });

    if (!payment) {
      return NextResponse.json(
        { error: 'תשלום לא נמצא' },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.paymentPart.deleteMany({
        where: { paymentId: id }
      });
      
      await tx.payment.delete({
        where: { id }
      });
    });

    // ✅ הוסף בחזרה לחוב עם פירוט
    await addDebtTransaction(
      payment.faniyaId,
      payment.totalAmount,
      `ביטול תשלום - ${payment.notes || 'ללא תיאור'}`,
      'payment',
      payment.id
    );

    return NextResponse.json({ 
      message: 'תשלום נמחק בהצלחה',
      faniyaId: payment.faniyaId 
    });
  } catch (error) {
    console.error('שגיאה במחיקת תשלום:', error);
    return NextResponse.json(
      { error: 'שגיאה במחיקת תשלום' },
      { status: 500 }
    );
  }
}