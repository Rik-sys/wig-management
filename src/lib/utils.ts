// // // import { clsx, type ClassValue } from "clsx"
// // // import { twMerge } from "tailwind-merge"

// // // export function cn(...inputs: ClassValue[]) {
// // //   return twMerge(clsx(inputs))
// // // }
// // // import { type ClassValue, clsx } from "clsx"
// // // import { twMerge } from "tailwind-merge"

// // // export function cn(...inputs: ClassValue[]) {
// // //   return twMerge(clsx(inputs))
// // // }

// // // export function formatCurrency(amount: number): string {
// // //   return `₪${amount.toFixed(2)}`
// // // }

// // // export function formatDate(date: Date): string {
// // //   return new Intl.DateTimeFormat('he-IL').format(date)
// // // }

// // // import { prisma } from '@/lib/prisma';

// // // // עדכון חוב פאנית
// // // export async function updateFaniyaDebt(faniyaId: string) {
// // //   try {
// // //     // חישוב סה"כ הזמנות מוכנות
// // //     const totalOrders = await prisma.order.aggregate({
// // //       where: {
// // //         faniyaId: faniyaId,
// // //         isCompleted: true
// // //       },
// // //       _sum: {
// // //         totalPrice: true
// // //       }
// // //     });

// // //     // חישוב סה"כ תשלומים
// // //     const totalPayments = await prisma.payment.aggregate({
// // //       where: {
// // //         faniyaId: faniyaId
// // //       },
// // //       _sum: {
// // //         amount: true
// // //       }
// // //     });

// // //     const totalDebt = (totalOrders._sum.totalPrice || 0) - (totalPayments._sum.amount || 0);

// // //     // עדכון הפאנית
// // //     await prisma.faniya.update({
// // //       where: {
// // //         id: faniyaId
// // //       },
// // //       data: {
// // //         totalDebt: Math.max(0, totalDebt),
// // //         totalPayments: totalPayments._sum.amount || 0
// // //       }
// // //     });

// // //   } catch (error) {
// // //     console.error('שגיאה בעדכון חוב פאנית:', error);
// // //   }
// // // }

// // // import { type ClassValue, clsx } from "clsx"
// // // import { twMerge } from "tailwind-merge"
// // // import { prisma } from '@/lib/prisma'

// // // export function cn(...inputs: ClassValue[]) {
// // //   return twMerge(clsx(inputs))
// // // }

// // // export function formatCurrency(amount: number): string {
// // //   return `₪${amount.toFixed(2)}`
// // // }

// // // export function formatDate(date: Date): string {
// // //   return new Intl.DateTimeFormat('he-IL').format(date)
// // // }

// // // // עדכון חוב פאנית
// // // export async function updateFaniyaDebt(faniyaId: string) {
// // //   try {
// // //     // חישוב סה"כ הזמנות מוכנות
// // //     const totalOrders = await prisma.order.aggregate({
// // //       where: {
// // //         faniyaId: faniyaId,
// // //         isCompleted: true
// // //       },
// // //       _sum: {
// // //         totalPrice: true
// // //       }
// // //     });

// // //     // חישוב סה"כ תשלומים
// // //     const totalPayments = await prisma.payment.aggregate({
// // //       where: {
// // //         faniyaId: faniyaId
// // //       },
// // //       _sum: {
// // //         amount: true
// // //       }
// // //     });

// // //     const totalDebt = (totalOrders._sum.totalPrice || 0) - (totalPayments._sum.amount || 0);

// // //     // עדכון הפאנית
// // //     await prisma.faniya.update({
// // //       where: {
// // //         id: faniyaId
// // //       },
// // //       data: {
// // //         totalDebt: Math.max(0, totalDebt),
// // //         totalPayments: totalPayments._sum.amount || 0
// // //       }
// // //     });

// // //   } catch (error) {
// // //     console.error('שגיאה בעדכון חוב פאנית:', error);
// // //   }
// // // }
// // import { type ClassValue, clsx } from "clsx"
// // import { twMerge } from "tailwind-merge"
// // import { prisma } from '@/lib/prisma'

