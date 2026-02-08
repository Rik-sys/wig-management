
// 'use client';

// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { FileText, Download, Calendar } from 'lucide-react';

// interface Order {
//   id: string;
//   orderDate: string;
//   customerName: string;
//   totalPrice: number;
//   isCompleted: boolean;
//   deliveryDate?: string;
// }

// interface Payment {
//   id: string;
//   totalAmount?: number;
//   amount?: number; // תאימות לאחור
//   paymentDate: string;
// }

// interface MonthlyReportsProps {
//   faniyaId: string;
//   faniyaName: string;
// }

// interface MonthlyData {
//   month: number;
//   year: number;
//   orders: Order[];
//   payments: Payment[];
//   totalRevenue: number;
//   totalPayments: number;
//   previousMonthDebt: number;
//   currentMonthDebt: number;
// }

// const HEBREW_MONTHS = [
//   'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
//   'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
// ];

// export function MonthlyReports({ faniyaId, faniyaName }: MonthlyReportsProps) {
//   const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
//   const [monthlyData, setMonthlyData] = useState<MonthlyData | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (selectedYear && selectedMonth) {
//       loadMonthlyData(selectedYear, selectedMonth);
//     }
//   }, [selectedYear, selectedMonth, faniyaId]);

//   const loadMonthlyData = async (year: number, month: number) => {
//     setLoading(true);
//     try {
//       // טעינת הזמנות לחודש הנבחר
//       const ordersResponse = await fetch(`/api/orders?faniyaId=${faniyaId}`);
//       const allOrders: Order[] = ordersResponse.ok ? await ordersResponse.json() : [];
      
//       // סינון הזמנות לחודש הנבחר (רק הזמנות שנמסרו)
//       const monthOrders = allOrders.filter(order => {
//         if (!order.deliveryDate) return false;
//         const deliveryDate = new Date(order.deliveryDate);
//         return deliveryDate.getFullYear() === year && deliveryDate.getMonth() + 1 === month;
//       });

//       // טעינת תשלומים לחודש הנבחר
//       const paymentsResponse = await fetch(`/api/payments?faniyaId=${faniyaId}`);
//       const allPayments: Payment[] = paymentsResponse.ok ? await paymentsResponse.json() : [];
      
//       // סינון תשלומים לחודש הנבחר
//       const monthPayments = allPayments.filter(payment => {
//         const paymentDate = new Date(payment.paymentDate);
//         return paymentDate.getFullYear() === year && paymentDate.getMonth() + 1 === month;
//       });

//       // חישוב סה"כ הכנסות החודש
//       const totalRevenue = monthOrders.reduce((sum, order) => sum + order.totalPrice, 0);
      
//       // חישוב סה"כ תשלומים החודש
//       const totalPayments = monthPayments.reduce((sum, payment) => 
//         sum + (payment.totalAmount || payment.amount || 0), 0);

//       // חישוב חוב מהחודש הקודם
//       const previousMonthDebt = await calculatePreviousMonthDebt(year, month);
      
//       // חישוב חוב נוכחי
//       const currentMonthDebt = previousMonthDebt + totalRevenue - totalPayments;

//       setMonthlyData({
//         month,
//         year,
//         orders: monthOrders,
//         payments: monthPayments,
//         totalRevenue,
//         totalPayments,
//         previousMonthDebt,
//         currentMonthDebt
//       });

//     } catch (error) {
//       console.error('שגיאה בטעינת נתונים חודשיים:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculatePreviousMonthDebt = async (year: number, month: number): Promise<number> => {
//     try {
//       // חישוב החוב עד סוף החודש הקודם
//       let prevYear = year;
//       let prevMonth = month - 1;
      
//       if (prevMonth === 0) {
//         prevMonth = 12;
//         prevYear = year - 1;
//       }

//       // טעינת כל ההזמנות והתשלומים עד סוף החודש הקודם
//       const [ordersRes, paymentsRes] = await Promise.all([
//         fetch(`/api/orders?faniyaId=${faniyaId}`),
//         fetch(`/api/payments?faniyaId=${faniyaId}`)
//       ]);

//       const allOrders: Order[] = ordersRes.ok ? await ordersRes.json() : [];
//       const allPayments: Payment[] = paymentsRes.ok ? await paymentsRes.json() : [];

//       // סינון הזמנות שנמסרו עד סוף החודש הקודם
//       const ordersUntilPrevMonth = allOrders.filter(order => {
//         if (!order.deliveryDate) return false;
//         const deliveryDate = new Date(order.deliveryDate);
//         const orderDate = new Date(prevYear, prevMonth - 1, 31, 23, 59, 59);
//         return deliveryDate <= orderDate;
//       });

//       // סינון תשלומים עד סוף החודש הקודם
//       const paymentsUntilPrevMonth = allPayments.filter(payment => {
//         const paymentDate = new Date(payment.paymentDate);
//         const endOfPrevMonth = new Date(prevYear, prevMonth - 1, 31, 23, 59, 59);
//         return paymentDate <= endOfPrevMonth;
//       });

