// 'use client';

// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { FileText, Download, Calendar, TrendingUp, CreditCard, Package } from 'lucide-react';
// import jsPDF from 'jspdf';

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
//   amount: number;
//   paymentDate: string;
//   paymentType: string;
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
//   debt: number;
//   ordersCount: number;
//   completedOrdersCount: number;
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
//   const [availableMonths, setAvailableMonths] = useState<{year: number, month: number}[]>([]);

//   useEffect(() => {
//     loadAvailableMonths();
//   }, [faniyaId]);

//   useEffect(() => {
//     if (selectedYear && selectedMonth) {
//       loadMonthlyData(selectedYear, selectedMonth);
//     }
//   }, [selectedYear, selectedMonth, faniyaId]);

//   const loadAvailableMonths = async () => {
//     try {
//       const response = await fetch(`/api/orders?faniyaId=${faniyaId}`);
//       if (response.ok) {
//         const orders: Order[] = await response.json();
        
//         // חישוב חודשים זמינים מההזמנות
//         const months = new Set<string>();
//         orders.forEach(order => {
//           const date = new Date(order.orderDate);
//           months.add(`${date.getFullYear()}-${date.getMonth() + 1}`);
//         });

//         const monthsList = Array.from(months).map(monthStr => {
//           const [year, month] = monthStr.split('-').map(Number);
//           return { year, month };
//         }).sort((a, b) => {
//           if (a.year !== b.year) return b.year - a.year; // שנים מהחדשה לישנה
//           return b.month - a.month; // חודשים מהחדש לישן
//         });

//         setAvailableMonths(monthsList);
//       }
//     } catch (error) {
//       console.error('שגיאה בטעינת חודשים זמינים:', error);
//     }
//   };

//   const loadMonthlyData = async (year: number, month: number) => {
//     setLoading(true);
//     try {
//       // טעינת הזמנות לחודש הנבחר
//       const ordersResponse = await fetch(`/api/orders?faniyaId=${faniyaId}`);
//       const allOrders: Order[] = ordersResponse.ok ? await ordersResponse.json() : [];
      
//       // סינון הזמנות לחודש הנבחר
//       const monthOrders = allOrders.filter(order => {
//         const orderDate = new Date(order.orderDate);
//         return orderDate.getFullYear() === year && orderDate.getMonth() + 1 === month;
//       });

//       // טעינת תשלומים לחודש הנבחר
//       const paymentsResponse = await fetch(`/api/payments?faniyaId=${faniyaId}`);
//       const allPayments: Payment[] = paymentsResponse.ok ? await paymentsResponse.json() : [];
      
//       // סינון תשלומים לחודש הנבחר
//       const monthPayments = allPayments.filter(payment => {
//         const paymentDate = new Date(payment.paymentDate);
//         return paymentDate.getFullYear() === year && paymentDate.getMonth() + 1 === month;
//       });

//       // חישוב נתונים
//       const totalRevenue = monthOrders
//         .filter(order => order.isCompleted)
//         .reduce((sum, order) => sum + order.totalPrice, 0);
      
//       const totalPayments = monthPayments
//         .reduce((sum, payment) => sum + payment.amount, 0);

//       const debt = totalRevenue - totalPayments;
//       const completedOrdersCount = monthOrders.filter(order => order.isCompleted).length;

//       setMonthlyData({
//         month,
//         year,
//         orders: monthOrders,
//         payments: monthPayments,
//         totalRevenue,
//         totalPayments,
//         debt,
//         ordersCount: monthOrders.length,
//         completedOrdersCount
//       });

//     } catch (error) {
//       console.error('שגיאה בטעינת נתונים חודשיים:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generatePDF = async () => {
//     if (!monthlyData) return;

//     try {
//       const pdf = new jsPDF('p', 'mm', 'a4');
      
//       // הוספת פונט עברי (בסיסי)
//       pdf.setFont('Arial', 'normal');
      
//       // כותרת
//       pdf.setFontSize(20);
//       pdf.text(`דוח חודשי - ${faniyaName}`, 105, 20, { align: 'center' });
      