// // export function cn(...inputs: ClassValue[]) {
// //   return twMerge(clsx(inputs))
// // }

// // export function formatCurrency(amount: number): string {
// //   return `₪${amount.toFixed(2)}`
// // }

// // export function formatDate(date: Date): string {
// //   return new Intl.DateTimeFormat('he-IL').format(date)
// // }

// // // // עדכון חוב פאנית
// // // export async function updateFaniyaDebt(faniyaId: string) {
// // //   try {
// // //     // חישוב סה"כ כל ההזמנות (גם ממתינות וגם מוכנות)
// // //     const totalOrders = await prisma.order.aggregate({
// // //       where: {
// // //         faniyaId: faniyaId,
// // //         // הסר את התנאי isCompleted: true כדי לספור הכל
// // //       },
// // //       _sum: {
// // //         totalPrice: true
// // //       }
// // //     });

// // //     // חישוב סה"כ תשלומים - עכשיו נשתמש בtotalAmount
// // //     const totalPayments = await prisma.payment.aggregate({
// // //       where: {
// // //         faniyaId: faniyaId
// // //       },
// // //       _sum: {
// // //         totalAmount: true
// // //       }
// // //     });

// // //     const totalDebt = (totalOrders._sum.totalPrice || 0) - (totalPayments._sum.totalAmount || 0);

// // //     // עדכון הפאנית
// // //     await prisma.faniya.update({
// // //       where: {
// // //         id: faniyaId
// // //       },
// // //       data: {
// // //         totalDebt: Math.max(0, totalDebt),
// // //         totalPayments: totalPayments._sum.totalAmount || 0
// // //       }
// // //     });

// // //   } catch (error) {
// // //     console.error('שגיאה בעדכון חוב פאנית:', error);
// // //   }
// // // }
// // export async function updateFaniyaDebt(faniyaId: string) {
// //   try {
// //     // קבלת החוב הנוכחי
// //     const faniya = await prisma.faniya.findUnique({
// //       where: { id: faniyaId }
// //     });

// //     if (!faniya) {
// //       console.error('פאנית לא נמצאה');
// //       return;
// //     }

// //     // חישוב סה"כ כל ההזמנות
// //     const totalOrders = await prisma.order.aggregate({
// //       where: {
// //         faniyaId: faniyaId,
// //       },
// //       _sum: {
// //         totalPrice: true
// //       }
// //     });

// //     // חישוב סה"כ תשלומים
// //     const totalPayments = await prisma.payment.aggregate({
// //       where: {
// //         faniyaId: faniyaId
// //       },
// //       _sum: {
// //         totalAmount: true
// //       }
// //     });

// //     // חישוב החוב החדש
// //     const calculatedDebt = (totalOrders._sum.totalPrice || 0) - (totalPayments._sum.totalAmount || 0);

// //     // עדכון הפאנית
// //     await prisma.faniya.update({
// //       where: {
// //         id: faniyaId
// //       },
// //       data: {
// //         totalDebt: Math.max(0, calculatedDebt),
// //         totalPayments: totalPayments._sum.totalAmount || 0
// //       }
// //     });

// //   } catch (error) {
// //     console.error('שגיאה בעדכון חוב פאנית:', error);
// //   }
// // }
// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"
// import { prisma } from '@/lib/prisma'

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// export function formatCurrency(amount: number): string {
//   return `₪${amount.toFixed(2)}`
// }

// export function formatDate(date: Date): string {
//   return new Intl.DateTimeFormat('he-IL').format(date)
// }

// // ✅ עדכון חוב פאנית - חישוב מחדש מאפס (רק לשימוש פנימי)
// export async function recalculateFaniyaDebt(faniyaId: string) {
//   try {
//     // חישוב סה"כ כל ההזמנות
//     const totalOrders = await prisma.order.aggregate({
//       where: {
//         faniyaId: faniyaId,
//       },
//       _sum: {
//         totalPrice: true
//       }
//     });

