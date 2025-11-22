// // // import { NextRequest, NextResponse } from 'next/server';
// // // import { prisma } from '@/lib/prisma';
// // // import { updateFaniyaDebt } from '@/lib/utils';

// // // // GET - קבלת תשלומים
// // // export async function GET(request: NextRequest) {
// // //   try {
// // //     const { searchParams } = new URL(request.url);
// // //     const faniyaId = searchParams.get('faniyaId');

// // //     const whereConditions: any = {};
// // //     if (faniyaId) {
// // //       whereConditions.faniyaId = faniyaId;
// // //     }

// // //     const payments = await prisma.payment.findMany({
// // //       where: whereConditions,
// // //       include: {
// // //         faniya: {
// // //           select: {
// // //             name: true
// // //           }
// // //         }
// // //       },
// // //       orderBy: {
// // //         paymentDate: 'desc'
// // //       }
// // //     });

// // //     return NextResponse.json(payments);
// // //   } catch (error) {
// // //     console.error('שגיאה בטעינת תשלומים:', error);
// // //     return NextResponse.json(
// // //       { error: 'שגיאה בטעינת נתונים' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // // POST - הוספת תשלום
// // // export async function POST(request: NextRequest) {
// // //   try {
// // //     const paymentData = await request.json();

// // //     // בדיקות תקינות
// // //     if (!paymentData.faniyaId || !paymentData.amount || !paymentData.paymentType) {
// // //       return NextResponse.json(
// // //         { error: 'שדות חובה חסרים' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     const payment = await prisma.payment.create({
// // //       data: {
// // //         faniyaId: paymentData.faniyaId,
// // //         amount: parseFloat(paymentData.amount),
// // //         paymentDate: paymentData.paymentDate ? new Date(paymentData.paymentDate) : new Date(),
// // //         paymentType: paymentData.paymentType,
// // //         checkDueDate: paymentData.checkDueDate ? new Date(paymentData.checkDueDate) : null,
// // //         notes: paymentData.notes?.trim() || null
// // //       },
// // //       include: {
// // //         faniya: {
// // //           select: {
// // //             name: true
// // //           }
// // //         }
// // //       }
// // //     });

// // //     // עדכון חוב הפאנית
// // //     await updateFaniyaDebt(paymentData.faniyaId);

// // //     return NextResponse.json(payment);
// // //   } catch (error) {
// // //     console.error('שגיאה בהוספת תשלום:', error);
// // //     return NextResponse.json(
// // //       { error: 'שגיאה בהוספת תשלום' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // import { NextRequest, NextResponse } from 'next/server';
// // import { prisma } from '@/lib/prisma';
// // import { updateFaniyaDebt } from '@/lib/utils';

// // // GET - קבלת תשלומים
// // export async function GET(request: NextRequest) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const faniyaId = searchParams.get('faniyaId');

// //     const whereConditions: any = {};
// //     if (faniyaId) {
// //       whereConditions.faniyaId = faniyaId;
// //     }

// //     const payments = await prisma.payment.findMany({
// //       where: whereConditions,
// //       include: {
// //         faniya: {
// //           select: {
// //             name: true
// //           }
// //         },
// //         paymentParts: true // כלול את חלקי התשלום
// //       },
// //       orderBy: {
// //         paymentDate: 'desc'
// //       }
// //     });

// //     return NextResponse.json(payments);
// //   } catch (error) {
// //     console.error('שגיאה בטעינת תשלומים:', error);
// //     return NextResponse.json(
// //       { error: 'שגיאה בטעינת נתונים' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // POST - הוספת תשלום מורכב
// // export async function POST(request: NextRequest) {
// //   try {
// //     const paymentData = await request.json();

// //     // בדיקות תקינות
// //     if (!paymentData.faniyaId || !paymentData.totalAmount || !paymentData.paymentParts) {
// //       return NextResponse.json(
// //         { error: 'שדות חובה חסרים' },
// //         { status: 400 }
// //       );
// //     }

// //     if (paymentData.paymentParts.length === 0) {
// //       return NextResponse.json(
// //         { error: 'חובה להוסיף לפחות חלק תשלום אחד' },
// //         { status: 400 }
// //       );
// //     }

// //     // בדיקה שסכום החלקים תואם לסכום הכולל
// //     const partsTotal = paymentData.paymentParts.reduce((sum: number, part: any) => sum + part.amount, 0);
// //     if (Math.abs(partsTotal - paymentData.totalAmount) > 0.01) {
// //       return NextResponse.json(
// //         { error: 'סכום חלקי התשלום לא תואם לסכום הכולל' },
// //         { status: 400 }
// //       );
// //     }

