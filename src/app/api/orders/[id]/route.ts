// // import { NextRequest, NextResponse } from 'next/server';
// // import { prisma } from '@/lib/prisma';
// // import { updateFaniyaDebt } from '@/lib/utils';

// // interface Context {
// //   params: { id: string }
// // }

// // // GET - קבלת הזמנה ספציפית
// // export async function GET(request: NextRequest, { params }: Context) {
// //   try {
// //     const order = await prisma.order.findUnique({
// //       where: {
// //         id: params.id
// //       },
// //       include: {
// //         faniya: {
// //           select: {
// //             name: true
// //           }
// //         }
// //       }
// //     });

// //     if (!order) {
// //       return NextResponse.json(
// //         { error: 'הזמנה לא נמצאה' },
// //         { status: 404 }
// //       );
// //     }

// //     return NextResponse.json(order);
// //   } catch (error) {
// //     console.error('שגיאה בטעינת הזמנה:', error);
// //     return NextResponse.json(
// //       { error: 'שגיאה בטעינת נתונים' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // PUT - עדכון הזמנה
// // export async function PUT(request: NextRequest, { params }: Context) {
// //   try {
// //     const updateData = await request.json();

// //     // אם מעדכנים תאריך מסירה - לסמן כמוכן
// //     if (updateData.deliveryDate) {
// //       updateData.isCompleted = true;
// //       updateData.deliveryDate = new Date(updateData.deliveryDate);
// //     }

// //     // אם מבטלים תאריך מסירה - לסמן כלא מוכן
// //     if (updateData.deliveryDate === null) {
// //       updateData.isCompleted = false;
// //     }

// //     const order = await prisma.order.update({
// //       where: {
// //         id: params.id
// //       },
// //       data: updateData,
// //       include: {
// //         faniya: {
// //           select: {
// //             name: true
// //           }
// //         }
// //       }
// //     });

// //     return NextResponse.json(order);
// //   } catch (error) {
// //     console.error('שגיאה בעדכון הזמנה:', error);
// //     return NextResponse.json(
// //       { error: 'שגיאה בעדכון הזמנה' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // DELETE - מחיקת הזמנה
// // export async function DELETE(request: NextRequest, { params }: Context) {
// //   try {
// //     const order = await prisma.order.delete({
// //       where: {
// //         id: params.id
// //       }
// //     });

// //     // עדכון חוב הפאנית
// //     await updateFaniyaDebt(order.faniyaId);

// //     return NextResponse.json({ message: 'הזמנה נמחקה בהצלחה' });
// //   } catch (error) {
// //     console.error('שגיאה במחיקת הזמנה:', error);
// //     return NextResponse.json(
// //       { error: 'שגיאה במחיקת הזמנה' },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { updateFaniyaDebt } from '@/lib/utils';

// interface RouteParams {
//   params: Promise<{ id: string }>;
// }

// // GET - קבלת הזמנה ספציפית
// export async function GET(request: NextRequest, { params }: RouteParams) {
//   try {
//     const { id } = await params;
    
//     const order = await prisma.order.findUnique({
//       where: {
//         id: id
//       },
//       include: {
//         faniya: {
//           select: {
//             name: true
//           }
//         }
//       }
//     });

//     if (!order) {
//       return NextResponse.json(
//         { error: 'הזמנה לא נמצאה' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('שגיאה בטעינת הזמנה:', error);
//     return NextResponse.json(
//       { error: 'שגיאה בטעינת נתונים' },
//       { status: 500 }
//     );
//   }
// }

// // PUT - עדכון הזמנה
// export async function PUT(request: NextRequest, { params }: RouteParams) {
//   try {
//     const { id } = await params;
//     const updateData = await request.json();

//     if (updateData.deliveryDate) {
//       updateData.isCompleted = true;
//       updateData.deliveryDate = new Date(updateData.deliveryDate);
//     }

//     if (updateData.deliveryDate === null) {
//       updateData.isCompleted = false;
//     }