//       pdf.setFontSize(14);
//       pdf.text(`${HEBREW_MONTHS[monthlyData.month - 1]} ${monthlyData.year}`, 105, 30, { align: 'center' });

//       // קו מפריד
//       pdf.line(20, 35, 190, 35);

//       let yPosition = 50;

//       // סיכום כללי
//       pdf.setFontSize(16);
//       pdf.text('סיכום כללי:', 20, yPosition);
//       yPosition += 10;

//       pdf.setFontSize(12);
//       pdf.text(`סה"כ הזמנות: ${monthlyData.ordersCount}`, 20, yPosition);
//       yPosition += 7;
//       pdf.text(`הזמנות שנמסרו: ${monthlyData.completedOrdersCount}`, 20, yPosition);
//       yPosition += 7;
//       pdf.text(`סה"כ הכנסות: ₪${monthlyData.totalRevenue.toFixed(2)}`, 20, yPosition);
//       yPosition += 7;
//       pdf.text(`סה"כ תשלומים: ₪${monthlyData.totalPayments.toFixed(2)}`, 20, yPosition);
//       yPosition += 7;
//       pdf.text(`יתרת חוב: ₪${monthlyData.debt.toFixed(2)}`, 20, yPosition);
//       yPosition += 15;

//       // רשימת הזמנות שנמסרו
//       if (monthlyData.orders.filter(o => o.isCompleted).length > 0) {
//         pdf.setFontSize(16);
//         pdf.text('הזמנות שנמסרו:', 20, yPosition);
//         yPosition += 10;

//         pdf.setFontSize(10);
//         monthlyData.orders
//           .filter(order => order.isCompleted)
//           .forEach((order, index) => {
//             if (yPosition > 250) {
//               pdf.addPage();
//               yPosition = 20;
//             }
            
//             const deliveryDate = order.deliveryDate 
//               ? new Date(order.deliveryDate).toLocaleDateString('he-IL')
//               : 'לא צוין';
              
//             pdf.text(
//               `${index + 1}. ${order.customerName} - ₪${order.totalPrice.toFixed(2)} (נמסר: ${deliveryDate})`,
//               20, 
//               yPosition
//             );
//             yPosition += 6;
//           });
        
//         yPosition += 10;
//       }

//       // רשימת תשלומים
//       if (monthlyData.payments.length > 0) {
//         pdf.setFontSize(16);
//         pdf.text('תשלומים שהתקבלו:', 20, yPosition);
//         yPosition += 10;

//         pdf.setFontSize(10);
//         monthlyData.payments.forEach((payment, index) => {
//           if (yPosition > 250) {
//             pdf.addPage();
//             yPosition = 20;
//           }
          
//           const paymentDate = new Date(payment.paymentDate).toLocaleDateString('he-IL');
//           pdf.text(
//             `${index + 1}. ${paymentDate} - ₪${payment.amount.toFixed(2)} (${payment.paymentType})`,
//             20,
//             yPosition
//           );
//           yPosition += 6;
//         });
//       }

//       // תאריך יצירת הדוח
//       pdf.setFontSize(8);
//       pdf.text(`נוצר ב: ${new Date().toLocaleDateString('he-IL')} ${new Date().toLocaleTimeString('he-IL')}`, 20, 280);

//       // שמירה
//       const fileName = `דוח_חודשי_${faniyaName}_${monthlyData.month}_${monthlyData.year}.pdf`;
//       pdf.save(fileName);