//       const totalOrdersUntilPrevMonth = ordersUntilPrevMonth.reduce((sum, order) => sum + order.totalPrice, 0);
//       const totalPaymentsUntilPrevMonth = paymentsUntilPrevMonth.reduce((sum, payment) => 
//         sum + (payment.totalAmount || payment.amount || 0), 0);

//       return Math.max(0, totalOrdersUntilPrevMonth - totalPaymentsUntilPrevMonth);
//     } catch (error) {
//       console.error('שגיאה בחישוב חוב חודש קודם:', error);
//       return 0;
//     }
//   };

//   const generateReport = () => {
//     if (!monthlyData) return;

//     const reportContent = `
//       <!DOCTYPE html>
//       <html dir="rtl" lang="he">
//       <head>
//         <meta charset="UTF-8">
//         <style>
//           body { 
//             font-family: Arial, sans-serif; 
//             direction: rtl; 
//             text-align: right;
//             padding: 40px;
//             line-height: 1.8;
//             font-size: 14px;
//           }
//           .header {
//             text-align: center;
//             margin-bottom: 40px;
//             border-bottom: 3px solid #333;
//             padding-bottom: 20px;
//           }
//           .faniya-name {
//             font-size: 28px;
//             font-weight: bold;
//             margin-bottom: 10px;
//           }
//           .month-year {
//             font-size: 20px;
//             color: #666;
//           }
//           .section {
//             margin: 30px 0;
//             padding: 20px;
//             background: #f9f9f9;
//             border-radius: 8px;
//           }
//           .section-title {
//             font-size: 18px;
//             font-weight: bold;
//             color: #333;
//             margin-bottom: 15px;
//             padding-bottom: 8px;
//             border-bottom: 2px solid #ddd;
//           }
//           .order-item, .payment-item {
//             padding: 8px 0;
//             border-bottom: 1px solid #eee;
//             display: flex;
//             justify-content: space-between;
//           }
//           .order-item:last-child, .payment-item:last-child {
//             border-bottom: none;
//           }
//           .amount {
//             font-weight: bold;
//             color: #2563eb;
//           }
//           .total {
//             font-size: 16px;
//             font-weight: bold;
//             margin-top: 15px;
//             padding-top: 15px;
//             border-top: 2px solid #333;
//             text-align: center;
//           }
//           .summary {
//             background: #e3f2fd;
//             padding: 25px;
//             border-radius: 8px;
//             margin-top: 30px;
//           }
//           .summary-item {
//             padding: 10px 0;
//             border-bottom: 1px solid #ccc;
//             display: flex;
//             justify-content: space-between;
//             font-size: 16px;
//           }
//           .summary-item:last-child {
//             border-bottom: none;
//             font-weight: bold;
//             font-size: 18px;
//             color: #d32f2f;
//           }
//           .positive { color: #2e7d32; }
//           .negative { color: #d32f2f; }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <div class="faniya-name">${faniyaName}</div>
//           <div class="month-year">${monthlyData.month}.${monthlyData.year}</div>
//         </div>
        
//         <div class="section">
//           <div class="section-title">סה"כ הזמנות</div>
//           ${monthlyData.orders.map(order => `
//             <div class="order-item">
//               <span>${order.customerName}</span>
//               <span class="amount">₪${order.totalPrice.toFixed(2)}</span>
//             </div>
//           `).join('')}
//           ${monthlyData.orders.length === 0 ? '<div style="text-align: center; color: #666;">אין הזמנות בחודש זה</div>' : ''}
//           <div class="total">
//             סה"כ הזמנות : 
//             <span class="amount">₪${monthlyData.totalRevenue.toFixed(2)}</span>
//           </div>
//         </div>

//         <div class="section">
//           <div class="section-title">סה"כ תשלומים שהתקבלו </div>
//           ${monthlyData.payments.map(payment => `
//             <div class="payment-item">
//               <span>${new Date(payment.paymentDate).toLocaleDateString('he-IL')}</span>
//               <span class="amount">₪${(payment.totalAmount || payment.amount || 0).toFixed(2)}</span>
//             </div>
//           `).join('')}
//           ${monthlyData.payments.length === 0 ? '<div style="text-align: center; color: #666;">אין תשלומים בחודש זה</div>' : ''}
//           <div class="total">
//             סה"כ תשלומים שהתקבלו: 
//             <span class="amount">₪${monthlyData.totalPayments.toFixed(2)}</span>
//           </div>
//         </div>

//         <div class="summary">
//           <div class="section-title">סיכום</div>
//           <div class="summary-item">
//             <span>יתרת חוב מחודש קודם:</span>
//             <span class="${monthlyData.previousMonthDebt > 0 ? 'negative' : 'positive'}">
//               ₪${monthlyData.previousMonthDebt.toFixed(2)}
//             </span>
//           </div>
//           <div class="summary-item">
//             <span>סה"כ לתשלום ל-${monthlyData.month}.${monthlyData.year}:</span>
//             <span class="amount">₪${monthlyData.totalRevenue.toFixed(2)}</span>
//           </div>
//           <div class="summary-item">
//             <span>סה"כ שולם בחודש ${monthlyData.month}.${monthlyData.year}:</span>
//             <span class="positive">₪${monthlyData.totalPayments.toFixed(2)}</span>
//           </div>
//           <div class="summary-item">
//             <span>סה"כ יתרת חוב:</span>
//             <span class="${monthlyData.currentMonthDebt > 0 ? 'negative' : 'positive'}">
//               ₪${monthlyData.currentMonthDebt.toFixed(2)}
//             </span>
//           </div>
//         </div>