//     const order = await prisma.order.update({
//       where: {
//         id: id
//       },
//       data: updateData,
//       include: {
//         faniya: {
//           select: {
//             name: true
//           }
//         }
//       }
//     });

//     await updateFaniyaDebt(order.faniyaId);

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('שגיאה בעדכון הזמנה:', error);
//     return NextResponse.json(
//       { error: 'שגיאה בעדכון הזמנה' },
//       { status: 500 }
//     );
//   }
// }

// // DELETE - מחיקת הזמנה
// export async function DELETE(request: NextRequest, { params }: RouteParams) {
//   try {
//     const { id } = await params;
    
//     const order = await prisma.order.delete({
//       where: {
//         id: id
//       }
//     });

//     await updateFaniyaDebt(order.faniyaId);

//     return NextResponse.json({ message: 'הזמנה נמחקה בהצלחה' });
//   } catch (error) {
//     console.error('שגיאה במחיקת הזמנה:', error);
//     return NextResponse.json(
//       { error: 'שגיאה במחיקת הזמנה' },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adjustFaniyaDebt } from '@/lib/utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - קבלת הזמנה ספציפית
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    const order = await prisma.order.findUnique({
      where: {
        id: id
      },
      include: {
        faniya: {
          select: {
            name: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'הזמנה לא נמצאה' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('שגיאה בטעינת הזמנה:', error);
    return NextResponse.json(
      { error: 'שגיאה בטעינת נתונים' },
      { status: 500 }
    );
  }
}

// PUT - עדכון הזמנה
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const updateData = await request.json();

    // ✅ קבל את ההזמנה הישנה לפני העדכון
    const oldOrder = await prisma.order.findUnique({
      where: { id }
    });

    if (!oldOrder) {
      return NextResponse.json(
        { error: 'הזמנה לא נמצאה' },
        { status: 404 }
      );
    }

    // אם מעדכנים תאריך מסירה - לסמן כמוכן
    if (updateData.deliveryDate) {
      updateData.isCompleted = true;
      updateData.deliveryDate = new Date(updateData.deliveryDate);
    }

    // אם מבטלים תאריך מסירה - לסמן כלא מוכן
    if (updateData.deliveryDate === null) {
      updateData.isCompleted = false;
    }

    // המרת תאריך טרסים אם קיים
    if (updateData.trassSentDate) {
      updateData.trassSentDate = new Date(updateData.trassSentDate);
    }

    // המרת שדות מספריים
    if (updateData.length !== undefined) {
      updateData.length = parseInt(updateData.length);
    }
    if (updateData.discount !== undefined) {
      updateData.discount = parseFloat(updateData.discount);
    }
    if (updateData.totalPrice !== undefined) {
      updateData.totalPrice = parseFloat(updateData.totalPrice);
    }

    const order = await prisma.order.update({
      where: {
        id: id
      },
      data: updateData,
      include: {
        faniya: {
          select: {
            name: true
          }
        }
      }
    });

    // ✅ עדכן את החוב לפי ההפרש במחיר
    const priceDifference = order.totalPrice - oldOrder.totalPrice;
    if (priceDifference !== 0) {
      await adjustFaniyaDebt(order.faniyaId, priceDifference);
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('שגיאה בעדכון הזמנה:', error);
    console.error('Error details:', error);
    return NextResponse.json(
      { error: 'שגיאה בעדכון הזמנה', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE - מחיקת הזמנה
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    // ✅ קבל את ההזמנה לפני המחיקה כדי לדעת את המחיר
    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'הזמנה לא נמצאה' },
        { status: 404 }
      );
    }

    // מחק את ההזמנה
    await prisma.order.delete({
      where: {
        id: id
      }
    });

    // ✅ הפחת את מחיר ההזמנה מהחוב (עדכון יחסי!)
    await adjustFaniyaDebt(order.faniyaId, -order.totalPrice);

    return NextResponse.json({ message: 'הזמנה נמחקה בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת הזמנה:', error);
    return NextResponse.json(
      { error: 'שגיאה במחיקת הזמנה' },
      { status: 500 }
    );
  }
}