//     } catch (error) {
//       console.error('שגיאה בייצור PDF:', error);
//       alert('שגיאה בייצור PDF. נסה שוב.');
//     }
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
//                 onClick={generatePDF} 
//                 disabled={loading || !monthlyData}
//                 className="flex items-center gap-2 w-full"
//               >
//                 <Download className="w-4 h-4" />
//                 ייצא PDF
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* חודשים זמינים */}
//       {availableMonths.length > 0 && (
//         <Card>
//           <CardHeader>
//             <CardTitle>חודשים זמינים</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-wrap gap-2">
//               {availableMonths.map(({year, month}) => (
//                 <Button
//                   key={`${year}-${month}`}
//                   variant={selectedYear === year && selectedMonth === month ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => {
//                     setSelectedYear(year);
//                     setSelectedMonth(month);
//                   }}
//                 >
//                   {HEBREW_MONTHS[month - 1]} {year}
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* תצוגת הנתונים */}
//       {loading ? (
//         <Card>
//           <CardContent className="p-6 text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             טוען נתונים...
//           </CardContent>
//         </Card>
//       ) : monthlyData ? (
//         <>
//           {/* סטטיסטיקות חודשיות */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">הזמנות</CardTitle>
//                 <Package className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{monthlyData.ordersCount}</div>
//                 <p className="text-xs text-muted-foreground">
//                   נמסרו: {monthlyData.completedOrdersCount}
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">הכנסות</CardTitle>
//                 <TrendingUp className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-green-600">
//                   ₪{monthlyData.totalRevenue.toFixed(2)}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">תשלומים</CardTitle>
//                 <CreditCard className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-blue-600">
//                   ₪{monthlyData.totalPayments.toFixed(2)}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">יתרת חוב</CardTitle>
//                 <CreditCard className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className={`text-2xl font-bold ${monthlyData.debt > 0 ? 'text-red-600' : 'text-green-600'}`}>
//                   ₪{monthlyData.debt.toFixed(2)}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* פירוט הזמנות שנמסרו */}
//           <Card>
//             <CardHeader>
//               <CardTitle>הזמנות שנמסרו החודש</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {monthlyData.orders.filter(order => order.isCompleted).length === 0 ? (
//                 <p className="text-gray-500 text-center py-4">אין הזמנות שנמסרו החודש</p>
//               ) : (
//                 <div className="space-y-3">
//                   {monthlyData.orders
//                     .filter(order => order.isCompleted)
//                     .map((order, index) => (
//                       <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <div>
//                           <span className="font-medium">{order.customerName}</span>
//                           <div className="text-sm text-gray-600">
//                             נמסר ב: {order.deliveryDate 
//                               ? new Date(order.deliveryDate).toLocaleDateString('he-IL')
//                               : 'לא צוין'
//                             }
//                           </div>
//                         </div>
//                         <Badge variant="secondary" className="bg-green-100 text-green-800">
//                           ₪{order.totalPrice.toFixed(2)}
//                         </Badge>
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* פירוט תשלומים */}
//           <Card>
//             <CardHeader>
//               <CardTitle>תשלומים שהתקבלו החודש</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {monthlyData.payments.length === 0 ? (
//                 <p className="text-gray-500 text-center py-4">אין תשלומים החודש</p>
//               ) : (
//                 <div className="space-y-3">
//                   {monthlyData.payments.map((payment, index) => (
//                     <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <span className="font-medium">{payment.paymentType}</span>
//                         <div className="text-sm text-gray-600">
//                           {new Date(payment.paymentDate).toLocaleDateString('he-IL')}
//                         </div>
//                       </div>
//                       <Badge variant="secondary" className="bg-blue-100 text-blue-800">
//                         ₪{payment.amount.toFixed(2)}
//                       </Badge>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </>
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

// 'use client';

// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { FileText, Download, Calendar, TrendingUp, CreditCard, Package } from 'lucide-react';
// import jsPDF from 'jspdf';

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
//   amount: number;
//   paymentDate: string;
//   paymentType: string;
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
//   debt: number;
//   ordersCount: number;
//   completedOrdersCount: number;
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
//   const [availableMonths, setAvailableMonths] = useState<{year: number, month: number}[]>([]);

//   useEffect(() => {
//     loadAvailableMonths();
//   }, [faniyaId]);

//   useEffect(() => {
//     if (selectedYear && selectedMonth) {
//       loadMonthlyData(selectedYear, selectedMonth);
//     }
//   }, [selectedYear, selectedMonth, faniyaId]);

//   const loadAvailableMonths = async () => {
//     try {
//       const response = await fetch(`/api/orders?faniyaId=${faniyaId}`);
//       if (response.ok) {
//         const orders: Order[] = await response.json();
        
