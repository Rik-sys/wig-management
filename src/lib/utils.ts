// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// export function formatCurrency(amount: number): string {
//   return `₪${amount.toFixed(2)}`
// }

// export function formatDate(date: Date): string {
//   return new Intl.DateTimeFormat('he-IL').format(date)
// }

// import { prisma } from '@/lib/prisma';

// // עדכון חוב פאנית
// export async function updateFaniyaDebt(faniyaId: string) {
//   try {
//     // חישוב סה"כ הזמנות מוכנות
//     const totalOrders = await prisma.order.aggregate({
//       where: {
//         faniyaId: faniyaId,
//         isCompleted: true
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
//         amount: true
//       }
//     });

//     const totalDebt = (totalOrders._sum.totalPrice || 0) - (totalPayments._sum.amount || 0);

//     // עדכון הפאנית
//     await prisma.faniya.update({
//       where: {
//         id: faniyaId
//       },
//       data: {
//         totalDebt: Math.max(0, totalDebt),
//         totalPayments: totalPayments._sum.amount || 0
//       }
//     });

//   } catch (error) {
//     console.error('שגיאה בעדכון חוב פאנית:', error);
//   }
// }

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

// // עדכון חוב פאנית
// export async function updateFaniyaDebt(faniyaId: string) {
//   try {
//     // חישוב סה"כ הזמנות מוכנות
//     const totalOrders = await prisma.order.aggregate({
//       where: {
//         faniyaId: faniyaId,
//         isCompleted: true
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
//         amount: true
//       }
//     });

//     const totalDebt = (totalOrders._sum.totalPrice || 0) - (totalPayments._sum.amount || 0);

//     // עדכון הפאנית
//     await prisma.faniya.update({
//       where: {
//         id: faniyaId
//       },
//       data: {
//         totalDebt: Math.max(0, totalDebt),
//         totalPayments: totalPayments._sum.amount || 0
//       }
//     });

//   } catch (error) {
//     console.error('שגיאה בעדכון חוב פאנית:', error);
//   }
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

// עדכון חוב פאנית
export async function updateFaniyaDebt(faniyaId: string) {
  try {
    // חישוב סה"כ כל ההזמנות (גם ממתינות וגם מוכנות)
    const totalOrders = await prisma.order.aggregate({
      where: {
        faniyaId: faniyaId,
        // הסר את התנאי isCompleted: true כדי לספור הכל
      },
      _sum: {
        totalPrice: true
      }
    });

    // חישוב סה"כ תשלומים - עכשיו נשתמש בtotalAmount
    const totalPayments = await prisma.payment.aggregate({
      where: {
        faniyaId: faniyaId
      },
      _sum: {
        totalAmount: true
      }
    });

    const totalDebt = (totalOrders._sum.totalPrice || 0) - (totalPayments._sum.totalAmount || 0);

    // עדכון הפאנית
    await prisma.faniya.update({
      where: {
        id: faniyaId
      },
      data: {
        totalDebt: Math.max(0, totalDebt),
        totalPayments: totalPayments._sum.totalAmount || 0
      }
    });

  } catch (error) {
    console.error('שגיאה בעדכון חוב פאנית:', error);
  }
}