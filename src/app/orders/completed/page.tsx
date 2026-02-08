'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Home, Trash2, Filter } from 'lucide-react';

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
  faniyaId: string;
  faniya: {
    name: string;
  };
}

interface Faniya {
  id: string;
  name: string;
}

export default function CompletedOrdersPage() {
  const router = useRouter();
  
  // State
  const [orders, setOrders] = useState<Order[]>([]);
  const [faniyas, setFaniyas] = useState<Faniya[]>([]);
  const [loading, setLoading] = useState(true);
  
  // סינון
  const [selectedFaniyaId, setSelectedFaniyaId] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  
  // דיאלוגים
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);

  const HEBREW_MONTHS = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - i);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // טעינת כל ההזמנות המוכנות
      const ordersRes = await fetch('/api/orders?status=completed');
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }

      // טעינת כל הפאניות
      const faniyasRes = await fetch('/api/faniyas');
      if (faniyasRes.ok) {
        const faniyasData = await faniyasRes.json();
        setFaniyas(faniyasData);
      }
    } catch (error) {
      console.error('שגיאה בטעינת נתונים:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('הזמנה נמחקה בהצלחה');
        fetchData();
      } else {
        alert('שגיאה במחיקת הזמנה');
      }
    } catch (error) {
      alert('שגיאה במחיקת הזמנה');
    } finally {
      setDeletingOrderId(null);
    }
  };

  // סינון ההזמנות
  const filteredOrders = orders.filter(order => {
    // סינון לפי פאניה
    if (selectedFaniyaId !== 'all' && order.faniyaId !== selectedFaniyaId) {
      return false;
    }

    // סינון לפי תאריך
    if (selectedMonth !== 'all') {
      if (!order.deliveryDate) return false;
      
      const deliveryDate = new Date(order.deliveryDate);
      if (deliveryDate.getFullYear() !== selectedYear || 
          deliveryDate.getMonth() + 1 !== selectedMonth) {
        return false;
      }
    } else {
      // אם בחרנו "כל החודשים", עדיין מסננים לפי שנה
      if (order.deliveryDate) {
        const deliveryDate = new Date(order.deliveryDate);
        if (deliveryDate.getFullYear() !== selectedYear) {
          return false;
        }
      }
    }

    return true;
  });

  // חישוב סטטיסטיקות
  const totalPrice = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">טוען...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* כותרת */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">כל ההזמנות המוכנות</h1>
            <p className="text-gray-600 mt-1">הזמנות שנמסרו ללקוחות</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            חזור לדף הבית
          </Button>
        </div>

        {/* כרטיס סינון */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              סינון הזמנות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* בחירת פאניה */}
              <div>
                <label className="text-sm font-medium mb-2 block">פאניה</label>
                <Select 
                  value={selectedFaniyaId} 
                  onValueChange={setSelectedFaniyaId}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">כל הפאניות</SelectItem>
                    {faniyas.map(faniya => (
                      <SelectItem key={faniya.id} value={faniya.id}>
                        {faniya.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* בחירת שנה */}
              <div>
                <label className="text-sm font-medium mb-2 block">שנה</label>
                <Select 
                  value={selectedYear.toString()} 
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* בחירת חודש */}
              <div>
                <label className="text-sm font-medium mb-2 block">חודש</label>
                <Select 
                  value={selectedMonth.toString()} 
                  onValueChange={(value) => setSelectedMonth(value === 'all' ? 'all' : parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">כל החודשים</SelectItem>
                    {HEBREW_MONTHS.map((monthName, index) => (
                      <SelectItem key={index + 1} value={(index + 1).toString()}>
                        {monthName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* הודעת מצב */}
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  {selectedMonth === 'all' 
                    ? `מציג ${filteredOrders.length} הזמנות מ-${selectedYear}`
                    : `מציג ${filteredOrders.length} הזמנות מ-${HEBREW_MONTHS[selectedMonth - 1]} ${selectedYear}`
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* כרטיס סטטיסטיקות */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">סה"כ הזמנות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{filteredOrders.length}</div>
              <p className="text-xs text-muted-foreground">הזמנות מוכנות</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">סה"כ מחיר</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">₪{totalPrice.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">ערך ההזמנות</p>
            </CardContent>
          </Card>
        </div>

        {/* רשימת הזמנות */}
        <Card>
          <CardHeader>
            <CardTitle>רשימת הזמנות ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {selectedMonth === 'all' 
                    ? `אין הזמנות מוכנות מ-${selectedYear}`
                    : `אין הזמנות שנמסרו ב-${HEBREW_MONTHS[selectedMonth - 1]} ${selectedYear}`
                  }
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredOrders.map((order) => (
                  <Card 
                    key={order.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setViewingOrder(order)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-semibold">{order.customerName}</h4>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              {order.faniya.name}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}</p>
                            {order.deliveryDate ? (
                              <p className="text-green-600 font-medium">
                                נמסר ב: {new Date(order.deliveryDate).toLocaleDateString('he-IL')}
                              </p>
                            ) : (
                              <p className="text-orange-600">ממתין למסירה</p>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingOrderId(order.id);
                            }}
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
                      
                      <div className="mt-3 text-xs text-gray-500 text-center">
                        לחץ לצפייה בפרטים המלאים
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* דיאלוג צפייה בפרטי הזמנה */}
        <Dialog open={!!viewingOrder} onOpenChange={(open) => !open && setViewingOrder(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {viewingOrder && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    פרטי הזמנה - {viewingOrder.customerName}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* סטטוס ומחיר */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <Badge className="bg-green-100 text-green-800 text-base px-3 py-1">
                          ✓ הזמנה מוכנה ונמסרה
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">פאניה:</span>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {viewingOrder.faniya.name}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-600">מחיר סופי</div>
                        <div className="text-3xl font-bold text-green-600">
                          ₪{viewingOrder.totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* תאריכים */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">תאריכים</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">תאריך הזמנה</div>
                        <div className="font-semibold">
                          {new Date(viewingOrder.orderDate).toLocaleDateString('he-IL')}
                        </div>
                      </div>
                      {viewingOrder.deliveryDate && (
                        <div>
                          <div className="text-sm text-gray-600">תאריך מסירה</div>
                          <div className="font-semibold text-green-600">
                            {new Date(viewingOrder.deliveryDate).toLocaleDateString('he-IL')}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* מפרטי הפאה */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">מפרטי הפאה</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">אורך</div>
                          <div className="font-semibold text-lg">{viewingOrder.length} ס"מ</div>
                        </div>
                        
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">סוג סקין</div>
                          <div className="font-semibold text-lg">{viewingOrder.skinType}</div>
                        </div>
                        
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">צבע</div>
                          <div className="font-semibold text-lg">{viewingOrder.color}</div>
                        </div>
                        
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">גוונים</div>
                          <div className="font-semibold text-lg">
                            {viewingOrder.highlights || 'לא צוין'}
                          </div>
                        </div>
                        
                        {viewingOrder.babyHairType && (
                          <div className="p-3 bg-gray-50 rounded">
                            <div className="text-sm text-gray-600">סוג בייביהר</div>
                            <div className="font-semibold text-lg">{viewingOrder.babyHairType}</div>
                          </div>
                        )}
                        
                        {viewingOrder.openingTone && (
                          <div className="p-3 bg-gray-50 rounded">
                            <div className="text-sm text-gray-600">גוון פתיחה</div>
                            <div className="font-semibold text-lg">{viewingOrder.openingTone}</div>
                          </div>
                        )}
                        
                        <div className="p-3 bg-gray-50 rounded md:col-span-2">
                          <div className="text-sm text-gray-600">דוגמה</div>
                          <div className="font-semibold text-lg">{viewingOrder.pattern}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* פרטי מחיר */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">פירוט מחיר</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {viewingOrder.discount > 0 && (
                          <>
                            <div className="flex justify-between text-gray-600">
                              <span>מחיר לפני הנחה</span>
                              <span>₪{(viewingOrder.totalPrice + viewingOrder.discount).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-red-600">
                              <span>הנחה</span>
                              <span>-₪{viewingOrder.discount.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2"></div>
                          </>
                        )}
                        <div className="flex justify-between font-bold text-lg">
                          <span>מחיר סופי</span>
                          <span className="text-green-600">₪{viewingOrder.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* פרטי טרסים */}
                  {viewingOrder.sentToTrass && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">פרטי שליחה לטרסים</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {viewingOrder.trassOperator && (
                            <div>
                              <div className="text-sm text-gray-600">אופן שליחה</div>
                              <div className="font-semibold">{viewingOrder.trassOperator}</div>
                            </div>
                          )}
                          {viewingOrder.trassSentDate && (
                            <div>
                              <div className="text-sm text-gray-600">תאריך שליחה</div>
                              <div className="font-semibold">
                                {new Date(viewingOrder.trassSentDate).toLocaleDateString('he-IL')}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* הערות */}
                  {viewingOrder.notes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">הערות</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg whitespace-pre-wrap">
                          {viewingOrder.notes}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* כפתור סגירה */}
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={() => setViewingOrder(null)}
                      className="px-8"
                    >
                      סגור
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* דיאלוג מחיקת הזמנה */}
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
      </div>
    </Layout>
  );
}