//         // חישוב חודשים זמינים מההזמנות
//         const months = new Set<string>();
//         orders.forEach(order => {
//           const date = new Date(order.orderDate);
//           months.add(`${date.getFullYear()}-${date.getMonth() + 1}`);
//         });

//         const monthsList = Array.from(months).map(monthStr => {
//           const [year, month] = monthStr.split('-').map(Number);
//           return { year, month };
//         }).sort((a, b) => {
//           if (a.year !== b.year) return b.year - a.year; // שנים מהחדשה לישנה
//           return b.month - a.month; // חודשים מהחדש לישן
//         });

//         setAvailableMonths(monthsList);
//       }
//     } catch (error) {
//       console.error('שגיאה בטעינת חודשים זמינים:', error);
//     }
//   };

//   const loadMonthlyData = async (year: number, month: number) => {
//     setLoading(true);
//     try {
//       // טעינת הזמנות לחודש הנבחר
//       const ordersResponse = await fetch(`/api/orders?faniyaId=${faniyaId}`);
//       const allOrders: Order[] = ordersResponse.ok ? await ordersResponse.json() : [];
      
//       // סינון הזמנות לחודש הנבחר
//       const monthOrders = allOrders.filter(order => {
//         const orderDate = new Date(order.orderDate);
//         return orderDate.getFullYear() === year && orderDate.getMonth() + 1 === month;
//       });

//       // טעינת תשלומים לחודש הנבחר
//       const paymentsResponse = await fetch(`/api/payments?faniyaId=${faniyaId}`);
//       const allPayments: Payment[] = paymentsResponse.ok ? await paymentsResponse.json() : [];
      
//       // סינון תשלומים לחודש הנבחר
//       const monthPayments = allPayments.filter(payment => {
//         const paymentDate = new Date(payment.paymentDate);
//         return paymentDate.getFullYear() === year && paymentDate.getMonth() + 1 === month;
//       });

//       // חישוב נתונים
//       const totalRevenue = monthOrders
//         .filter(order => order.isCompleted)
//         .reduce((sum, order) => sum + order.totalPrice, 0);
      
//       const totalPayments = monthPayments
//         .reduce((sum, payment) => sum + payment.amount, 0);

//       const debt = totalRevenue - totalPayments;
//       const completedOrdersCount = monthOrders.filter(order => order.isCompleted).length;

//       setMonthlyData({
//         month,
//         year,
//         orders: monthOrders,
//         payments: monthPayments,
//         totalRevenue,
//         totalPayments,
//         debt,
//         ordersCount: monthOrders.length,
//         completedOrdersCount
//       });

//     } catch (error) {
//       console.error('שגיאה בטעינת נתונים חודשיים:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generatePDF = async () => {
//     if (!monthlyData) return;

//     try {
//       // יצירת תוכן HTML לPDF
//       const htmlContent = `
//         <!DOCTYPE html>
//         <html dir="rtl" lang="he">
//         <head>
//           <meta charset="UTF-8">
//           <style>
//             body { 
//               font-family: Arial, sans-serif; 
//               direction: rtl; 
//               text-align: right;
//               padding: 20px;
//               line-height: 1.6;
//             }
//             .header {
//               text-align: center;
//               border-bottom: 2px solid #333;
//               padding-bottom: 10px;
//               margin-bottom: 20px;
//             }
//             .summary {
//               background-color: #f5f5f5;
//               padding: 15px;
//               border-radius: 5px;
//               margin: 20px 0;
//             }
//             .section {
//               margin: 20px 0;
//             }
//             .section-title {
//               font-size: 16px;
//               font-weight: bold;
//               color: #333;
//               border-bottom: 1px solid #ccc;
//               padding-bottom: 5px;
//               margin-bottom: 10px;
//             }
//             .item {
//               padding: 5px 0;
//               border-bottom: 1px solid #eee;
//             }
//             .item:last-child {
//               border-bottom: none;
//             }
//             .amount {
//               color: #2563eb;
//               font-weight: bold;
//             }
//             .debt {
//               color: #dc2626;
//               font-weight: bold;
//             }
//             .positive {
//               color: #16a34a;
//               font-weight: bold;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>דוח חודשי - ${faniyaName}</h1>
//             <h2>${HEBREW_MONTHS[monthlyData.month - 1]} ${monthlyData.year}</h2>
//           </div>
          
