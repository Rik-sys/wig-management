// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { Layout } from '@/components/layout/Layout';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // import { Checkbox } from '@/components/ui/checkbox';
// // // import { Badge } from '@/components/ui/badge';
// // // import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
// // // import { PlusCircle, Package, CreditCard, FileText, ArrowRight, Calendar, Edit, Trash2 } from 'lucide-react';

// // // interface Faniya {
// // //   id: string;
// // //   name: string;
// // //   totalDebt: number;
// // //   totalPayments: number;
// // // }

// // // interface Order {
// // //   id: string;
// // //   orderDate: string;
// // //   customerName: string;
// // //   length: number;
// // //   skinType: string;
// // //   color: string;
// // //   highlights: string;
// // //   babyHairType?: string;
// // //   openingTone?: string;
// // //   pattern: string;
// // //   notes?: string;
// // //   discount: number;
// // //   totalPrice: number;
// // //   sentToTrass: boolean;
// // //   trassOperator?: string;
// // //   trassSentDate?: string;
// // //   isCompleted: boolean;
// // //   deliveryDate?: string;
// // // }

// // // interface Payment {
// // //   id: string;
// // //   amount: number;
// // //   paymentDate: string;
// // //   paymentType: string;
// // //   checkDueDate?: string;
// // //   notes?: string;
// // // }

// // // export default function FaniyaPage() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const faniyaId = params.id as string;
  
// // //   const [faniya, setFaniya] = useState<Faniya | null>(null);
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [payments, setPayments] = useState<Payment[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [activeTab, setActiveTab] = useState('new-order');

// // //   // States לטופס הזמנה חדשה
// // //   const [orderForm, setOrderForm] = useState({
// // //     customerName: '',
// // //     length: '',
// // //     skinType: 'רגיל',
// // //     color: '',
// // //     highlights: 'ללא גוונים',
// // //     babyHairType: '',
// // //     openingTone: '',
// // //     pattern: 'ייבוש טבעי תנועה גדולה',
// // //     notes: '',
// // //     discount: '0',
// // //     sentToTrass: false,
// // //     trassOperator: '',
// // //     trassSentDate: ''
// // //   });

// // //   // State לטופס תשלום חדש
// // //   const [paymentForm, setPaymentForm] = useState({
// // //     amount: '',
// // //     paymentType: 'מזומן',
// // //     checkDueDate: '',
// // //     notes: ''
// // //   });

// // //   useEffect(() => {
// // //     if (faniyaId) {
// // //       fetchFaniyaData();
// // //     }
// // //   }, [faniyaId]);

// // //   const fetchFaniyaData = async () => {
// // //     try {
// // //       // טעינת פרטי פאנית
// // //       const faniyaRes = await fetch(`/api/faniyas/${faniyaId}`);
// // //       if (faniyaRes.ok) {
// // //         const faniyaData = await faniyaRes.json();
// // //         setFaniya(faniyaData);
// // //       }

// // //       // טעינת הזמנות
// // //       const ordersRes = await fetch(`/api/orders?faniyaId=${faniyaId}`);
// // //       if (ordersRes.ok) {
// // //         const ordersData = await ordersRes.json();
// // //         setOrders(ordersData);
// // //       }

// // //       // טעינת תשלומים
// // //       const paymentsRes = await fetch(`/api/payments?faniyaId=${faniyaId}`);
// // //       if (paymentsRes.ok) {
// // //         const paymentsData = await paymentsRes.json();
// // //         setPayments(paymentsData);
// // //       }

// // //     } catch (error) {
// // //       console.error('שגיאה בטעינת נתונים:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const calculatePrice = () => {
// // //     const length = parseInt(orderForm.length) || 0;
// // //     const pricePerCm = orderForm.skinType === 'רגיל' ? 15 : 18;
// // //     const discount = parseFloat(orderForm.discount) || 0;
// // //     return Math.max(0, (length * pricePerCm) - discount);
// // //   };

// // //   const handleOrderSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     if (!orderForm.customerName || !orderForm.length || !orderForm.color) {
// // //       alert('אנא מלא את כל השדות החובה');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('/api/orders', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           faniyaId,
// // //           ...orderForm,
// // //           length: parseInt(orderForm.length),
// // //           discount: parseFloat(orderForm.discount) || 0,
// // //           totalPrice: calculatePrice(),
// // //           trassSentDate: orderForm.trassSentDate || null
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('הזמנה נוספה בהצלחה!');
// // //         setOrderForm({
// // //           customerName: '',
// // //           length: '',
// // //           skinType: 'רגיל',
// // //           color: '',
// // //           highlights: 'ללא גוונים',
// // //           babyHairType: '',
// // //           openingTone: '',
// // //           pattern: 'ייבוש טבעי תנועה גדולה',
// // //           notes: '',
// // //           discount: '0',
// // //           sentToTrass: false,
// // //           trassOperator: '',
// // //           trassSentDate: ''
// // //         });
// // //         fetchFaniyaData();
// // //         setActiveTab('pending');
// // //       } else {
// // //         const error = await response.json();
// // //         alert(`שגיאה: ${error.error}`);
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בהוספת הזמנה');
// // //     }
// // //   };

// // //   const handlePaymentSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     if (!paymentForm.amount) {
// // //       alert('אנא הכנס סכום');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('/api/payments', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           faniyaId,
// // //           ...paymentForm,
// // //           amount: parseFloat(paymentForm.amount),
// // //           checkDueDate: paymentForm.checkDueDate || null
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('תשלום נוסף בהצלחה!');
// // //         setPaymentForm({
// // //           amount: '',
// // //           paymentType: 'מזומן',
// // //           checkDueDate: '',
// // //           notes: ''
// // //         });
// // //         fetchFaniyaData();
// // //       } else {
// // //         const error = await response.json();
// // //         alert(`שגיאה: ${error.error}`);
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בהוספת תשלום');
// // //     }
// // //   };

// // //   const markAsDelivered = async (orderId: string) => {
// // //     try {
// // //       const response = await fetch(`/api/orders/${orderId}`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           deliveryDate: new Date().toISOString(),
// // //           isCompleted: true
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('הזמנה סומנה כנמסרה!');
// // //         fetchFaniyaData();
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בעדכון הזמנה');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Layout>
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   if (!faniya) {
// // //     return (
// // //       <Layout>
// // //         <div className="text-center py-12">
// // //           <h2 className="text-2xl font-bold text-gray-900 mb-4">פאנית לא נמצאה</h2>
// // //           <Button onClick={() => router.push('/')}>חזור לדף הבית</Button>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   const pendingOrders = orders.filter(order => !order.isCompleted);
// // //   const completedOrders = orders.filter(order => order.isCompleted);

// // //   return (
// // //     <Layout>
// // //       <div className="space-y-6">
// // //         {/* כותרת וסטטיסטיקות */}
// // //         <div>
// // //           <div className="flex justify-between items-center mb-6">
// // //             <div>
// // //               <Button variant="outline" onClick={() => router.push('/')} className="mb-4">
// // //                 ← חזור לדף הבית
// // //               </Button>
// // //               <h1 className="text-3xl font-bold text-gray-900">{faniya.name}</h1>
// // //             </div>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
// // //                 <Package className="h-4 w-4 text-orange-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-orange-600">{pendingOrders.length}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
// // //                 <Package className="h-4 w-4 text-green-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">סה״כ תשלומים</CardTitle>
// // //                 <CreditCard className="h-4 w-4 text-blue-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">יתרת חוב</CardTitle>
// // //                 <CreditCard className="h-4 w-4 text-red-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// // //                   ₪{faniya.totalDebt.toFixed(2)}
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </div>
// // //         </div>

// // //         {/* תפריט טאבים */}
// // //         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
// // //           <TabsList className="grid w-full grid-cols-5">
// // //             <TabsTrigger value="new-order">הזמנה חדשה</TabsTrigger>
// // //             <TabsTrigger value="pending">לא מוכנות ({pendingOrders.length})</TabsTrigger>
// // //             <TabsTrigger value="completed">מוכנות ({completedOrders.length})</TabsTrigger>
// // //             <TabsTrigger value="payments">תשלומים ({payments.length})</TabsTrigger>
// // //             <TabsTrigger value="reports">דוחות</TabsTrigger>
// // //           </TabsList>

// // //           {/* טאב הזמנה חדשה */}
// // //           <TabsContent value="new-order" className="space-y-4">
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>הזמנה חדשה</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <form onSubmit={handleOrderSubmit} className="space-y-6">
// // //                   {/* פרטים בסיסיים */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="customerName">שם הלקוחה *</Label>
// // //                       <Input
// // //                         id="customerName"
// // //                         value={orderForm.customerName}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>
                    
// // //                     <div>
// // //                       <Label htmlFor="length">אורך הפאה (ס"מ) *</Label>
// // //                       <Input
// // //                         id="length"
// // //                         type="number"
// // //                         min="1"
// // //                         value={orderForm.length}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, length: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* מפרטי הפאה */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="skinType">סוג סקין *</Label>
// // //                       <Select value={orderForm.skinType} onValueChange={(value) => setOrderForm(prev => ({ ...prev, skinType: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="רגיל">רגיל (₪15 לס"מ)</SelectItem>
// // //                           <SelectItem value="מאוורר">מאוורר (₪18 לס"מ)</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="color">צבע *</Label>
// // //                       <Input
// // //                         id="color"
// // //                         value={orderForm.color}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, color: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="highlights">גוונים בפאה</Label>
// // //                       <Select value={orderForm.highlights} onValueChange={(value) => setOrderForm(prev => ({ ...prev, highlights: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="עדינים">עדינים</SelectItem>
// // //                           <SelectItem value="ללא גוונים">ללא גוונים</SelectItem>
// // //                           <SelectItem value="בולטים">בולטים</SelectItem>
// // //                           <SelectItem value="אחר">אחר</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="pattern">דוגמת פאה</Label>
// // //                       <Select value={orderForm.pattern} onValueChange={(value) => setOrderForm(prev => ({ ...prev, pattern: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="ייבוש טבעי תנועה גדולה">ייבוש טבעי תנועה גדולה</SelectItem>
// // //                           <SelectItem value="תלתלים">תלתלים</SelectItem>
// // //                           <SelectItem value="חלק גמיש">חלק גמיש</SelectItem>
// // //                           <SelectItem value="אחר">אחר</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="babyHairType">סוג בייביהר</Label>
// // //                       <Input
// // //                         id="babyHairType"
// // //                         value={orderForm.babyHairType}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, babyHairType: e.target.value }))}
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="openingTone">גוון פתיחה</Label>
// // //                       <Input
// // //                         id="openingTone"
// // //                         value={orderForm.openingTone}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, openingTone: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* מחיר והנחה */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
// // //                     <div>
// // //                       <Label htmlFor="discount">הנחה (₪)</Label>
// // //                       <Input
// // //                         id="discount"
// // //                         type="number"
// // //                         min="0"
// // //                         step="0.01"
// // //                         value={orderForm.discount}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, discount: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                     <div className="flex items-end">
// // //                       <div className="text-lg font-semibold">
// // //                         מחיר סופי: ₪{calculatePrice().toFixed(2)}
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* טרסים */}
// // //                   <div className="border-t pt-4">
// // //                     <div className="flex items-center space-x-2 mb-4">
// // //                       <Checkbox
// // //                         id="sentToTrass"
// // //                         checked={orderForm.sentToTrass}
// // //                         onCheckedChange={(checked) => setOrderForm(prev => ({ ...prev, sentToTrass: !!checked }))}
// // //                       />
// // //                       <Label htmlFor="sentToTrass">נשלח לטרסים</Label>
// // //                     </div>

// // //                     {orderForm.sentToTrass && (
// // //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
// // //                         <div>
// // //                           <Label htmlFor="trassOperator">אופר טרסים</Label>
// // //                           <Select value={orderForm.trassOperator} onValueChange={(value) => setOrderForm(prev => ({ ...prev, trassOperator: value }))}>
// // //                             <SelectTrigger>
// // //                               <SelectValue placeholder="בחר אופר" />
// // //                             </SelectTrigger>
// // //                             <SelectContent>
// // //                               <SelectItem value="לאופר">לאופר</SelectItem>
// // //                               <SelectItem value="שורי">שורי</SelectItem>
// // //                             </SelectContent>
// // //                           </Select>
// // //                         </div>

// // //                         <div>
// // //                           <Label htmlFor="trassSentDate">תאריך שליחה לטרסים</Label>
// // //                           <Input
// // //                             id="trassSentDate"
// // //                             type="date"
// // //                             value={orderForm.trassSentDate}
// // //                             onChange={(e) => setOrderForm(prev => ({ ...prev, trassSentDate: e.target.value }))}
// // //                           />
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* הערות */}
// // //                   <div>
// // //                     <Label htmlFor="notes">הערות</Label>
// // //                     <Textarea
// // //                       id="notes"
// // //                       value={orderForm.notes}
// // //                       onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
// // //                       rows={3}
// // //                     />
// // //                   </div>

// // //                   {/* כפתורים */}
// // //                   <div className="flex justify-end space-x-4">
// // //                     <Button type="submit" className="flex items-center gap-2">
// // //                       <PlusCircle className="w-4 h-4" />
// // //                       שמור הזמנה
// // //                     </Button>
// // //                   </div>
// // //                 </form>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>

// // //           {/* טאב הזמנות ממתינות */}
// // //           <TabsContent value="pending" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">הזמנות ממתינות ({pendingOrders.length})</h3>
// // //             </div>
            
