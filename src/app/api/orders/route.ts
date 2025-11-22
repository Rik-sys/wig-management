
// // // // src/app/api/orders/route.ts
// // // import { NextRequest, NextResponse } from 'next/server';
// // // import { prisma } from '@/lib/prisma';
// // // import { updateFaniyaDebt } from '@/lib/utils';

// // // // GET - קבלת הזמנות עם סינון
// // // export async function GET(request: NextRequest) {
// // //   try {
// // //     const { searchParams } = new URL(request.url);
// // //     const faniyaId = searchParams.get('faniyaId');
// // //     const status = searchParams.get('status'); // 'pending' או 'completed'
// // //     const startDate = searchParams.get('startDate');
// // //     const endDate = searchParams.get('endDate');

// // //     const whereConditions: any = {};

// // //     if (faniyaId) {
// // //       whereConditions.faniyaId = faniyaId;
// // //     }

// // //     if (status === 'pending') {
// // //       whereConditions.isCompleted = false;
// // //     } else if (status === 'completed') {
// // //       whereConditions.isCompleted = true;
// // //     }

// // //     if (startDate && endDate) {
// // //       whereConditions.orderDate = {
// // //         gte: new Date(startDate),
// // //         lte: new Date(endDate)
// // //       };
// // //     }

// // //     const orders = await prisma.order.findMany({
// // //       where: whereConditions,
// // //       include: {
// // //         faniya: {
// // //           select: {
// // //             name: true
// // //           }
// // //         }
// // //       },
// // //       orderBy: {
// // //         orderDate: 'desc'
// // //       }
// // //     });

// // //     return NextResponse.json(orders);
// // //   } catch (error) {
// // //     console.error('שגיאה בטעינת הזמנות:', error);
// // //     return NextResponse.json(
// // //       { error: 'שגיאה בטעינת נתונים' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // // POST - יצירת הזמנה חדשה
// // // export async function POST(request: NextRequest) {
// // //   try {
// // //     const orderData = await request.json();

// // //     // בדיקות תקינות
// // //     const requiredFields = ['faniyaId', 'customerName', 'length', 'skinType', 'color'];
// // //     for (const field of requiredFields) {
// // //       if (!orderData[field]) {
// // //         return NextResponse.json(
// // //           { error: `שדה ${field} חובה` },
// // //           { status: 400 }
// // //         );
// // //       }
// // //     }

// // //     // חישוב מחיר
// // //     const skinTypePrices: { [key: string]: number } = {
// // //       'רגיל': 15,
// // //       'מאוורר': 18
// // //     };

// // //     const pricePerCm = skinTypePrices[orderData.skinType] || 15;
// // //     const totalPrice = Math.max(0, (orderData.length * pricePerCm) - (orderData.discount || 0));

// // //     const order = await prisma.order.create({
// // //       data: {
// // //         faniyaId: orderData.faniyaId,
// // //         customerName: orderData.customerName.trim(),
// // //         length: parseInt(orderData.length),
// // //         skinType: orderData.skinType,
// // //         color: orderData.color.trim(),
// // //         highlights: orderData.highlights || 'ללא גוונים',
// // //         babyHairType: orderData.babyHairType?.trim() || null,
// // //         openingTone: orderData.openingTone?.trim() || null,
// // //         pattern: orderData.pattern || 'ייבוש טבעי תנועה גדולה',
// // //         notes: orderData.notes?.trim() || null,
// // //         discount: parseFloat(orderData.discount) || 0,
// // //         totalPrice: totalPrice,
// // //         sentToTrass: orderData.sentToTrass || false,
// // //         trassOperator: orderData.trassOperator || null,
// // //         trassSentDate: orderData.trassSentDate ? new Date(orderData.trassSentDate) : null
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
// // //     await updateFaniyaDebt(orderData.faniyaId);

// // //     return NextResponse.json(order);
// // //   } catch (error) {
// // //     console.error('שגיאה ביצירת הזמנה:', error);
// // //     return NextResponse.json(
// // //       { error: 'שגיאה ביצירת הזמנה' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // // src/app/api/orders/route.ts
// // import { NextRequest, NextResponse } from 'next/server';
// // import { prisma } from '@/lib/prisma';
// // import { updateFaniyaDebt } from '@/lib/utils';