//           <div class="summary">
//             <h3>סיכום כללי</h3>
//             <div>סה"כ הזמנות: ${monthlyData.ordersCount}</div>
//             <div>הזמנות שנמסרו: ${monthlyData.completedOrdersCount}</div>
//             <div>סה"כ הכנסות: <span class="amount">₪${monthlyData.totalRevenue.toFixed(2)}</span></div>
//             <div>סה"כ תשלומים: <span class="positive">₪${monthlyData.totalPayments.toFixed(2)}</span></div>
//             <div>יתרת חוב: <span class="${monthlyData.debt > 0 ? 'debt' : 'positive'}">₪${monthlyData.debt.toFixed(2)}</span></div>
//           </div>

//           ${monthlyData.orders.filter(o => o.isCompleted).length > 0 ? `
//             <div class="section">
//               <div class="section-title">הזמנות שנמסרו החודש</div>
//               ${monthlyData.orders
//                 .filter(order => order.isCompleted)
//                 .map((order, index) => {
//                   const deliveryDate = order.deliveryDate 
//                     ? new Date(order.deliveryDate).toLocaleDateString('he-IL')
//                     : 'לא צוין';
//                   return `
//                     <div class="item">
//                       <strong>${order.customerName}</strong> - 
//                       <span class="amount">₪${order.totalPrice.toFixed(2)}</span>
//                       <br><small>נמסר ב: ${deliveryDate}</small>
//                     </div>
//                   `;
//                 }).join('')}
//             </div>
//           ` : ''}

//           ${monthlyData.payments.length > 0 ? `
//             <div class="section">
//               <div class="section-title">תשלומים שהתקבלו החודש</div>
//               ${monthlyData.payments.map((payment, index) => {
//                 const paymentDate = new Date(payment.paymentDate).toLocaleDateString('he-IL');
//                 return `
//                   <div class="item">
//                     <span class="positive">₪${payment.amount.toFixed(2)}</span> - ${payment.paymentType}
//                     <br><small>${paymentDate}</small>
//                   </div>
//                 `;
//               }).join('')}
//             </div>
//           ` : ''}

//           <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
//             דוח נוצר ב: ${new Date().toLocaleDateString('he-IL')} ${new Date().toLocaleTimeString('he-IL')}
//           </div>
//         </body>
//         </html>
//       `;

//       // יצירת קובץ HTML זמני והורדה
//       const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
//       const url = URL.createObjectURL(blob);
      
//       // יצירת קישור להורדה
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `דוח_חודשי_${faniyaName}_${monthlyData.month}_${monthlyData.year}.html`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);

//       alert('קובץ הדוח ירד בהצלחה! פתח אותו בדפדפן ואז תוכל להדפיס לPDF');

