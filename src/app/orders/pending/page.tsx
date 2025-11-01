'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';

export default function PendingOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order: any) =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.faniya.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders?status=pending');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      }
    } catch (error) {
      console.error('שגיאה בטעינת הזמנות:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">כל ההזמנות הממתינות</h1>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-blue-600 hover:text-blue-800"
          >
              חזור לדף הבית →
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>חיפוש</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="חפש לפי שם לקוחה או פאנית..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="text-lg font-semibold">
          סה"כ {filteredOrders.length} הזמנות ממתינות
        </div>

        <div className="grid gap-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                {searchTerm ? 'לא נמצאו הזמנות התואמות לחיפוש' : 'אין הזמנות ממתינות'}
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="hover:bg-gray-50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{order.customerName}</h4>
                      <p className="text-sm text-gray-600">
                        פאנית: <span className="font-medium">{order.faniya.name}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        הוזמן ב: {new Date(order.orderDate).toLocaleDateString('he-IL')}
                      </p>
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold text-green-600">₪{order.totalPrice.toFixed(2)}</div>
                      <Badge variant="outline" className="mt-1">ממתינה</Badge>
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
                      <span className="font-medium">גוונים:</span> {order.highlights}
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

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => window.location.href = `/faniya/${order.faniyaId}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    >
                      עבור לדף הפאנית
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}