//         <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #666;">
//           דוח נוצר ב: ${new Date().toLocaleDateString('he-IL')} ${new Date().toLocaleTimeString('he-IL')}
//         </div>
//       </body>
//       </html>
//     `;

//     // הורדת הדוח
//     const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' });
//     const url = URL.createObjectURL(blob);
    
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `דוח_${faniyaName}_${monthlyData.month}_${monthlyData.year}.html`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     alert('דוח ירד בהצלחה! פתח אותו בדפדפן והדפס לPDF');
//   };

//   const currentYear = new Date().getFullYear();
//   const years = Array.from({length: 5}, (_, i) => currentYear - i);

//   return (
//     <div className="space-y-6">
//       {/* בחירת תקופה */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Calendar className="w-5 h-5" />
//             בחירת חודש לדוח
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="text-sm font-medium mb-2 block">שנה</label>
//               <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {years.map(year => (
//                     <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <div>
//               <label className="text-sm font-medium mb-2 block">חודש</label>
//               <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {HEBREW_MONTHS.map((monthName, index) => (
//                     <SelectItem key={index + 1} value={(index + 1).toString()}>
//                       {monthName}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="flex items-end">
//               <Button 
//                 onClick={generateReport} 
//                 disabled={loading || !monthlyData}
//                 className="flex items-center gap-2 w-full"
//               >
//                 <Download className="w-4 h-4" />
//                 ייצא דוח
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* תצוגת הנתונים */}
//       {loading ? (
//         <Card>
//           <CardContent className="p-6 text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             טוען נתונים...
//           </CardContent>
//         </Card>
//       ) : monthlyData ? (
//         <div className="space-y-6">
//           {/* כותרת הדוח */}
//           <Card>
//             <CardContent className="p-6 text-center">
//               <h1 className="text-3xl font-bold mb-2">{faniyaName}</h1>
//               <h2 className="text-xl text-gray-600">{monthlyData.month}.{monthlyData.year}</h2>
//             </CardContent>
//           </Card>

//           {/* הזמנות החודש */}
//           <Card>
//             <CardHeader>
//               <CardTitle>סה"כ הזמנות לחודש {monthlyData.month}.{monthlyData.year}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {monthlyData.orders.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">אין הזמנות בחודש זה</p>
//               ) : (
//                 <div className="space-y-3">
//                   {monthlyData.orders.map((order) => (
//                     <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                       <span className="font-medium">{order.customerName}</span>
//                       <span className="font-bold text-blue-600">₪{order.totalPrice.toFixed(2)}</span>
//                     </div>
//                   ))}
//                   <div className="border-t-2 border-gray-300 pt-4 mt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span>סה"כ הזמנות לחודש {monthlyData.month}.{monthlyData.year}:</span>
//                       <span className="text-blue-600">₪{monthlyData.totalRevenue.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* תשלומים החודש */}
//           <Card>
//             <CardHeader>
//               <CardTitle>סה"כ תשלומים שהתקבלו לחודש {monthlyData.month}.{monthlyData.year}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {monthlyData.payments.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">אין תשלומים בחודש זה</p>
//               ) : (
//                 <div className="space-y-3">
//                   {monthlyData.payments.map((payment) => (
//                     <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                       <span>{new Date(payment.paymentDate).toLocaleDateString('he-IL')}</span>
//                       <span className="font-bold text-green-600">
//                         ₪{(payment.totalAmount || payment.amount || 0).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                   <div className="border-t-2 border-gray-300 pt-4 mt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span>סה"כ תשלומים שהתקבלו:</span>
//                       <span className="text-green-600">₪{monthlyData.totalPayments.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* סיכום */}
//           <Card>
//             <CardHeader>
//               <CardTitle>סיכום</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4 text-lg">
//                 <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
//                   <span>יתרת חוב מחודש קודם:</span>
//                   <span className={`font-bold ${monthlyData.previousMonthDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
//                     ₪{monthlyData.previousMonthDebt.toFixed(2)}
//                   </span>
//                 </div>
                
//                 <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
//                   <span>סה"כ לתשלום ל-{monthlyData.month}.{monthlyData.year}:</span>
//                   <span className="font-bold text-blue-600">₪{monthlyData.totalRevenue.toFixed(2)}</span>
//                 </div>
                
//                 <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
//                   <span>סה"כ שולם בחודש {monthlyData.month}.{monthlyData.year}:</span>
//                   <span className="font-bold text-green-600">₪{monthlyData.totalPayments.toFixed(2)}</span>
//                 </div>
                
//                 <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
//                   <span className="font-bold">סה"כ יתרת חוב:</span>
//                   <span className={`font-bold text-xl ${monthlyData.currentMonthDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
//                     ₪{monthlyData.currentMonthDebt.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       ) : (
//         <Card>
//           <CardContent className="p-6 text-center text-gray-500">
//             בחר חודש כדי לצפות בדוח
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, TrendingUp, CreditCard, Package } from 'lucide-react';