// // //             <div className="grid gap-4">
// // //               {pendingOrders.length === 0 ? (
// // //                 <Card>
// // //                   <CardContent className="p-6 text-center text-gray-500">
// // //                     אין הזמנות ממתינות
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : (
// // //                 pendingOrders.map((order) => (
// // //                   <Card key={order.id}>
// // //                     <CardContent className="p-6">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <div>
// // //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// // //                           <p className="text-sm text-gray-600">הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// // //                         </div>
// // //                         <div className="text-left">
// // //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// // //                           <Badge variant="outline" className="mt-1">ממתינה</Badge>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                         <div>
// // //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">סקין:</span> {order.skinType}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">צבע:</span> {order.color}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">גוונים:</span> {order.highlights}
// // //                         </div>
// // //                       </div>

// // //                       {order.sentToTrass && (
// // //                         <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
// // //                           <span className="font-medium">נשלח לטרסים:</span> {order.trassOperator} 
// // //                           {order.trassSentDate && ` בתאריך ${new Date(order.trassSentDate).toLocaleDateString('he-IL')}`}
// // //                         </div>
// // //                       )}

// // //                       {order.notes && (
// // //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// // //                           <span className="font-medium">הערות:</span> {order.notes}
// // //                         </div>
// // //                       )}

// // //                       <div className="flex justify-end mt-4 space-x-2">
// // //                         <AlertDialog>
// // //                           <AlertDialogTrigger asChild>
// // //                             <Button size="sm" className="flex items-center gap-2">
// // //                               <ArrowRight className="w-4 h-4" />
// // //                               סמן כנמסר
// // //                             </Button>
// // //                           </AlertDialogTrigger>
// // //                           <AlertDialogContent>
// // //                             <AlertDialogHeader>
// // //                               <AlertDialogTitle>סמן הזמנה כנמסרה</AlertDialogTitle>
// // //                               <AlertDialogDescription>
// // //                                 האם אתה בטוח שברצונך לסמן את ההזמנה של {order.customerName} כנמסרה?
// // //                                 פעולה זו תעביר את ההזמנה לטאב "מוכנות".
// // //                               </AlertDialogDescription>
// // //                             </AlertDialogHeader>
// // //                             <AlertDialogFooter>
// // //                               <AlertDialogCancel>ביטול</AlertDialogCancel>
// // //                               <AlertDialogAction onClick={() => markAsDelivered(order.id)}>
// // //                                 אישור
// // //                               </AlertDialogAction>
// // //                             </AlertDialogFooter>
// // //                           </AlertDialogContent>
// // //                         </AlertDialog>
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </TabsContent>

// // //           {/* טאב הזמנות מוכנות */}
// // //           <TabsContent value="completed" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">הזמנות מוכנות ({completedOrders.length})</h3>
// // //             </div>
            
// // //             <div className="grid gap-4">
// // //               {completedOrders.length === 0 ? (
// // //                 <Card>
// // //                   <CardContent className="p-6 text-center text-gray-500">
// // //                     אין הזמנות מוכנות
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : (
// // //                 completedOrders.map((order) => (
// // //                   <Card key={order.id}>
// // //                     <CardContent className="p-6">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <div>
// // //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// // //                           <div className="text-sm text-gray-600">
// // //                             <p>הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// // //                             {order.deliveryDate && (
// // //                               <p>נמסר ב: {new Date(order.deliveryDate).toLocaleDateString('he-IL')}</p>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                         <div className="text-left">
// // //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// // //                           <Badge className="mt-1 bg-green-100 text-green-800">נמסר</Badge>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                         <div>
// // //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">סקין:</span> {order.skinType}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">צבע:</span> {order.color}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">גוונים:</span> {order.highlights}
// // //                         </div>
// // //                       </div>

// // //                       {order.notes && (
// // //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// // //                           <span className="font-medium">הערות:</span> {order.notes}
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </TabsContent>

// // //           {/* טאב תשלומים */}
// // //           <TabsContent value="payments" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">תשלומים</h3>
// // //             </div>

// // //             {/* טופס תשלום חדש */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>תשלום חדש</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <form onSubmit={handlePaymentSubmit} className="space-y-4">
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="amount">סכום *</Label>
// // //                       <Input
// // //                         id="amount"
// // //                         type="number"
// // //                         min="0"
// // //                         step="0.01"
// // //                         value={paymentForm.amount}
// // //                         onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="paymentType">סוג תשלום</Label>
// // //                       <Select value={paymentForm.paymentType} onValueChange={(value) => setPaymentForm(prev => ({ ...prev, paymentType: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="מזומן">מזומן</SelectItem>
// // //                           <SelectItem value="צ'ק">צ'ק</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>
// // //                   </div>

// // //                   {paymentForm.paymentType === 'צ\'ק' && (
// // //                     <div>
// // //                       <Label htmlFor="checkDueDate">תאריך פרעון צ'ק</Label>
// // //                       <Input
// // //                         id="checkDueDate"
// // //                         type="date"
// // //                         value={paymentForm.checkDueDate}
// // //                         onChange={(e) => setPaymentForm(prev => ({ ...prev, checkDueDate: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                   )}

// // //                   <div>
// // //                     <Label htmlFor="paymentNotes">הערות</Label>
// // //                     <Textarea
// // //                       id="paymentNotes"
// // //                       value={paymentForm.notes}
// // //                       onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
// // //                       rows={2}
// // //                     />
// // //                   </div>

// // //                   <Button type="submit" className="flex items-center gap-2">
// // //                     <PlusCircle className="w-4 h-4" />
// // //                     הוסף תשלום
// // //                   </Button>
// // //                 </form>
// // //               </CardContent>
// // //             </Card>

// // //             {/* רשימת תשלומים */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>היסטוריית תשלומים</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 {payments.length === 0 ? (
// // //                   <p className="text-gray-500 text-center py-8">אין תשלומים רשומים</p>
// // //                 ) : (
// // //                   <div className="space-y-4">
// // //                     {payments.map((payment) => (
// // //                       <div key={payment.id} className="border-b pb-4 last:border-b-0">
// // //                         <div className="flex justify-between items-start">
// // //                           <div>
// // //                             <div className="font-semibold text-lg text-green-600">₪{payment.amount.toFixed(2)}</div>
// // //                             <div className="text-sm text-gray-600">
// // //                               {new Date(payment.paymentDate).toLocaleDateString('he-IL')} - {payment.paymentType}
// // //                             </div>
// // //                             {payment.paymentType === 'צ\'ק' && payment.checkDueDate && (
// // //                               <div className="text-sm text-orange-600">
// // //                                 פרעון: {new Date(payment.checkDueDate).toLocaleDateString('he-IL')}
// // //                               </div>
// // //                             )}
// // //                             {payment.notes && (
// // //                               <div className="text-sm text-gray-500 mt-1">{payment.notes}</div>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </CardContent>
// // //             </Card>

// // //             {/* סיכום תשלומים */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>סיכום</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                   <div className="text-center">
// // //                     <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// // //                     <div className="text-sm text-gray-600">סה"כ תשלומים</div>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <div className="text-2xl font-bold text-orange-600">
// // //                       ₪{completedOrders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">סה"כ הזמנות</div>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// // //                       ₪{faniya.totalDebt.toFixed(2)}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">יתרת חוב</div>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>

// // //           {/* טאב דוחות */}
// // //           <TabsContent value="reports" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">דוחות</h3>
// // //             </div>

// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>דוח חודשי</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="space-y-4">
// // //                   <p className="text-gray-600">דוח מפורט לחודש הנוכחי עם כל ההזמנות והתשלומים</p>
                  
// // //                   <div className="bg-gray-50 p-4 rounded-lg">
// // //                     <h4 className="font-semibold mb-3">סיכום החודש</h4>
// // //                     <div className="grid grid-cols-2 gap-4 text-sm">
// // //                       <div>הזמנות חדשות: {orders.filter(o => new Date(o.orderDate).getMonth() === new Date().getMonth()).length}</div>
// // //                       <div>הזמנות שנמסרו: {completedOrders.filter(o => o.deliveryDate && new Date(o.deliveryDate).getMonth() === new Date().getMonth()).length}</div>
// // //                       <div>תשלומים התקבלו: {payments.filter(p => new Date(p.paymentDate).getMonth() === new Date().getMonth()).length}</div>
// // //                       <div>יתרת חוב: ₪{faniya.totalDebt.toFixed(2)}</div>
// // //                     </div>
// // //                   </div>

// // //                   <Button className="flex items-center gap-2">
// // //                     <FileText className="w-4 h-4" />
// // //                     ייצא דוח PDF
// // //                   </Button>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>דוחות נוספים</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="space-y-3">
// // //                   <Button variant="outline" className="w-full justify-start">
// // //                     <FileText className="w-4 h-4 mr-2" />
// // //                     דוח הזמנות לפי תקופה
// // //                   </Button>
// // //                   <Button variant="outline" className="w-full justify-start">
// // //                     <CreditCard className="w-4 h-4 mr-2" />
// // //                     דוח תשלומים לפי תקופה
// // //                   </Button>
// // //                   <Button variant="outline" className="w-full justify-start">
// // //                     <Package className="w-4 h-4 mr-2" />
// // //                     דוח הזמנות ממתינות
// // //                   </Button>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>
// // //         </Tabs>
// // //       </div>
// // //     </Layout>
// // //   );
// // // }
// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { Layout } from '@/components/layout/Layout';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // import { Checkbox } from '@/components/ui/checkbox';
// // // import { Badge } from '@/components/ui/badge';
// // // import { MonthlyReports } from '@/components/reports/MonthlyReports';
// // // import { PlusCircle, Package, CreditCard, FileText, ArrowRight, Calendar, Edit, Trash2 } from 'lucide-react';

// // // interface Faniya {
// // //   id: string;
// // //   name: string;
// // //   totalDebt: number;
// // //   totalPayments: number;
// // // }

// // // interface Order {
// // //   id: string;
// // //   orderDate: string;
// // //   customerName: string;
// // //   length: number;
// // //   skinType: string;
// // //   color: string;
// // //   highlights: string;
// // //   babyHairType?: string;
// // //   openingTone?: string;
// // //   pattern: string;
// // //   notes?: string;
// // //   discount: number;
// // //   totalPrice: number;
// // //   sentToTrass: boolean;
// // //   trassOperator?: string;
// // //   trassSentDate?: string;
// // //   isCompleted: boolean;
// // //   deliveryDate?: string;
// // // }

// // // interface Payment {
// // //   id: string;
// // //   amount: number;
// // //   paymentDate: string;
// // //   paymentType: string;
// // //   checkDueDate?: string;
// // //   notes?: string;
// // // }

// // // export default function FaniyaPage() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const faniyaId = params.id as string;
  
// // //   const [faniya, setFaniya] = useState<Faniya | null>(null);
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [payments, setPayments] = useState<Payment[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [activeTab, setActiveTab] = useState('new-order');

// // //   // States לטופס הזמנה חדשה
// // //   const [orderForm, setOrderForm] = useState({
// // //     customerName: '',
// // //     length: '',
// // //     skinType: 'רגיל',
// // //     color: '',
// // //     highlights: 'ללא גוונים',
// // //     babyHairType: '',
// // //     openingTone: '',
// // //     pattern: 'ייבוש טבעי תנועה גדולה',
// // //     notes: '',
// // //     discount: '0',
// // //     sentToTrass: false,
// // //     trassOperator: '',
// // //     trassSentDate: ''
// // //   });

// // //   // State לטופס תשלום חדש
// // //   const [paymentForm, setPaymentForm] = useState({
// // //     amount: '',
// // //     paymentType: 'מזומן',
// // //     checkDueDate: '',
// // //     notes: ''
// // //   });

// // //   useEffect(() => {
// // //     if (faniyaId) {
// // //       fetchFaniyaData();
// // //     }
// // //   }, [faniyaId]);

// // //   const fetchFaniyaData = async () => {
// // //     try {
// // //       // טעינת פרטי פאנית
// // //       const faniyaRes = await fetch(`/api/faniyas/${faniyaId}`);
// // //       if (faniyaRes.ok) {
// // //         const faniyaData = await faniyaRes.json();
// // //         setFaniya(faniyaData);
// // //       }

// // //       // טעינת הזמנות
// // //       const ordersRes = await fetch(`/api/orders?faniyaId=${faniyaId}`);
// // //       if (ordersRes.ok) {
// // //         const ordersData = await ordersRes.json();
// // //         setOrders(ordersData);
// // //       }

// // //       // טעינת תשלומים
// // //       const paymentsRes = await fetch(`/api/payments?faniyaId=${faniyaId}`);
// // //       if (paymentsRes.ok) {
// // //         const paymentsData = await paymentsRes.json();
// // //         setPayments(paymentsData);
// // //       }

// // //     } catch (error) {
// // //       console.error('שגיאה בטעינת נתונים:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const calculatePrice = () => {
// // //     const length = parseInt(orderForm.length) || 0;
// // //     const pricePerCm = orderForm.skinType === 'רגיל' ? 15 : 18;
// // //     const discount = parseFloat(orderForm.discount) || 0;
// // //     return Math.max(0, (length * pricePerCm) - discount);
// // //   };

// // //   const handleOrderSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     if (!orderForm.customerName || !orderForm.length || !orderForm.color) {
// // //       alert('אנא מלא את כל השדות החובה');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('/api/orders', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           faniyaId,
// // //           ...orderForm,
// // //           length: parseInt(orderForm.length),
// // //           discount: parseFloat(orderForm.discount) || 0,
// // //           totalPrice: calculatePrice(),
// // //           trassSentDate: orderForm.trassSentDate || null
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('הזמנה נוספה בהצלחה!');
// // //         setOrderForm({
// // //           customerName: '',
// // //           length: '',
// // //           skinType: 'רגיל',
// // //           color: '',
// // //           highlights: 'ללא גוונים',
// // //           babyHairType: '',
// // //           openingTone: '',
// // //           pattern: 'ייבוש טבעי תנועה גדולה',
// // //           notes: '',
// // //           discount: '0',
// // //           sentToTrass: false,
// // //           trassOperator: '',
// // //           trassSentDate: ''
// // //         });
// // //         fetchFaniyaData();
// // //         setActiveTab('pending');
// // //       } else {
// // //         const error = await response.json();
// // //         alert(`שגיאה: ${error.error}`);
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בהוספת הזמנה');
// // //     }
// // //   };

// // //   const handlePaymentSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     if (!paymentForm.amount) {
// // //       alert('אנא הכנס סכום');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('/api/payments', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           faniyaId,
// // //           ...paymentForm,
// // //           amount: parseFloat(paymentForm.amount),
// // //           checkDueDate: paymentForm.checkDueDate || null
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('תשלום נוסף בהצלחה!');
// // //         setPaymentForm({
// // //           amount: '',
// // //           paymentType: 'מזומן',
// // //           checkDueDate: '',
// // //           notes: ''
// // //         });
// // //         fetchFaniyaData();
// // //       } else {
// // //         const error = await response.json();
// // //         alert(`שגיאה: ${error.error}`);
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בהוספת תשלום');
// // //     }
// // //   };

// // //   const markAsDelivered = async (orderId: string) => {
// // //     try {
// // //       const response = await fetch(`/api/orders/${orderId}`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           deliveryDate: new Date().toISOString(),
// // //           isCompleted: true
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('הזמנה סומנה כנמסרה!');
// // //         fetchFaniyaData();
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בעדכון הזמנה');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Layout>
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   if (!faniya) {
// // //     return (
// // //       <Layout>
// // //         <div className="text-center py-12">
// // //           <h2 className="text-2xl font-bold text-gray-900 mb-4">פאנית לא נמצאה</h2>
// // //           <Button onClick={() => router.push('/')}>חזור לדף הבית</Button>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   const pendingOrders = orders.filter(order => !order.isCompleted);
// // //   const completedOrders = orders.filter(order => order.isCompleted);

// // //   return (
// // //     <Layout>
// // //       <div className="space-y-6">
// // //         {/* כותרת וסטטיסטיקות */}
// // //         <div>
// // //           <div className="flex justify-between items-center mb-6">
// // //             <div>
// // //               <Button variant="outline" onClick={() => router.push('/')} className="mb-4">
// // //                 ← חזור לדף הבית
// // //               </Button>
// // //               <h1 className="text-3xl font-bold text-gray-900">{faniya.name}</h1>
// // //             </div>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
// // //                 <Package className="h-4 w-4 text-orange-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-orange-600">{pendingOrders.length}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
// // //                 <Package className="h-4 w-4 text-green-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">סה״כ תשלומים</CardTitle>
// // //                 <CreditCard className="h-4 w-4 text-blue-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">יתרת חוב</CardTitle>
// // //                 <CreditCard className="h-4 w-4 text-red-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// // //                   ₪{faniya.totalDebt.toFixed(2)}
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </div>
// // //         </div>

// // //         {/* תפריט טאבים */}
// // //         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
// // //           <TabsList className="grid w-full grid-cols-5">
// // //             <TabsTrigger value="new-order">הזמנה חדשה</TabsTrigger>
// // //             <TabsTrigger value="pending">לא מוכנות ({pendingOrders.length})</TabsTrigger>
// // //             <TabsTrigger value="completed">מוכנות ({completedOrders.length})</TabsTrigger>
// // //             <TabsTrigger value="payments">תשלומים ({payments.length})</TabsTrigger>
// // //             <TabsTrigger value="reports">דוחות</TabsTrigger>
// // //           </TabsList>

// // //           {/* טאב הזמנה חדשה */}
// // //           <TabsContent value="new-order" className="space-y-4">
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>הזמנה חדשה</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <form onSubmit={handleOrderSubmit} className="space-y-6">
// // //                   {/* פרטים בסיסיים */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="customerName">שם הלקוחה *</Label>
// // //                       <Input
// // //                         id="customerName"
// // //                         value={orderForm.customerName}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>
                    
// // //                     <div>
// // //                       <Label htmlFor="length">אורך הפאה (ס"מ) *</Label>
// // //                       <Input
// // //                         id="length"
// // //                         type="number"
// // //                         min="1"
// // //                         value={orderForm.length}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, length: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* מפרטי הפאה */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="skinType">סוג סקין *</Label>
// // //                       <Select value={orderForm.skinType} onValueChange={(value) => setOrderForm(prev => ({ ...prev, skinType: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="רגיל">רגיל (₪15 לס"מ)</SelectItem>
// // //                           <SelectItem value="מאוורר">מאוורר (₪18 לס"מ)</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="color">צבע *</Label>
// // //                       <Input
// // //                         id="color"
// // //                         value={orderForm.color}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, color: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="highlights">גוונים בפאה</Label>
// // //                       <Select value={orderForm.highlights} onValueChange={(value) => setOrderForm(prev => ({ ...prev, highlights: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="עדינים">עדינים</SelectItem>
// // //                           <SelectItem value="ללא גוונים">ללא גוונים</SelectItem>
// // //                           <SelectItem value="בולטים">בולטים</SelectItem>
// // //                           <SelectItem value="אחר">אחר</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="pattern">דוגמת פאה</Label>
// // //                       <Select value={orderForm.pattern} onValueChange={(value) => setOrderForm(prev => ({ ...prev, pattern: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="ייבוש טבעי תנועה גדולה">ייבוש טבעי תנועה גדולה</SelectItem>
// // //                           <SelectItem value="תלתלים">תלתלים</SelectItem>
// // //                           <SelectItem value="חלק גמיש">חלק גמיש</SelectItem>
// // //                           <SelectItem value="אחר">אחר</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="babyHairType">סוג בייביהר</Label>
// // //                       <Input
// // //                         id="babyHairType"
// // //                         value={orderForm.babyHairType}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, babyHairType: e.target.value }))}
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="openingTone">גוון פתיחה</Label>
// // //                       <Input
// // //                         id="openingTone"
// // //                         value={orderForm.openingTone}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, openingTone: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* מחיר והנחה */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
// // //                     <div>
// // //                       <Label htmlFor="discount">הנחה (₪)</Label>
// // //                       <Input
// // //                         id="discount"
// // //                         type="number"
// // //                         min="0"
// // //                         step="0.01"
// // //                         value={orderForm.discount}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, discount: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                     <div className="flex items-end">
// // //                       <div className="text-lg font-semibold">
// // //                         מחיר סופי: ₪{calculatePrice().toFixed(2)}
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* טרסים */}
// // //                   <div className="border-t pt-4">
// // //                     <div className="flex items-center space-x-2 mb-4">
// // //                       <Checkbox
// // //                         id="sentToTrass"
// // //                         checked={orderForm.sentToTrass}
// // //                         onCheckedChange={(checked) => setOrderForm(prev => ({ ...prev, sentToTrass: !!checked }))}
// // //                       />
// // //                       <Label htmlFor="sentToTrass">נשלח לטרסים</Label>
// // //                     </div>

// // //                     {orderForm.sentToTrass && (
// // //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
// // //                         <div>
// // //                           <Label htmlFor="trassOperator">אופר טרסים</Label>
// // //                           <Select value={orderForm.trassOperator} onValueChange={(value) => setOrderForm(prev => ({ ...prev, trassOperator: value }))}>
// // //                             <SelectTrigger>
// // //                               <SelectValue placeholder="בחר אופר" />
// // //                             </SelectTrigger>
// // //                             <SelectContent>
// // //                               <SelectItem value="לאופר">לאופר</SelectItem>
// // //                               <SelectItem value="שורי">שורי</SelectItem>
// // //                             </SelectContent>
// // //                           </Select>
// // //                         </div>

// // //                         <div>
// // //                           <Label htmlFor="trassSentDate">תאריך שליחה לטרסים</Label>
// // //                           <Input
// // //                             id="trassSentDate"
// // //                             type="date"
// // //                             value={orderForm.trassSentDate}
// // //                             onChange={(e) => setOrderForm(prev => ({ ...prev, trassSentDate: e.target.value }))}
// // //                           />
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* הערות */}
// // //                   <div>
// // //                     <Label htmlFor="notes">הערות</Label>
// // //                     <Textarea
// // //                       id="notes"
// // //                       value={orderForm.notes}
// // //                       onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
// // //                       rows={3}
// // //                     />
// // //                   </div>

// // //                   {/* כפתורים */}
// // //                   <div className="flex justify-end space-x-4">
// // //                     <Button type="submit" className="flex items-center gap-2">
// // //                       <PlusCircle className="w-4 h-4" />
// // //                       שמור הזמנה
// // //                     </Button>
// // //                   </div>
// // //                 </form>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>

// // //           {/* טאב הזמנות ממתינות */}
// // //           <TabsContent value="pending" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">הזמנות ממתינות ({pendingOrders.length})</h3>
// // //             </div>
            
// // //             <div className="grid gap-4">
// // //               {pendingOrders.length === 0 ? (
// // //                 <Card>
// // //                   <CardContent className="p-6 text-center text-gray-500">
// // //                     אין הזמנות ממתינות
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : (
// // //                 pendingOrders.map((order) => (
// // //                   <Card key={order.id}>
// // //                     <CardContent className="p-6">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <div>
// // //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// // //                           <p className="text-sm text-gray-600">הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// // //                         </div>
// // //                         <div className="text-left">
// // //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// // //                           <Badge variant="outline" className="mt-1">ממתינה</Badge>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                         <div>
// // //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">סקין:</span> {order.skinType}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">צבע:</span> {order.color}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">גוונים:</span> {order.highlights}
// // //                         </div>
// // //                       </div>

// // //                       {order.sentToTrass && (
// // //                         <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
// // //                           <span className="font-medium">נשלח לטרסים:</span> {order.trassOperator} 
// // //                           {order.trassSentDate && ` בתאריך ${new Date(order.trassSentDate).toLocaleDateString('he-IL')}`}
// // //                         </div>
// // //                       )}

// // //                       {order.notes && (
// // //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// // //                           <span className="font-medium">הערות:</span> {order.notes}
// // //                         </div>
// // //                       )}

// // //                       <div className="flex justify-end mt-4 space-x-2">
// // //                         <AlertDialog>
// // //                           <AlertDialogTrigger asChild>
// // //                             <Button size="sm" className="flex items-center gap-2">
// // //                               <ArrowRight className="w-4 h-4" />
// // //                               סמן כנמסר
// // //                             </Button>
// // //                           </AlertDialogTrigger>
// // //                           <AlertDialogContent>
// // //                             <AlertDialogHeader>
// // //                               <AlertDialogTitle>סמן הזמנה כנמסרה</AlertDialogTitle>
// // //                               <AlertDialogDescription>
// // //                                 האם אתה בטוח שברצונך לסמן את ההזמנה של {order.customerName} כנמסרה?
// // //                                 פעולה זו תעביר את ההזמנה לטאב "מוכנות".
// // //                               </AlertDialogDescription>
// // //                             </AlertDialogHeader>
// // //                             <AlertDialogFooter>
// // //                               <AlertDialogCancel>ביטול</AlertDialogCancel>
// // //                               <AlertDialogAction onClick={() => markAsDelivered(order.id)}>
// // //                                 אישור
// // //                               </AlertDialogAction>
// // //                             </AlertDialogFooter>
// // //                           </AlertDialogContent>
// // //                         </AlertDialog>
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </TabsContent>

// // //           {/* טאב הזמנות מוכנות */}
// // //           <TabsContent value="completed" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">הזמנות מוכנות ({completedOrders.length})</h3>
// // //             </div>
            
// // //             <div className="grid gap-4">
// // //               {completedOrders.length === 0 ? (
// // //                 <Card>
// // //                   <CardContent className="p-6 text-center text-gray-500">
// // //                     אין הזמנות מוכנות
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : (
// // //                 completedOrders.map((order) => (
// // //                   <Card key={order.id}>
// // //                     <CardContent className="p-6">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <div>
// // //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// // //                           <div className="text-sm text-gray-600">
// // //                             <p>הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// // //                             {order.deliveryDate && (
// // //                               <p>נמסר ב: {new Date(order.deliveryDate).toLocaleDateString('he-IL')}</p>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                         <div className="text-left">
// // //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// // //                           <Badge className="mt-1 bg-green-100 text-green-800">נמסר</Badge>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                         <div>
// // //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">סקין:</span> {order.skinType}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">צבע:</span> {order.color}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">גוונים:</span> {order.highlights}
// // //                         </div>
// // //                       </div>

// // //                       {order.notes && (
// // //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// // //                           <span className="font-medium">הערות:</span> {order.notes}
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </TabsContent>

// // //           {/* טאב תשלומים */}
// // //           <TabsContent value="payments" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">תשלומים</h3>
// // //             </div>

// // //             {/* טופס תשלום חדש */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>תשלום חדש</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <form onSubmit={handlePaymentSubmit} className="space-y-4">
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="amount">סכום *</Label>
// // //                       <Input
// // //                         id="amount"
// // //                         type="number"
// // //                         min="0"
// // //                         step="0.01"
// // //                         value={paymentForm.amount}
// // //                         onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="paymentType">סוג תשלום</Label>
// // //                       <Select value={paymentForm.paymentType} onValueChange={(value) => setPaymentForm(prev => ({ ...prev, paymentType: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="מזומן">מזומן</SelectItem>
// // //                           <SelectItem value="צ'ק">צ'ק</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>
// // //                   </div>

// // //                   {paymentForm.paymentType === 'צ\'ק' && (
// // //                     <div>
// // //                       <Label htmlFor="checkDueDate">תאריך פרעון צ'ק</Label>
// // //                       <Input
// // //                         id="checkDueDate"
// // //                         type="date"
// // //                         value={paymentForm.checkDueDate}
// // //                         onChange={(e) => setPaymentForm(prev => ({ ...prev, checkDueDate: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                   )}

// // //                   <div>
// // //                     <Label htmlFor="paymentNotes">הערות</Label>
// // //                     <Textarea
// // //                       id="paymentNotes"
// // //                       value={paymentForm.notes}
// // //                       onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
// // //                       rows={2}
// // //                     />
// // //                   </div>

// // //                   <Button type="submit" className="flex items-center gap-2">
// // //                     <PlusCircle className="w-4 h-4" />
// // //                     הוסף תשלום
// // //                   </Button>
// // //                 </form>
// // //               </CardContent>
// // //             </Card>

// // //             {/* רשימת תשלומים */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>היסטוריית תשלומים</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 {payments.length === 0 ? (
// // //                   <p className="text-gray-500 text-center py-8">אין תשלומים רשומים</p>
// // //                 ) : (
// // //                   <div className="space-y-4">
// // //                     {payments.map((payment) => (
// // //                       <div key={payment.id} className="border-b pb-4 last:border-b-0">
// // //                         <div className="flex justify-between items-start">
// // //                           <div>
// // //                             <div className="font-semibold text-lg text-green-600">₪{payment.amount.toFixed(2)}</div>
// // //                             <div className="text-sm text-gray-600">
// // //                               {new Date(payment.paymentDate).toLocaleDateString('he-IL')} - {payment.paymentType}
// // //                             </div>
// // //                             {payment.paymentType === 'צ\'ק' && payment.checkDueDate && (
// // //                               <div className="text-sm text-orange-600">
// // //                                 פרעון: {new Date(payment.checkDueDate).toLocaleDateString('he-IL')}
// // //                               </div>
// // //                             )}
// // //                             {payment.notes && (
// // //                               <div className="text-sm text-gray-500 mt-1">{payment.notes}</div>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </CardContent>
// // //             </Card>

// // //             {/* סיכום תשלומים */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>סיכום</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                   <div className="text-center">
// // //                     <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// // //                     <div className="text-sm text-gray-600">סה"כ תשלומים</div>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <div className="text-2xl font-bold text-orange-600">
// // //                       ₪{completedOrders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">סה"כ הזמנות</div>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// // //                       ₪{faniya.totalDebt.toFixed(2)}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">יתרת חוב</div>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>

// // //           {/* טאב דוחות */}
// // //           <TabsContent value="reports" className="space-y-4">
// // //             <MonthlyReports faniyaId={faniyaId} faniyaName={faniya.name} />
// // //           </TabsContent>
// // //         </Tabs>
// // //       </div>
// // //     </Layout>
// // //   );
// // // }

// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { Layout } from '@/components/layout/Layout';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // import { Checkbox } from '@/components/ui/checkbox';
// // // import { Badge } from '@/components/ui/badge';
// // // import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
// // // import { MonthlyReports } from '@/components/reports/MonthlyReports';
// // // import { PlusCircle, Package, CreditCard, FileText, ArrowRight, Calendar, Edit, Trash2 } from 'lucide-react';

// // // interface Faniya {
// // //   id: string;
// // //   name: string;
// // //   totalDebt: number;
// // //   totalPayments: number;
// // // }

// // // interface Order {
// // //   id: string;
// // //   orderDate: string;
// // //   customerName: string;
// // //   length: number;
// // //   skinType: string;
// // //   color: string;
// // //   highlights: string;
// // //   babyHairType?: string;
// // //   openingTone?: string;
// // //   pattern: string;
// // //   notes?: string;
// // //   discount: number;
// // //   totalPrice: number;
// // //   sentToTrass: boolean;
// // //   trassOperator?: string;
// // //   trassSentDate?: string;
// // //   isCompleted: boolean;
// // //   deliveryDate?: string;
// // // }

// // // interface Payment {
// // //   id: string;
// // //   amount: number;
// // //   paymentDate: string;
// // //   paymentType: string;
// // //   checkDueDate?: string;
// // //   notes?: string;
// // // }

// // // export default function FaniyaPage() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const faniyaId = params.id as string;
  
// // //   const [faniya, setFaniya] = useState<Faniya | null>(null);
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [payments, setPayments] = useState<Payment[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [activeTab, setActiveTab] = useState('new-order');

// // //   // States לטופס הזמנה חדשה
// // //   const [orderForm, setOrderForm] = useState({
// // //     customerName: '',
// // //     length: '',
// // //     skinType: 'רגיל',
// // //     color: '',
// // //     highlights: 'ללא גוונים',
// // //     babyHairType: '',
// // //     openingTone: '',
// // //     pattern: 'ייבוש טבעי תנועה גדולה',
// // //     notes: '',
// // //     discount: '0',
// // //     sentToTrass: false,
// // //     trassOperator: '',
// // //     trassSentDate: ''
// // //   });

// // //   // State לטופס תשלום חדש
// // //   const [paymentForm, setPaymentForm] = useState({
// // //     amount: '',
// // //     paymentType: 'מזומן',
// // //     checkDueDate: '',
// // //     notes: ''
// // //   });

// // //   useEffect(() => {
// // //     if (faniyaId) {
// // //       fetchFaniyaData();
// // //     }
// // //   }, [faniyaId]);

// // //   const fetchFaniyaData = async () => {
// // //     try {
// // //       // טעינת פרטי פאנית
// // //       const faniyaRes = await fetch(`/api/faniyas/${faniyaId}`);
// // //       if (faniyaRes.ok) {
// // //         const faniyaData = await faniyaRes.json();
// // //         setFaniya(faniyaData);
// // //       }

// // //       // טעינת הזמנות
// // //       const ordersRes = await fetch(`/api/orders?faniyaId=${faniyaId}`);
// // //       if (ordersRes.ok) {
// // //         const ordersData = await ordersRes.json();
// // //         setOrders(ordersData);
// // //       }

// // //       // טעינת תשלומים
// // //       const paymentsRes = await fetch(`/api/payments?faniyaId=${faniyaId}`);
// // //       if (paymentsRes.ok) {
// // //         const paymentsData = await paymentsRes.json();
// // //         setPayments(paymentsData);
// // //       }

// // //     } catch (error) {
// // //       console.error('שגיאה בטעינת נתונים:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const calculatePrice = () => {
// // //     const length = parseInt(orderForm.length) || 0;
// // //     const pricePerCm = orderForm.skinType === 'רגיל' ? 15 : 18;
// // //     const discount = parseFloat(orderForm.discount) || 0;
// // //     return Math.max(0, (length * pricePerCm) - discount);
// // //   };

// // //   const handleOrderSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     if (!orderForm.customerName || !orderForm.length || !orderForm.color) {
// // //       alert('אנא מלא את כל השדות החובה');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('/api/orders', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           faniyaId,
// // //           ...orderForm,
// // //           length: parseInt(orderForm.length),
// // //           discount: parseFloat(orderForm.discount) || 0,
// // //           totalPrice: calculatePrice(),
// // //           trassSentDate: orderForm.trassSentDate || null
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('הזמנה נוספה בהצלחה!');
// // //         setOrderForm({
// // //           customerName: '',
// // //           length: '',
// // //           skinType: 'רגיל',
// // //           color: '',
// // //           highlights: 'ללא גוונים',
// // //           babyHairType: '',
// // //           openingTone: '',
// // //           pattern: 'ייבוש טבעי תנועה גדולה',
// // //           notes: '',
// // //           discount: '0',
// // //           sentToTrass: false,
// // //           trassOperator: '',
// // //           trassSentDate: ''
// // //         });
// // //         fetchFaniyaData();
// // //         setActiveTab('pending');
// // //       } else {
// // //         const error = await response.json();
// // //         alert(`שגיאה: ${error.error}`);
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בהוספת הזמנה');
// // //     }
// // //   };

// // //   const handlePaymentSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     if (!paymentForm.amount) {
// // //       alert('אנא הכנס סכום');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('/api/payments', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           faniyaId,
// // //           ...paymentForm,
// // //           amount: parseFloat(paymentForm.amount),
// // //           checkDueDate: paymentForm.checkDueDate || null
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('תשלום נוסף בהצלחה!');
// // //         setPaymentForm({
// // //           amount: '',
// // //           paymentType: 'מזומן',
// // //           checkDueDate: '',
// // //           notes: ''
// // //         });
// // //         fetchFaniyaData();
// // //       } else {
// // //         const error = await response.json();
// // //         alert(`שגיאה: ${error.error}`);
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בהוספת תשלום');
// // //     }
// // //   };

// // //   const markAsDelivered = async (orderId: string) => {
// // //     try {
// // //       const response = await fetch(`/api/orders/${orderId}`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           deliveryDate: new Date().toISOString(),
// // //           isCompleted: true
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('הזמנה סומנה כנמסרה!');
// // //         fetchFaniyaData();
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בעדכון הזמנה');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Layout>
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   if (!faniya) {
// // //     return (
// // //       <Layout>
// // //         <div className="text-center py-12">
// // //           <h2 className="text-2xl font-bold text-gray-900 mb-4">פאנית לא נמצאה</h2>
// // //           <Button onClick={() => router.push('/')}>חזור לדף הבית</Button>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   const pendingOrders = orders.filter(order => !order.isCompleted);
// // //   const completedOrders = orders.filter(order => order.isCompleted);

// // //   return (
// // //     <Layout>
// // //       <div className="space-y-6">
// // //         {/* כותרת וסטטיסטיקות */}
// // //         <div>
// // //           <div className="flex justify-between items-center mb-6">
// // //             <div>
// // //               <Button variant="outline" onClick={() => router.push('/')} className="mb-4">
// // //                 ← חזור לדף הבית
// // //               </Button>
// // //               <h1 className="text-3xl font-bold text-gray-900">{faniya.name}</h1>
// // //             </div>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
// // //                 <Package className="h-4 w-4 text-orange-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-orange-600">{pendingOrders.length}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
// // //                 <Package className="h-4 w-4 text-green-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">סה״כ תשלומים</CardTitle>
// // //                 <CreditCard className="h-4 w-4 text-blue-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">יתרת חוב</CardTitle>
// // //                 <CreditCard className="h-4 w-4 text-red-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// // //                   ₪{faniya.totalDebt.toFixed(2)}
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </div>
// // //         </div>

// // //         {/* תפריט טאבים */}
// // //         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
// // //           <TabsList className="grid w-full grid-cols-5">
// // //             <TabsTrigger value="new-order">הזמנה חדשה</TabsTrigger>
// // //             <TabsTrigger value="pending">לא מוכנות ({pendingOrders.length})</TabsTrigger>
// // //             <TabsTrigger value="completed">מוכנות ({completedOrders.length})</TabsTrigger>
// // //             <TabsTrigger value="payments">תשלומים ({payments.length})</TabsTrigger>
// // //             <TabsTrigger value="reports">דוחות</TabsTrigger>
// // //           </TabsList>

// // //           {/* טאב הזמנה חדשה */}
// // //           <TabsContent value="new-order" className="space-y-4">
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>הזמנה חדשה</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <form onSubmit={handleOrderSubmit} className="space-y-6">
// // //                   {/* פרטים בסיסיים */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="customerName">שם הלקוחה *</Label>
// // //                       <Input
// // //                         id="customerName"
// // //                         value={orderForm.customerName}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>
                    
// // //                     <div>
// // //                       <Label htmlFor="length">אורך הפאה (ס"מ) *</Label>
// // //                       <Input
// // //                         id="length"
// // //                         type="number"
// // //                         min="1"
// // //                         value={orderForm.length}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, length: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* מפרטי הפאה */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="skinType">סוג סקין *</Label>
// // //                       <Select value={orderForm.skinType} onValueChange={(value) => setOrderForm(prev => ({ ...prev, skinType: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="רגיל">רגיל (₪15 לס"מ)</SelectItem>
// // //                           <SelectItem value="מאוורר">מאוורר (₪18 לס"מ)</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="color">צבע *</Label>
// // //                       <Input
// // //                         id="color"
// // //                         value={orderForm.color}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, color: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="highlights">גוונים בפאה</Label>
// // //                       <Select value={orderForm.highlights} onValueChange={(value) => setOrderForm(prev => ({ ...prev, highlights: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="עדינים">עדינים</SelectItem>
// // //                           <SelectItem value="ללא גוונים">ללא גוונים</SelectItem>
// // //                           <SelectItem value="בולטים">בולטים</SelectItem>
// // //                           <SelectItem value="אחר">אחר</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="pattern">דוגמת פאה</Label>
// // //                       <Select value={orderForm.pattern} onValueChange={(value) => setOrderForm(prev => ({ ...prev, pattern: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="ייבוש טבעי תנועה גדולה">ייבוש טבעי תנועה גדולה</SelectItem>
// // //                           <SelectItem value="תלתלים">תלתלים</SelectItem>
// // //                           <SelectItem value="חלק גמיש">חלק גמיש</SelectItem>
// // //                           <SelectItem value="אחר">אחר</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="babyHairType">סוג בייביהר</Label>
// // //                       <Input
// // //                         id="babyHairType"
// // //                         value={orderForm.babyHairType}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, babyHairType: e.target.value }))}
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="openingTone">גוון פתיחה</Label>
// // //                       <Input
// // //                         id="openingTone"
// // //                         value={orderForm.openingTone}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, openingTone: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* מחיר והנחה */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
// // //                     <div>
// // //                       <Label htmlFor="discount">הנחה (₪)</Label>
// // //                       <Input
// // //                         id="discount"
// // //                         type="number"
// // //                         min="0"
// // //                         step="0.01"
// // //                         value={orderForm.discount}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, discount: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                     <div className="flex items-end">
// // //                       <div className="text-lg font-semibold">
// // //                         מחיר סופי: ₪{calculatePrice().toFixed(2)}
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* טרסים */}
// // //                   <div className="border-t pt-4">
// // //                     <div className="flex items-center space-x-2 mb-4">
// // //                       <Checkbox
// // //                         id="sentToTrass"
// // //                         checked={orderForm.sentToTrass}
// // //                         onCheckedChange={(checked) => setOrderForm(prev => ({ ...prev, sentToTrass: !!checked }))}
// // //                       />
// // //                       <Label htmlFor="sentToTrass">נשלח לטרסים</Label>
// // //                     </div>

// // //                     {orderForm.sentToTrass && (
// // //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
// // //                         <div>
// // //                           <Label htmlFor="trassOperator">אופר טרסים</Label>
// // //                           <Select value={orderForm.trassOperator} onValueChange={(value) => setOrderForm(prev => ({ ...prev, trassOperator: value }))}>
// // //                             <SelectTrigger>
// // //                               <SelectValue placeholder="בחר אופר" />
// // //                             </SelectTrigger>
// // //                             <SelectContent>
// // //                               <SelectItem value="לאופר">לאופר</SelectItem>
// // //                               <SelectItem value="שורי">שורי</SelectItem>
// // //                             </SelectContent>
// // //                           </Select>
// // //                         </div>

// // //                         <div>
// // //                           <Label htmlFor="trassSentDate">תאריך שליחה לטרסים</Label>
// // //                           <Input
// // //                             id="trassSentDate"
// // //                             type="date"
// // //                             value={orderForm.trassSentDate}
// // //                             onChange={(e) => setOrderForm(prev => ({ ...prev, trassSentDate: e.target.value }))}
// // //                           />
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* הערות */}
// // //                   <div>
// // //                     <Label htmlFor="notes">הערות</Label>
// // //                     <Textarea
// // //                       id="notes"
// // //                       value={orderForm.notes}
// // //                       onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
// // //                       rows={3}
// // //                     />
// // //                   </div>

// // //                   {/* כפתורים */}
// // //                   <div className="flex justify-end space-x-4">
// // //                     <Button type="submit" className="flex items-center gap-2">
// // //                       <PlusCircle className="w-4 h-4" />
// // //                       שמור הזמנה
// // //                     </Button>
// // //                   </div>
// // //                 </form>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>

// // //           {/* טאב הזמנות ממתינות */}
// // //           <TabsContent value="pending" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">הזמנות ממתינות ({pendingOrders.length})</h3>
// // //             </div>
            
// // //             <div className="grid gap-4">
// // //               {pendingOrders.length === 0 ? (
// // //                 <Card>
// // //                   <CardContent className="p-6 text-center text-gray-500">
// // //                     אין הזמנות ממתינות
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : (
// // //                 pendingOrders.map((order) => (
// // //                   <Card key={order.id}>
// // //                     <CardContent className="p-6">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <div>
// // //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// // //                           <p className="text-sm text-gray-600">הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// // //                         </div>
// // //                         <div className="text-left">
// // //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// // //                           <Badge variant="outline" className="mt-1">ממתינה</Badge>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                         <div>
// // //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">סקין:</span> {order.skinType}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">צבע:</span> {order.color}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">גוונים:</span> {order.highlights}
// // //                         </div>
// // //                       </div>

// // //                       {order.sentToTrass && (
// // //                         <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
// // //                           <span className="font-medium">נשלח לטרסים:</span> {order.trassOperator} 
// // //                           {order.trassSentDate && ` בתאריך ${new Date(order.trassSentDate).toLocaleDateString('he-IL')}`}
// // //                         </div>
// // //                       )}

// // //                       {order.notes && (
// // //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// // //                           <span className="font-medium">הערות:</span> {order.notes}
// // //                         </div>
// // //                       )}

// // //                       <div className="flex justify-end mt-4 space-x-2">
// // //                         <AlertDialog>
// // //                           <AlertDialogTrigger asChild>
// // //                             <Button size="sm" className="flex items-center gap-2">
// // //                               <ArrowRight className="w-4 h-4" />
// // //                               סמן כנמסר
// // //                             </Button>
// // //                           </AlertDialogTrigger>
// // //                           <AlertDialogContent>
// // //                             <AlertDialogHeader>
// // //                               <AlertDialogTitle>סמן הזמנה כנמסרה</AlertDialogTitle>
// // //                               <AlertDialogDescription>
// // //                                 האם אתה בטוח שברצונך לסמן את ההזמנה של {order.customerName} כנמסרה?
// // //                                 פעולה זו תעביר את ההזמנה לטאב "מוכנות".
// // //                               </AlertDialogDescription>
// // //                             </AlertDialogHeader>
// // //                             <AlertDialogFooter>
// // //                               <AlertDialogCancel>ביטול</AlertDialogCancel>
// // //                               <AlertDialogAction onClick={() => markAsDelivered(order.id)}>
// // //                                 אישור
// // //                               </AlertDialogAction>
// // //                             </AlertDialogFooter>
// // //                           </AlertDialogContent>
// // //                         </AlertDialog>
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </TabsContent>

// // //           {/* טאב הזמנות מוכנות */}
// // //           <TabsContent value="completed" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">הזמנות מוכנות ({completedOrders.length})</h3>
// // //             </div>
            
// // //             <div className="grid gap-4">
// // //               {completedOrders.length === 0 ? (
// // //                 <Card>
// // //                   <CardContent className="p-6 text-center text-gray-500">
// // //                     אין הזמנות מוכנות
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : (
// // //                 completedOrders.map((order) => (
// // //                   <Card key={order.id}>
// // //                     <CardContent className="p-6">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <div>
// // //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// // //                           <div className="text-sm text-gray-600">
// // //                             <p>הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// // //                             {order.deliveryDate && (
// // //                               <p>נמסר ב: {new Date(order.deliveryDate).toLocaleDateString('he-IL')}</p>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                         <div className="text-left">
// // //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// // //                           <Badge className="mt-1 bg-green-100 text-green-800">נמסר</Badge>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                         <div>
// // //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">סקין:</span> {order.skinType}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">צבע:</span> {order.color}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">גוונים:</span> {order.highlights}
// // //                         </div>
// // //                       </div>

// // //                       {order.notes && (
// // //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// // //                           <span className="font-medium">הערות:</span> {order.notes}
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </TabsContent>

// // //           {/* טאב תשלומים */}
// // //           <TabsContent value="payments" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">תשלומים</h3>
// // //             </div>

// // //             {/* טופס תשלום חדש */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>תשלום חדש</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <form onSubmit={handlePaymentSubmit} className="space-y-4">
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="amount">סכום *</Label>
// // //                       <Input
// // //                         id="amount"
// // //                         type="number"
// // //                         min="0"
// // //                         step="0.01"
// // //                         value={paymentForm.amount}
// // //                         onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="paymentType">סוג תשלום</Label>
// // //                       <Select value={paymentForm.paymentType} onValueChange={(value) => setPaymentForm(prev => ({ ...prev, paymentType: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="מזומן">מזומן</SelectItem>
// // //                           <SelectItem value="צ'ק">צ'ק</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>
// // //                   </div>

// // //                   {paymentForm.paymentType === 'צ\'ק' && (
// // //                     <div>
// // //                       <Label htmlFor="checkDueDate">תאריך פרעון צ'ק</Label>
// // //                       <Input
// // //                         id="checkDueDate"
// // //                         type="date"
// // //                         value={paymentForm.checkDueDate}
// // //                         onChange={(e) => setPaymentForm(prev => ({ ...prev, checkDueDate: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                   )}

// // //                   <div>
// // //                     <Label htmlFor="paymentNotes">הערות</Label>
// // //                     <Textarea
// // //                       id="paymentNotes"
// // //                       value={paymentForm.notes}
// // //                       onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
// // //                       rows={2}
// // //                     />
// // //                   </div>

// // //                   <Button type="submit" className="flex items-center gap-2">
// // //                     <PlusCircle className="w-4 h-4" />
// // //                     הוסף תשלום
// // //                   </Button>
// // //                 </form>
// // //               </CardContent>
// // //             </Card>

// // //             {/* רשימת תשלומים */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>היסטוריית תשלומים</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 {payments.length === 0 ? (
// // //                   <p className="text-gray-500 text-center py-8">אין תשלומים רשומים</p>
// // //                 ) : (
// // //                   <div className="space-y-4">
// // //                     {payments.map((payment) => (
// // //                       <div key={payment.id} className="border-b pb-4 last:border-b-0">
// // //                         <div className="flex justify-between items-start">
// // //                           <div>
// // //                             <div className="font-semibold text-lg text-green-600">₪{payment.amount.toFixed(2)}</div>
// // //                             <div className="text-sm text-gray-600">
// // //                               {new Date(payment.paymentDate).toLocaleDateString('he-IL')} - {payment.paymentType}
// // //                             </div>
// // //                             {payment.paymentType === 'צ\'ק' && payment.checkDueDate && (
// // //                               <div className="text-sm text-orange-600">
// // //                                 פרעון: {new Date(payment.checkDueDate).toLocaleDateString('he-IL')}
// // //                               </div>
// // //                             )}
// // //                             {payment.notes && (
// // //                               <div className="text-sm text-gray-500 mt-1">{payment.notes}</div>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </CardContent>
// // //             </Card>

// // //             {/* סיכום תשלומים */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>סיכום</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                   <div className="text-center">
// // //                     <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// // //                     <div className="text-sm text-gray-600">סה"כ תשלומים</div>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <div className="text-2xl font-bold text-orange-600">
// // //                       ₪{completedOrders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">סה"כ הזמנות</div>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// // //                       ₪{faniya.totalDebt.toFixed(2)}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">יתרת חוב</div>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>

// // //           {/* טאב דוחות */}
// // //           <TabsContent value="reports" className="space-y-4">
// // //             <MonthlyReports faniyaId={faniyaId} faniyaName={faniya.name} />
// // //           </TabsContent>
// // //         </Tabs>
// // //       </div>
// // //     </Layout>
// // //   );
// // // }

// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { Layout } from '@/components/layout/Layout';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // import { Checkbox } from '@/components/ui/checkbox';
// // // import { Badge } from '@/components/ui/badge';
// // // import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
// // // import { CompoundPaymentForm } from '@/components/forms/CompoundPaymentForm';
// // // import { MonthlyReports } from '@/components/reports/MonthlyReports';
// // // import { PlusCircle, Package, CreditCard, FileText, ArrowRight, Calendar, Edit, Trash2 } from 'lucide-react';

// // // interface Faniya {
// // //   id: string;
// // //   name: string;
// // //   totalDebt: number;
// // //   totalPayments: number;
// // // }

// // // interface Order {
// // //   id: string;
// // //   orderDate: string;
// // //   customerName: string;
// // //   length: number;
// // //   skinType: string;
// // //   color: string;
// // //   highlights: string;
// // //   babyHairType?: string;
// // //   openingTone?: string;
// // //   pattern: string;
// // //   notes?: string;
// // //   discount: number;
// // //   totalPrice: number;
// // //   sentToTrass: boolean;
// // //   trassOperator?: string;
// // //   trassSentDate?: string;
// // //   isCompleted: boolean;
// // //   deliveryDate?: string;
// // // }

// // // interface Payment {
// // //   id: string;
// // //   amount: number;
// // //   paymentDate: string;
// // //   paymentType: string;
// // //   checkDueDate?: string;
// // //   notes?: string;
// // // }

// // // export default function FaniyaPage() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const faniyaId = params.id as string;
  
// // //   const [faniya, setFaniya] = useState<Faniya | null>(null);
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [payments, setPayments] = useState<Payment[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [activeTab, setActiveTab] = useState('new-order');

// // //   // States לטופס הזמנה חדשה
// // //   const [orderForm, setOrderForm] = useState({
// // //     customerName: '',
// // //     length: '',
// // //     skinType: 'רגיל',
// // //     color: '',
// // //     highlights: 'ללא גוונים',
// // //     babyHairType: '',
// // //     openingTone: '',
// // //     pattern: 'ייבוש טבעי תנועה גדולה',
// // //     notes: '',
// // //     discount: '0',
// // //     sentToTrass: false,
// // //     trassOperator: '',
// // //     trassSentDate: ''
// // //   });

// // //   // State לטופס תשלום מורכב
// // //   const [showPaymentForm, setShowPaymentForm] = useState(false);

// // //   useEffect(() => {
// // //     if (faniyaId) {
// // //       fetchFaniyaData();
// // //     }
// // //   }, [faniyaId]);

// // //   const fetchFaniyaData = async () => {
// // //     try {
// // //       // טעינת פרטי פאנית
// // //       const faniyaRes = await fetch(`/api/faniyas/${faniyaId}`);
// // //       if (faniyaRes.ok) {
// // //         const faniyaData = await faniyaRes.json();
// // //         setFaniya(faniyaData);
// // //       }

// // //       // טעינת הזמנות
// // //       const ordersRes = await fetch(`/api/orders?faniyaId=${faniyaId}`);
// // //       if (ordersRes.ok) {
// // //         const ordersData = await ordersRes.json();
// // //         setOrders(ordersData);
// // //       }

// // //       // טעינת תשלומים
// // //       const paymentsRes = await fetch(`/api/payments?faniyaId=${faniyaId}`);
// // //       if (paymentsRes.ok) {
// // //         const paymentsData = await paymentsRes.json();
// // //         setPayments(paymentsData);
// // //       }

// // //     } catch (error) {
// // //       console.error('שגיאה בטעינת נתונים:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const calculatePrice = () => {
// // //     const length = parseInt(orderForm.length) || 0;
// // //     const pricePerCm = orderForm.skinType === 'רגיל' ? 15 : 18;
// // //     const discount = parseFloat(orderForm.discount) || 0;
// // //     return Math.max(0, (length * pricePerCm) - discount);
// // //   };

// // //   const handleOrderSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     if (!orderForm.customerName || !orderForm.length || !orderForm.color) {
// // //       alert('אנא מלא את כל השדות החובה');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('/api/orders', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           faniyaId,
// // //           ...orderForm,
// // //           length: parseInt(orderForm.length),
// // //           discount: parseFloat(orderForm.discount) || 0,
// // //           totalPrice: calculatePrice(),
// // //           trassSentDate: orderForm.trassSentDate || null
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('הזמנה נוספה בהצלחה!');
// // //         setOrderForm({
// // //           customerName: '',
// // //           length: '',
// // //           skinType: 'רגיל',
// // //           color: '',
// // //           highlights: 'ללא גוונים',
// // //           babyHairType: '',
// // //           openingTone: '',
// // //           pattern: 'ייבוש טבעי תנועה גדולה',
// // //           notes: '',
// // //           discount: '0',
// // //           sentToTrass: false,
// // //           trassOperator: '',
// // //           trassSentDate: ''
// // //         });
// // //         fetchFaniyaData();
// // //         setActiveTab('pending');
// // //       } else {
// // //         const error = await response.json();
// // //         alert(`שגיאה: ${error.error}`);
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בהוספת הזמנה');
// // //     }
// // //   };

// // //   const handlePaymentSubmit = async (paymentData: any) => {
// // //     try {
// // //       const response = await fetch('/api/payments', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify(paymentData)
// // //       });

// // //       if (response.ok) {
// // //         alert('תשלום נוסף בהצלחה!');
// // //         setShowPaymentForm(false);
// // //         fetchFaniyaData();
// // //       } else {
// // //         const error = await response.json();
// // //         alert(`שגיאה: ${error.error}`);
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בהוספת תשלום');
// // //     }
// // //   };

// // //   const markAsDelivered = async (orderId: string) => {
// // //     try {
// // //       const response = await fetch(`/api/orders/${orderId}`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           deliveryDate: new Date().toISOString(),
// // //           isCompleted: true
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('הזמנה סומנה כנמסרה!');
// // //         fetchFaniyaData();
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בעדכון הזמנה');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Layout>
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   if (!faniya) {
// // //     return (
// // //       <Layout>
// // //         <div className="text-center py-12">
// // //           <h2 className="text-2xl font-bold text-gray-900 mb-4">פאנית לא נמצאה</h2>
// // //           <Button onClick={() => router.push('/')}>חזור לדף הבית</Button>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   const pendingOrders = orders.filter(order => !order.isCompleted);
// // //   const completedOrders = orders.filter(order => order.isCompleted);

// // //   return (
// // //     <Layout>
// // //       <div className="space-y-6">
// // //         {/* כותרת וסטטיסטיקות */}
// // //         <div>
// // //           <div className="flex justify-between items-center mb-6">
// // //             <div>
// // //               <Button variant="outline" onClick={() => router.push('/')} className="mb-4">
// // //                 ← חזור לדף הבית
// // //               </Button>
// // //               <h1 className="text-3xl font-bold text-gray-900">{faniya.name}</h1>
// // //             </div>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
// // //                 <Package className="h-4 w-4 text-orange-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-orange-600">{pendingOrders.length}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
// // //                 <Package className="h-4 w-4 text-green-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">סה״כ תשלומים</CardTitle>
// // //                 <CreditCard className="h-4 w-4 text-blue-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">יתרת חוב</CardTitle>
// // //                 <CreditCard className="h-4 w-4 text-red-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// // //                   ₪{faniya.totalDebt.toFixed(2)}
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </div>
// // //         </div>

// // //         {/* תפריט טאבים */}
// // //         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
// // //           <TabsList className="grid w-full grid-cols-5">
// // //             <TabsTrigger value="new-order">הזמנה חדשה</TabsTrigger>
// // //             <TabsTrigger value="pending">לא מוכנות ({pendingOrders.length})</TabsTrigger>
// // //             <TabsTrigger value="completed">מוכנות ({completedOrders.length})</TabsTrigger>
// // //             <TabsTrigger value="payments">תשלומים ({payments.length})</TabsTrigger>
// // //             <TabsTrigger value="reports">דוחות</TabsTrigger>
// // //           </TabsList>

// // //           {/* טאב הזמנה חדשה */}
// // //           <TabsContent value="new-order" className="space-y-4">
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>הזמנה חדשה</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <form onSubmit={handleOrderSubmit} className="space-y-6">
// // //                   {/* פרטים בסיסיים */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="customerName">שם הלקוחה *</Label>
// // //                       <Input
// // //                         id="customerName"
// // //                         value={orderForm.customerName}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>
                    
// // //                     <div>
// // //                       <Label htmlFor="length">אורך הפאה (ס"מ) *</Label>
// // //                       <Input
// // //                         id="length"
// // //                         type="number"
// // //                         min="1"
// // //                         value={orderForm.length}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, length: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* מפרטי הפאה */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="skinType">סוג סקין *</Label>
// // //                       <Select value={orderForm.skinType} onValueChange={(value) => setOrderForm(prev => ({ ...prev, skinType: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="רגיל">רגיל (₪15 לס"מ)</SelectItem>
// // //                           <SelectItem value="מאוורר">מאוורר (₪18 לס"מ)</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="color">צבע *</Label>
// // //                       <Input
// // //                         id="color"
// // //                         value={orderForm.color}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, color: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="highlights">גוונים בפאה</Label>
// // //                       <Select value={orderForm.highlights} onValueChange={(value) => setOrderForm(prev => ({ ...prev, highlights: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="עדינים">עדינים</SelectItem>
// // //                           <SelectItem value="ללא גוונים">ללא גוונים</SelectItem>
// // //                           <SelectItem value="בולטים">בולטים</SelectItem>
// // //                           <SelectItem value="אחר">אחר</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="pattern">דוגמת פאה</Label>
// // //                       <Select value={orderForm.pattern} onValueChange={(value) => setOrderForm(prev => ({ ...prev, pattern: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="ייבוש טבעי תנועה גדולה">ייבוש טבעי תנועה גדולה</SelectItem>
// // //                           <SelectItem value="תלתלים">תלתלים</SelectItem>
// // //                           <SelectItem value="חלק גמיש">חלק גמיש</SelectItem>
// // //                           <SelectItem value="אחר">אחר</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="babyHairType">סוג בייביהר</Label>
// // //                       <Input
// // //                         id="babyHairType"
// // //                         value={orderForm.babyHairType}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, babyHairType: e.target.value }))}
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="openingTone">גוון פתיחה</Label>
// // //                       <Input
// // //                         id="openingTone"
// // //                         value={orderForm.openingTone}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, openingTone: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* מחיר והנחה */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
// // //                     <div>
// // //                       <Label htmlFor="discount">הנחה (₪)</Label>
// // //                       <Input
// // //                         id="discount"
// // //                         type="number"
// // //                         min="0"
// // //                         step="0.01"
// // //                         value={orderForm.discount}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, discount: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                     <div className="flex items-end">
// // //                       <div className="text-lg font-semibold">
// // //                         מחיר סופי: ₪{calculatePrice().toFixed(2)}
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* טרסים */}
// // //                   <div className="border-t pt-4">
// // //                     <div className="flex items-center space-x-2 mb-4">
// // //                       <Checkbox
// // //                         id="sentToTrass"
// // //                         checked={orderForm.sentToTrass}
// // //                         onCheckedChange={(checked) => setOrderForm(prev => ({ ...prev, sentToTrass: !!checked }))}
// // //                       />
// // //                       <Label htmlFor="sentToTrass">נשלח לטרסים</Label>
// // //                     </div>

// // //                     {orderForm.sentToTrass && (
// // //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
// // //                         <div>
// // //                           <Label htmlFor="trassOperator">אופר טרסים</Label>
// // //                           <Select value={orderForm.trassOperator} onValueChange={(value) => setOrderForm(prev => ({ ...prev, trassOperator: value }))}>
// // //                             <SelectTrigger>
// // //                               <SelectValue placeholder="בחר אופר" />
// // //                             </SelectTrigger>
// // //                             <SelectContent>
// // //                               <SelectItem value="לאופר">לאופר</SelectItem>
// // //                               <SelectItem value="שורי">שורי</SelectItem>
// // //                             </SelectContent>
// // //                           </Select>
// // //                         </div>

// // //                         <div>
// // //                           <Label htmlFor="trassSentDate">תאריך שליחה לטרסים</Label>
// // //                           <Input
// // //                             id="trassSentDate"
// // //                             type="date"
// // //                             value={orderForm.trassSentDate}
// // //                             onChange={(e) => setOrderForm(prev => ({ ...prev, trassSentDate: e.target.value }))}
// // //                           />
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* הערות */}
// // //                   <div>
// // //                     <Label htmlFor="notes">הערות</Label>
// // //                     <Textarea
// // //                       id="notes"
// // //                       value={orderForm.notes}
// // //                       onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
// // //                       rows={3}
// // //                     />
// // //                   </div>

// // //                   {/* כפתורים */}
// // //                   <div className="flex justify-end space-x-4">
// // //                     <Button type="submit" className="flex items-center gap-2">
// // //                       <PlusCircle className="w-4 h-4" />
// // //                       שמור הזמנה
// // //                     </Button>
// // //                   </div>
// // //                 </form>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>

// // //           {/* טאב הזמנות ממתינות */}
// // //           <TabsContent value="pending" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">הזמנות ממתינות ({pendingOrders.length})</h3>
// // //             </div>
            
// // //             <div className="grid gap-4">
// // //               {pendingOrders.length === 0 ? (
// // //                 <Card>
// // //                   <CardContent className="p-6 text-center text-gray-500">
// // //                     אין הזמנות ממתינות
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : (
// // //                 pendingOrders.map((order) => (
// // //                   <Card key={order.id}>
// // //                     <CardContent className="p-6">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <div>
// // //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// // //                           <p className="text-sm text-gray-600">הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// // //                         </div>
// // //                         <div className="text-left">
// // //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// // //                           <Badge variant="outline" className="mt-1">ממתינה</Badge>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                         <div>
// // //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">סקין:</span> {order.skinType}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">צבע:</span> {order.color}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">גוונים:</span> {order.highlights}
// // //                         </div>
// // //                       </div>

// // //                       {order.sentToTrass && (
// // //                         <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
// // //                           <span className="font-medium">נשלח לטרסים:</span> {order.trassOperator} 
// // //                           {order.trassSentDate && ` בתאריך ${new Date(order.trassSentDate).toLocaleDateString('he-IL')}`}
// // //                         </div>
// // //                       )}

// // //                       {order.notes && (
// // //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// // //                           <span className="font-medium">הערות:</span> {order.notes}
// // //                         </div>
// // //                       )}

// // //                       <div className="flex justify-end mt-4 space-x-2">
// // //                         <AlertDialog>
// // //                           <AlertDialogTrigger asChild>
// // //                             <Button size="sm" className="flex items-center gap-2">
// // //                               <ArrowRight className="w-4 h-4" />
// // //                               סמן כנמסר
// // //                             </Button>
// // //                           </AlertDialogTrigger>
// // //                           <AlertDialogContent>
// // //                             <AlertDialogHeader>
// // //                               <AlertDialogTitle>סמן הזמנה כנמסרה</AlertDialogTitle>
// // //                               <AlertDialogDescription>
// // //                                 האם אתה בטוח שברצונך לסמן את ההזמנה של {order.customerName} כנמסרה?
// // //                                 פעולה זו תעביר את ההזמנה לטאב "מוכנות".
// // //                               </AlertDialogDescription>
// // //                             </AlertDialogHeader>
// // //                             <AlertDialogFooter>
// // //                               <AlertDialogCancel>ביטול</AlertDialogCancel>
// // //                               <AlertDialogAction onClick={() => markAsDelivered(order.id)}>
// // //                                 אישור
// // //                               </AlertDialogAction>
// // //                             </AlertDialogFooter>
// // //                           </AlertDialogContent>
// // //                         </AlertDialog>
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </TabsContent>

// // //           {/* טאב הזמנות מוכנות */}
// // //           <TabsContent value="completed" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">הזמנות מוכנות ({completedOrders.length})</h3>
// // //             </div>
            
// // //             <div className="grid gap-4">
// // //               {completedOrders.length === 0 ? (
// // //                 <Card>
// // //                   <CardContent className="p-6 text-center text-gray-500">
// // //                     אין הזמנות מוכנות
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : (
// // //                 completedOrders.map((order) => (
// // //                   <Card key={order.id}>
// // //                     <CardContent className="p-6">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <div>
// // //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// // //                           <div className="text-sm text-gray-600">
// // //                             <p>הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// // //                             {order.deliveryDate && (
// // //                               <p>נמסר ב: {new Date(order.deliveryDate).toLocaleDateString('he-IL')}</p>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                         <div className="text-left">
// // //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// // //                           <Badge className="mt-1 bg-green-100 text-green-800">נמסר</Badge>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                         <div>
// // //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">סקין:</span> {order.skinType}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">צבע:</span> {order.color}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">גוונים:</span> {order.highlights}
// // //                         </div>
// // //                       </div>

// // //                       {order.notes && (
// // //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// // //                           <span className="font-medium">הערות:</span> {order.notes}
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </TabsContent>

// // //           {/* טאב תשלומים */}
// // //           <TabsContent value="payments" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">תשלומים</h3>
// // //               <Button 
// // //                 onClick={() => setShowPaymentForm(!showPaymentForm)}
// // //                 className="flex items-center gap-2"
// // //               >
// // //                 <PlusCircle className="w-4 h-4" />
// // //                 {showPaymentForm ? 'ביטול' : 'תשלום חדש'}
// // //               </Button>
// // //             </div>

// // //             {/* טופס תשלום מורכב */}
// // //             {showPaymentForm && (
// // //               <CompoundPaymentForm
// // //                 faniyaId={faniyaId}
// // //                 onSubmit={handlePaymentSubmit}
// // //                 onCancel={() => setShowPaymentForm(false)}
// // //               />
// // //             )}

// // //             {/* רשימת תשלומים */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>היסטוריית תשלומים</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 {payments.length === 0 ? (
// // //                   <p className="text-gray-500 text-center py-8">אין תשלומים רשומים</p>
// // //                 ) : (
// // //                   <div className="space-y-4">
// // //                     {payments.map((payment: any) => (
// // //                       <div key={payment.id} className="border rounded-lg p-4">
// // //                         <div className="flex justify-between items-start mb-3">
// // //                           <div>
// // //                             <div className="font-semibold text-lg text-green-600">₪{payment.totalAmount?.toFixed(2) || payment.amount?.toFixed(2)}</div>
// // //                             <div className="text-sm text-gray-600">
// // //                               {new Date(payment.paymentDate).toLocaleDateString('he-IL')}
// // //                             </div>
// // //                             {payment.notes && (
// // //                               <div className="text-sm text-gray-500 mt-1">{payment.notes}</div>
// // //                             )}
// // //                           </div>
// // //                         </div>

// // //                         {/* הצגת חלקי התשלום */}
// // //                         {payment.paymentParts && payment.paymentParts.length > 0 ? (
// // //                           <div className="space-y-2">
// // //                             <div className="text-sm font-medium text-gray-700">פירוט התשלום:</div>
// // //                             {payment.paymentParts.map((part: any, index: number) => (
// // //                               <div key={part.id} className="bg-gray-50 p-3 rounded text-sm">
// // //                                 <div className="flex justify-between items-start">
// // //                                   <div className="flex items-center gap-2">
// // //                                     {part.paymentType === 'מזומן' && <span>💵</span>}
// // //                                     {part.paymentType === 'צ\'ק' && <span>🧾</span>}
// // //                                     {part.paymentType === 'העברה בנקאית' && <span>🏦</span>}
// // //                                     <span className="font-medium">{part.paymentType}</span>
// // //                                   </div>
// // //                                   <span className="font-bold text-green-600">₪{part.amount.toFixed(2)}</span>
// // //                                 </div>
                                
// // //                                 {part.paymentType === 'צ\'ק' && (
// // //                                   <div className="mt-1 text-gray-600">
// // //                                     {part.checkNumber && <span>צ'ק מס׳ {part.checkNumber}</span>}
// // //                                     {part.checkDueDate && (
// // //                                       <span className="mr-2">
// // //                                         פרעון: {new Date(part.checkDueDate).toLocaleDateString('he-IL')}
// // //                                       </span>
// // //                                     )}
// // //                                   </div>
// // //                                 )}
                                
// // //                                 {part.paymentType === 'העברה בנקאית' && part.bankReference && (
// // //                                   <div className="mt-1 text-gray-600">
// // //                                     אסמכתא: {part.bankReference}
// // //                                   </div>
// // //                                 )}
                                
// // //                                 {part.notes && (
// // //                                   <div className="mt-1 text-gray-500 text-xs">{part.notes}</div>
// // //                                 )}
// // //                               </div>
// // //                             ))}
// // //                           </div>
// // //                         ) : (
// // //                           // תשלום ישן (לתאימות לאחור)
// // //                           <div className="text-sm text-gray-600">
// // //                             {payment.paymentType || 'לא צוין'} 
// // //                             {payment.checkDueDate && (
// // //                               <span className="mr-2">
// // //                                 | פרעון: {new Date(payment.checkDueDate).toLocaleDateString('he-IL')}
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </CardContent>
// // //             </Card>

// // //             {/* סיכום תשלומים */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>סיכום</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                   <div className="text-center">
// // //                     <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// // //                     <div className="text-sm text-gray-600">סה"כ תשלומים</div>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <div className="text-2xl font-bold text-orange-600">
// // //                       ₪{completedOrders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">סה"כ הזמנות</div>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// // //                       ₪{faniya.totalDebt.toFixed(2)}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">יתרת חוב</div>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>

// // //           {/* טאב דוחות */}
// // //           <TabsContent value="reports" className="space-y-4">
// // //             <MonthlyReports faniyaId={faniyaId} faniyaName={faniya.name} />
// // //           </TabsContent>
// // //         </Tabs>
// // //       </div>
// // //     </Layout>
// // //   );
// // // }
// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { Layout } from '@/components/layout/Layout';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // import { Checkbox } from '@/components/ui/checkbox';
// // // import { Badge } from '@/components/ui/badge';
// // // import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
// // // import { CompoundPaymentForm } from '@/components/forms/CompoundPaymentForm';
// // // import { MonthlyReports } from '@/components/reports/MonthlyReports';
// // // import { PlusCircle, Package, CreditCard, FileText, ArrowRight, Calendar, Edit, Trash2 } from 'lucide-react';

// // // interface Faniya {
// // //   id: string;
// // //   name: string;
// // //   totalDebt: number;
// // //   totalPayments: number;
// // // }

// // // interface Order {
// // //   id: string;
// // //   orderDate: string;
// // //   customerName: string;
// // //   length: number;
// // //   skinType: string;
// // //   color: string;
// // //   highlights: string;
// // //   babyHairType?: string;
// // //   openingTone?: string;
// // //   pattern: string;
// // //   notes?: string;
// // //   discount: number;
// // //   totalPrice: number;
// // //   sentToTrass: boolean;
// // //   trassOperator?: string;
// // //   trassSentDate?: string;
// // //   isCompleted: boolean;
// // //   deliveryDate?: string;
// // // }

// // // interface Payment {
// // //   id: string;
// // //   amount: number;
// // //   paymentDate: string;
// // //   paymentType: string;
// // //   checkDueDate?: string;
// // //   notes?: string;
// // // }

// // // export default function FaniyaPage() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const faniyaId = params.id as string;
  
// // //   const [faniya, setFaniya] = useState<Faniya | null>(null);
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [payments, setPayments] = useState<Payment[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [activeTab, setActiveTab] = useState('new-order');

// // //   // States לטופס הזמנה חדשה
// // //   const [orderForm, setOrderForm] = useState({
// // //     customerName: '',
// // //     length: '',
// // //     skinType: 'רגיל',
// // //     color: '',
// // //     highlights: 'ללא גוונים',
// // //     babyHairType: '',
// // //     openingTone: '',
// // //     pattern: 'ייבוש טבעי תנועה גדולה',
// // //     notes: '',
// // //     discount: '0',
// // //     sentToTrass: false,
// // //     trassOperator: '',
// // //     trassSentDate: ''
// // //   });

// // //   // State לטופס תשלום מורכב
// // //   const [showPaymentForm, setShowPaymentForm] = useState(false);

// // //   useEffect(() => {
// // //     if (faniyaId) {
// // //       fetchFaniyaData();
// // //     }
// // //   }, [faniyaId]);

// // //   const fetchFaniyaData = async () => {
// // //     try {
// // //       // טעינת פרטי פאנית
// // //       const faniyaRes = await fetch(`/api/faniyas/${faniyaId}`);
// // //       if (faniyaRes.ok) {
// // //         const faniyaData = await faniyaRes.json();
// // //         setFaniya(faniyaData);
// // //       }

// // //       // טעינת הזמנות
// // //       const ordersRes = await fetch(`/api/orders?faniyaId=${faniyaId}`);
// // //       if (ordersRes.ok) {
// // //         const ordersData = await ordersRes.json();
// // //         setOrders(ordersData);
// // //       }

// // //       // טעינת תשלומים
// // //       const paymentsRes = await fetch(`/api/payments?faniyaId=${faniyaId}`);
// // //       if (paymentsRes.ok) {
// // //         const paymentsData = await paymentsRes.json();
// // //         setPayments(paymentsData);
// // //       }

// // //     } catch (error) {
// // //       console.error('שגיאה בטעינת נתונים:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const calculatePrice = () => {
// // //     const length = parseInt(orderForm.length) || 0;
// // //     const pricePerCm = orderForm.skinType === 'רגיל' ? 15 : 18;
// // //     const discount = parseFloat(orderForm.discount) || 0;
// // //     return Math.max(0, (length * pricePerCm) - discount);
// // //   };

// // //   const handleOrderSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     if (!orderForm.customerName || !orderForm.length || !orderForm.color) {
// // //       alert('אנא מלא את כל השדות החובה');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('/api/orders', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           faniyaId,
// // //           ...orderForm,
// // //           length: parseInt(orderForm.length),
// // //           discount: parseFloat(orderForm.discount) || 0,
// // //           totalPrice: calculatePrice(),
// // //           trassSentDate: orderForm.trassSentDate || null
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('הזמנה נוספה בהצלחה!');
// // //         setOrderForm({
// // //           customerName: '',
// // //           length: '',
// // //           skinType: 'רגיל',
// // //           color: '',
// // //           highlights: 'ללא גוונים',
// // //           babyHairType: '',
// // //           openingTone: '',
// // //           pattern: 'ייבוש טבעי תנועה גדולה',
// // //           notes: '',
// // //           discount: '0',
// // //           sentToTrass: false,
// // //           trassOperator: '',
// // //           trassSentDate: ''
// // //         });
// // //         fetchFaniyaData();
// // //         setActiveTab('pending');
// // //       } else {
// // //         const error = await response.json();
// // //         alert(`שגיאה: ${error.error}`);
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בהוספת הזמנה');
// // //     }
// // //   };

// // //   const handlePaymentSubmit = async (paymentData: any) => {
// // //     try {
// // //       const response = await fetch('/api/payments', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify(paymentData)
// // //       });

// // //       if (response.ok) {
// // //         alert('תשלום נוסף בהצלחה!');
// // //         setShowPaymentForm(false);
// // //         fetchFaniyaData();
// // //       } else {
// // //         const error = await response.json();
// // //         alert(`שגיאה: ${error.error}`);
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בהוספת תשלום');
// // //     }
// // //   };

// // //   const markAsDelivered = async (orderId: string) => {
// // //     try {
// // //       const response = await fetch(`/api/orders/${orderId}`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           deliveryDate: new Date().toISOString(),
// // //           isCompleted: true
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         alert('הזמנה סומנה כנמסרה!');
// // //         fetchFaniyaData();
// // //       }
// // //     } catch (error) {
// // //       alert('שגיאה בעדכון הזמנה');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Layout>
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   if (!faniya) {
// // //     return (
// // //       <Layout>
// // //         <div className="text-center py-12">
// // //           <h2 className="text-2xl font-bold text-gray-900 mb-4">פאנית לא נמצאה</h2>
// // //           <Button onClick={() => router.push('/')}>חזור לדף הבית</Button>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   const pendingOrders = orders.filter(order => !order.isCompleted);
// // //   const completedOrders = orders.filter(order => order.isCompleted);

// // //   return (
// // //     <Layout>
// // //       <div className="space-y-6" dir="rtl">
// // //         {/* כותרת וסטטיסטיקות */}
// // //         <div>
// // //           <div className="flex justify-between items-center mb-6">
// // //             <div>
// // //               <Button variant="outline" onClick={() => router.push('/')} className="mb-4">
// // // → חזור לדף הבית 
// // //                </Button>
// // //               <h1 className="text-3xl font-bold text-gray-900">{faniya.name}</h1>
// // //             </div>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
// // //                 <Package className="h-4 w-4 text-orange-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-orange-600">{pendingOrders.length}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
// // //                 <Package className="h-4 w-4 text-green-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">סה״כ תשלומים</CardTitle>
// // //                 <CreditCard className="h-4 w-4 text-blue-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card>
// // //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //                 <CardTitle className="text-sm font-medium">יתרת חוב</CardTitle>
// // //                 <CreditCard className="h-4 w-4 text-red-500" />
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// // //                   ₪{faniya.totalDebt.toFixed(2)}
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </div>
// // //         </div>

// // //         {/* תפריט טאבים */}
// // //         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
// // //           <TabsList className="grid w-full grid-cols-5">
// // //             <TabsTrigger value="new-order">הזמנה חדשה</TabsTrigger>
// // //             <TabsTrigger value="pending">לא מוכנות ({pendingOrders.length})</TabsTrigger>
// // //             <TabsTrigger value="completed">מוכנות ({completedOrders.length})</TabsTrigger>
// // //             <TabsTrigger value="payments">תשלומים ({payments.length})</TabsTrigger>
// // //             <TabsTrigger value="reports">דוחות</TabsTrigger>
// // //           </TabsList>

// // //           {/* טאב הזמנה חדשה */}
// // //           <TabsContent value="new-order" className="space-y-4">
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>הזמנה חדשה</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <form onSubmit={handleOrderSubmit} className="space-y-6" dir="rtl">
// // //                   {/* פרטים בסיסיים */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="customerName">שם הלקוחה *</Label>
// // //                       <Input
// // //                         id="customerName"
// // //                         value={orderForm.customerName}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>
                    
// // //                     <div>
// // //                       <Label htmlFor="length">אורך הפאה (ס"מ) *</Label>
// // //                       <Input
// // //                         id="length"
// // //                         type="number"
// // //                         min="1"
// // //                         value={orderForm.length}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, length: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* מפרטי הפאה */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="skinType">סוג סקין *</Label>
// // //                       <Select value={orderForm.skinType} onValueChange={(value) => setOrderForm(prev => ({ ...prev, skinType: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="רגיל">רגיל (₪15 לס"מ)</SelectItem>
// // //                           <SelectItem value="מאוורר">מאוורר (₪18 לס"מ)</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="color">צבע *</Label>
// // //                       <Input
// // //                         id="color"
// // //                         value={orderForm.color}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, color: e.target.value }))}
// // //                         required
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="highlights">גוונים בפאה</Label>
// // //                       <Select value={orderForm.highlights} onValueChange={(value) => setOrderForm(prev => ({ ...prev, highlights: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="עדינים">עדינים</SelectItem>
// // //                           <SelectItem value="ללא גוונים">ללא גוונים</SelectItem>
// // //                           <SelectItem value="בולטים">בולטים</SelectItem>
// // //                           <SelectItem value="אחר">אחר</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="pattern">דוגמת פאה</Label>
// // //                       <Select value={orderForm.pattern} onValueChange={(value) => setOrderForm(prev => ({ ...prev, pattern: value }))}>
// // //                         <SelectTrigger>
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="ייבוש טבעי תנועה גדולה">ייבוש טבעי תנועה גדולה</SelectItem>
// // //                           <SelectItem value="תלתלים">תלתלים</SelectItem>
// // //                           <SelectItem value="חלק גמיש">חלק גמיש</SelectItem>
// // //                           <SelectItem value="אחר">אחר</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="babyHairType">סוג בייביהר</Label>
// // //                       <Input
// // //                         id="babyHairType"
// // //                         value={orderForm.babyHairType}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, babyHairType: e.target.value }))}
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="openingTone">גוון פתיחה</Label>
// // //                       <Input
// // //                         id="openingTone"
// // //                         value={orderForm.openingTone}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, openingTone: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* מחיר והנחה */}
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
// // //                     <div>
// // //                       <Label htmlFor="discount">הנחה (₪)</Label>
// // //                       <Input
// // //                         id="discount"
// // //                         type="number"
// // //                         min="0"
// // //                         step="0.01"
// // //                         value={orderForm.discount}
// // //                         onChange={(e) => setOrderForm(prev => ({ ...prev, discount: e.target.value }))}
// // //                       />
// // //                     </div>
// // //                     <div className="flex items-end">
// // //                       <div className="text-lg font-semibold">
// // //                         מחיר סופי: ₪{calculatePrice().toFixed(2)}
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* טרסים */}
// // //                   <div className="border-t pt-4">
// // //                     <div className="flex items-center space-x-2 mb-4">
// // //                       <Checkbox
// // //                         id="sentToTrass"
// // //                         checked={orderForm.sentToTrass}
// // //                         onCheckedChange={(checked) => setOrderForm(prev => ({ ...prev, sentToTrass: !!checked }))}
// // //                       />
// // //                       <Label htmlFor="sentToTrass">נשלח לטרסים</Label>
// // //                     </div>

// // //                     {orderForm.sentToTrass && (
// // //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
// // //                         <div>
// // //                           <Label htmlFor="trassOperator"> טרסים</Label>
// // //                           <Select value={orderForm.trassOperator} onValueChange={(value) => setOrderForm(prev => ({ ...prev, trassOperator: value }))}>
// // //                             <SelectTrigger>
// // //                               <SelectValue placeholder="בחר אופן" />
// // //                             </SelectTrigger>
// // //                             <SelectContent>
// // //                               <SelectItem value="לאופר">לאופר</SelectItem>
// // //                               <SelectItem value="שורי">שורי</SelectItem>
// // //                             </SelectContent>
// // //                           </Select>
// // //                         </div>

// // //                         <div>
// // //                           <Label htmlFor="trassSentDate">תאריך שליחה לטרסים</Label>
// // //                           <Input
// // //                             id="trassSentDate"
// // //                             type="date"
// // //                             value={orderForm.trassSentDate}
// // //                             onChange={(e) => setOrderForm(prev => ({ ...prev, trassSentDate: e.target.value }))}
// // //                           />
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* הערות */}
// // //                   <div>
// // //                     <Label htmlFor="notes">הערות</Label>
// // //                     <Textarea
// // //                       id="notes"
// // //                       value={orderForm.notes}
// // //                       onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
// // //                       rows={3}
// // //                     />
// // //                   </div>

// // //                   {/* כפתורים */}
// // //                   <div className="flex justify-end space-x-4">
// // //                     <Button type="submit" className="flex items-center gap-2">
// // //                       <PlusCircle className="w-4 h-4" />
// // //                       שמור הזמנה
// // //                     </Button>
// // //                   </div>
// // //                 </form>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>

// // //           {/* טאב הזמנות ממתינות */}
// // //           <TabsContent value="pending" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">הזמנות ממתינות ({pendingOrders.length})</h3>
// // //             </div>
            
// // //             <div className="grid gap-4">
// // //               {pendingOrders.length === 0 ? (
// // //                 <Card>
// // //                   <CardContent className="p-6 text-center text-gray-500">
// // //                     אין הזמנות ממתינות
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : (
// // //                 pendingOrders.map((order) => (
// // //                   <Card key={order.id}>
// // //                     <CardContent className="p-6">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <div>
// // //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// // //                           <p className="text-sm text-gray-600">הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// // //                         </div>
// // //                         <div className="text-left">
// // //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// // //                           <Badge variant="outline" className="mt-1">ממתינה</Badge>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                         <div>
// // //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">סקין:</span> {order.skinType}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">צבע:</span> {order.color}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">גוונים:</span> {order.highlights}
// // //                         </div>
// // //                       </div>

// // //                       {order.sentToTrass && (
// // //                         <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
// // //                           <span className="font-medium">נשלח לטרסים:</span> {order.trassOperator} 
// // //                           {order.trassSentDate && ` בתאריך ${new Date(order.trassSentDate).toLocaleDateString('he-IL')}`}
// // //                         </div>
// // //                       )}

// // //                       {order.notes && (
// // //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// // //                           <span className="font-medium">הערות:</span> {order.notes}
// // //                         </div>
// // //                       )}

// // //                       <div className="flex justify-end mt-4 space-x-2">
// // //                         <AlertDialog>
// // //                           <AlertDialogTrigger asChild>
// // //                             <Button size="sm" className="flex items-center gap-2">
// // //                               <ArrowRight className="w-4 h-4" />
// // //                               סמן כנמסר
// // //                             </Button>
// // //                           </AlertDialogTrigger>
// // //                           <AlertDialogContent>
// // //                             <AlertDialogHeader>
// // //                               <AlertDialogTitle>סמן הזמנה כנמסרה</AlertDialogTitle>
// // //                               <AlertDialogDescription>
// // //                                 האם אתה בטוח שברצונך לסמן את ההזמנה של {order.customerName} כנמסרה?
// // //                                 פעולה זו תעביר את ההזמנה לטאב "מוכנות".
// // //                               </AlertDialogDescription>
// // //                             </AlertDialogHeader>
// // //                             <AlertDialogFooter>
// // //                               <AlertDialogCancel>ביטול</AlertDialogCancel>
// // //                               <AlertDialogAction onClick={() => markAsDelivered(order.id)}>
// // //                                 אישור
// // //                               </AlertDialogAction>
// // //                             </AlertDialogFooter>
// // //                           </AlertDialogContent>
// // //                         </AlertDialog>
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </TabsContent>

// // //           {/* טאב הזמנות מוכנות */}
// // //           <TabsContent value="completed" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">הזמנות מוכנות ({completedOrders.length})</h3>
// // //             </div>
            
// // //             <div className="grid gap-4">
// // //               {completedOrders.length === 0 ? (
// // //                 <Card>
// // //                   <CardContent className="p-6 text-center text-gray-500">
// // //                     אין הזמנות מוכנות
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : (
// // //                 completedOrders.map((order) => (
// // //                   <Card key={order.id}>
// // //                     <CardContent className="p-6">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <div>
// // //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// // //                           <div className="text-sm text-gray-600">
// // //                             <p>הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// // //                             {order.deliveryDate && (
// // //                               <p>נמסר ב: {new Date(order.deliveryDate).toLocaleDateString('he-IL')}</p>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                         <div className="text-left">
// // //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// // //                           <Badge className="mt-1 bg-green-100 text-green-800">נמסר</Badge>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                         <div>
// // //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">סקין:</span> {order.skinType}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">צבע:</span> {order.color}
// // //                         </div>
// // //                         <div>
// // //                           <span className="font-medium">גוונים:</span> {order.highlights}
// // //                         </div>
// // //                       </div>

// // //                       {order.notes && (
// // //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// // //                           <span className="font-medium">הערות:</span> {order.notes}
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </TabsContent>

// // //           {/* טאב תשלומים */}
// // //           <TabsContent value="payments" className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="text-lg font-semibold">תשלומים</h3>
// // //               <Button 
// // //                 onClick={() => setShowPaymentForm(!showPaymentForm)}
// // //                 className="flex items-center gap-2"
// // //               >
// // //                 <PlusCircle className="w-4 h-4" />
// // //                 {showPaymentForm ? 'ביטול' : 'תשלום חדש'}
// // //               </Button>
// // //             </div>

// // //             {/* טופס תשלום מורכב */}
// // //             {showPaymentForm && (
// // //               <CompoundPaymentForm
// // //                 faniyaId={faniyaId}
// // //                 onSubmit={handlePaymentSubmit}
// // //                 onCancel={() => setShowPaymentForm(false)}
// // //               />
// // //             )}

// // //             {/* רשימת תשלומים */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>היסטוריית תשלומים</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 {payments.length === 0 ? (
// // //                   <p className="text-gray-500 text-center py-8">אין תשלומים רשומים</p>
// // //                 ) : (
// // //                   <div className="space-y-4">
// // //                     {payments.map((payment: any) => (
// // //                       <div key={payment.id} className="border rounded-lg p-4">
// // //                         <div className="flex justify-between items-start mb-3">
// // //                           <div>
// // //                             <div className="font-semibold text-lg text-green-600">₪{payment.totalAmount?.toFixed(2) || payment.amount?.toFixed(2)}</div>
// // //                             <div className="text-sm text-gray-600">
// // //                               {new Date(payment.paymentDate).toLocaleDateString('he-IL')}
// // //                             </div>
// // //                             {payment.notes && (
// // //                               <div className="text-sm text-gray-500 mt-1">{payment.notes}</div>
// // //                             )}
// // //                           </div>
// // //                         </div>

// // //                         {/* הצגת חלקי התשלום */}
// // //                         {payment.paymentParts && payment.paymentParts.length > 0 ? (
// // //                           <div className="space-y-2">
// // //                             <div className="text-sm font-medium text-gray-700">פירוט התשלום:</div>
// // //                             {payment.paymentParts.map((part: any, index: number) => (
// // //                               <div key={part.id} className="bg-gray-50 p-3 rounded text-sm">
// // //                                 <div className="flex justify-between items-start">
// // //                                   <div className="flex items-center gap-2">
// // //                                     {part.paymentType === 'מזומן'  }
// // //                                     {part.paymentType === 'צ\'ק' }
// // //                                     {part.paymentType === 'העברה בנקאית' }
// // //                                     <span className="font-medium">{part.paymentType}</span>
// // //                                   </div>
// // //                                   <span className="font-bold text-green-600">₪{part.amount.toFixed(2)}</span>
// // //                                 </div>
                                
// // //                                 {part.paymentType === 'צ\'ק' && (
// // //                                   <div className="mt-1 text-gray-600">
// // //                                     {part.checkNumber && <span>צ'ק מס׳ {part.checkNumber}</span>}
// // //                                     {part.checkDueDate && (
// // //                                       <span className="mr-2">
// // //                                         פרעון: {new Date(part.checkDueDate).toLocaleDateString('he-IL')}
// // //                                       </span>
// // //                                     )}
// // //                                   </div>
// // //                                 )}
                                
// // //                                 {part.paymentType === 'העברה בנקאית' && part.bankReference && (
// // //                                   <div className="mt-1 text-gray-600">
// // //                                     אסמכתא: {part.bankReference}
// // //                                   </div>
// // //                                 )}
                                
// // //                                 {part.notes && (
// // //                                   <div className="mt-1 text-gray-500 text-xs">{part.notes}</div>
// // //                                 )}
// // //                               </div>
// // //                             ))}
// // //                           </div>
// // //                         ) : (
// // //                           // תשלום ישן (לתאימות לאחור)
// // //                           <div className="text-sm text-gray-600">
// // //                             {payment.paymentType || 'לא צוין'} 
// // //                             {payment.checkDueDate && (
// // //                               <span className="mr-2">
// // //                                 | פרעון: {new Date(payment.checkDueDate).toLocaleDateString('he-IL')}
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </CardContent>
// // //             </Card>

// // //             {/* סיכום תשלומים */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>סיכום</CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                   <div className="text-center">
// // //                     <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// // //                     <div className="text-sm text-gray-600">סה"כ תשלומים</div>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <div className="text-2xl font-bold text-orange-600">
// // //                       ₪{completedOrders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">סה"כ הזמנות</div>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// // //                       ₪{faniya.totalDebt.toFixed(2)}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">יתרת חוב</div>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>

// // //           {/* טאב דוחות */}
// // //           <TabsContent value="reports" className="space-y-4">
// // //             <MonthlyReports faniyaId={faniyaId} faniyaName={faniya.name} />
// // //           </TabsContent>
// // //         </Tabs>
// // //       </div>
// // //     </Layout>
// // //   );
// // // }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { Layout } from '@/components/layout/Layout';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Checkbox } from '@/components/ui/checkbox';
// // import { Badge } from '@/components/ui/badge';
// // import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
// // import { CompoundPaymentForm } from '@/components/forms/CompoundPaymentForm';
// // import { MonthlyReports } from '@/components/reports/MonthlyReports';
// // import { PaymentsOnlyReport } from '@/components/reports/PaymentsOnlyReport';
// // import { PlusCircle, Package, CreditCard, FileText, ArrowRight, Calendar, Edit, Trash2 } from 'lucide-react';

// // interface Faniya {
// //   id: string;
// //   name: string;
// //   totalDebt: number;
// //   totalPayments: number;
// //   _count: {
// //     orders: number;
// //     payments: number;
// //   };
// // }

// // interface Order {
// //   id: string;
// //   orderDate: string;
// //   customerName: string;
// //   length: number;
// //   skinType: string;
// //   color: string;
// //   highlights: string;
// //   babyHairType?: string;
// //   openingTone?: string;
// //   pattern: string;
// //   notes?: string;
// //   discount: number;
// //   totalPrice: number;
// //   sentToTrass: boolean;
// //   trassOperator?: string;
// //   trassSentDate?: string;
// //   isCompleted: boolean;
// //   deliveryDate?: string;
// // }

// // interface Payment {
// //   id: string;
// //   totalAmount?: number;
// //   amount?: number;
// //   paymentDate: string;
// //   paymentType?: string;
// //   checkDueDate?: string;
// //   notes?: string;
// //   paymentParts?: any[];
// // }

// // export default function FaniyaPage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const faniyaId = params.id as string;
  
// //   const [faniya, setFaniya] = useState<Faniya | null>(null);
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [payments, setPayments] = useState<Payment[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState('new-order');

// //   // State לטופס הזמנה חדשה
// //   const [orderForm, setOrderForm] = useState({
// //     customerName: '',
// //     length: '',
// //     skinType: 'רגיל',
// //     color: '',
// //     highlights: 'ללא גוונים',
// //     babyHairType: '',
// //     openingTone: '',
// //     pattern: 'ייבוש טבעי תנועה גדולה',
// //     notes: '',
// //     discount: '0',
// //     sentToTrass: false,
// //     trassOperator: '',
// //     trassSentDate: ''
// //   });

// //   // State למחירים
// //   const [skinTypePrices, setSkinTypePrices] = useState({
// //     'רגיל': 15,
// //     'מאוורר': 18
// //   });

// //   // State לטופס תשלום מורכב
// //   const [showPaymentForm, setShowPaymentForm] = useState(false);

// //   useEffect(() => {
// //     if (faniyaId) {
// //       fetchFaniyaData();
// //       fetchPricing();
// //     }
// //   }, [faniyaId]);

// //   const fetchFaniyaData = async () => {
// //     try {
// //       const faniyaRes = await fetch(`/api/faniyas/${faniyaId}`);
// //       if (faniyaRes.ok) {
// //         const faniyaData = await faniyaRes.json();
// //         setFaniya(faniyaData);
// //       }

// //       const ordersRes = await fetch(`/api/orders?faniyaId=${faniyaId}`);
// //       if (ordersRes.ok) {
// //         const ordersData = await ordersRes.json();
// //         setOrders(ordersData);
// //       }

// //       const paymentsRes = await fetch(`/api/payments?faniyaId=${faniyaId}`);
// //       if (paymentsRes.ok) {
// //         const paymentsData = await paymentsRes.json();
// //         setPayments(paymentsData);
// //       }

// //     } catch (error) {
// //       console.error('שגיאה בטעינת נתונים:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// // // במקום skinTypePrices, השתמש בזה:
// // const [pricingRanges, setPricingRanges] = useState<any[]>([]);
// // const [fanSupplement, setFanSupplement] = useState(1000);

// // const fetchPricing = async () => {
// //   try {
// //     const response = await fetch('/api/pricing');
// //     if (response.ok) {
// //       const data = await response.json();
// //       setPricingRanges(data.regularRanges || []);
// //       setFanSupplement(data.fanSupplement || 1000);
// //     }
// //   } catch (error) {
// //     console.error('שגיאה בטעינת מחירים:', error);
// //   }
// // };

// // const calculatePrice = () => {
// //   const length = parseInt(orderForm.length) || 0;
// //   const discount = parseFloat(orderForm.discount) || 0;
  
// //   // מציאת הטווח המתאים
// //   const range = pricingRanges.find(r => length >= r.minLength && length <= r.maxLength);
  
// //   if (!range) {
// //     return 0; // אם לא נמצא טווח מתאים
// //   }
  
// //   let price = range.price;
  
// //   // הוספת תוספת מאוורר
// //   if (orderForm.skinType === 'מאוורר') {
// //     price += fanSupplement;
// //   }
  
// //   return Math.max(0, price - discount);
// // };

// //   const handleOrderSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!orderForm.customerName || !orderForm.length || !orderForm.color) {
// //       alert('אנא מלא את כל השדות החובה');
// //       return;
// //     }

// //     try {
// //       const response = await fetch('/api/orders', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({
// //           faniyaId,
// //           ...orderForm,
// //           length: parseInt(orderForm.length),
// //           discount: parseFloat(orderForm.discount) || 0,
// //           totalPrice: calculatePrice(),
// //           trassSentDate: orderForm.trassSentDate || null
// //         })
// //       });

// //       if (response.ok) {
// //         alert('הזמנה נוספה בהצלחה!');
// //         setOrderForm({
// //           customerName: '',
// //           length: '',
// //           skinType: 'רגיל',
// //           color: '',
// //           highlights: 'ללא גוונים',
// //           babyHairType: '',
// //           openingTone: '',
// //           pattern: 'ייבוש טבעי תנועה גדולה',
// //           notes: '',
// //           discount: '0',
// //           sentToTrass: false,
// //           trassOperator: '',
// //           trassSentDate: ''
// //         });
// //         fetchFaniyaData();
// //         setActiveTab('pending');
// //       } else {
// //         const error = await response.json();
// //         alert(`שגיאה: ${error.error}`);
// //       }
// //     } catch (error) {
// //       alert('שגיאה בהוספת הזמנה');
// //     }
// //   };

// //   const handlePaymentSubmit = async (paymentData: any) => {
// //     try {
// //       const response = await fetch('/api/payments', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(paymentData)
// //       });

// //       if (response.ok) {
// //         alert('תשלום נוסף בהצלחה!');
// //         setShowPaymentForm(false);
// //         fetchFaniyaData();
// //       } else {
// //         const error = await response.json();
// //         alert(`שגיאה: ${error.error}`);
// //       }
// //     } catch (error) {
// //       alert('שגיאה בהוספת תשלום');
// //     }
// //   };

// //   const markAsDelivered = async (orderId: string) => {
// //     try {
// //       const response = await fetch(`/api/orders/${orderId}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({
// //           deliveryDate: new Date().toISOString(),
// //           isCompleted: true
// //         })
// //       });

// //       if (response.ok) {
// //         alert('הזמנה סומנה כנמסרה!');
// //         fetchFaniyaData();
// //       }
// //     } catch (error) {
// //       alert('שגיאה בעדכון הזמנה');
// //     }
// //   };

// //   const handleInputChange = (field: string, value: any) => {
// //     setOrderForm(prev => ({ ...prev, [field]: value }));
// //   };

// //   if (loading) {
// //     return (
// //       <Layout>
// //         <div className="flex justify-center items-center h-64">
// //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   if (!faniya) {
// //     return (
// //       <Layout>
// //         <div className="text-center py-12">
// //           <h2 className="text-2xl font-bold text-gray-900 mb-4">פאנית לא נמצאה</h2>
// //           <Button onClick={() => router.push('/')}>חזור לדף הבית</Button>
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   const pendingOrders = orders.filter(order => !order.isCompleted);
// //   const completedOrders = orders.filter(order => order.isCompleted);

// //   return (
// //     <Layout>
// //       <div className="space-y-6">
// //         {/* כותרת וסטטיסטיקות */}
// //         <div>
// //           <div className="flex justify-between items-center mb-6">
// //             <div>
// //               <Button variant="outline" onClick={() => router.push('/')} className="mb-4">
// //                 ← חזור לדף הבית
// //               </Button>
// //               <h1 className="text-3xl font-bold text-gray-900">{faniya.name}</h1>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
// //                 <Package className="h-4 w-4 text-orange-500" />
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold text-orange-600">{pendingOrders.length}</div>
// //               </CardContent>
// //             </Card>

// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
// //                 <Package className="h-4 w-4 text-green-500" />
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
// //               </CardContent>
// //             </Card>

// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">סה״כ תשלומים</CardTitle>
// //                 <CreditCard className="h-4 w-4 text-blue-500" />
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// //               </CardContent>
// //             </Card>

// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">יתרת חוב</CardTitle>
// //                 <CreditCard className="h-4 w-4 text-red-500" />
// //               </CardHeader>
// //               <CardContent>
// //                 <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// //                   ₪{faniya.totalDebt.toFixed(2)}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>

// //         {/* תפריט טאבים */}
// //         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
// //           <TabsList className="grid w-full grid-cols-6">
// //             <TabsTrigger value="new-order">הזמנה חדשה</TabsTrigger>
// //             <TabsTrigger value="pending">לא מוכנות ({pendingOrders.length})</TabsTrigger>
// //             <TabsTrigger value="completed">מוכנות ({completedOrders.length})</TabsTrigger>
// //             <TabsTrigger value="payments">תשלומים ({payments.length})</TabsTrigger>
// //             <TabsTrigger value="reports">דוחות</TabsTrigger>
// //             <TabsTrigger value="payments-report">דוח תשלומים</TabsTrigger>
// //           </TabsList>

// //           {/* טאב הזמנה חדשה */}
// //           <TabsContent value="new-order" className="space-y-4">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>הזמנה חדשה</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <form onSubmit={handleOrderSubmit} className="space-y-6">
// //                   {/* פרטים בסיסיים */}
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <Label htmlFor="customerName">שם הלקוחה *</Label>
// //                       <Input
// //                         id="customerName"
// //                         value={orderForm.customerName}
// //                         onChange={(e) => handleInputChange('customerName', e.target.value)}
// //                         required
// //                       />
// //                     </div>
                    
// //                     <div>
// //                       <Label htmlFor="length">אורך הפאה (ס"מ) *</Label>
// //                       <Input
// //                         id="length"
// //                         type="number"
// //                         min="1"
// //                         value={orderForm.length}
// //                         onChange={(e) => handleInputChange('length', e.target.value)}
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* מפרטי הפאה */}
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <Label htmlFor="skinType">סוג סקין *</Label>
// //                      <Select value={orderForm.skinType} onValueChange={(value) => handleInputChange('skinType', value)}>
// //   <SelectTrigger>
// //     <SelectValue />
// //   </SelectTrigger>
// //   <SelectContent>
// //     <SelectItem value="רגיל">רגיל</SelectItem>
// //     <SelectItem value="מאוורר">מאוורר (+₪{fanSupplement} תוספת)</SelectItem>
// //   </SelectContent>
// // </Select>
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="color">צבע *</Label>
// //                       <Input
// //                         id="color"
// //                         value={orderForm.color}
// //                         onChange={(e) => handleInputChange('color', e.target.value)}
// //                         required
// //                       />
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="highlights">גוונים בפאה</Label>
// //                       <Select value={orderForm.highlights} onValueChange={(value) => handleInputChange('highlights', value)}>
// //                         <SelectTrigger>
// //                           <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="עדינים">עדינים</SelectItem>
// //                           <SelectItem value="ללא גוונים">ללא גוונים</SelectItem>
// //                           <SelectItem value="בולטים">בולטים</SelectItem>
// //                           <SelectItem value="אחר">אחר</SelectItem>
// //                         </SelectContent>
// //                       </Select>
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="pattern">דוגמת פאה</Label>
// //                       <Select value={orderForm.pattern} onValueChange={(value) => handleInputChange('pattern', value)}>
// //                         <SelectTrigger>
// //                           <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="ייבוש טבעי תנועה גדולה">ייבוש טבעי תנועה גדולה</SelectItem>
// //                           <SelectItem value="תלתלים">תלתלים</SelectItem>
// //                           <SelectItem value="חלק גמיש">חלק גמיש</SelectItem>
// //                           <SelectItem value="אחר">אחר</SelectItem>
// //                         </SelectContent>
// //                       </Select>
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="babyHairType">סוג בייביהר</Label>
// //                       <Input
// //                         id="babyHairType"
// //                         value={orderForm.babyHairType}
// //                         onChange={(e) => handleInputChange('babyHairType', e.target.value)}
// //                       />
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="openingTone">גוון פתיחה</Label>
// //                       <Input
// //                         id="openingTone"
// //                         value={orderForm.openingTone}
// //                         onChange={(e) => handleInputChange('openingTone', e.target.value)}
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* מחיר והנחה */}
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
// //                     <div>
// //                       <Label htmlFor="discount">הנחה (₪)</Label>
// //                       <Input
// //                         id="discount"
// //                         type="number"
// //                         min="0"
// //                         step="0.01"
// //                         value={orderForm.discount}
// //                         onChange={(e) => handleInputChange('discount', e.target.value)}
// //                       />
// //                     </div>
// //                     <div className="flex items-center">
// //                       <span className="text-lg font-semibold">
// //                         מחיר סופי: ₪{calculatePrice().toFixed(2)}
// //                       </span>
// //                     </div>
// //                   </div>

// //                   {/* טרסים */}
// //                   <div className="border-t pt-4">
// //                     <div className="flex items-center space-x-2 mb-4">
// //                       <Checkbox
// //                         id="sentToTrass"
// //                         checked={orderForm.sentToTrass}
// //                         onCheckedChange={(checked) => handleInputChange('sentToTrass', !!checked)}
// //                       />
// //                       <Label htmlFor="sentToTrass">נשלח לטרסים</Label>
// //                     </div>

// //                     {orderForm.sentToTrass && (
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
// //                         <div>
// //                           <Label htmlFor="trassOperator">אופר טרסים</Label>
// //                           <Select value={orderForm.trassOperator} onValueChange={(value) => handleInputChange('trassOperator', value)}>
// //                             <SelectTrigger>
// //                               <SelectValue placeholder="בחר אופר" />
// //                             </SelectTrigger>
// //                             <SelectContent>
// //                               <SelectItem value="לאופר">לאופר</SelectItem>
// //                               <SelectItem value="שורי">שורי</SelectItem>
// //                             </SelectContent>
// //                           </Select>
// //                         </div>

// //                         <div>
// //                           <Label htmlFor="trassSentDate">תאריך שליחה לטרסים</Label>
// //                           <Input
// //                             id="trassSentDate"
// //                             type="date"
// //                             value={orderForm.trassSentDate}
// //                             onChange={(e) => handleInputChange('trassSentDate', e.target.value)}
// //                           />
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* הערות */}
// //                   <div>
// //                     <Label htmlFor="notes">הערות</Label>
// //                     <Textarea
// //                       id="notes"
// //                       value={orderForm.notes}
// //                       onChange={(e) => handleInputChange('notes', e.target.value)}
// //                       rows={3}
// //                     />
// //                   </div>

// //                   {/* כפתורים */}
// //                   <div className="flex justify-end space-x-4">
// //                     <Button type="submit" className="flex items-center gap-2">
// //                       <PlusCircle className="w-4 h-4" />
// //                       שמור הזמנה
// //                     </Button>
// //                   </div>
// //                 </form>
// //               </CardContent>
// //             </Card>
// //           </TabsContent>

// //           {/* טאב הזמנות ממתינות - ממשיך בהודעה הבאה... */}
// //           {/* טאב הזמנות ממתינות */}
// //           <TabsContent value="pending" className="space-y-4">
// //             <div className="flex justify-between items-center">
// //               <h3 className="text-lg font-semibold">הזמנות ממתינות ({pendingOrders.length})</h3>
// //             </div>
            
// //             <div className="grid gap-4">
// //               {pendingOrders.length === 0 ? (
// //                 <Card>
// //                   <CardContent className="p-6 text-center text-gray-500">
// //                     אין הזמנות ממתינות
// //                   </CardContent>
// //                 </Card>
// //               ) : (
// //                 pendingOrders.map((order) => (
// //                   <Card key={order.id}>
// //                     <CardContent className="p-6">
// //                       <div className="flex justify-between items-start mb-4">
// //                         <div>
// //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// //                           <p className="text-sm text-gray-600">הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// //                         </div>
// //                         <div className="text-left">
// //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// //                           <Badge variant="outline" className="mt-1">ממתינה</Badge>
// //                         </div>
// //                       </div>
                      
// //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// //                         <div>
// //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// //                         </div>
// //                         <div>
// //                           <span className="font-medium">סקין:</span> {order.skinType}
// //                         </div>
// //                         <div>
// //                           <span className="font-medium">צבע:</span> {order.color}
// //                         </div>
// //                         <div>
// //                           <span className="font-medium">גוונים:</span> {order.highlights}
// //                         </div>
// //                       </div>

// //                       {order.sentToTrass && (
// //                         <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
// //                           <span className="font-medium">נשלח לטרסים:</span> {order.trassOperator} 
// //                           {order.trassSentDate && ` בתאריך ${new Date(order.trassSentDate).toLocaleDateString('he-IL')}`}
// //                         </div>
// //                       )}

// //                       {order.notes && (
// //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// //                           <span className="font-medium">הערות:</span> {order.notes}
// //                         </div>
// //                       )}

// //                       <div className="flex justify-end mt-4 space-x-2">
// //                         <AlertDialog>
// //                           <AlertDialogTrigger asChild>
// //                             <Button size="sm" className="flex items-center gap-2">
// //                               <ArrowRight className="w-4 h-4" />
// //                               סמן כנמסר
// //                             </Button>
// //                           </AlertDialogTrigger>
// //                           <AlertDialogContent>
// //                             <AlertDialogHeader>
// //                               <AlertDialogTitle>סמן הזמנה כנמסרה</AlertDialogTitle>
// //                               <AlertDialogDescription>
// //                                 האם אתה בטוח שברצונך לסמן את ההזמנה של {order.customerName} כנמסרה?
// //                                 פעולה זו תעביר את ההזמנה לטאב "מוכנות".
// //                               </AlertDialogDescription>
// //                             </AlertDialogHeader>
// //                             <AlertDialogFooter>
// //                               <AlertDialogCancel>ביטול</AlertDialogCancel>
// //                               <AlertDialogAction onClick={() => markAsDelivered(order.id)}>
// //                                 אישור
// //                               </AlertDialogAction>
// //                             </AlertDialogFooter>
// //                           </AlertDialogContent>
// //                         </AlertDialog>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 ))
// //               )}
// //             </div>
// //           </TabsContent>

// //           {/* טאב הזמנות מוכנות */}
// //           <TabsContent value="completed" className="space-y-4">
// //             <div className="flex justify-between items-center">
// //               <h3 className="text-lg font-semibold">הזמנות מוכנות ({completedOrders.length})</h3>
// //             </div>
            
// //             <div className="grid gap-4">
// //               {completedOrders.length === 0 ? (
// //                 <Card>
// //                   <CardContent className="p-6 text-center text-gray-500">
// //                     אין הזמנות מוכנות
// //                   </CardContent>
// //                 </Card>
// //               ) : (
// //                 completedOrders.map((order) => (
// //                   <Card key={order.id}>
// //                     <CardContent className="p-6">
// //                       <div className="flex justify-between items-start mb-4">
// //                         <div>
// //                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
// //                           <div className="text-sm text-gray-600">
// //                             <p>הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
// //                             {order.deliveryDate && (
// //                               <p>נמסר ב: {new Date(order.deliveryDate).toLocaleDateString('he-IL')}</p>
// //                             )}
// //                           </div>
// //                         </div>
// //                         <div className="text-left">
// //                           <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
// //                           <Badge className="mt-1 bg-green-100 text-green-800">נמסר</Badge>
// //                         </div>
// //                       </div>
                      
// //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// //                         <div>
// //                           <span className="font-medium">אורך:</span> {order.length} ס"מ
// //                         </div>
// //                         <div>
// //                           <span className="font-medium">סקין:</span> {order.skinType}
// //                         </div>
// //                         <div>
// //                           <span className="font-medium">צבע:</span> {order.color}
// //                         </div>
// //                         <div>
// //                           <span className="font-medium">גוונים:</span> {order.highlights}
// //                         </div>
// //                       </div>

// //                       {order.notes && (
// //                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
// //                           <span className="font-medium">הערות:</span> {order.notes}
// //                         </div>
// //                       )}
// //                     </CardContent>
// //                   </Card>
// //                 ))
// //               )}
// //             </div>
// //           </TabsContent>

// //           {/* טאב תשלומים */}
// //           <TabsContent value="payments" className="space-y-4">
// //             <div className="flex justify-between items-center">
// //               <h3 className="text-lg font-semibold">תשלומים</h3>
// //               <Button 
// //                 onClick={() => setShowPaymentForm(!showPaymentForm)}
// //                 className="flex items-center gap-2"
// //               >
// //                 <PlusCircle className="w-4 h-4" />
// //                 {showPaymentForm ? 'ביטול' : 'תשלום חדש'}
// //               </Button>
// //             </div>

// //             {showPaymentForm && (
// //               <CompoundPaymentForm
// //                 faniyaId={faniyaId}
// //                 onSubmit={handlePaymentSubmit}
// //                 onCancel={() => setShowPaymentForm(false)}
// //               />
// //             )}

// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>היסטוריית תשלומים</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 {payments.length === 0 ? (
// //                   <p className="text-gray-500 text-center py-8">אין תשלומים רשומים</p>
// //                 ) : (
// //                   <div className="space-y-4">
// //                     {payments.map((payment: any) => (
// //                       <div key={payment.id} className="border rounded-lg p-4">
// //                         <div className="flex justify-between items-start mb-3">
// //                           <div>
// //                             <div className="font-semibold text-lg text-green-600">₪{(payment.totalAmount || payment.amount || 0).toFixed(2)}</div>
// //                             <div className="text-sm text-gray-600">
// //                               {new Date(payment.paymentDate).toLocaleDateString('he-IL')}
// //                             </div>
// //                             {payment.notes && (
// //                               <div className="text-sm text-gray-500 mt-1">{payment.notes}</div>
// //                             )}
// //                           </div>
// //                         </div>

// //                         {payment.paymentParts && payment.paymentParts.length > 0 ? (
// //                           <div className="space-y-2">
// //                             <div className="text-sm font-medium text-gray-700">פירוט התשלום:</div>
// //                             {payment.paymentParts.map((part: any, index: number) => (
// //                               <div key={part.id} className="bg-gray-50 p-3 rounded text-sm">
// //                                 <div className="flex justify-between items-start">
// //                                   <div className="flex items-center gap-2">
// //                                     {part.paymentType === 'מזומן' && <span>💵</span>}
// //                                     {part.paymentType === 'צ\'ק' && <span>🧾</span>}
// //                                     {part.paymentType === 'העברה בנקאית' && <span>🏦</span>}
// //                                     <span className="font-medium">{part.paymentType}</span>
// //                                   </div>
// //                                   <span className="font-bold text-green-600">₪{part.amount.toFixed(2)}</span>
// //                                 </div>
                                
// //                                 {part.paymentType === 'צ\'ק' && (
// //                                   <div className="mt-1 text-gray-600">
// //                                     {part.checkNumber && <span>צ'ק מס׳ {part.checkNumber}</span>}
// //                                     {part.checkDueDate && (
// //                                       <span className="mr-2">
// //                                         פרעון: {new Date(part.checkDueDate).toLocaleDateString('he-IL')}
// //                                       </span>
// //                                     )}
// //                                   </div>
// //                                 )}
                                
// //                                 {part.paymentType === 'העברה בנקאית' && part.bankReference && (
// //                                   <div className="mt-1 text-gray-600">
// //                                     אסמכתא: {part.bankReference}
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             ))}
// //                           </div>
// //                         ) : (
// //                           <div className="text-sm text-gray-600">
// //                             {payment.paymentType || 'לא צוין'} 
// //                             {payment.checkDueDate && (
// //                               <span className="mr-2">
// //                                 | פרעון: {new Date(payment.checkDueDate).toLocaleDateString('he-IL')}
// //                               </span>
// //                             )}
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>

// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>סיכום</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                   <div className="text-center">
// //                     <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
// //                     <div className="text-sm text-gray-600">סה"כ תשלומים</div>
// //                   </div>
// //                   <div className="text-center">
// //                     <div className="text-2xl font-bold text-orange-600">
// //                       ₪{completedOrders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
// //                     </div>
// //                     <div className="text-sm text-gray-600">סה"כ הזמנות</div>
// //                   </div>
// //                   <div className="text-center">
// //                     <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
// //                       ₪{faniya.totalDebt.toFixed(2)}
// //                     </div>
// //                     <div className="text-sm text-gray-600">יתרת חוב</div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </TabsContent>

// //           {/* טאב דוחות */}
// //           <TabsContent value="reports" className="space-y-4">
// //             <MonthlyReports faniyaId={faniyaId} faniyaName={faniya.name} />
// //           </TabsContent>

// //           {/* טאב דוח תשלומים */}
// //           <TabsContent value="payments-report" className="space-y-4">
// //             <PaymentsOnlyReport faniyaId={faniyaId} faniyaName={faniya.name} />
// //           </TabsContent>
// //         </Tabs>
// //       </div>
// //     </Layout>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Layout } from '@/components/layout/Layout';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogTrigger 
// } from '@/components/ui/dialog';
// import { 
//   AlertDialog, 
//   AlertDialogAction, 
//   AlertDialogCancel, 
//   AlertDialogContent, 
//   AlertDialogDescription, 
//   AlertDialogFooter, 
//   AlertDialogHeader, 
//   AlertDialogTitle, 
//   AlertDialogTrigger 
// } from '@/components/ui/alert-dialog';
// import { CompoundPaymentForm } from '@/components/forms/CompoundPaymentForm';
// import { MonthlyReports } from '@/components/reports/MonthlyReports';
// import { PaymentsOnlyReport } from '@/components/reports/PaymentsOnlyReport';
// import { PlusCircle, Package, CreditCard, FileText, ArrowRight, Calendar, Edit, Trash2, DollarSign } from 'lucide-react';
// const [debtHistory, setDebtHistory] = useState<any[]>([]);
// const [showDebtHistoryDialog, setShowDebtHistoryDialog] = useState(false);
// const [debtNote, setDebtNote] = useState('');// פירוט סיבת החוב

// interface Faniya {
//   id: string;
//   name: string;
//   totalDebt: number;
//   totalPayments: number;
//   _count: {
//     orders: number;
//     payments: number;
//   };
// }

// interface Order {
//   id: string;
//   orderDate: string;
//   customerName: string;
//   length: number;
//   skinType: string;
//   color: string;
//   highlights: string;
//   babyHairType?: string;
//   openingTone?: string;
//   pattern: string;
//   notes?: string;
//   discount: number;
//   totalPrice: number;
//   sentToTrass: boolean;
//   trassOperator?: string;
//   trassSentDate?: string;
//   isCompleted: boolean;
//   deliveryDate?: string;
// }

// interface Payment {
//   id: string;
//   totalAmount?: number;
//   amount?: number;
//   paymentDate: string;
//   paymentType?: string;
//   checkDueDate?: string;
//   notes?: string;
//   paymentParts?: any[];
// }

// export default function FaniyaPage() {
//   const params = useParams();
//   const router = useRouter();
//   const faniyaId = params.id as string;
  
//   const [faniya, setFaniya] = useState<Faniya | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('new-order');

//   // State לטופס הזמנה חדשה
//   const [orderForm, setOrderForm] = useState({
//     customerName: '',
//     length: '',
//     skinType: 'רגיל',
//     color: '',
//     highlights: 'ללא גוונים',
//     customHighlights: '', // שדה חדש לגוונים מותאמים אישית
//     babyHairType: '',
//     openingTone: '',
//     pattern: 'ייבוש טבעי תנועה גדולה',
//     notes: '',
//     discount: '0',
//     sentToTrass: false,
//     trassOperator: '',
//     trassSentDate: ''
//   });

//   // State למחירים
//   const [pricingRanges, setPricingRanges] = useState<any[]>([]);
//   const [fanSupplement, setFanSupplement] = useState(1000);

//   // State לטופס תשלום מורכב
//   const [showPaymentForm, setShowPaymentForm] = useState(false);

//   // State לעריכת הזמנה
//   const [editingOrder, setEditingOrder] = useState<Order | null>(null);
//   const [editOrderForm, setEditOrderForm] = useState<any>(null);

//   // State למחיקות
//   const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
//   const [deletingPaymentId, setDeletingPaymentId] = useState<string | null>(null);

//   // State לעדכון חוב ידני
//   const [showDebtDialog, setShowDebtDialog] = useState(false);
//   const [manualDebt, setManualDebt] = useState('');

//   useEffect(() => {
//     if (faniyaId) {
//       fetchFaniyaData();
//       fetchPricing();
//     }
//   }, [faniyaId]);

//   const fetchFaniyaData = async () => {
//     try {
//       const faniyaRes = await fetch(`/api/faniyas/${faniyaId}`);
//       if (faniyaRes.ok) {
//         const faniyaData = await faniyaRes.json();
//         setFaniya(faniyaData);
//         setManualDebt(faniyaData.totalDebt.toString());
//       }

//       const ordersRes = await fetch(`/api/orders?faniyaId=${faniyaId}`);
//       if (ordersRes.ok) {
//         const ordersData = await ordersRes.json();
//         setOrders(ordersData);
//       }

//       const paymentsRes = await fetch(`/api/payments?faniyaId=${faniyaId}`);
//       if (paymentsRes.ok) {
//         const paymentsData = await paymentsRes.json();
//         setPayments(paymentsData);
//       }

//     } catch (error) {
//       console.error('שגיאה בטעינת נתונים:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPricing = async () => {
//     try {
//       const response = await fetch('/api/pricing');
//       if (response.ok) {
//         const data = await response.json();
//         setPricingRanges(data.regularRanges || []);
//         setFanSupplement(data.fanSupplement || 1000);
//       }
//     } catch (error) {
//       console.error('שגיאה בטעינת מחירים:', error);
//     }
//   };

//   const calculatePrice = (form: any = orderForm) => {
//     const length = parseInt(form.length) || 0;
//     const discount = parseFloat(form.discount) || 0;
    
//     const range = pricingRanges.find(r => length >= r.minLength && length <= r.maxLength);
    
//     if (!range) {
//       return 0;
//     }
    
//     let price = range.price;
    
//     if (form.skinType === 'מאוורר') {
//       price += fanSupplement;
//     }
    
//     return Math.max(0, price - discount);
//   };

//   const handleOrderSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!orderForm.customerName || !orderForm.length || !orderForm.color) {
//       alert('אנא מלא את כל השדות החובה');
//       return;
//     }

//     try {
//       // אם בחרו "אחר" בגוונים, השתמש בשדה המותאם אישית
//       const highlightsValue = orderForm.highlights === 'אחר' 
//         ? orderForm.customHighlights 
//         : orderForm.highlights;

//       const response = await fetch('/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           faniyaId,
//           ...orderForm,
//           highlights: highlightsValue,
//           length: parseInt(orderForm.length),
//           discount: parseFloat(orderForm.discount) || 0,
//           totalPrice: calculatePrice(),
//           trassSentDate: orderForm.trassSentDate || null
//         })
//       });

//       if (response.ok) {
//         alert('הזמנה נוספה בהצלחה!');
//         setOrderForm({
//           customerName: '',
//           length: '',
//           skinType: 'רגיל',
//           color: '',
//           highlights: 'ללא גוונים',
//           customHighlights: '',
//           babyHairType: '',
//           openingTone: '',
//           pattern: 'ייבוש טבעי תנועה גדולה',
//           notes: '',
//           discount: '0',
//           sentToTrass: false,
//           trassOperator: '',
//           trassSentDate: ''
//         });
//         fetchFaniyaData();
//         setActiveTab('pending');
//       } else {
//         const error = await response.json();
//         alert(`שגיאה: ${error.error}`);
//       }
//     } catch (error) {
//       alert('שגיאה בהוספת הזמנה');
//     }
//   };

//   const handleEditOrder = (order: Order) => {
//     setEditingOrder(order);
//     setEditOrderForm({
//       customerName: order.customerName,
//       length: order.length.toString(),
//       skinType: order.skinType,
//       color: order.color,
//       highlights: order.highlights,
//       customHighlights: '',
//       babyHairType: order.babyHairType || '',
//       openingTone: order.openingTone || '',
//       pattern: order.pattern,
//       notes: order.notes || '',
//       discount: order.discount.toString(),
//       sentToTrass: order.sentToTrass,
//       trassOperator: order.trassOperator || '',
//       trassSentDate: order.trassSentDate || ''
//     });
//   };

//   const handleUpdateOrder = async () => {
//     if (!editingOrder) return;

//     try {
//       const highlightsValue = editOrderForm.highlights === 'אחר' 
//         ? editOrderForm.customHighlights 
//         : editOrderForm.highlights;

//       const response = await fetch(`/api/orders/${editingOrder.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           customerName: editOrderForm.customerName,
//           length: parseInt(editOrderForm.length),
//           skinType: editOrderForm.skinType,
//           color: editOrderForm.color,
//           highlights: highlightsValue,
//           babyHairType: editOrderForm.babyHairType || null,
//           openingTone: editOrderForm.openingTone || null,
//           pattern: editOrderForm.pattern,
//           notes: editOrderForm.notes || null,
//           discount: parseFloat(editOrderForm.discount) || 0,
//           totalPrice: calculatePrice(editOrderForm),
//           sentToTrass: editOrderForm.sentToTrass,
//           trassOperator: editOrderForm.trassOperator || null,
//           trassSentDate: editOrderForm.trassSentDate || null
//         })
//       });

//       if (response.ok) {
//         alert('הזמנה עודכנה בהצלחה!');
//         setEditingOrder(null);
//         setEditOrderForm(null);
//         fetchFaniyaData();
//       } else {
//         const error = await response.json();
//         alert(`שגיאה: ${error.error}`);
//       }
//     } catch (error) {
//       alert('שגיאה בעדכון הזמנה');
//     }
//   };

//   const handleDeleteOrder = async (orderId: string) => {
//     try {
//       const response = await fetch(`/api/orders/${orderId}`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         alert('הזמנה נמחקה בהצלחה!');
//         setDeletingOrderId(null);
//         fetchFaniyaData();
//       } else {
//         const error = await response.json();
//         alert(`שגיאה: ${error.error}`);
//       }
//     } catch (error) {
//       alert('שגיאה במחיקת הזמנה');
//     }
//   };

//   const handleDeletePayment = async (paymentId: string) => {
//     try {
//       const response = await fetch(`/api/payments/${paymentId}`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         alert('תשלום נמחק בהצלחה!');
//         setDeletingPaymentId(null);
//         fetchFaniyaData();
//       } else {
//         const error = await response.json();
//         alert(`שגיאה: ${error.error}`);
//       }
//     } catch (error) {
//       alert('שגיאה במחיקת תשלום');
//     }
//   };

//   // const handleUpdateDebt = async () => {
//   //   try {
//   //     const response = await fetch(`/api/faniyas/${faniyaId}`, {
//   //       method: 'PUT',
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify({
//   //         totalDebt: parseFloat(manualDebt) || 0
//   //       })
//   //     });

//   //     if (response.ok) {
//   //       alert('החוב עודכן בהצלחה!');
//   //       setShowDebtDialog(false);
//   //       fetchFaniyaData();
//   //     } else {
//   //       const error = await response.json();
//   //       alert(`שגיאה: ${error.error}`);
//   //     }
//   //   } catch (error) {
//   //     alert('שגיאה בעדכון חוב');
//   //   }
//   // };

//   // ✅ פונקציה לטעינת היסטוריית חוב
// const fetchDebtHistory = async () => {
//   try {
//     const response = await fetch(`/api/debt-history?faniyaId=${faniyaId}`);
//     if (response.ok) {
//       const data = await response.json();
//       setDebtHistory(data);
//     }
//   } catch (error) {
//     console.error('שגיאה בטעינת היסטוריית חוב:', error);
//   }
// };
// // ✅ פונקציה מעודכנת לעדכון חוב - מוסיף ולא מחליף!
// const handleUpdateDebt = async () => {
//   if (!debtNote.trim()) {
//     alert('אנא הזן תיאור לסיבת החוב');
//     return;
//   }

//   try {
//     const debtAmount = parseFloat(manualDebt) || 0;
    
//     if (debtAmount === 0) {
//       alert('אנא הזן סכום');
//       return;
//     }

//     const response = await fetch(`/api/debt-manual`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         faniyaId,
//         amount: debtAmount,
//         description: debtNote
//       })
//     });

//     if (response.ok) {
//       alert('החוב עודכן בהצלחה!');
//       setShowDebtDialog(false);
//       setManualDebt('');
//       setDebtNote('');
//       fetchFaniyaData();
//     } else {
//       const error = await response.json();
//       alert(`שגיאה: ${error.error}`);
//     }
//   } catch (error) {
//     alert('שגיאה בעדכון חוב');
//   }
// };
//   const handlePaymentSubmit = async (paymentData: any) => {
//     try {
//       const response = await fetch('/api/payments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(paymentData)
//       });

//       if (response.ok) {
//         alert('תשלום נוסף בהצלחה!');
//         setShowPaymentForm(false);
//         fetchFaniyaData();
//       } else {
//         const error = await response.json();
//         alert(`שגיאה: ${error.error}`);
//       }
//     } catch (error) {
//       alert('שגיאה בהוספת תשלום');
//     }
//   };

//   const markAsDelivered = async (orderId: string) => {
//     try {
//       const response = await fetch(`/api/orders/${orderId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           deliveryDate: new Date().toISOString(),
//           isCompleted: true
//         })
//       });

//       if (response.ok) {
//         alert('הזמנה סומנה כנמסרה!');
//         fetchFaniyaData();
//       }
//     } catch (error) {
//       alert('שגיאה בעדכון הזמנה');
//     }
//   };

//   const handleInputChange = (field: string, value: any) => {
//     setOrderForm(prev => ({ ...prev, [field]: value }));
//   };

//   const handleEditInputChange = (field: string, value: any) => {
//     setEditOrderForm((prev: any) => ({ ...prev, [field]: value }));
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         </div>
//       </Layout>
//     );
//   }

//   if (!faniya) {
//     return (
//       <Layout>
//         <div className="text-center py-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">פאנית לא נמצאה</h2>
//           <Button onClick={() => router.push('/')}>חזור לדף הבית</Button>
//         </div>
//       </Layout>
//     );
//   }

//   const pendingOrders = orders.filter(order => !order.isCompleted);
//   const completedOrders = orders.filter(order => order.isCompleted);

//   return (
//     <Layout>
//       <div className="space-y-6">
//         {/* כותרת וסטטיסטיקות */}
//         <div>
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <Button variant="outline" onClick={() => router.push('/')} className="mb-4">
//                 ← חזור לדף הבית
//               </Button>
//               <div className="flex items-center gap-4">
//                 <h1 className="text-3xl font-bold text-gray-900">{faniya.name}</h1>
                
//                 {/* <Dialog open={showDebtDialog} onOpenChange={setShowDebtDialog}>
//                   <DialogTrigger asChild>
//                     <Button variant="outline" size="sm" className="flex items-center gap-2">
//                       <DollarSign className="w-4 h-4" />
//                       עדכון חוב ידני
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>עדכון חוב ידני</DialogTitle>
//                     </DialogHeader>
//                     <div className="space-y-4 py-4">
//                       <div>
//                         <Label>חוב נוכחי</Label>
//                         <div className="text-2xl font-bold text-red-600">
//                           ₪{faniya.totalDebt.toFixed(2)}
//                         </div>
//                       </div>
//                       <div>
//                         <Label htmlFor="manualDebt">חוב חדש (₪)</Label>
//                         <Input
//                           id="manualDebt"
//                           type="number"
//                           step="0.01"
//                           value={manualDebt}
//                           onChange={(e) => setManualDebt(e.target.value)}
//                           placeholder="הכנס סכום חדש"
//                         />
//                       </div>
//                       <div className="flex gap-2">
//                         <Button onClick={handleUpdateDebt} className="flex-1">
//                           עדכן
//                         </Button>
//                         <Button 
//                           variant="outline" 
//                           onClick={() => setShowDebtDialog(false)}
//                           className="flex-1"
//                         >
//                           ביטול
//                         </Button>
//                       </div>
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </div>
//           </div> */}
// {/* Dialog לעדכון חוב ידני */}
// <Dialog open={showDebtDialog} onOpenChange={setShowDebtDialog}>
//   <DialogTrigger asChild>
//     <Button variant="outline" size="sm" className="flex items-center gap-2">
//       <DollarSign className="w-4 h-4" />
//       עדכון חוב
//     </Button>
//   </DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>הוספה לחוב</DialogTitle>
//     </DialogHeader>
//     <div className="space-y-4 py-4">
//       <div>
//         <Label>חוב נוכחי</Label>
//         <div className="text-2xl font-bold text-red-600">
//           ₪{faniya.totalDebt.toFixed(2)}
//         </div>
//       </div>
//       <div>
//         <Label htmlFor="manualDebt">סכום להוסיף (₪)</Label>
//         <Input
//           id="manualDebt"
//           type="number"
//           step="0.01"
//           value={manualDebt}
//           onChange={(e) => setManualDebt(e.target.value)}
//           placeholder="הכנס סכום להוספה"
//         />
//         <p className="text-xs text-gray-500 mt-1">
//           החוב החדש יהיה: ₪{(faniya.totalDebt + (parseFloat(manualDebt) || 0)).toFixed(2)}
//         </p>
//       </div>
//       <div>
//         <Label htmlFor="debtNote">סיבת החוב *</Label>
//         <Textarea
//           id="debtNote"
//           value={debtNote}
//           onChange={(e) => setDebtNote(e.target.value)}
//           placeholder="למשל: חוב ישן, תיקון פאה, הוצאות נוספות..."
//           rows={3}
//         />
//       </div>
//       <div className="flex gap-2">
//         <Button onClick={handleUpdateDebt} className="flex-1">
//           הוסף לחוב
//         </Button>
//         <Button 
//           variant="outline" 
//           onClick={() => setShowDebtDialog(false)}
//           className="flex-1"
//         >
//           ביטול
//         </Button>
//       </div>
//     </div>
//   </DialogContent>
// </Dialog>

// {/* כפתור לצפייה בהיסטוריית חוב */}
// <Button 
//   variant="outline" 
//   size="sm" 
//   onClick={() => {
//     fetchDebtHistory();
//     setShowDebtHistoryDialog(true);
//   }}
//   className="flex items-center gap-2"
// >
//   <FileText className="w-4 h-4" />
//   היסטוריית חוב
// </Button>

// {/* Dialog להיסטוריית חוב */}
// <Dialog open={showDebtHistoryDialog} onOpenChange={setShowDebtHistoryDialog}>
//   <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
//     <DialogHeader>
//       <DialogTitle>היסטוריית חוב - {faniya.name}</DialogTitle>
//     </DialogHeader>
//     <div className="space-y-4 py-4">
//       {debtHistory.length === 0 ? (
//         <p className="text-gray-500 text-center py-8">אין היסטוריית חוב</p>
//       ) : (
//         <div className="space-y-2">
//           {debtHistory.map((transaction) => (
//             <div 
//               key={transaction.id} 
//               className={`p-3 rounded border ${
//                 transaction.amount > 0 
//                   ? 'bg-red-50 border-red-200' 
//                   : 'bg-green-50 border-green-200'
//               }`}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <div className="font-medium">{transaction.description}</div>
//                   <div className="text-xs text-gray-600">
//                     {new Date(transaction.createdAt).toLocaleDateString('he-IL')} - {new Date(transaction.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
//                   </div>
//                 </div>
//                 <div className={`text-lg font-bold ${
//                   transaction.amount > 0 ? 'text-red-600' : 'text-green-600'
//                 }`}>
//                   {transaction.amount > 0 ? '+' : ''}₪{transaction.amount.toFixed(2)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   </DialogContent>
// </Dialog>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
//                 <Package className="h-4 w-4 text-orange-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-orange-600">{pendingOrders.length}</div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
//                 <Package className="h-4 w-4 text-green-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">סה״כ תשלומים</CardTitle>
//                 <CreditCard className="h-4 w-4 text-blue-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">יתרת חוב</CardTitle>
//                 <CreditCard className="h-4 w-4 text-red-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
//                   ₪{faniya.totalDebt.toFixed(2)}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* תפריט טאבים */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-6">
//             <TabsTrigger value="new-order">הזמנה חדשה</TabsTrigger>
//             <TabsTrigger value="pending">לא מוכנות ({pendingOrders.length})</TabsTrigger>
//             <TabsTrigger value="completed">מוכנות ({completedOrders.length})</TabsTrigger>
//             <TabsTrigger value="payments">תשלומים ({payments.length})</TabsTrigger>
//             <TabsTrigger value="reports">דוחות</TabsTrigger>
//             <TabsTrigger value="payments-report">דוח תשלומים</TabsTrigger>
//           </TabsList>

//           {/* טאב הזמנה חדשה */}
//           <TabsContent value="new-order" className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>הזמנה חדשה</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleOrderSubmit} className="space-y-6">
//                   {/* פרטים בסיסיים */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="customerName">שם הלקוחה *</Label>
//                       <Input
//                         id="customerName"
//                         value={orderForm.customerName}
//                         onChange={(e) => handleInputChange('customerName', e.target.value)}
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <Label htmlFor="length">אורך הפאה (ס"מ) *</Label>
//                       <Input
//                         id="length"
//                         type="number"
//                         min="1"
//                         value={orderForm.length}
//                         onChange={(e) => handleInputChange('length', e.target.value)}
//                         required
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="skinType">סוג סקין *</Label>
//                       <Select 
//                         value={orderForm.skinType} 
//                         onValueChange={(value) => handleInputChange('skinType', value)}
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="רגיל">רגיל</SelectItem>
//                           <SelectItem value="מאוורר">מאוורר</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label htmlFor="color">צבע *</Label>
//                       <Input
//                         id="color"
//                         value={orderForm.color}
//                         onChange={(e) => handleInputChange('color', e.target.value)}
//                         required
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="highlights">גוונים בפאה</Label>
//                       <Select 
//                         value={orderForm.highlights} 
//                         onValueChange={(value) => handleInputChange('highlights', value)}
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="ללא גוונים">ללא גוונים</SelectItem>
//                           <SelectItem value="גוונים 1">גוונים 1</SelectItem>
//                           <SelectItem value="גוונים 2">גוונים 2</SelectItem>
//                           <SelectItem value="גוונים 3">גוונים 3</SelectItem>
//                           <SelectItem value="אחר">אחר</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     {/* שדה מותאם אישית לגוונים */}
//                     {orderForm.highlights === 'אחר' && (
//                       <div>
//                         <Label htmlFor="customHighlights">פרט גוונים</Label>
//                         <Input
//                           id="customHighlights"
//                           value={orderForm.customHighlights}
//                           onChange={(e) => handleInputChange('customHighlights', e.target.value)}
//                           placeholder="למשל: גוונים 4, גוונים מיוחדים..."
//                         />
//                       </div>
//                     )}

//                     <div>
//                       <Label htmlFor="babyHairType">דוגמת בייבי הייר</Label>
//                       <Input
//                         id="babyHairType"
//                         value={orderForm.babyHairType}
//                         onChange={(e) => handleInputChange('babyHairType', e.target.value)}
//                         placeholder="אופציונלי"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="openingTone">גוון פתיחה</Label>
//                       <Input
//                         id="openingTone"
//                         value={orderForm.openingTone}
//                         onChange={(e) => handleInputChange('openingTone', e.target.value)}
//                         placeholder="אופציונלי"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="pattern">דוגמה</Label>
//                       <Select 
//                         value={orderForm.pattern} 
//                         onValueChange={(value) => handleInputChange('pattern', value)}
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="ייבוש טבעי תנועה גדולה">ייבוש טבעי תנועה גדולה</SelectItem>
//                           <SelectItem value="ייבוש טבעי תנועה קטנה">ייבוש טבעי תנועה קטנה</SelectItem>
//                           <SelectItem value="אחר">אחר</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label htmlFor="discount">הנחה (₪)</Label>
//                       <Input
//                         id="discount"
//                         type="number"
//                         step="0.01"
//                         min="0"
//                         value={orderForm.discount}
//                         onChange={(e) => handleInputChange('discount', e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   {/* הערות */}
//                   <div>
//                     <Label htmlFor="notes">הערות</Label>
//                     <Textarea
//                       id="notes"
//                       value={orderForm.notes}
//                       onChange={(e) => handleInputChange('notes', e.target.value)}
//                       rows={3}
//                     />
//                   </div>

//                   {/* פרטי שליחה לטרסים */}
//                   <div className="space-y-4 p-4 bg-gray-50 rounded">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="sentToTrass"
//                         checked={orderForm.sentToTrass}
//                         onCheckedChange={(checked) => handleInputChange('sentToTrass', checked)}
//                       />
//                       <Label htmlFor="sentToTrass" className="mr-2">נשלח לטרסים</Label>
//                     </div>

//                     {orderForm.sentToTrass && (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <Label htmlFor="trassOperator">אופרטור טרסים</Label>
//                           <Input
//                             id="trassOperator"
//                             value={orderForm.trassOperator}
//                             onChange={(e) => handleInputChange('trassOperator', e.target.value)}
//                           />
//                         </div>
//                         <div>
//                           <Label htmlFor="trassSentDate">תאריך שליחה</Label>
//                           <Input
//                             id="trassSentDate"
//                             type="date"
//                             value={orderForm.trassSentDate}
//                             onChange={(e) => handleInputChange('trassSentDate', e.target.value)}
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* תצוגת מחיר */}
//                   <div className="flex justify-between items-center p-4 bg-blue-50 rounded">
//                     <span className="text-lg font-semibold">מחיר סופי:</span>
//                     <span className="text-2xl font-bold text-blue-600">₪{calculatePrice().toFixed(2)}</span>
//                   </div>

//                   <Button type="submit" className="w-full">
//                     <PlusCircle className="w-4 h-4 ml-2" />
//                     הוסף הזמנה
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* טאב הזמנות ממתינות */}
//           <TabsContent value="pending" className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold">הזמנות ממתינות ({pendingOrders.length})</h3>
//             </div>
            
//             <div className="grid gap-4">
//               {pendingOrders.length === 0 ? (
//                 <Card>
//                   <CardContent className="p-6 text-center text-gray-500">
//                     אין הזמנות ממתינות
//                   </CardContent>
//                 </Card>
//               ) : (
//                 pendingOrders.map((order) => (
//                   <Card key={order.id}>
//                     <CardContent className="p-6">
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
//                           <div className="text-sm text-gray-600">
//                             {new Date(order.orderDate).toLocaleDateString('he-IL')}
//                           </div>
//                         </div>
//                         <div className="text-left">
//                           <div className="text-lg font-bold text-orange-600">₪{order.totalPrice.toFixed(2)}</div>
//                           {order.discount > 0 && (
//                             <div className="text-sm text-gray-500">הנחה: ₪{order.discount.toFixed(2)}</div>
//                           )}
//                           <Badge className="mt-1 bg-orange-100 text-orange-800">ממתין</Badge>
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                         <div>
//                           <span className="font-medium">אורך:</span> {order.length} ס"מ
//                         </div>
//                         <div>
//                           <span className="font-medium">סקין:</span> {order.skinType}
//                         </div>
//                         <div>
//                           <span className="font-medium">צבע:</span> {order.color}
//                         </div>
//                         <div>
//                           <span className="font-medium">גוונים:</span> {order.highlights}
//                         </div>
//                       </div>

//                       {order.sentToTrass && (
//                         <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
//                           <span className="font-medium">נשלח לטרסים:</span> {order.trassOperator} 
//                           {order.trassSentDate && ` בתאריך ${new Date(order.trassSentDate).toLocaleDateString('he-IL')}`}
//                         </div>
//                       )}

//                       {order.notes && (
//                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
//                           <span className="font-medium">הערות:</span> {order.notes}
//                         </div>
//                       )}

//                       <div className="flex justify-end mt-4 gap-2">
//                         {/* כפתור עריכה */}
//                         <Button 
//                           size="sm" 
//                           variant="outline"
//                           onClick={() => handleEditOrder(order)}
//                           className="flex items-center gap-2"
//                         >
//                           <Edit className="w-4 h-4" />
//                           ערוך
//                         </Button>
// {/* 
//                         כפתור מחיקה
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => setDeletingOrderId(order.id)}
//                           className="flex items-center gap-2"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                           מחק
//                         </Button> */}
//                         <div key={payment.id} className="border rounded-lg p-4">
//   <div className="flex justify-between items-start mb-3">
//     <div className="flex-1">
//       <div className="font-semibold text-lg text-green-600">
//         ₪{(payment.totalAmount || payment.amount || 0).toFixed(2)}
//       </div>
//       <div className="text-sm text-gray-600">
//         {new Date(payment.paymentDate).toLocaleDateString('he-IL')}
//       </div>
//       {payment.notes && (
//         <div className="text-sm text-gray-500 mt-1">{payment.notes}</div>
//       )}
//     </div>
//     {/* כפתור מחיקה - בצד */}
//     <Button
//       size="icon"
//       variant="ghost"
//       onClick={() => setDeletingPaymentId(payment.id)}
//       className="h-8 w-8 hover:bg-red-100 hover:text-red-600 flex-shrink-0"
//     >
//       <Trash2 className="w-4 h-4" />
//     </Button>
//   </div>

//                         {/* כפתור סמן כנמסר */}
//                         <AlertDialog>
//                           <AlertDialogTrigger asChild>
//                             <Button size="sm" className="flex items-center gap-2">
//                               <ArrowRight className="w-4 h-4" />
//                               סמן כנמסר
//                             </Button>
//                           </AlertDialogTrigger>
//                           <AlertDialogContent>
//                             <AlertDialogHeader>
//                               <AlertDialogTitle>סמן הזמנה כנמסרה</AlertDialogTitle>
//                               <AlertDialogDescription>
//                                 האם אתה בטוח שברצונך לסמן את ההזמנה של {order.customerName} כנמסרה?
//                                 פעולה זו תעביר את ההזמנה לטאב "מוכנות".
//                               </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <AlertDialogCancel>ביטול</AlertDialogCancel>
//                               <AlertDialogAction onClick={() => markAsDelivered(order.id)}>
//                                 אישור
//                               </AlertDialogAction>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         </AlertDialog>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </div>
//           </TabsContent>

//           {/* טאב הזמנות מוכנות */}
//           <TabsContent value="completed" className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold">הזמנות מוכנות ({completedOrders.length})</h3>
//             </div>
            
//             <div className="grid gap-4">
//               {completedOrders.length === 0 ? (
//                 <Card>
//                   <CardContent className="p-6 text-center text-gray-500">
//                     אין הזמנות מוכנות
//                   </CardContent>
//                 </Card>
//               ) : (
//                 completedOrders.map((order) => (
//                   <Card key={order.id}>
//                     <CardContent className="p-6">
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h4 className="text-lg font-semibold">{order.customerName}</h4>
//                           <div className="text-sm text-gray-600">
//                             <p>הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
//                             {order.deliveryDate && (
//                               <p>נמסר ב: {new Date(order.deliveryDate).toLocaleDateString('he-IL')}</p>
//                             )}
//                           </div>
//                         </div>
//                         <div className="text-left flex items-start gap-2">
//                           <div>
//                             <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
//                             <Badge className="mt-1 bg-green-100 text-green-800">נמסר</Badge>
//                           </div>
//                           {/* כפתור מחיקה להזמנות מוכנות */}
//                           <Button
//                             size="icon"
//                             variant="ghost"
//                             onClick={() => setDeletingOrderId(order.id)}
//                             className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                         <div>
//                           <span className="font-medium">אורך:</span> {order.length} ס"מ
//                         </div>
//                         <div>
//                           <span className="font-medium">סקין:</span> {order.skinType}
//                         </div>
//                         <div>
//                           <span className="font-medium">צבע:</span> {order.color}
//                         </div>
//                         <div>
//                           <span className="font-medium">גוונים:</span> {order.highlights}
//                         </div>
//                       </div>

//                       {order.notes && (
//                         <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
//                           <span className="font-medium">הערות:</span> {order.notes}
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </div>
//           </TabsContent>

//           {/* טאב תשלומים */}
//           <TabsContent value="payments" className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold">תשלומים</h3>
//               <Button 
//                 onClick={() => setShowPaymentForm(!showPaymentForm)}
//                 className="flex items-center gap-2"
//               >
//                 <PlusCircle className="w-4 h-4" />
//                 {showPaymentForm ? 'ביטול' : 'תשלום חדש'}
//               </Button>
//             </div>

//             {showPaymentForm && (
//               <CompoundPaymentForm
//                 faniyaId={faniyaId}
//                 onSubmit={handlePaymentSubmit}
//                 onCancel={() => setShowPaymentForm(false)}
//               />
//             )}

//             <Card>
//               <CardHeader>
//                 <CardTitle>היסטוריית תשלומים</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {payments.length === 0 ? (
//                   <p className="text-gray-500 text-center py-8">אין תשלומים רשומים</p>
//                 ) : (
//                   <div className="space-y-4">
//                     {payments.map((payment: any) => (
//                       <div key={payment.id} className="border rounded-lg p-4 relative">
//                         {/* כפתור מחיקה */}
//                         <Button
//                           size="icon"
//                           variant="ghost"
//                           onClick={() => setDeletingPaymentId(payment.id)}
//                           className="absolute top-2 left-2 h-8 w-8 hover:bg-red-100 hover:text-red-600"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>

//                         <div className="flex justify-between items-start mb-3">
//                           <div>
//                             <div className="font-semibold text-lg text-green-600">
//                               ₪{(payment.totalAmount || payment.amount || 0).toFixed(2)}
//                             </div>
//                             <div className="text-sm text-gray-600">
//                               {new Date(payment.paymentDate).toLocaleDateString('he-IL')}
//                             </div>
//                             {payment.notes && (
//                               <div className="text-sm text-gray-500 mt-1">{payment.notes}</div>
//                             )}
//                           </div>
//                         </div>

//                         {payment.paymentParts && payment.paymentParts.length > 0 ? (
//                           <div className="space-y-2">
//                             <div className="text-sm font-medium text-gray-700">פירוט התשלום:</div>
//                             {payment.paymentParts.map((part: any) => (
//                               <div key={part.id} className="bg-gray-50 p-3 rounded text-sm">
//                                 <div className="flex justify-between items-start">
//                                   <div className="flex items-center gap-2">
//                                     {part.paymentType === 'מזומן' && <span>💵</span>}
//                                     {part.paymentType === 'צ\'ק' && <span>🧾</span>}
//                                     {part.paymentType === 'העברה בנקאית' && <span>🏦</span>}
//                                     <span className="font-medium">{part.paymentType}</span>
//                                   </div>
//                                   <span className="font-bold text-green-600">₪{part.amount.toFixed(2)}</span>
//                                 </div>
                                
//                                 {part.paymentType === 'צ\'ק' && (
//                                   <div className="mt-1 text-gray-600">
//                                     {part.checkNumber && <span>צ'ק מס׳ {part.checkNumber}</span>}
//                                     {part.checkDueDate && (
//                                       <span className="mr-2">
//                                         פרעון: {new Date(part.checkDueDate).toLocaleDateString('he-IL')}
//                                       </span>
//                                     )}
//                                   </div>
//                                 )}
                                
//                                 {part.paymentType === 'העברה בנקאית' && part.bankReference && (
//                                   <div className="mt-1 text-gray-600">
//                                     אסמכתא: {part.bankReference}
//                                   </div>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="text-sm text-gray-600">
//                             {payment.paymentType || 'לא צוין'} 
//                             {payment.checkDueDate && (
//                               <span className="mr-2">
//                                 | פרעון: {new Date(payment.checkDueDate).toLocaleDateString('he-IL')}
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>סיכום</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
//                     <div className="text-sm text-gray-600">סה"כ תשלומים</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-orange-600">
//                       ₪{orders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
//                     </div>
//                     <div className="text-sm text-gray-600">סה"כ הזמנות</div>
//                   </div>
//                   <div className="text-center">
//                     <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
//                       ₪{faniya.totalDebt.toFixed(2)}
//                     </div>
//                     <div className="text-sm text-gray-600">יתרת חוב</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* טאב דוחות */}
//           <TabsContent value="reports" className="space-y-4">
//             <MonthlyReports faniyaId={faniyaId} faniyaName={faniya.name} />
//           </TabsContent>

//           {/* טאב דוח תשלומים */}
//           <TabsContent value="payments-report" className="space-y-4">
//             <PaymentsOnlyReport faniyaId={faniyaId} faniyaName={faniya.name} />
//           </TabsContent>
//         </Tabs>

//         {/* Dialog לעריכת הזמנה */}
//         <Dialog open={!!editingOrder} onOpenChange={(open) => !open && setEditingOrder(null)}>
//           <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>עריכת הזמנה - {editingOrder?.customerName}</DialogTitle>
//             </DialogHeader>
//             {editOrderForm && (
//               <div className="space-y-4 py-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label>שם הלקוחה</Label>
//                     <Input
//                       value={editOrderForm.customerName}
//                       onChange={(e) => handleEditInputChange('customerName', e.target.value)}
//                     />
//                   </div>
                  
//                   <div>
//                     <Label>אורך (ס"מ)</Label>
//                     <Input
//                       type="number"
//                       value={editOrderForm.length}
//                       onChange={(e) => handleEditInputChange('length', e.target.value)}
//                     />
//                   </div>

//                   <div>
//                     <Label>סוג סקין</Label>
//                     <Select 
//                       value={editOrderForm.skinType} 
//                       onValueChange={(value) => handleEditInputChange('skinType', value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="רגיל">רגיל</SelectItem>
//                         <SelectItem value="מאוורר">מאוורר</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label>צבע</Label>
//                     <Input
//                       value={editOrderForm.color}
//                       onChange={(e) => handleEditInputChange('color', e.target.value)}
//                     />
//                   </div>

//                   <div>
//                     <Label>גוונים</Label>
//                     <Select 
//                       value={editOrderForm.highlights} 
//                       onValueChange={(value) => handleEditInputChange('highlights', value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="ללא גוונים">ללא גוונים</SelectItem>
//                         <SelectItem value="גוונים 1">גוונים 1</SelectItem>
//                         <SelectItem value="גוונים 2">גוונים 2</SelectItem>
//                         <SelectItem value="גוונים 3">גוונים 3</SelectItem>
//                         <SelectItem value="אחר">אחר</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {editOrderForm.highlights === 'אחר' && (
//                     <div>
//                       <Label>פרט גוונים</Label>
//                       <Input
//                         value={editOrderForm.customHighlights}
//                         onChange={(e) => handleEditInputChange('customHighlights', e.target.value)}
//                       />
//                     </div>
//                   )}

//                   <div>
//                     <Label>בייבי הייר</Label>
//                     <Input
//                       value={editOrderForm.babyHairType}
//                       onChange={(e) => handleEditInputChange('babyHairType', e.target.value)}
//                     />
//                   </div>

//                   <div>
//                     <Label>גוון פתיחה</Label>
//                     <Input
//                       value={editOrderForm.openingTone}
//                       onChange={(e) => handleEditInputChange('openingTone', e.target.value)}
//                     />
//                   </div>

//                   <div>
//                     <Label>דוגמה</Label>
//                     <Select 
//                       value={editOrderForm.pattern} 
//                       onValueChange={(value) => handleEditInputChange('pattern', value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="ייבוש טבעי תנועה גדולה">ייבוש טבעי תנועה גדולה</SelectItem>
//                         <SelectItem value="ייבוש טבעי תנועה קטנה">ייבוש טבעי תנועה קטנה</SelectItem>
//                         <SelectItem value="אחר">אחר</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label>הנחה (₪)</Label>
//                     <Input
//                       type="number"
//                       step="0.01"
//                       value={editOrderForm.discount}
//                       onChange={(e) => handleEditInputChange('discount', e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label>הערות</Label>
//                   <Textarea
//                     value={editOrderForm.notes}
//                     onChange={(e) => handleEditInputChange('notes', e.target.value)}
//                     rows={3}
//                   />
//                 </div>

//                 {/* טרסים */}
//                 <div className="space-y-4 p-4 bg-gray-50 rounded">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="editSentToTrass"
//                       checked={editOrderForm.sentToTrass}
//                       onCheckedChange={(checked) => handleEditInputChange('sentToTrass', checked)}
//                     />
//                     <Label htmlFor="editSentToTrass" className="mr-2">נשלח לטרסים</Label>
//                   </div>

//                   {editOrderForm.sentToTrass && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label>אופן השליחה</Label>
//                         <Input
//                           value={editOrderForm.trassOperator}
//                           onChange={(e) => handleEditInputChange('trassOperator', e.target.value)}
//                         />
//                       </div>
//                       <div>
//                         <Label>תאריך</Label>
//                         <Input
//                           type="date"
//                           value={editOrderForm.trassSentDate}
//                           onChange={(e) => handleEditInputChange('trassSentDate', e.target.value)}
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* מחיר */}
//                 <div className="flex justify-between items-center p-4 bg-blue-50 rounded">
//                   <span className="text-lg font-semibold">מחיר סופי:</span>
//                   <span className="text-2xl font-bold text-blue-600">
//                     ₪{calculatePrice(editOrderForm).toFixed(2)}
//                   </span>
//                 </div>

//                 <div className="flex gap-2">
//                   <Button onClick={handleUpdateOrder} className="flex-1">
//                     שמור שינויים
//                   </Button>
//                   <Button 
//                     variant="outline" 
//                     onClick={() => setEditingOrder(null)}
//                     className="flex-1"
//                   >
//                     ביטול
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>

//         {/* AlertDialog למחיקת הזמנה */}
//         <AlertDialog open={!!deletingOrderId} onOpenChange={(open) => !open && setDeletingOrderId(null)}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>האם למחוק הזמנה זו?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 פעולה זו תמחק את ההזמנה לצמיתות. החוב יתעדכן אוטומטית. לא ניתן לשחזר מידע זה.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>ביטול</AlertDialogCancel>
//               <AlertDialogAction
//                 className="bg-red-600 hover:bg-red-700"
//                 onClick={() => deletingOrderId && handleDeleteOrder(deletingOrderId)}
//               >
//                 מחק
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>

//         {/* AlertDialog למחיקת תשלום */}
//         <AlertDialog open={!!deletingPaymentId} onOpenChange={(open) => !open && setDeletingPaymentId(null)}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>האם למחוק תשלום זה?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 פעולה זו תמחק את התשלום ואת כל חלקיו לצמיתות. החוב יתעדכן אוטומטית. לא ניתן לשחזר מידע זה.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>ביטול</AlertDialogCancel>
//               <AlertDialogAction
//                 className="bg-red-600 hover:bg-red-700"
//                 onClick={() => deletingPaymentId && handleDeletePayment(deletingPaymentId)}
//               >
//                 מחק
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </Layout>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { CompoundPaymentForm } from '@/components/forms/CompoundPaymentForm';
import { MonthlyReports } from '@/components/reports/MonthlyReports';
import { PaymentsOnlyReport } from '@/components/reports/PaymentsOnlyReport';
import { PlusCircle, Package, CreditCard, FileText, ArrowRight, Calendar, Edit, Trash2, DollarSign } from 'lucide-react';

interface Faniya {
  id: string;
  name: string;
  totalDebt: number;
  totalPayments: number;
  _count: {
    orders: number;
    payments: number;
  };
}

interface Order {
  id: string;
  orderDate: string;
  customerName: string;
  length: number;
  skinType: string;
  color: string;
  highlights: string;
  babyHairType?: string;
  openingTone?: string;
  pattern: string;
  notes?: string;
  discount: number;
  totalPrice: number;
  sentToTrass: boolean;
  trassOperator?: string;
  trassSentDate?: string;
  isCompleted: boolean;
  deliveryDate?: string;
  debtAdded?: boolean;
}

interface Payment {
  id: string;
  totalAmount?: number;
  amount?: number;
  paymentDate: string;
  paymentType?: string;
  checkDueDate?: string;
  notes?: string;
  paymentParts?: any[];
}

export default function FaniyaPage() {
  const params = useParams();
  const router = useRouter();
  const faniyaId = params.id as string;
  
  const [faniya, setFaniya] = useState<Faniya | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('new-order');
  const [debtTransactions, setDebtTransactions] = useState<any[]>([]);
  // State לטופס הזמנה חדשה
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    length: '',
    skinType: 'רגיל',
    color: '',
    highlights: '', // תיבת טקסט חופשית!
    babyHairType: '',
    openingTone: '',
    pattern: 'ייבוש טבעי תנועה גדולה',
    customPattern: '', // לדוגמה מותאמת אישית
    notes: '',
    discount: '0',
    sentToTrass: false,
    trassOperator: '',
    trassSentDate: ''
  });

  // State למחירים
  const [pricingRanges, setPricingRanges] = useState<any[]>([]);
  const [fanSupplement, setFanSupplement] = useState(1000);

  // State לטופס תשלום מורכב
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // State לעריכת הזמנה
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [editOrderForm, setEditOrderForm] = useState<any>(null);

  // State למחיקות
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [deletingPaymentId, setDeletingPaymentId] = useState<string | null>(null);

  // State לעדכון חוב ידני
  const [showDebtDialog, setShowDebtDialog] = useState(false);
  const [manualDebt, setManualDebt] = useState('');
  const [debtNote, setDebtNote] = useState('');

  // State להיסטוריית חוב
  const [debtHistory, setDebtHistory] = useState<any[]>([]);
  const [showDebtHistoryDialog, setShowDebtHistoryDialog] = useState(false);

  useEffect(() => {
    if (faniyaId) {
      fetchFaniyaData();
      fetchPricing();
    }
  }, [faniyaId]);

  const fetchFaniyaData = async () => {
    try {
      const faniyaRes = await fetch(`/api/faniyas/${faniyaId}`);
      if (faniyaRes.ok) {
        const faniyaData = await faniyaRes.json();
        setFaniya(faniyaData);
        setManualDebt('');
      }

      const ordersRes = await fetch(`/api/orders?faniyaId=${faniyaId}`);
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }

      const paymentsRes = await fetch(`/api/payments?faniyaId=${faniyaId}`);
      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        setPayments(paymentsData);
      }

      // ✅ טעינת עדכוני חוב
    const debtRes = await fetch(`/api/debt-history?faniyaId=${faniyaId}`);
    if (debtRes.ok) {
      const debtData = await debtRes.json();
      setDebtTransactions(debtData);
    }
      
    } catch (error) {
      console.error('שגיאה בטעינת נתונים:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPricing = async () => {
    try {
      const response = await fetch('/api/pricing');
      if (response.ok) {
        const data = await response.json();
        setPricingRanges(data.regularRanges || []);
        setFanSupplement(data.fanSupplement || 1000);
      }
    } catch (error) {
      console.error('שגיאה בטעינת מחירים:', error);
    }
  };

  const fetchDebtHistory = async () => {
    try {
      const response = await fetch(`/api/debt-history?faniyaId=${faniyaId}`);
      if (response.ok) {
        const data = await response.json();
        setDebtHistory(data);
      }
    } catch (error) {
      console.error('שגיאה בטעינת היסטוריית חוב:', error);
    }
  };

  const calculatePrice = (form: any = orderForm) => {
    const length = parseInt(form.length) || 0;
    const discount = parseFloat(form.discount) || 0;
    
    const range = pricingRanges.find(r => length >= r.minLength && length <= r.maxLength);
    
    if (!range) {
      return 0;
    }
    
    let price = range.price;
    
    if (form.skinType === 'מאוורר') {
      price += fanSupplement;
    }
    
    return Math.max(0, price - discount);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderForm.customerName || !orderForm.length || !orderForm.color) {
      alert('אנא מלא את כל השדות החובה');
      return;
    }

    try {
      // טיפול בדוגמה מותאמת אישית
      const patternValue = orderForm.pattern === 'אחר' 
        ? orderForm.customPattern 
        : orderForm.pattern;

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          faniyaId,
          ...orderForm,
          pattern: patternValue,
          length: parseInt(orderForm.length),
          discount: parseFloat(orderForm.discount) || 0,
          totalPrice: calculatePrice(),
          trassSentDate: orderForm.trassSentDate || null
        })
      });

      if (response.ok) {
        alert('הזמנה נוספה בהצלחה!');
        setOrderForm({
          customerName: '',
          length: '',
          skinType: 'רגיל',
          color: '',
          highlights: '',
          babyHairType: '',
          openingTone: '',
          pattern: 'ייבוש טבעי תנועה גדולה',
          customPattern: '',
          notes: '',
          discount: '0',
          sentToTrass: false,
          trassOperator: '',
          trassSentDate: ''
        });
        fetchFaniyaData();
        setActiveTab('pending');
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
      }
    } catch (error) {
      alert('שגיאה בהוספת הזמנה');
    }
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setEditOrderForm({
      customerName: order.customerName,
      length: order.length.toString(),
      skinType: order.skinType,
      color: order.color,
      highlights: order.highlights,
      babyHairType: order.babyHairType || '',
      openingTone: order.openingTone || '',
      pattern: order.pattern,
      customPattern: '',
      notes: order.notes || '',
      discount: order.discount.toString(),
      sentToTrass: order.sentToTrass,
      trassOperator: order.trassOperator || '',
      trassSentDate: order.trassSentDate || ''
    });
  };

  const handleUpdateOrder = async () => {
    if (!editingOrder) return;

    try {
      const patternValue = editOrderForm.pattern === 'אחר' 
        ? editOrderForm.customPattern 
        : editOrderForm.pattern;

      const response = await fetch(`/api/orders/${editingOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerName: editOrderForm.customerName,
          length: parseInt(editOrderForm.length),
          skinType: editOrderForm.skinType,
          color: editOrderForm.color,
          highlights: editOrderForm.highlights,
          babyHairType: editOrderForm.babyHairType || null,
          openingTone: editOrderForm.openingTone || null,
          pattern: patternValue,
          notes: editOrderForm.notes || null,
          discount: parseFloat(editOrderForm.discount) || 0,
          totalPrice: calculatePrice(editOrderForm),
          sentToTrass: editOrderForm.sentToTrass,
          trassOperator: editOrderForm.trassOperator || null,
          trassSentDate: editOrderForm.trassSentDate || null
        })
      });

      if (response.ok) {
        alert('הזמנה עודכנה בהצלחה!');
        setEditingOrder(null);
        setEditOrderForm(null);
        fetchFaniyaData();
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
      }
    } catch (error) {
      alert('שגיאה בעדכון הזמנה');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('הזמנה נמחקה בהצלחה!');
        setDeletingOrderId(null);
        fetchFaniyaData();
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
      }
    } catch (error) {
      alert('שגיאה במחיקת הזמנה');
    }
  };

  const handleDeletePayment = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('תשלום נמחק בהצלחה!');
        setDeletingPaymentId(null);
        fetchFaniyaData();
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
      }
    } catch (error) {
      alert('שגיאה במחיקת תשלום');
    }
  };

  const handleUpdateDebt = async () => {
    if (!debtNote.trim()) {
      alert('אנא הזן תיאור לסיבת החוב');
      return;
    }

    try {
      const debtAmount = parseFloat(manualDebt) || 0;
      
      if (debtAmount === 0) {
        alert('אנא הזן סכום');
        return;
      }

      const response = await fetch(`/api/debt-manual`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          faniyaId,
          amount: debtAmount,
          description: debtNote
        })
      });

      if (response.ok) {
        alert('החוב עודכן בהצלחה!');
        setShowDebtDialog(false);
        setManualDebt('');
        setDebtNote('');
        fetchFaniyaData();
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
      }
    } catch (error) {
      alert('שגיאה בעדכון חוב');
    }
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

      if (response.ok) {
        alert('תשלום נוסף בהצלחה!');
        setShowPaymentForm(false);
        fetchFaniyaData();
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
      }
    } catch (error) {
      alert('שגיאה בהוספת תשלום');
    }
  };

  const markAsDelivered = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deliveryDate: new Date().toISOString(),
          isCompleted: true
        })
      });

      if (response.ok) {
        alert('הזמנה סומנה כנמסרה!');
        fetchFaniyaData();
      }
    } catch (error) {
      alert('שגיאה בעדכון הזמנה');
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setOrderForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (field: string, value: any) => {
    setEditOrderForm((prev: any) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!faniya) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">פאנית לא נמצאה</h2>
          <Button onClick={() => router.push('/')}>חזור לדף הבית</Button>
        </div>
      </Layout>
    );
  }

  const pendingOrders = orders.filter(order => !order.isCompleted);
  const completedOrders = orders.filter(order => order.isCompleted);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <Button variant="outline" onClick={() => router.push('/')} className="mb-4">
                ← חזור לדף הבית
              </Button>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900">{faniya.name}</h1>
                <Dialog open={showDebtDialog} onOpenChange={setShowDebtDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      עדכון חוב
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>הוספה לחוב</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label>חוב נוכחי</Label>
                        <div className="text-2xl font-bold text-red-600">
                          ₪{faniya.totalDebt.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="manualDebt">סכום להוסיף (₪)</Label>
                        <Input
                          id="manualDebt"
                          type="number"
                          step="0.01"
                          value={manualDebt}
                          onChange={(e) => setManualDebt(e.target.value)}
                          placeholder="הכנס סכום להוספה"
                        />
                        {manualDebt && (
                          <p className="text-xs text-gray-500 mt-1">
                            החוב החדש יהיה: ₪{(faniya.totalDebt + (parseFloat(manualDebt) || 0)).toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="debtNote">סיבת החוב *</Label>
                        <Textarea
                          id="debtNote"
                          value={debtNote}
                          onChange={(e) => setDebtNote(e.target.value)}
                          placeholder="למשל: חוב ישן, תיקון פאה, הוצאות נוספות..."
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateDebt} className="flex-1">
                          הוסף לחוב
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowDebtDialog(false)}
                          className="flex-1"
                        >
                          ביטול
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    fetchDebtHistory();
                    setShowDebtHistoryDialog(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  היסטוריית חוב
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
                <Package className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{pendingOrders.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
                <Package className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">סה״כ תשלומים</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">יתרת חוב</CardTitle>
                <CreditCard className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ₪{faniya.totalDebt.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="new-order">הזמנה חדשה</TabsTrigger>
            <TabsTrigger value="pending">לא מוכנות ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">מוכנות ({completedOrders.length})</TabsTrigger>
            <TabsTrigger value="payments">תשלומים ({payments.length})</TabsTrigger>
            <TabsTrigger value="reports">דוחות</TabsTrigger>
            <TabsTrigger value="payments-report">דוח תשלומים</TabsTrigger>
          </TabsList>

          <TabsContent value="new-order" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>הזמנה חדשה</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOrderSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">שם הלקוחה *</Label>
                      <Input
                        id="customerName"
                        value={orderForm.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="length">אורך הפאה (ס"מ) *</Label>
                      <Input
                        id="length"
                        type="number"
                        min="1"
                        value={orderForm.length}
                        onChange={(e) => handleInputChange('length', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="skinType">סוג סקין *</Label>
                      <Select 
                        value={orderForm.skinType} 
                        onValueChange={(value) => handleInputChange('skinType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="רגיל">רגיל</SelectItem>
                          <SelectItem value="מאוורר">מאוורר</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="color">צבע *</Label>
                      <Input
                        id="color"
                        value={orderForm.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="highlights">גוונים בפאה</Label>
                      <Input
                        id="highlights"
                        value={orderForm.highlights}
                        onChange={(e) => handleInputChange('highlights', e.target.value)}
                        placeholder="למשל: ללא גוונים, גוונים 1, גוונים בלונד..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="babyHairType">דוגמת בייבי הייר</Label>
                      <Input
                        id="babyHairType"
                        value={orderForm.babyHairType}
                        onChange={(e) => handleInputChange('babyHairType', e.target.value)}
                        placeholder="אופציונלי"
                      />
                    </div>

                    <div>
                      <Label htmlFor="openingTone">גוון פתיחה</Label>
                      <Input
                        id="openingTone"
                        value={orderForm.openingTone}
                        onChange={(e) => handleInputChange('openingTone', e.target.value)}
                        placeholder="אופציונלי"
                      />
                    </div>

                    <div>
                      <Label htmlFor="pattern">דוגמה</Label>
                      <Select 
                        value={orderForm.pattern} 
                        onValueChange={(value) => handleInputChange('pattern', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ייבוש טבעי תנועה גדולה">ייבוש טבעי תנועה גדולה</SelectItem>
                          <SelectItem value="ייבוש טבעי תנועה קטנה">ייבוש טבעי תנועה קטנה</SelectItem>
                          <SelectItem value="אחר">אחר</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {orderForm.pattern === 'אחר' && (
                      <div>
                        <Label htmlFor="customPattern">פרט דוגמה</Label>
                        <Input
                          id="customPattern"
                          value={orderForm.customPattern}
                          onChange={(e) => handleInputChange('customPattern', e.target.value)}
                          placeholder="למשל: גלים מעורבבים, סתם חלק..."
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="discount">הנחה (₪)</Label>
                      <Input
                        id="discount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={orderForm.discount}
                        onChange={(e) => handleInputChange('discount', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">הערות</Label>
                    <Textarea
                      id="notes"
                      value={orderForm.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4 p-4 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sentToTrass"
                        checked={orderForm.sentToTrass}
                        onCheckedChange={(checked) => handleInputChange('sentToTrass', checked)}
                      />
                      <Label htmlFor="sentToTrass" className="mr-2">נשלח לטרסים</Label>
                    </div>

                    {orderForm.sentToTrass && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="trassOperator"> טרסים</Label>
                          <Input
                            id="trassOperator"
                            value={orderForm.trassOperator}
                            onChange={(e) => handleInputChange('trassOperator', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="trassSentDate">תאריך שליחה</Label>
                          <Input
                            id="trassSentDate"
                            type="date"
                            value={orderForm.trassSentDate}
                            onChange={(e) => handleInputChange('trassSentDate', e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded">
                    <span className="text-lg font-semibold">מחיר סופי:</span>
                    <span className="text-2xl font-bold text-blue-600">₪{calculatePrice().toFixed(2)}</span>
                  </div>

                  <Button type="submit" className="w-full">
                    <PlusCircle className="w-4 h-4 ml-2" />
                    הוסף הזמנה
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">הזמנות ממתינות ({pendingOrders.length})</h3>
            </div>
            
            <div className="grid gap-4">
              {pendingOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    אין הזמנות ממתינות
                  </CardContent>
                </Card>
              ) : (
                pendingOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{order.customerName}</h4>
                          <div className="text-sm text-gray-600">
                            {new Date(order.orderDate).toLocaleDateString('he-IL')}
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-bold text-orange-600">₪{order.totalPrice.toFixed(2)}</div>
                          {order.discount > 0 && (
                            <div className="text-sm text-gray-500">הנחה: ₪{order.discount.toFixed(2)}</div>
                          )}
                          <Badge className="mt-1 bg-orange-100 text-orange-800">ממתין</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">אורך:</span> {order.length} ס"מ
                        </div>
                        <div>
                          <span className="font-medium">סקין:</span> {order.skinType}
                        </div>
                        <div>
                          <span className="font-medium">צבע:</span> {order.color}
                        </div>
                        <div>
                          <span className="font-medium">גוונים:</span> {order.highlights || 'לא צוין'}
                        </div>
                      </div>

                      {order.sentToTrass && (
                        <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                          <span className="font-medium">נשלח לטרסים:</span> {order.trassOperator} 
                          {order.trassSentDate && ` בתאריך ${new Date(order.trassSentDate).toLocaleDateString('he-IL')}`}
                        </div>
                      )}

                      {order.notes && (
                        <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                          <span className="font-medium">הערות:</span> {order.notes}
                        </div>
                      )}

                      <div className="flex justify-end mt-4 gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditOrder(order)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          ערוך
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeletingOrderId(order.id)}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          מחק
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4" />
                              סמן כנמסר
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>סמן הזמנה כנמסרה</AlertDialogTitle>
                              <AlertDialogDescription>
                                האם אתה בטוח שברצונך לסמן את ההזמנה של {order.customerName} כנמסרה?
                                פעולה זו תעביר את ההזמנה לטאב "מוכנות" ותוסיף את המחיר לחוב.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>ביטול</AlertDialogCancel>
                              <AlertDialogAction onClick={() => markAsDelivered(order.id)}>
                                אישור
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">הזמנות מוכנות ({completedOrders.length})</h3>
            </div>
            
            <div className="grid gap-4">
              {completedOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    אין הזמנות מוכנות
                  </CardContent>
                </Card>
              ) : (
                completedOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{order.customerName}</h4>
                          <div className="text-sm text-gray-600">
                            <p>הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
                            {order.deliveryDate && (
                              <p>נמסר ב: {new Date(order.deliveryDate).toLocaleDateString('he-IL')}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-left flex items-start gap-2">
                          <div>
                            <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
                            <Badge className="mt-1 bg-green-100 text-green-800">נמסר</Badge>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setDeletingOrderId(order.id)}
                            className="h-8 w-8 hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">אורך:</span> {order.length} ס"מ
                        </div>
                        <div>
                          <span className="font-medium">סקין:</span> {order.skinType}
                        </div>
                        <div>
                          <span className="font-medium">צבע:</span> {order.color}
                        </div>
                        <div>
                          <span className="font-medium">גוונים:</span> {order.highlights || 'לא צוין'}
                        </div>
                      </div>

                      {order.notes && (
                        <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                          <span className="font-medium">הערות:</span> {order.notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">תשלומים</h3>
              <Button 
                onClick={() => setShowPaymentForm(!showPaymentForm)}
                className="flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                {showPaymentForm ? 'ביטול' : 'תשלום חדש'}
              </Button>
            </div>

            {showPaymentForm && (
              <CompoundPaymentForm
                faniyaId={faniyaId}
                onSubmit={handlePaymentSubmit}
                onCancel={() => setShowPaymentForm(false)}
              />
            )}

            <Card>
              <CardHeader>
                <CardTitle>היסטוריית תשלומים</CardTitle>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">אין תשלומים רשומים</p>
                ) : (
                  <div className="space-y-4">
                    {payments.map((pmt: any) => (
                      <div key={pmt.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="font-semibold text-lg text-green-600">
                              ₪{(pmt.totalAmount || pmt.amount || 0).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(pmt.paymentDate).toLocaleDateString('he-IL')}
                            </div>
                            {pmt.notes && (
                              <div className="text-sm text-gray-500 mt-1">{pmt.notes}</div>
                            )}
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setDeletingPaymentId(pmt.id)}
                            className="h-8 w-8 hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {pmt.paymentParts && pmt.paymentParts.length > 0 ? (
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700">פירוט התשלום:</div>
                            {pmt.paymentParts.map((part: any) => (
                              <div key={part.id} className="bg-gray-50 p-3 rounded text-sm">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-2">
                                    {part.paymentType === 'מזומן' && <span>💵</span>}
                                    {part.paymentType === 'צ\'ק' && <span>🧾</span>}
                                    {part.paymentType === 'העברה בנקאית' && <span>🏦</span>}
                                    <span className="font-medium">{part.paymentType}</span>
                                  </div>
                                  <span className="font-bold text-green-600">₪{part.amount.toFixed(2)}</span>
                                </div>
                                
                                {part.paymentType === 'צ\'ק' && (
                                  <div className="mt-1 text-gray-600">
                                    {part.checkNumber && <span>צ'ק מס׳ {part.checkNumber}</span>}
                                    {part.checkDueDate && (
                                      <span className="mr-2">
                                        פרעון: {new Date(part.checkDueDate).toLocaleDateString('he-IL')}
                                      </span>
                                    )}
                                  </div>
                                )}
                                
                                {part.paymentType === 'העברה בנקאית' && part.bankReference && (
                                  <div className="mt-1 text-gray-600">
                                    אסמכתא: {part.bankReference}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600">
                            {pmt.paymentType || 'לא צוין'} 
                            {pmt.checkDueDate && (
                              <span className="mr-2">
                                | פרעון: {new Date(pmt.checkDueDate).toLocaleDateString('he-IL')}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>סיכום</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">₪{payments.reduce((sum, p) => sum + (p.totalAmount || p.amount || 0), 0).toFixed(2)}</div>
                    {/* <div className="text-2xl font-bold text-blue-600">₪{faniya.totalPayments.toFixed(2)}</div> */}
                    <div className="text-sm text-gray-600">סה"כ תשלומים</div>
                  </div>
                  {/* <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      ₪{orders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">סה"כ הזמנות</div>
                  </div> */}

<div className="text-center">
  <div className="text-2xl font-bold text-orange-600">
    ₪{(
      orders.reduce((sum, order) => sum + order.totalPrice, 0) +
      debtTransactions
        .filter(t => t.type === 'manual')
        .reduce((sum, t) => sum + t.amount, 0)
    ).toFixed(2)}
  </div>
  <div className="text-sm text-gray-600">סה"כ הזמנות</div>
</div>

                  <div className="text-center">
                    <div className={`text-2xl font-bold ${faniya.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ₪{faniya.totalDebt.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">יתרת חוב</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <MonthlyReports faniyaId={faniyaId} faniyaName={faniya.name} />
          </TabsContent>

          <TabsContent value="payments-report" className="space-y-4">
            <PaymentsOnlyReport faniyaId={faniyaId} faniyaName={faniya.name} />
          </TabsContent>
        </Tabs>

        <Dialog open={!!editingOrder} onOpenChange={(open) => !open && setEditingOrder(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>עריכת הזמנה - {editingOrder?.customerName}</DialogTitle>
            </DialogHeader>
            {editOrderForm && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>שם הלקוחה</Label>
                    <Input
                      value={editOrderForm.customerName}
                      onChange={(e) => handleEditInputChange('customerName', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>אורך (ס"מ)</Label>
                    <Input
                      type="number"
                      value={editOrderForm.length}
                      onChange={(e) => handleEditInputChange('length', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>סוג סקין</Label>
                    <Select 
                      value={editOrderForm.skinType} 
                      onValueChange={(value) => handleEditInputChange('skinType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="רגיל">רגיל</SelectItem>
                        <SelectItem value="מאוורר">מאוורר</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>צבע</Label>
                    <Input
                      value={editOrderForm.color}
                      onChange={(e) => handleEditInputChange('color', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>גוונים</Label>
                    <Input
                      value={editOrderForm.highlights}
                      onChange={(e) => handleEditInputChange('highlights', e.target.value)}
                      placeholder="למשל: ללא גוונים, גוונים 1..."
                    />
                  </div>

                  <div>
                    <Label>בייבי הייר</Label>
                    <Input
                      value={editOrderForm.babyHairType}
                      onChange={(e) => handleEditInputChange('babyHairType', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>גוון פתיחה</Label>
                    <Input
                      value={editOrderForm.openingTone}
                      onChange={(e) => handleEditInputChange('openingTone', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>דוגמה</Label>
                    <Select 
                      value={editOrderForm.pattern} 
                      onValueChange={(value) => handleEditInputChange('pattern', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ייבוש טבעי תנועה גדולה">ייבוש טבעי תנועה גדולה</SelectItem>
                        <SelectItem value="ייבוש טבעי תנועה קטנה">ייבוש טבעי תנועה קטנה</SelectItem>
                        <SelectItem value="אחר">אחר</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {editOrderForm.pattern === 'אחר' && (
                    <div>
                      <Label>פרט דוגמה</Label>
                      <Input
                        value={editOrderForm.customPattern}
                        onChange={(e) => handleEditInputChange('customPattern', e.target.value)}
                        placeholder="דוגמה מותאמת אישית"
                      />
                    </div>
                  )}

                  <div>
                    <Label>הנחה (₪)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editOrderForm.discount}
                      onChange={(e) => handleEditInputChange('discount', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>הערות</Label>
                  <Textarea
                    value={editOrderForm.notes}
                    onChange={(e) => handleEditInputChange('notes', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-4 p-4 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="editSentToTrass"
                      checked={editOrderForm.sentToTrass}
                      onCheckedChange={(checked) => handleEditInputChange('sentToTrass', checked)}
                    />
                    <Label htmlFor="editSentToTrass" className="mr-2">נשלח לטרסים</Label>
                  </div>

                  {editOrderForm.sentToTrass && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>אופן השליחה</Label>
                        <Input
                          value={editOrderForm.trassOperator}
                          onChange={(e) => handleEditInputChange('trassOperator', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>תאריך</Label>
                        <Input
                          type="date"
                          value={editOrderForm.trassSentDate}
                          onChange={(e) => handleEditInputChange('trassSentDate', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded">
                  <span className="text-lg font-semibold">מחיר סופי:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₪{calculatePrice(editOrderForm).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleUpdateOrder} className="flex-1">
                    שמור שינויים
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingOrder(null)}
                    className="flex-1"
                  >
                    ביטול
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deletingOrderId} onOpenChange={(open) => !open && setDeletingOrderId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>האם למחוק הזמנה זו?</AlertDialogTitle>
              <AlertDialogDescription>
                פעולה זו תמחק את ההזמנה לצמיתות. החוב יתעדכן אוטומטית. לא ניתן לשחזר מידע זה.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ביטול</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => deletingOrderId && handleDeleteOrder(deletingOrderId)}
              >
                מחק
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={!!deletingPaymentId} onOpenChange={(open) => !open && setDeletingPaymentId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>האם למחוק תשלום זה?</AlertDialogTitle>
              <AlertDialogDescription>
                פעולה זו תמחק את התשלום ואת כל חלקיו לצמיתות. החוב יתעדכן אוטומטית. לא ניתן לשחזר מידע זה.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ביטול</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => deletingPaymentId && handleDeletePayment(deletingPaymentId)}
              >
                מחק
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={showDebtHistoryDialog} onOpenChange={setShowDebtHistoryDialog}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>היסטוריית חוב - {faniya.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {debtHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">אין היסטוריית חוב</p>
              ) : (
                <div className="space-y-2">
                  {debtHistory.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className={`p-3 rounded border ${
                        transaction.amount > 0 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-green-50 border-green-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-xs text-gray-600">
                            {new Date(transaction.createdAt).toLocaleDateString('he-IL')} - {new Date(transaction.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        <div className={`text-lg font-bold ${
                          transaction.amount > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}₪{transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}