//     // חישוב סה"כ תשלומים
//     const totalPayments = await prisma.payment.aggregate({
//       where: {
//         faniyaId: faniyaId
//       },
//       _sum: {
//         totalAmount: true
//       }
//     });

//     const totalDebt = (totalOrders._sum.totalPrice || 0) - (totalPayments._sum.totalAmount || 0);

//     // עדכון הפאנית
//     await prisma.faniya.update({
//       where: {
//         id: faniyaId
//       },
//       data: {
//         totalDebt: Math.max(0, totalDebt),
//         totalPayments: totalPayments._sum.totalAmount || 0
//       }
//     });

//   } catch (error) {
//     console.error('שגיאה בעדכון חוב פאנית:', error);
//   }
// }

// // ✅ הוספה/הפחתה יחסית לחוב (שומר עדכון ידני!)
// export async function adjustFaniyaDebt(faniyaId: string, adjustment: number) {
//   try {
//     const faniya = await prisma.faniya.findUnique({
//       where: { id: faniyaId }
//     });

//     if (!faniya) {
//       console.error('פאנית לא נמצאה');
//       return;
//     }

//     // עדכון יחסי - הוספה/הפחתה מהחוב הנוכחי
//     const newDebt = Math.max(0, faniya.totalDebt + adjustment);

//     await prisma.faniya.update({
//       where: {
//         id: faniyaId
//       },
//       data: {
//         totalDebt: newDebt
//       }
//     });

//   } catch (error) {
//     console.error('שגיאה בעדכון חוב פאנית:', error);
//   }
// }

// // ✅ עדכון חוב פאנית - לשימוש כללי (משתמש ב-adjustFaniyaDebt)
// export async function updateFaniyaDebt(faniyaId: string) {
//   // כרגע מחשב מחדש - אפשר לשנות לעדכון יחסי אם צריך
//   await recalculateFaniyaDebt(faniyaId);
// }
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from '@/lib/prisma'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return `₪${amount.toFixed(2)}`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('he-IL').format(date)
}

// ✅ פונקציה חדשה - הוספת טרנזקציית חוב עם פירוט
export async function addDebtTransaction(
  faniyaId: string, 
  amount: number, 
  description: string, 
  type: 'order' | 'payment' | 'manual',
  relatedId?: string
) {
  try {
    // יצירת הטרנזקציה
    await prisma.debtTransaction.create({
      data: {
        faniyaId,
        amount,
        description,
        type,
        relatedId
      }
    });

    // עדכון החוב הכולל של הפאנית
    const faniya = await prisma.faniya.findUnique({
      where: { id: faniyaId }
    });

    if (!faniya) {
      console.error('פאנית לא נמצאה');
      return;
    }

    await prisma.faniya.update({
      where: { id: faniyaId },
      data: {
        totalDebt: Math.max(0, faniya.totalDebt + amount)
      }
    });

  } catch (error) {
    console.error('שגיאה בהוספת טרנזקציית חוב:', error);
    throw error;
  }
}

// ✅ קבלת היסטוריית חוב של פאנית
export async function getDebtHistory(faniyaId: string) {
  try {
    return await prisma.debtTransaction.findMany({
      where: { faniyaId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('שגיאה בקבלת היסטוריית חוב:', error);
    return [];
  }
}

// פונקציות ישנות - לתאימות אחורה
export async function adjustFaniyaDebt(faniyaId: string, adjustment: number) {
  try {
    const faniya = await prisma.faniya.findUnique({
      where: { id: faniyaId }
    });

    if (!faniya) {
      console.error('פאנית לא נמצאה');
      return;
    }

    const newDebt = Math.max(0, faniya.totalDebt + adjustment);

    await prisma.faniya.update({
      where: {
        id: faniyaId
      },
      data: {
        totalDebt: newDebt
      }
    });

  } catch (error) {
    console.error('שגיאה בעדכון חוב פאנית:', error);
  }
}

export async function updateFaniyaDebt(faniyaId: string) {
  // לא עושה כלום - שומר לתאימות אחורה
  console.log('updateFaniyaDebt called - no action taken');
}