interface Order {
  id: string;
  orderDate: string;
  customerName: string;
  totalPrice: number;
  isCompleted: boolean;
  deliveryDate?: string;
}

interface Payment {
  id: string;
  totalAmount?: number;
  amount?: number;
  paymentDate: string;
  paymentType?: string;
  paymentParts?: any[];
}

// ✅ טיפוס חדש - עדכוני חוב
interface DebtTransaction {
  id: string;
  amount: number;
  description: string;
  type: 'order' | 'payment' | 'manual';
  createdAt: string;
  relatedId?: string;
}

interface MonthlyReportsProps {
  faniyaId: string;
  faniyaName: string;
}

interface MonthlyData {
  month: number;
  year: number;
  orders: Order[];
  payments: Payment[];
  debtTransactions: DebtTransaction[]; // ✅ הוספה
  totalRevenue: number;
  totalPayments: number;
  previousMonthDebt: number;
  currentMonthDebt: number;
  ordersCount: number;
}

const HEBREW_MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
];

export function MonthlyReports({ faniyaId, faniyaName }: MonthlyReportsProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [monthlyData, setMonthlyData] = useState<MonthlyData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      loadMonthlyData(selectedYear, selectedMonth);
    }
  }, [selectedYear, selectedMonth, faniyaId]);

  // const loadMonthlyData = async (year: number, month: number) => {
  //   setLoading(true);
  //   try {
  //     // טעינת הזמנות
  //     const ordersResponse = await fetch(`/api/orders?faniyaId=${faniyaId}`);
  //     const allOrders: Order[] = ordersResponse.ok ? await ordersResponse.json() : [];
      
  //     const monthOrders = allOrders.filter(order => {
  //       const orderDate = new Date(order.orderDate);
  //       return orderDate.getFullYear() === year && orderDate.getMonth() + 1 === month;
  //     });

  //     // טעינת תשלומים
  //     const paymentsResponse = await fetch(`/api/payments?faniyaId=${faniyaId}`);
  //     const allPayments: Payment[] = paymentsResponse.ok ? await paymentsResponse.json() : [];
      
  //     const monthPayments = allPayments.filter(payment => {
  //       const paymentDate = new Date(payment.paymentDate);
  //       return paymentDate.getFullYear() === year && paymentDate.getMonth() + 1 === month;
  //     });

  //     // ✅ טעינת עדכוני חוב
  //     const debtResponse = await fetch(`/api/debt-history?faniyaId=${faniyaId}`);
  //     const allDebtTransactions: DebtTransaction[] = debtResponse.ok ? await debtResponse.json() : [];
      
  //     const monthDebtTransactions = allDebtTransactions.filter(transaction => {
  //       const transactionDate = new Date(transaction.createdAt);
  //       return transactionDate.getFullYear() === year && transactionDate.getMonth() + 1 === month;
  //     });

  //     // חישוב חוב מחודש קודם
  //     const previousMonthDate = new Date(year, month - 2, 1); // חודש קודם
  //     const previousMonthEnd = new Date(year, month - 1, 0); // סוף חודש קודם

  //     const previousOrders = allOrders.filter(order => {
  //       const orderDate = new Date(order.orderDate);
  //       return orderDate <= previousMonthEnd;
  //     });

  //     const previousPayments = allPayments.filter(payment => {
  //       const paymentDate = new Date(payment.paymentDate);
  //       return paymentDate <= previousMonthEnd;
  //     });

  //     const previousDebtTransactions = allDebtTransactions.filter(transaction => {
  //       const transactionDate = new Date(transaction.createdAt);
  //       return transactionDate <= previousMonthEnd;
  //     });

  //     const totalPreviousOrders = previousOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  //     const totalPreviousPayments = previousPayments.reduce((sum, payment) => 
  //       sum + (payment.totalAmount || payment.amount || 0), 0);
  //     const totalPreviousDebtAdjustments = previousDebtTransactions
  //       .filter(t => t.type === 'manual')
  //       .reduce((sum, t) => sum + t.amount, 0);

  //     const previousMonthDebt = totalPreviousOrders - totalPreviousPayments + totalPreviousDebtAdjustments;

  //     // חישוב נתונים לחודש הנוכחי
  //     const totalRevenue = monthOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  //     const totalPayments = monthPayments.reduce((sum, payment) => 
  //       sum + (payment.totalAmount || payment.amount || 0), 0);
      
  //     const currentMonthDebt = previousMonthDebt + totalRevenue - totalPayments;

  //     setMonthlyData({
  //       month,
  //       year,
  //       orders: monthOrders,
  //       payments: monthPayments,
  //       debtTransactions: monthDebtTransactions, // ✅ הוספה
  //       totalRevenue,
  //       totalPayments,
  //       previousMonthDebt,
  //       currentMonthDebt,
  //       ordersCount: monthOrders.length
  //     });

  //   } catch (error) {
  //     console.error('שגיאה בטעינת נתונים חודשיים:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   const loadMonthlyData = async (year: number, month: number) => {
//   setLoading(true);
//   try {
//     // קבלת נתוני החוב לחודש הזה
//     const debtRes = await fetch(
//       `/api/debt-calculations?faniyaId=${faniyaId}&year=${year}&month=${month}`
//     );