// // // GET - קבלת הזמנות עם סינון
// // export async function GET(request: NextRequest) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const faniyaId = searchParams.get('faniyaId');
// //     const status = searchParams.get('status');
// //     const startDate = searchParams.get('startDate');
// //     const endDate = searchParams.get('endDate');

// //     const whereConditions: any = {};

// //     if (faniyaId) {
// //       whereConditions.faniyaId = faniyaId;
// //     }

// //     if (status === 'pending') {
// //       whereConditions.isCompleted = false;
// //     } else if (status === 'completed') {
// //       whereConditions.isCompleted = true;
// //     }

// //     if (startDate && endDate) {
// //       whereConditions.orderDate = {
// //         gte: new Date(startDate),
// //         lte: new Date(endDate)
// //       };
// //     }

// //     const orders = await prisma.order.findMany({
// //       where: whereConditions,
// //       include: {
// //         faniya: {
// //           select: {
// //             name: true
// //           }
// //         }
// //       },
// //       orderBy: {
// //         orderDate: 'desc'
// //       }
// //     });

// //     return NextResponse.json(orders);
// //   } catch (error) {
// //     console.error('שגיאה בטעינת הזמנות:', error);
// //     return NextResponse.json(
// //       { error: 'שגיאה בטעינת נתונים' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // POST - יצירת הזמנה חדשה
// // export async function POST(request: NextRequest) {
// //   try {
// //     const orderData = await request.json();

// //     // בדיקות תקינות
// //     const requiredFields = ['faniyaId', 'customerName', 'length', 'skinType', 'color'];
// //     for (const field of requiredFields) {
// //       if (!orderData[field]) {
// //         return NextResponse.json(
// //           { error: `שדה ${field} חובה` },
// //           { status: 400 }
// //         );
// //       }
// //     }

// //     // ✅ חישוב מחיר חדש - לפי הטבלה החדשה!
// //     let totalPrice = 0;
    
// //     // אם המחיר כבר חושב בצד הלקוח, פשוט נשתמש בו
// //     if (orderData.totalPrice !== undefined && orderData.totalPrice !== null) {
// //       totalPrice = parseFloat(orderData.totalPrice);
// //     } else {
// //       // אחרת, נחשב אותו בשרת
// //       const length = parseInt(orderData.length);
// //       const discount = parseFloat(orderData.discount) || 0;
      
// //       // טעינת המחירים מהטבלה
// //       const pricingRanges = await prisma.pricingSettings.findMany({
// //         where: {
// //           skinType: 'רגיל'
// //         },
// //         orderBy: {
// //           minLength: 'asc'
// //         }
// //       });
      
// //       // מציאת הטווח המתאים
// //       const range = pricingRanges.find(r => 
// //         r.minLength !== null && 
// //         r.maxLength !== null && 
// //         length >= r.minLength && 
// //         length <= r.maxLength
// //       );
      
// //       if (!range) {
// //         return NextResponse.json(
// //           { error: 'לא נמצא טווח מחיר מתאים לאורך זה' },
// //           { status: 400 }
// //         );
// //       }
      
// //       let price = range.price;
      
// //       // הוספת תוספת מאוורר
// //       if (orderData.skinType === 'מאוורר') {
// //         const fanSupplement = await prisma.pricingSettings.findFirst({
// //           where: {
// //             skinType: 'מאוורר_תוספת'
// //           }
// //         });
        
// //         if (fanSupplement) {
// //           price += fanSupplement.price;
// //         }
// //       }
      
// //       totalPrice = Math.max(0, price - discount);
// //     }

// //     const order = await prisma.order.create({
// //       data: {
// //         faniyaId: orderData.faniyaId,
// //         customerName: orderData.customerName.trim(),
// //         length: parseInt(orderData.length),
// //         skinType: orderData.skinType,
// //         color: orderData.color.trim(),
// //         highlights: orderData.highlights || 'ללא גוונים',
// //         babyHairType: orderData.babyHairType?.trim() || null,
// //         openingTone: orderData.openingTone?.trim() || null,
// //         pattern: orderData.pattern || 'ייבוש טבעי תנועה גדולה',
// //         notes: orderData.notes?.trim() || null,
// //         discount: parseFloat(orderData.discount) || 0,
// //         totalPrice: totalPrice,
// //         sentToTrass: orderData.sentToTrass || false,
// //         trassOperator: orderData.trassOperator || null,
// //         trassSentDate: orderData.trassSentDate ? new Date(orderData.trassSentDate) : null
// //       },
// //       include: {
// //         faniya: {
// //           select: {
// //             name: true
// //           }
// //         }
// //       }
// //     });