// //     // יצירת התשלום עם חלקיו בטרנזקציה
// //     const payment = await prisma.$transaction(async (tx) => {
// //       // יצירת התשלום הראשי
// //       const newPayment = await tx.payment.create({
// //         data: {
// //           faniyaId: paymentData.faniyaId,
// //           totalAmount: paymentData.totalAmount,
// //           paymentDate: paymentData.paymentDate ? new Date(paymentData.paymentDate) : new Date(),
// //           notes: paymentData.notes?.trim() || null
// //         }
// //       });

// //       // יצירת חלקי התשלום
// //       const paymentParts = await Promise.all(
// //         paymentData.paymentParts.map((part: any) =>
// //           tx.paymentPart.create({
// //             data: {
// //               paymentId: newPayment.id,
// //               amount: part.amount,
// //               paymentType: part.paymentType,
// //               checkNumber: part.checkNumber?.trim() || null,
// //               checkDueDate: part.checkDueDate ? new Date(part.checkDueDate) : null,
// //               bankReference: part.bankReference?.trim() || null,
// //               notes: part.notes?.trim() || null
// //             }
// //           })
// //         )
// //       );

// //       return {
// //         ...newPayment,
// //         paymentParts
// //       };
// //     });

// //     // עדכון חוב הפאנית
// //     await updateFaniyaDebt(paymentData.faniyaId);

// //     // החזרת התשלום עם כל הפרטים
// //     const completePayment = await prisma.payment.findUnique({
// //       where: { id: payment.id },
// //       include: {
// //         faniya: {
// //           select: { name: true }
// //         },
// //         paymentParts: true
// //       }
// //     });

// //     return NextResponse.json(completePayment);
// //   } catch (error) {
// //     console.error('שגיאה בהוספת תשלום:', error);
// //     return NextResponse.json(
// //       { error: 'שגיאה בהוספת תשלום' },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { adjustFaniyaDebt } from '@/lib/utils';

// // GET - קבלת תשלומים
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const faniyaId = searchParams.get('faniyaId');

//     const whereConditions: any = {};
//     if (faniyaId) {
//       whereConditions.faniyaId = faniyaId;
//     }

//     const payments = await prisma.payment.findMany({
//       where: whereConditions,
//       include: {
//         faniya: {
//           select: {
//             name: true
//           }
//         },
//         paymentParts: true // כלול את חלקי התשלום
//       },
//       orderBy: {
//         paymentDate: 'desc'
//       }
//     });

//     return NextResponse.json(payments);
//   } catch (error) {
//     console.error('שגיאה בטעינת תשלומים:', error);
//     return NextResponse.json(
//       { error: 'שגיאה בטעינת נתונים' },
//       { status: 500 }
//     );
//   }
// }

// // POST - הוספת תשלום מורכב
// export async function POST(request: NextRequest) {
//   try {
//     const paymentData = await request.json();

//     // בדיקות תקינות
//     if (!paymentData.faniyaId || !paymentData.totalAmount || !paymentData.paymentParts) {
//       return NextResponse.json(
//         { error: 'שדות חובה חסרים' },
//         { status: 400 }
//       );
//     }

//     if (paymentData.paymentParts.length === 0) {
//       return NextResponse.json(
//         { error: 'חובה להוסיף לפחות חלק תשלום אחד' },
//         { status: 400 }
//       );
//     }

//     // בדיקה שסכום החלקים תואם לסכום הכולל
//     const partsTotal = paymentData.paymentParts.reduce((sum: number, part: any) => sum + part.amount, 0);
//     if (Math.abs(partsTotal - paymentData.totalAmount) > 0.01) {
//       return NextResponse.json(
//         { error: 'סכום חלקי התשלום לא תואם לסכום הכולל' },
//         { status: 400 }
//       );
//     }

//     // יצירת התשלום עם חלקיו בטרנזקציה
//     const payment = await prisma.$transaction(async (tx) => {
//       // יצירת התשלום הראשי
//       const newPayment = await tx.payment.create({
//         data: {
//           faniyaId: paymentData.faniyaId,
//           totalAmount: paymentData.totalAmount,
//           paymentDate: paymentData.paymentDate ? new Date(paymentData.paymentDate) : new Date(),
//           notes: paymentData.notes?.trim() || null
//         }
//       });