//     if (!debtRes.ok) {
//       throw new Error('Failed to fetch debt data');
//     }

//     const debtData = await debtRes.json();

//     // קבלת הזמנות לחודש
//     const ordersRes = await fetch(`/api/orders?faniyaId=${faniyaId}`);
//     const allOrders: Order[] = ordersRes.ok ? await ordersRes.json() : [];

//     const monthOrders = allOrders.filter((order) => {
//       const orderDate = new Date(order.orderDate);
//       return (
//         orderDate.getFullYear() === year &&
//         orderDate.getMonth() + 1 === month
//       );
//     });

//     // קבלת תשלומים לחודש
//     const paymentsRes = await fetch(`/api/payments?faniyaId=${faniyaId}`);
//     const allPayments: Payment[] = paymentsRes.ok
//       ? await paymentsRes.json()
//       : [];

//     const monthPayments = allPayments.filter((payment) => {
//       const paymentDate = new Date(payment.paymentDate);
//       return (
//         paymentDate.getFullYear() === year &&
//         paymentDate.getMonth() + 1 === month
//       );
//     });

//     // חישוב סכום הזמנות שנמסרו בחודש
//     const totalRevenue = monthOrders
//       .filter((order) => order.isCompleted)
//       .reduce((sum, order) => sum + order.totalPrice, 0);

//     // חישוב סכום תשלומים בחודש
//     const totalPayments = monthPayments.reduce(
//       (sum, payment) => sum + (payment.totalAmount || 0),
//       0
//     );
//     setMonthlyData({
//       month,
//       year,
//       orders: monthOrders,
//       payments: monthPayments,
//       debtTransactions: debtData.debtTransactions || [],
//       totalRevenue,
//       totalPayments,
//       previousMonthDebt: debtData.previousMonthDebt,
//       currentMonthDebt: debtData.currentMonthDebt,
//       ordersCount: monthOrders.length,
//     });
//   } catch (error) {
//     console.error('שגיאה בטעינת נתונים חודשיים:', error);
//   } finally {
//     setLoading(false);
//   }
// };

//   const generateReport = () => {
//     if (!monthlyData) return;
 
//     // ✅ הפרדת עדכוני חוב רגילים מעדכוני חוב מחודש קודם
//     const previousMonthDebtUpdates = monthlyData.debtTransactions.filter(
//       t => t.type === 'manual' && t.description.includes('עדכון חוב מחודש קודם')
//     );
    
//     const regularDebtUpdates = monthlyData.debtTransactions.filter(
//       t => t.type === 'manual' && !t.description.includes('עדכון חוב מחודש קודם')
//     );

//     // חישוב סכום עדכוני חוב רגילים
//     const totalRegularDebtUpdates = regularDebtUpdates.reduce((sum, t) => sum + t.amount, 0);
    
//     // חישוב סכום עדכוני חוב מחודש קודם
//     const totalPreviousMonthDebtUpdates = previousMonthDebtUpdates.reduce((sum, t) => sum + t.amount, 0);
    
//     // חישוב חוב מחודש קודם כולל העדכונים שלו
//     const adjustedPreviousMonthDebt = monthlyData.previousMonthDebt + totalPreviousMonthDebtUpdates;