// //     // עדכון חוב הפאנית
// //     await updateFaniyaDebt(orderData.faniyaId);

// //     return NextResponse.json(order);
// //   } catch (error) {
// //     console.error('שגיאה ביצירת הזמנה:', error);
// //     return NextResponse.json(
// //       { error: 'שגיאה ביצירת הזמנה' },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { adjustFaniyaDebt } from '@/lib/utils';

// // GET - קבלת הזמנות עם סינון
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const faniyaId = searchParams.get('faniyaId');
//     const status = searchParams.get('status');
//     const startDate = searchParams.get('startDate');
//     const endDate = searchParams.get('endDate');

//     const whereConditions: any = {};

//     if (faniyaId) {
//       whereConditions.faniyaId = faniyaId;
//     }

//     if (status === 'pending') {
//       whereConditions.isCompleted = false;
//     } else if (status === 'completed') {
//       whereConditions.isCompleted = true;
//     }

//     if (startDate && endDate) {
//       whereConditions.orderDate = {
//         gte: new Date(startDate),
//         lte: new Date(endDate)
//       };
//     }

//     const orders = await prisma.order.findMany({
//       where: whereConditions,
//       include: {
//         faniya: {
//           select: {
//             name: true
//           }
//         }
//       },
//       orderBy: {
//         orderDate: 'desc'
//       }
//     });

//     return NextResponse.json(orders);
//   } catch (error) {
//     console.error('שגיאה בטעינת הזמנות:', error);
//     return NextResponse.json(
//       { error: 'שגיאה בטעינת נתונים' },
//       { status: 500 }
//     );
//   }
// }

// // POST - יצירת הזמנה חדשה
// export async function POST(request: NextRequest) {
//   try {
//     const orderData = await request.json();

//     // בדיקות תקינות
//     const requiredFields = ['faniyaId', 'customerName', 'length', 'skinType', 'color'];
//     for (const field of requiredFields) {
//       if (!orderData[field]) {
//         return NextResponse.json(
//           { error: `שדה ${field} חובה` },
//           { status: 400 }
//         );
//       }
//     }

//     // חישוב מחיר
//     let totalPrice = 0;
    
//     // אם המחיר כבר חושב בצד הלקוח, פשוט נשתמש בו
//     if (orderData.totalPrice !== undefined && orderData.totalPrice !== null) {
//       totalPrice = parseFloat(orderData.totalPrice);
//     } else {
//       // אחרת, נחשב אותו בשרת
//       const length = parseInt(orderData.length);
//       const discount = parseFloat(orderData.discount) || 0;
      
//       // טעינת המחירים מהטבלה
//       const pricingRanges = await prisma.pricingSettings.findMany({
//         where: {
//           skinType: 'רגיל'
//         },
//         orderBy: {
//           minLength: 'asc'
//         }
//       });
      
//       // מציאת הטווח המתאים
//       const range = pricingRanges.find(r => 
//         r.minLength !== null && 
//         r.maxLength !== null && 
//         length >= r.minLength && 
//         length <= r.maxLength
//       );
      
//       if (!range) {
//         return NextResponse.json(
//           { error: 'לא נמצא טווח מחיר מתאים לאורך זה' },
//           { status: 400 }
//         );
//       }
      
//       let price = range.price;
      
//       // הוספת תוספת מאוורר
//       if (orderData.skinType === 'מאוורר') {
//         const fanSupplement = await prisma.pricingSettings.findFirst({
//           where: {
//             skinType: 'מאוורר_תוספת'
//           }
//         });
        
//         if (fanSupplement) {
//           price += fanSupplement.price;
//         }
//       }
      
//       totalPrice = Math.max(0, price - discount);
//     }

//     const order = await prisma.order.create({
//       data: {
//         faniyaId: orderData.faniyaId,
//         customerName: orderData.customerName.trim(),
//         length: parseInt(orderData.length),
//         skinType: orderData.skinType,
//         color: orderData.color.trim(),
//         highlights: orderData.highlights || 'ללא גוונים',
//         babyHairType: orderData.babyHairType?.trim() || null,
//         openingTone: orderData.openingTone?.trim() || null,
//         pattern: orderData.pattern || 'ייבוש טבעי תנועה גדולה',
//         notes: orderData.notes?.trim() || null,
//         discount: parseFloat(orderData.discount) || 0,
//         totalPrice: totalPrice,
//         sentToTrass: orderData.sentToTrass || false,
//         trassOperator: orderData.trassOperator || null,
//         trassSentDate: orderData.trassSentDate ? new Date(orderData.trassSentDate) : null
//       },
//       include: {
//         faniya: {
//           select: {
//             name: true
//           }
//         }
//       }
//     });