//     } catch (error) {
//       console.error('שגיאה בייצור הדוח:', error);
//       alert('שגיאה בייצור הדוח. נסה שוב.');
//     }
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
//                 onClick={generatePDF} 
//                 disabled={loading || !monthlyData}
//                 className="flex items-center gap-2 w-full"
//               >
//                 <Download className="w-4 h-4" />
//                 ייצא דוח HTML
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* חודשים זמינים */}
//       {availableMonths.length > 0 && (
//         <Card>
//           <CardHeader>
//             <CardTitle>חודשים זמינים</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-wrap gap-2">
//               {availableMonths.map(({year, month}) => (
//                 <Button
//                   key={`${year}-${month}`}
//                   variant={selectedYear === year && selectedMonth === month ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => {
//                     setSelectedYear(year);
//                     setSelectedMonth(month);
//                   }}
//                 >
//                   {HEBREW_MONTHS[month - 1]} {year}
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* תצוגת הנתונים */}
//       {loading ? (
//         <Card>
//           <CardContent className="p-6 text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             טוען נתונים...
//           </CardContent>
//         </Card>
//       ) : monthlyData ? (
//         <>
//           {/* סטטיסטיקות חודשיות */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">הזמנות</CardTitle>
//                 <Package className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{monthlyData.ordersCount}</div>
//                 <p className="text-xs text-muted-foreground">
//                   נמסרו: {monthlyData.completedOrdersCount}
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">הכנסות</CardTitle>
//                 <TrendingUp className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-green-600">
//                   ₪{monthlyData.totalRevenue.toFixed(2)}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">תשלומים</CardTitle>
//                 <CreditCard className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-blue-600">
//                   ₪{monthlyData.totalPayments.toFixed(2)}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">יתרת חוב</CardTitle>
//                 <CreditCard className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className={`text-2xl font-bold ${monthlyData.debt > 0 ? 'text-red-600' : 'text-green-600'}`}>
//                   ₪{monthlyData.debt.toFixed(2)}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* פירוט הזמנות שנמסרו */}
//           <Card>
//             <CardHeader>
//               <CardTitle>הזמנות שנמסרו החודש</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {monthlyData.orders.filter(order => order.isCompleted).length === 0 ? (
//                 <p className="text-gray-500 text-center py-4">אין הזמנות שנמסרו החודש</p>
//               ) : (
//                 <div className="space-y-3">
//                   {monthlyData.orders
//                     .filter(order => order.isCompleted)
//                     .map((order, index) => (
//                       <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <div>
//                           <span className="font-medium">{order.customerName}</span>
//                           <div className="text-sm text-gray-600">
//                             נמסר ב: {order.deliveryDate 
//                               ? new Date(order.deliveryDate).toLocaleDateString('he-IL')
//                               : 'לא צוין'
//                             }
//                           </div>
//                         </div>
//                         <Badge variant="secondary" className="bg-green-100 text-green-800">
//                           ₪{order.totalPrice.toFixed(2)}
//                         </Badge>
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* פירוט תשלומים */}
//           <Card>
//             <CardHeader>
//               <CardTitle>תשלומים שהתקבלו החודש</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {monthlyData.payments.length === 0 ? (
//                 <p className="text-gray-500 text-center py-4">אין תשלומים החודש</p>
//               ) : (
//                 <div className="space-y-3">
//                   {monthlyData.payments.map((payment, index) => (
//                     <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <span className="font-medium">{payment.paymentType}</span>
//                         <div className="text-sm text-gray-600">
//                           {new Date(payment.paymentDate).toLocaleDateString('he-IL')}
//                         </div>
//                       </div>
//                       <Badge variant="secondary" className="bg-blue-100 text-blue-800">
//                         ₪{payment.amount.toFixed(2)}
//                       </Badge>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </>
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
import { FileText, Download, Calendar } from 'lucide-react';

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
  amount?: number; // תאימות לאחור
  paymentDate: string;
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
  totalRevenue: number;
  totalPayments: number;
  previousMonthDebt: number;
  currentMonthDebt: number;
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

  const loadMonthlyData = async (year: number, month: number) => {
    setLoading(true);
    try {
      // טעינת הזמנות לחודש הנבחר
      const ordersResponse = await fetch(`/api/orders?faniyaId=${faniyaId}`);
      const allOrders: Order[] = ordersResponse.ok ? await ordersResponse.json() : [];
      
      // סינון הזמנות לחודש הנבחר (רק הזמנות שנמסרו)
      const monthOrders = allOrders.filter(order => {
        if (!order.deliveryDate) return false;
        const deliveryDate = new Date(order.deliveryDate);
        return deliveryDate.getFullYear() === year && deliveryDate.getMonth() + 1 === month;
      });

      // טעינת תשלומים לחודש הנבחר
      const paymentsResponse = await fetch(`/api/payments?faniyaId=${faniyaId}`);
      const allPayments: Payment[] = paymentsResponse.ok ? await paymentsResponse.json() : [];
      
      // סינון תשלומים לחודש הנבחר
      const monthPayments = allPayments.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate.getFullYear() === year && paymentDate.getMonth() + 1 === month;
      });

      // חישוב סה"כ הכנסות החודש
      const totalRevenue = monthOrders.reduce((sum, order) => sum + order.totalPrice, 0);
      
      // חישוב סה"כ תשלומים החודש
      const totalPayments = monthPayments.reduce((sum, payment) => 
        sum + (payment.totalAmount || payment.amount || 0), 0);

      // חישוב חוב מהחודש הקודם
      const previousMonthDebt = await calculatePreviousMonthDebt(year, month);
      
      // חישוב חוב נוכחי
      const currentMonthDebt = previousMonthDebt + totalRevenue - totalPayments;

      setMonthlyData({
        month,
        year,
        orders: monthOrders,
        payments: monthPayments,
        totalRevenue,
        totalPayments,
        previousMonthDebt,
        currentMonthDebt
      });

    } catch (error) {
      console.error('שגיאה בטעינת נתונים חודשיים:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePreviousMonthDebt = async (year: number, month: number): Promise<number> => {
    try {
      // חישוב החוב עד סוף החודש הקודם
      let prevYear = year;
      let prevMonth = month - 1;
      
      if (prevMonth === 0) {
        prevMonth = 12;
        prevYear = year - 1;
      }

      // טעינת כל ההזמנות והתשלומים עד סוף החודש הקודם
      const [ordersRes, paymentsRes] = await Promise.all([
        fetch(`/api/orders?faniyaId=${faniyaId}`),
        fetch(`/api/payments?faniyaId=${faniyaId}`)
      ]);

      const allOrders: Order[] = ordersRes.ok ? await ordersRes.json() : [];
      const allPayments: Payment[] = paymentsRes.ok ? await paymentsRes.json() : [];

      // סינון הזמנות שנמסרו עד סוף החודש הקודם
      const ordersUntilPrevMonth = allOrders.filter(order => {
        if (!order.deliveryDate) return false;
        const deliveryDate = new Date(order.deliveryDate);
        const orderDate = new Date(prevYear, prevMonth - 1, 31, 23, 59, 59);
        return deliveryDate <= orderDate;
      });

      // סינון תשלומים עד סוף החודש הקודם
      const paymentsUntilPrevMonth = allPayments.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        const endOfPrevMonth = new Date(prevYear, prevMonth - 1, 31, 23, 59, 59);
        return paymentDate <= endOfPrevMonth;
      });

      const totalOrdersUntilPrevMonth = ordersUntilPrevMonth.reduce((sum, order) => sum + order.totalPrice, 0);
      const totalPaymentsUntilPrevMonth = paymentsUntilPrevMonth.reduce((sum, payment) => 
        sum + (payment.totalAmount || payment.amount || 0), 0);

      return Math.max(0, totalOrdersUntilPrevMonth - totalPaymentsUntilPrevMonth);
    } catch (error) {
      console.error('שגיאה בחישוב חוב חודש קודם:', error);
      return 0;
    }
  };

  const generateReport = () => {
    if (!monthlyData) return;

    const reportContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            direction: rtl; 
            text-align: right;
            padding: 40px;
            line-height: 1.8;
            font-size: 14px;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #333;
            padding-bottom: 20px;
          }
          .faniya-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .month-year {
            font-size: 20px;
            color: #666;
          }
          .section {
            margin: 30px 0;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #ddd;
          }
          .order-item, .payment-item {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
          }
          .order-item:last-child, .payment-item:last-child {
            border-bottom: none;
          }
          .amount {
            font-weight: bold;
            color: #2563eb;
          }
          .total {
            font-size: 16px;
            font-weight: bold;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid #333;
            text-align: center;
          }
          .summary {
            background: #e3f2fd;
            padding: 25px;
            border-radius: 8px;
            margin-top: 30px;
          }
          .summary-item {
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            font-size: 16px;
          }
          .summary-item:last-child {
            border-bottom: none;
            font-weight: bold;
            font-size: 18px;
            color: #d32f2f;
          }
          .positive { color: #2e7d32; }
          .negative { color: #d32f2f; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="faniya-name">${faniyaName}</div>
          <div class="month-year">${monthlyData.month}.${monthlyData.year}</div>
        </div>
        
        <div class="section">
          <div class="section-title">סה"כ הזמנות לחודש ${monthlyData.month}.${monthlyData.year}</div>
          ${monthlyData.orders.map(order => `
            <div class="order-item">
              <span>${order.customerName}</span>
              <span class="amount">₪${order.totalPrice.toFixed(2)}</span>
            </div>
          `).join('')}
          ${monthlyData.orders.length === 0 ? '<div style="text-align: center; color: #666;">אין הזמנות בחודש זה</div>' : ''}
          <div class="total">
            סה"כ הזמנות לחודש ${monthlyData.month}.${monthlyData.year}: 
            <span class="amount">₪${monthlyData.totalRevenue.toFixed(2)}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">סה"כ תשלומים שהתקבלו לחודש ${monthlyData.month}.${monthlyData.year}</div>
          ${monthlyData.payments.map(payment => `
            <div class="payment-item">
              <span>${new Date(payment.paymentDate).toLocaleDateString('he-IL')}</span>
              <span class="amount">₪${(payment.totalAmount || payment.amount || 0).toFixed(2)}</span>
            </div>
          `).join('')}
          ${monthlyData.payments.length === 0 ? '<div style="text-align: center; color: #666;">אין תשלומים בחודש זה</div>' : ''}
          <div class="total">
            סה"כ תשלומים שהתקבלו: 
            <span class="amount">₪${monthlyData.totalPayments.toFixed(2)}</span>
          </div>
        </div>

        <div class="summary">
          <div class="section-title">סיכום</div>
          <div class="summary-item">
            <span>יתרת חוב מחודש קודם:</span>
            <span class="${monthlyData.previousMonthDebt > 0 ? 'negative' : 'positive'}">
              ₪${monthlyData.previousMonthDebt.toFixed(2)}
            </span>
          </div>
          <div class="summary-item">
            <span>סה"כ לתשלום ל-${monthlyData.month}.${monthlyData.year}:</span>
            <span class="amount">₪${monthlyData.totalRevenue.toFixed(2)}</span>
          </div>
          <div class="summary-item">
            <span>סה"כ שולם בחודש ${monthlyData.month}.${monthlyData.year}:</span>
            <span class="positive">₪${monthlyData.totalPayments.toFixed(2)}</span>
          </div>
          <div class="summary-item">
            <span>סה"כ יתרת חוב:</span>
            <span class="${monthlyData.currentMonthDebt > 0 ? 'negative' : 'positive'}">
              ₪${monthlyData.currentMonthDebt.toFixed(2)}
            </span>
          </div>
        </div>

        <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #666;">
          דוח נוצר ב: ${new Date().toLocaleDateString('he-IL')} ${new Date().toLocaleTimeString('he-IL')}
        </div>
      </body>
      </html>
    `;

    // הורדת הדוח
    const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `דוח_${faniyaName}_${monthlyData.month}_${monthlyData.year}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('דוח ירד בהצלחה! פתח אותו בדפדפן והדפס לPDF');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - i);

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

          {/* הזמנות החודש */}
          <Card>
            <CardHeader>
              <CardTitle>סה"כ הזמנות לחודש {monthlyData.month}.{monthlyData.year}</CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyData.orders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">אין הזמנות בחודש זה</p>
              ) : (
                <div className="space-y-3">
                  {monthlyData.orders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{order.customerName}</span>
                      <span className="font-bold text-blue-600">₪{order.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t-2 border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>סה"כ הזמנות לחודש {monthlyData.month}.{monthlyData.year}:</span>
                      <span className="text-blue-600">₪{monthlyData.totalRevenue.toFixed(2)}</span>
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
                  <span className={`font-bold ${monthlyData.previousMonthDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₪{monthlyData.previousMonthDebt.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span>סה"כ לתשלום ל-{monthlyData.month}.{monthlyData.year}:</span>
                  <span className="font-bold text-blue-600">₪{monthlyData.totalRevenue.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span>סה"כ שולם בחודש {monthlyData.month}.{monthlyData.year}:</span>
                  <span className="font-bold text-green-600">₪{monthlyData.totalPayments.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                  <span className="font-bold">סה"כ יתרת חוב:</span>
                  <span className={`font-bold text-xl ${monthlyData.currentMonthDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₪{monthlyData.currentMonthDebt.toFixed(2)}
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