const loadMonthlyData = async (year: number, month: number) => {
  setLoading(true);
  try {
    // קבלת נתוני החוב לחודש הזה
    const debtRes = await fetch(
      `/api/debt-calculations?faniyaId=${faniyaId}&year=${year}&month=${month}`
    );

    if (!debtRes.ok) {
      throw new Error('Failed to fetch debt data');
    }

    const debtData = await debtRes.json();

    // קבלת הזמנות לחודש
    const ordersRes = await fetch(`/api/orders?faniyaId=${faniyaId}`);
    const allOrders: Order[] = ordersRes.ok ? await ordersRes.json() : [];

    const monthOrders = allOrders.filter((order) => {
      // const orderDate = new Date(order.orderDate);
      // return (
      //   orderDate.getFullYear() === year &&
      //   orderDate.getMonth() + 1 === month
      // );


      if (!order.deliveryDate) return false;
      const deliveryDate = new Date(order.deliveryDate);
      return (
        deliveryDate.getFullYear() === year &&
        deliveryDate.getMonth() + 1 === month
      );
    });

    // קבלת תשלומים לחודש
    const paymentsRes = await fetch(`/api/payments?faniyaId=${faniyaId}`);
    const allPayments: Payment[] = paymentsRes.ok
      ? await paymentsRes.json()
      : [];

    const monthPayments = allPayments.filter((payment) => {
      const paymentDate = new Date(payment.paymentDate);
      return (
        paymentDate.getFullYear() === year &&
        paymentDate.getMonth() + 1 === month
      );
    });

    // ✅✅✅ הוספה חדשה - קבלת עדכוני חוב לחודש ✅✅✅
    const debtTransactionsRes = await fetch(`/api/debt-history?faniyaId=${faniyaId}`);
    const allDebtTransactions: DebtTransaction[] = debtTransactionsRes.ok
      ? await debtTransactionsRes.json()
      : [];

    const monthDebtTransactions = allDebtTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      return (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() + 1 === month
      );
    });
    // ✅✅✅ סוף ההוספה ✅✅✅

    // חישוב סכום הזמנות שנמסרו בחודש
    const totalRevenue = monthOrders
      .filter((order) => order.isCompleted)
      .reduce((sum, order) => sum + order.totalPrice, 0);

    // חישוב סכום תשלומים בחודש
    const totalPayments = monthPayments.reduce(
      (sum, payment) => sum + (payment.totalAmount || 0),
      0
    );
    setMonthlyData({
      month,
      year,
      orders: monthOrders,
      payments: monthPayments,
      debtTransactions: monthDebtTransactions, // ✅ שינוי כאן!
      totalRevenue,
      totalPayments,
      previousMonthDebt: debtData.previousMonthDebt,
      currentMonthDebt: debtData.currentMonthDebt,
      ordersCount: monthOrders.length,
    });
  } catch (error) {
    console.error('שגיאה בטעינת נתונים חודשיים:', error);
  } finally {
    setLoading(false);
  }
};

  const generateReport = () => {
    if (!monthlyData) return;
 
    // ✅ הפרדת עדכוני חוב רגילים מעדכוני חוב מחודש קודם
    const previousMonthDebtUpdates = monthlyData.debtTransactions.filter(
      t => t.type === 'manual' && t.description.includes('עדכון חוב מחודש קודם')
    );
    
    const regularDebtUpdates = monthlyData.debtTransactions.filter(
      t => t.type === 'manual' && !t.description.includes('עדכון חוב מחודש קודם')
    );

    // חישוב סכום עדכוני חוב רגילים
    const totalRegularDebtUpdates = regularDebtUpdates.reduce((sum, t) => sum + t.amount, 0);
    
    // חישוב סכום עדכוני חוב מחודש קודם
    const totalPreviousMonthDebtUpdates = previousMonthDebtUpdates.reduce((sum, t) => sum + t.amount, 0);
    
    // חישוב חוב מחודש קודם כולל העדכונים שלו
    const adjustedPreviousMonthDebt = monthlyData.previousMonthDebt + totalPreviousMonthDebtUpdates;
    const reportContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <title>דוח_${faniyaName}_${monthlyData.month}_${monthlyData.year}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            direction: rtl; 
            text-align: right;
            padding: 40px;
            line-height: 1.8;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #333;
            padding-bottom: 20px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .subtitle {
            font-size: 20px;
            color: #666;
          }
          .section {
            margin: 30px 0;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
          }
          .item {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
          }
          .item:last-child {
            border-bottom: none;
          }
          .sub-item {
            padding: 8px 8px 8px 30px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #666;
            background: #fafafa;
          }
          .amount {
            font-weight: bold;
          }
          .positive {
            color: #16a34a;
          }
          .negative {
            color: #dc2626;
          }
          .total {
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #333;
            text-align: center;
          }
          .summary-box {
            background: #fff3cd;
            border: 2px solid #ffc107;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">${faniyaName}</div>
          <div class="subtitle">דוח חודשי - ${monthlyData.month}.${monthlyData.year}</div>
        </div>

        ${adjustedPreviousMonthDebt !== 0 || previousMonthDebtUpdates.length > 0 ? `
        <div class="section">
          <h2>יתרת חוב מחודש קודם</h2>
          <div class="item">
            <span>חוב מחודש קודם:</span>
            <span class="amount ${monthlyData.previousMonthDebt > 0 ? 'negative' : 'positive'}">
              ₪${monthlyData.previousMonthDebt.toFixed(2)}
            </span>
          </div>
          
          ${previousMonthDebtUpdates.length > 0 ? `
            ${previousMonthDebtUpdates.map(transaction => `
              <div class="sub-item">
                <span>${new Date(transaction.createdAt).toLocaleDateString('he-IL')} - ${transaction.description}</span>
                <span class="amount ${transaction.amount > 0 ? 'negative' : 'positive'}">
                  ${transaction.amount > 0 ? '+' : ''}₪${transaction.amount.toFixed(2)}
                </span>
              </div>
            `).join('')}
            <div class="total" style="font-size: 16px;">
              סה"כ חוב מחודש קודם: <span class="amount ${adjustedPreviousMonthDebt > 0 ? 'negative' : 'positive'}">₪${adjustedPreviousMonthDebt.toFixed(2)}</span>
            </div>
          ` : ''}
        </div>
        ` : ''}
        
        <div class="section">
          <h2>סה"כ פעולות לחודש ${monthlyData.month}.${monthlyData.year}</h2>
          ${monthlyData.orders.length === 0 && regularDebtUpdates.length === 0 ? '<p style="text-align: center; color: #666;">אין פעולות בחודש זה</p>' : ''}
          
          ${monthlyData.orders.map((order) => `
            <div class="item">
              <span>הזמנת פאה - ${order.customerName}</span>
              <span class="amount negative">₪${order.totalPrice.toFixed(2)}</span>
            </div>
          `).join('')}
          
          ${regularDebtUpdates.map((transaction) => `
            <div class="item">
              <span>${new Date(transaction.createdAt).toLocaleDateString('he-IL')} - ${transaction.description}</span>
              <span class="amount ${transaction.amount > 0 ? 'negative' : 'positive'}">
                ${transaction.amount > 0 ? '+' : ''}₪${transaction.amount.toFixed(2)}
              </span>
            </div>
          `).join('')}
          
          ${monthlyData.orders.length > 0 || regularDebtUpdates.length > 0 ? `
          <div class="total">
            סה"כ לתשלום ל-${monthlyData.month}.${monthlyData.year}: <span class="amount negative">₪${(monthlyData.totalRevenue + totalRegularDebtUpdates).toFixed(2)}</span>
          </div>
          ` : ''}
        </div>

        <div class="section">
          <h2>סה"כ תשלומים שהתקבלו לחודש ${monthlyData.month}.${monthlyData.year}</h2>
          ${monthlyData.payments.length === 0 ? '<p style="text-align: center; color: #666;">אין תשלומים בחודש זה</p>' : ''}
          ${monthlyData.payments.map((payment) => {
            const paymentAmount = payment.totalAmount || payment.amount || 0;
            const paymentDate = new Date(payment.paymentDate).toLocaleDateString('he-IL');
            
            let partsHtml = '';
            if (payment.paymentParts && payment.paymentParts.length > 0) {
              partsHtml = payment.paymentParts.map((part: any) => 
                `<div class="sub-item">
                  <span>• ${part.paymentType}${
                    part.checkNumber ? ` (צ'ק ${part.checkNumber})` : ''
                  }${
                    part.bankReference ? ` (אסמכתא ${part.bankReference})` : ''
                  }</span>
                  <span class="amount positive">₪${part.amount.toFixed(2)}</span>
                </div>`
              ).join('');
            }
            
            return `
              <div class="item">
                <span>${paymentDate}</span>
                <span class="amount positive">₪${paymentAmount.toFixed(2)}</span>
              </div>
              ${partsHtml}
            `;
          }).join('')}
          
          ${monthlyData.payments.length > 0 ? `
          <div class="total">
            סה"כ שולם בחודש ${monthlyData.month}.${monthlyData.year}: <span class="amount positive">₪${monthlyData.totalPayments.toFixed(2)}</span>
          </div>
          ` : ''}
        </div>

        <div class="summary-box">
          <h2 style="text-align: center; margin-bottom: 20px;">סיכום</h2>
          <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd;">
            <span>יתרת חוב מחודש קודם:</span>
            <span class="amount ${adjustedPreviousMonthDebt > 0 ? 'negative' : 'positive'}">
              ₪${adjustedPreviousMonthDebt.toFixed(2)}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd;">
            <span>סה"כ לתשלום ל-${monthlyData.month}.${monthlyData.year}:</span>
            <span class="amount negative">₪${(monthlyData.totalRevenue + totalRegularDebtUpdates).toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd;">
            <span>סה"כ שולם בחודש ${monthlyData.month}.${monthlyData.year}:</span>
            <span class="amount positive">₪${monthlyData.totalPayments.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 20px 0 10px 0; font-size: 20px; font-weight: bold; border-top: 2px solid #333; margin-top: 10px;">
            <span>סה"כ יתרת חוב:</span>
            <span class="${(adjustedPreviousMonthDebt + monthlyData.totalRevenue + totalRegularDebtUpdates - monthlyData.totalPayments) > 0 ? 'negative' : 'positive'}">
              ₪${(adjustedPreviousMonthDebt + monthlyData.totalRevenue + totalRegularDebtUpdates - monthlyData.totalPayments).toFixed(2)}
            </span>
          </div>
        </div>

        <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #666;">
          דוח נוצר ב: ${new Date().toLocaleDateString('he-IL')} ${new Date().toLocaleTimeString('he-IL')}
        </div>
      </body>
      </html>
    `;



    // const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' });
    // const url = URL.createObjectURL(blob);
    
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = `דוח_${faniyaName}_${monthlyData.month}_${monthlyData.year}.html`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(url);

    // alert('דוח ירד בהצלחה! פתח אותו בדפדפן והדפס לPDF');
 
 // פתיחת חלון חדש עם הדוח
 const printWindow = window.open('', '_blank');
    
 if (printWindow) {
   printWindow.document.write(reportContent);
   printWindow.document.close();
   
   // המתנה לטעינה ואז הדפסה אוטומטית
   printWindow.onload = () => {
     setTimeout(() => {
       printWindow.print();
     }, 250);
   };
 } else {
   alert('נא לאפשר חלונות קופצים כדי להדפיס את הדוח');
 }



  };


  
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - i);

  // ✅ הפרדת עדכוני חוב לתצוגה
  const previousMonthDebtUpdates = monthlyData?.debtTransactions.filter(
    t => t.type === 'manual' && t.description.includes('עדכון חוב מחודש קודם')
  ) || [];
  
  const regularDebtUpdates = monthlyData?.debtTransactions.filter(
    t => t.type === 'manual' && !t.description.includes('עדכון חוב מחודש קודם')
  ) || [];

  // חישוב סכומים
  const totalRegularDebtUpdates = regularDebtUpdates.reduce((sum, t) => sum + t.amount, 0);
  const totalPreviousMonthDebtUpdates = previousMonthDebtUpdates.reduce((sum, t) => sum + t.amount, 0);
  const adjustedPreviousMonthDebt = (monthlyData?.previousMonthDebt || 0) + totalPreviousMonthDebtUpdates;
  const totalOperations = (monthlyData?.totalRevenue || 0) + totalRegularDebtUpdates;
  const finalDebt = adjustedPreviousMonthDebt + totalOperations - (monthlyData?.totalPayments || 0);

  return (
    <div className="space-y-6">
      {/* בחירת תקופה */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            בחירת חודש לדוח
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">שנה</label>
              <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">חודש</label>
              <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HEBREW_MONTHS.map((monthName, index) => (
                    <SelectItem key={index + 1} value={(index + 1).toString()}>
                      {monthName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={generateReport} 
                disabled={loading || !monthlyData}
                className="flex items-center gap-2 w-full"
              >
                <Download className="w-4 h-4" />
                ייצא דוח
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* תצוגת הנתונים */}
      {loading ? (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            טוען נתונים...
          </CardContent>
        </Card>
      ) : monthlyData ? (
        <div className="space-y-6">
          {/* כותרת הדוח */}
          <Card>
            <CardContent className="p-6 text-center">
              <h1 className="text-3xl font-bold mb-2">{faniyaName}</h1>
              <h2 className="text-xl text-gray-600">{monthlyData.month}.{monthlyData.year}</h2>
            </CardContent>
          </Card>

          {/* יתרת חוב מחודש קודם */}
          {(adjustedPreviousMonthDebt !== 0 || previousMonthDebtUpdates.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>יתרת חוב מחודש קודם</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">חוב מחודש קודם:</span>
                    <span className={`font-bold ${monthlyData.previousMonthDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ₪{monthlyData.previousMonthDebt.toFixed(2)}
                    </span>
                  </div>
                  
                  {/* ✅ עדכוני חוב מחודש קודם */}
                  {previousMonthDebtUpdates.length > 0 && (
                    <>
                      <div className="pr-6 space-y-2">
                        {previousMonthDebtUpdates.map((transaction) => (
                          <div key={transaction.id} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                            <span className="text-gray-600">
                              {new Date(transaction.createdAt).toLocaleDateString('he-IL')} - {transaction.description}
                            </span>
                            <span className={`font-bold ${transaction.amount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {transaction.amount > 0 ? '+' : ''}₪{transaction.amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t-2 border-gray-300 pt-3 mt-3">
                        <div className="flex justify-between items-center text-base font-bold">
                          <span>סה"כ חוב מחודש קודם:</span>
                          <span className={adjustedPreviousMonthDebt > 0 ? 'text-red-600' : 'text-green-600'}>
                            ₪{adjustedPreviousMonthDebt.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* פעולות החודש - הזמנות ועדכוני חוב */}
          <Card>
            <CardHeader>
              <CardTitle>סה"כ פעולות לחודש {monthlyData.month}.{monthlyData.year}</CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyData.orders.length === 0 && regularDebtUpdates.length === 0 ? (
                <p className="text-gray-500 text-center py-8">אין פעולות בחודש זה</p>
              ) : (
                <div className="space-y-3">
                  {monthlyData.orders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">הזמנת פאה - {order.customerName}</span>
                      <span className="font-bold text-blue-600">₪{order.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                  
                  {regularDebtUpdates.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">
                        {new Date(transaction.createdAt).toLocaleDateString('he-IL')} - {transaction.description}
                      </span>
                      <span className={`font-bold ${transaction.amount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}₪{transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t-2 border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>סה"כ לתשלום ל-{monthlyData.month}.{monthlyData.year}:</span>
                      <span className="text-blue-600">₪{totalOperations.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* תשלומים החודש */}
          <Card>
            <CardHeader>
              <CardTitle>סה"כ תשלומים שהתקבלו לחודש {monthlyData.month}.{monthlyData.year}</CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyData.payments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">אין תשלומים בחודש זה</p>
              ) : (
                <div className="space-y-3">
                  {monthlyData.payments.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>{new Date(payment.paymentDate).toLocaleDateString('he-IL')}</span>
                      <span className="font-bold text-green-600">
                        ₪{(payment.totalAmount || payment.amount || 0).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t-2 border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>סה"כ תשלומים שהתקבלו:</span>
                      <span className="text-green-600">₪{monthlyData.totalPayments.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* סיכום */}
          <Card>
            <CardHeader>
              <CardTitle>סיכום</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-lg">
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span>יתרת חוב מחודש קודם:</span>
                  <span className={`font-bold ${adjustedPreviousMonthDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₪{adjustedPreviousMonthDebt.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span>סה"כ לתשלום ל-{monthlyData.month}.{monthlyData.year}:</span>
                  <span className="font-bold text-blue-600">₪{totalOperations.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span>סה"כ שולם בחודש {monthlyData.month}.{monthlyData.year}:</span>
                  <span className="font-bold text-green-600">₪{monthlyData.totalPayments.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                  <span className="font-bold">סה"כ יתרת חוב:</span>
                  <span className={`font-bold text-xl ${finalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₪{finalDebt.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            בחר חודש כדי לצפות בדוח
          </CardContent>
        </Card>
      )}
    </div>
  );
}