//     // ✅ הוסף את מחיר ההזמנה לחוב (עדכון יחסי!)
//     await adjustFaniyaDebt(orderData.faniyaId, totalPrice);

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('שגיאה ביצירת הזמנה:', error);
//     return NextResponse.json(
//       { error: 'שגיאה ביצירת הזמנה' },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - קבלת הזמנות עם סינון
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const faniyaId = searchParams.get('faniyaId');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const whereConditions: any = {};

    if (faniyaId) {
      whereConditions.faniyaId = faniyaId;
    }

    if (status === 'pending') {
      whereConditions.isCompleted = false;
    } else if (status === 'completed') {
      whereConditions.isCompleted = true;
    }

    if (startDate && endDate) {
      whereConditions.orderDate = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const orders = await prisma.order.findMany({
      where: whereConditions,
      include: {
        faniya: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        orderDate: 'desc'
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('שגיאה בטעינת הזמנות:', error);
    return NextResponse.json(
      { error: 'שגיאה בטעינת נתונים' },
      { status: 500 }
    );
  }
}

// POST - יצירת הזמנה חדשה
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // בדיקות תקינות
    const requiredFields = ['faniyaId', 'customerName', 'length', 'skinType', 'color'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json(
          { error: `שדה ${field} חובה` },
          { status: 400 }
        );
      }
    }

    // חישוב מחיר
    let totalPrice = 0;
    
    if (orderData.totalPrice !== undefined && orderData.totalPrice !== null) {
      totalPrice = parseFloat(orderData.totalPrice);
    } else {
      const length = parseInt(orderData.length);
      const discount = parseFloat(orderData.discount) || 0;
      
      const pricingRanges = await prisma.pricingSettings.findMany({
        where: {
          skinType: 'רגיל'
        },
        orderBy: {
          minLength: 'asc'
        }
      });
      
      const range = pricingRanges.find(r => 
        r.minLength !== null && 
        r.maxLength !== null && 
        length >= r.minLength && 
        length <= r.maxLength
      );
      
      if (!range) {
        return NextResponse.json(
          { error: 'לא נמצא טווח מחיר מתאים לאורך זה' },
          { status: 400 }
        );
      }
      
      let price = range.price;
      
      if (orderData.skinType === 'מאוורר') {
        const fanSupplement = await prisma.pricingSettings.findFirst({
          where: {
            skinType: 'מאוורר_תוספת'
          }
        });
        
        if (fanSupplement) {
          price += fanSupplement.price;
        }
      }
      
      totalPrice = Math.max(0, price - discount);
    }

    const order = await prisma.order.create({
      data: {
        faniyaId: orderData.faniyaId,
        customerName: orderData.customerName.trim(),
        length: parseInt(orderData.length),
        skinType: orderData.skinType,
        color: orderData.color.trim(),
        highlights: orderData.highlights || '',
        babyHairType: orderData.babyHairType?.trim() || null,
        openingTone: orderData.openingTone?.trim() || null,
        pattern: orderData.pattern || 'ייבוש טבעי תנועה גדולה',
        customPattern: orderData.customPattern?.trim() || null,
        notes: orderData.notes?.trim() || null,
        discount: parseFloat(orderData.discount) || 0,
        totalPrice: totalPrice,
        sentToTrass: orderData.sentToTrass || false,
        trassOperator: orderData.trassOperator || null,
        trassSentDate: orderData.trassSentDate ? new Date(orderData.trassSentDate) : null,
        debtAdded: false  // ✅ החוב עדיין לא התווסף!
      },
      include: {
        faniya: {
          select: {
            name: true
          }
        }
      }
    });

    // ✅ לא מוסיפים חוב כאן! רק כשההזמנה נמסרת!

    return NextResponse.json(order);
  } catch (error) {
    console.error('שגיאה ביצירת הזמנה:', error);
    return NextResponse.json(
      { error: 'שגיאה ביצירת הזמנה' },
      { status: 500 }
    );
  }
}