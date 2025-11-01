'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Calendar } from 'lucide-react';

interface Payment {
  id: string;
  totalAmount?: number;
  amount?: number;
  paymentDate: string;
  paymentParts?: any[];
}

interface PaymentsOnlyReportProps {
  faniyaId: string;
  faniyaName: string;
}

const HEBREW_MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
];

export function PaymentsOnlyReport({ faniyaId, faniyaName }: PaymentsOnlyReportProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      loadPayments(selectedYear, selectedMonth);
    }
  }, [selectedYear, selectedMonth, faniyaId]);

  const loadPayments = async (year: number, month: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/payments?faniyaId=${faniyaId}`);
      const allPayments: Payment[] = response.ok ? await response.json() : [];
      
      const monthPayments = allPayments.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate.getFullYear() === year && paymentDate.getMonth() + 1 === month;
      });

      setPayments(monthPayments);
    } catch (error) {
      console.error('שגיאה בטעינת תשלומים:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = () => {
    const totalPayments = payments.reduce((sum, payment) => 
      sum + (payment.totalAmount || payment.amount || 0), 0);

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
          .payment-item {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
          }
          .payment-item:last-child {
            border-bottom: none;
          }
          .amount {
            font-weight: bold;
            color: #16a34a;
          }
          .total {
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #333;
            text-align: center;
          }
          .payment-parts {
            margin-top: 5px;
            padding-right: 20px;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">${faniyaName}</div>
          <div class="subtitle">דוח תשלומים - ${selectedMonth}.${selectedYear}</div>
        </div>
        
        <div class="section">
          <h2>תשלומים שהתקבלו לחודש ${selectedMonth}.${selectedYear}</h2>
          ${payments.length === 0 ? '<p style="text-align: center; color: #666;">אין תשלומים בחודש זה</p>' : ''}
          ${payments.map((payment) => {
            const paymentAmount = payment.totalAmount || payment.amount || 0;
            const paymentDate = new Date(payment.paymentDate).toLocaleDateString('he-IL');
            
            let partsHtml = '';
            if (payment.paymentParts && payment.paymentParts.length > 0) {
              partsHtml = '<div class="payment-parts">' + 
                payment.paymentParts.map((part: any) => 
                  `• ${part.paymentType}: ₪${part.amount.toFixed(2)}${
                    part.checkNumber ? ` (צ'ק ${part.checkNumber})` : ''
                  }${
                    part.bankReference ? ` (אסמכתא ${part.bankReference})` : ''
                  }`
                ).join('<br>') + 
                '</div>';
            }
            
            return `
              <div class="payment-item">
                <div>
                  <div>${paymentDate}</div>
                  ${partsHtml}
                </div>
                <div class="amount">₪${paymentAmount.toFixed(2)}</div>
              </div>
            `;
          }).join('')}
          
          <div class="total">
            סה"כ תשלומים: <span class="amount">₪${totalPayments.toFixed(2)}</span>
          </div>
        </div>

        <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #666;">
          דוח נוצר ב: ${new Date().toLocaleDateString('he-IL')} ${new Date().toLocaleTimeString('he-IL')}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `דוח_תשלומים_${faniyaName}_${selectedMonth}_${selectedYear}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('דוח תשלומים ירד בהצלחה!');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - i);
  const totalPayments = payments.reduce((sum, payment) => 
    sum + (payment.totalAmount || payment.amount || 0), 0);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            דוח תשלומים בלבד
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
                disabled={loading || payments.length === 0}
                className="flex items-center gap-2 w-full"
              >
                <Download className="w-4 h-4" />
                ייצא דוח תשלומים
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {!loading && payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>תשלומים לחודש {selectedMonth}.{selectedYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>{new Date(payment.paymentDate).toLocaleDateString('he-IL')}</span>
                  <span className="font-bold text-green-600">
                    ₪{(payment.totalAmount || payment.amount || 0).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t-2 border-gray-300 pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>סה"כ תשלומים:</span>
                  <span className="text-green-600">₪{totalPayments.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}