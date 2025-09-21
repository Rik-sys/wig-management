// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { updateFaniyaDebt } from '@/lib/utils';

// interface Context {
//   params: { id: string }
// }

// // GET - קבלת הזמנה ספציפית
// export async function GET(request: NextRequest, { params }: Context) {
//   try {
//     const order = await prisma.order.findUnique({
//       where: {
//         id: params.id
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
// export async function PUT(request: NextRequest, { params }: Context) {
//   try {
//     const updateData = await request.json();

//     // אם מעדכנים תאריך מסירה - לסמן כמוכן
//     if (updateData.deliveryDate) {
//       updateData.isCompleted = true;
//       updateData.deliveryDate = new Date(updateData.deliveryDate);
//     }

//     // אם מבטלים תאריך מסירה - לסמן כלא מוכן
//     if (updateData.deliveryDate === null) {
//       updateData.isCompleted = false;
//     }

//     const order = await prisma.order.update({
//       where: {
//         id: params.id
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
// export async function DELETE(request: NextRequest, { params }: Context) {
//   try {
//     const order = await prisma.order.delete({
//       where: {
//         id: params.id
//       }
//     });

//     // עדכון חוב הפאנית
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
import { updateFaniyaDebt } from '@/lib/utils';

// GET - קבלת הזמנה ספציפית
export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: params.id
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
export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const updateData = await request.json();

    // אם מעדכנים תאריך מסירה - לסמן כמוכן
    if (updateData.deliveryDate) {
      updateData.isCompleted = true;
      updateData.deliveryDate = new Date(updateData.deliveryDate);
    }

    // אם מבטלים תאריך מסירה - לסמן כלא מוכן
    if (updateData.deliveryDate === null) {
      updateData.isCompleted = false;
    }

    const order = await prisma.order.update({
      where: {
        id: params.id
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

    // עדכון חוב הפאנית
    await updateFaniyaDebt(order.faniyaId);

    return NextResponse.json(order);
  } catch (error) {
    console.error('שגיאה בעדכון הזמנה:', error);
    return NextResponse.json(
      { error: 'שגיאה בעדכון הזמנה' },
      { status: 500 }
    );
  }
}

// DELETE - מחיקת הזמנה
export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.delete({
      where: {
        id: params.id
      }
    });

    // עדכון חוב הפאנית
    await updateFaniyaDebt(order.faniyaId);

    return NextResponse.json({ message: 'הזמנה נמחקה בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת הזמנה:', error);
    return NextResponse.json(
      { error: 'שגיאה במחיקת הזמנה' },
      { status: 500 }
    );
  }
}