//       // יצירת חלקי התשלום
//       const paymentParts = await Promise.all(
//         paymentData.paymentParts.map((part: any) =>
//           tx.paymentPart.create({
//             data: {
//               paymentId: newPayment.id,
//               amount: part.amount,
//               paymentType: part.paymentType,
//               checkNumber: part.checkNumber?.trim() || null,
//               checkDueDate: part.checkDueDate ? new Date(part.checkDueDate) : null,
//               bankReference: part.bankReference?.trim() || null,
//               notes: part.notes?.trim() || null
//             }
//           })
//         )
//       );

//       return {
//         ...newPayment,
//         paymentParts
//       };
//     });

//     // ✅ הפחת את סכום התשלום מהחוב (עדכון יחסי!)
//     await adjustFaniyaDebt(paymentData.faniyaId, -paymentData.totalAmount);

//     // החזרת התשלום עם כל הפרטים
//     const completePayment = await prisma.payment.findUnique({
//       where: { id: payment.id },
//       include: {
//         faniya: {
//           select: { name: true }
//         },
//         paymentParts: true
//       }
//     });

//     return NextResponse.json(completePayment);
//   } catch (error) {
//     console.error('שגיאה בהוספת תשלום:', error);
//     return NextResponse.json(
//       { error: 'שגיאה בהוספת תשלום' },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addDebtTransaction } from '@/lib/utils';

// GET - קבלת תשלומים
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const faniyaId = searchParams.get('faniyaId');

    const whereConditions: any = {};
    if (faniyaId) {
      whereConditions.faniyaId = faniyaId;
    }

    const payments = await prisma.payment.findMany({
      where: whereConditions,
      include: {
        faniya: {
          select: {
            name: true
          }
        },
        paymentParts: true
      },
      orderBy: {
        paymentDate: 'desc'
      }
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error('שגיאה בטעינת תשלומים:', error);
    return NextResponse.json(
      { error: 'שגיאה בטעינת נתונים' },
      { status: 500 }
    );
  }
}

// POST - הוספת תשלום מורכב
export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();

    if (!paymentData.faniyaId || !paymentData.totalAmount || !paymentData.paymentParts) {
      return NextResponse.json(
        { error: 'שדות חובה חסרים' },
        { status: 400 }
      );
    }

    if (paymentData.paymentParts.length === 0) {
      return NextResponse.json(
        { error: 'חובה להוסיף לפחות חלק תשלום אחד' },
        { status: 400 }
      );
    }

    const partsTotal = paymentData.paymentParts.reduce((sum: number, part: any) => sum + part.amount, 0);
    if (Math.abs(partsTotal - paymentData.totalAmount) > 0.01) {
      return NextResponse.json(
        { error: 'סכום חלקי התשלום לא תואם לסכום הכולל' },
        { status: 400 }
      );
    }

    const payment = await prisma.$transaction(async (tx) => {
      const newPayment = await tx.payment.create({
        data: {
          faniyaId: paymentData.faniyaId,
          totalAmount: paymentData.totalAmount,
          paymentDate: paymentData.paymentDate ? new Date(paymentData.paymentDate) : new Date(),
          notes: paymentData.notes?.trim() || null
        }
      });

      const paymentParts = await Promise.all(
        paymentData.paymentParts.map((part: any) =>
          tx.paymentPart.create({
            data: {
              paymentId: newPayment.id,
              amount: part.amount,
              paymentType: part.paymentType,
              checkNumber: part.checkNumber?.trim() || null,
              checkDueDate: part.checkDueDate ? new Date(part.checkDueDate) : null,
              bankReference: part.bankReference?.trim() || null,
              notes: part.notes?.trim() || null
            }
          })
        )
      );

      return {
        ...newPayment,
        paymentParts
      };
    });

    // ✅ הפחת מהחוב עם פירוט
    await addDebtTransaction(
      paymentData.faniyaId,
      -paymentData.totalAmount,
      `תשלום - ${paymentData.notes || 'ללא תיאור'}`,
      'payment',
      payment.id
    );

    const completePayment = await prisma.payment.findUnique({
      where: { id: payment.id },
      include: {
        faniya: {
          select: { name: true }
        },
        paymentParts: true
      }
    });

    return NextResponse.json(completePayment);
  } catch (error) {
    console.error('שגיאה בהוספת תשלום:', error);
    return NextResponse.json(
      { error: 'שגיאה בהוספת תשלום' },
      { status: 500 }
    );
  }
}