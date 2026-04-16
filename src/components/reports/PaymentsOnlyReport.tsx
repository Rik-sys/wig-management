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
            padding: 20px;
            line-height: 1.5;
            margin: 0;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
          }
          .title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 3px;
            color: #000;
          }
          .subtitle {
            font-size: 12px;
            color: #000;
            margin-bottom: 2px;
          }
          .doc-title {
            font-size: 11px;
            color: #000;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th {
            padding: 8px 5px;
            font-size: 11px;
            font-weight: bold;
            border: none;
            text-align: right;
            color: #000;
          }
          td {
            padding: 6px 5px;
            font-size: 11px;
            border: none;
            text-align: right;
            color: #000;
          }
          tr {
            border: none;
          }
          .amount {
            font-weight: bold;
            color: #000;
          }
          .payment-row {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 20px;
            padding: 6px 0;
            font-size: 11px;
            align-items: center;
          }
          .payment-row.total-row {
            font-weight: bold;
            border-top: 1px solid #000;
            padding-top: 10px;
            margin-top: 10px;
            padding-bottom: 0;
          }
          .footer {
            margin-top: 30px;
            padding-top: 0;
            font-size: 10px;
            color: #000;
            text-align: center;
          }
          .payment-details {
            font-size: 11px;
            color: #000;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">${faniyaName}</div>
          <div class="subtitle">דוח תשלומים חודשי</div>
          <div class="doc-title">חודש: ${HEBREW_MONTHS[selectedMonth - 1]} ${selectedYear}</div>
        </div>
        
        ${payments.length === 0 ? '<p style="text-align: center; color: #333; font-size: 12px;">אין תשלומים בחודש זה</p>' : `
          <div style="margin: 20px 0;">
              ${payments.map((payment) => {
                const paymentAmount = payment.totalAmount || payment.amount || 0;
                const paymentDate = new Date(payment.paymentDate).toLocaleDateString('he-IL');
                
                if (payment.paymentParts && payment.paymentParts.length > 0) {
                  return payment.paymentParts.map((part: any) => 
                    `<div class="payment-row">
                      <span>${paymentDate} - ${part.paymentType}${
                        part.checkNumber ? ` (צ'ק ${part.checkNumber})` : ''
                      }${
                        part.bankReference ? ` (אסמכתא ${part.bankReference})` : ''
                      }</span>
                      <span class="amount">₪${part.amount.toFixed(2)}</span>
                    </div>`
                  ).join('');
                } else {
                  return `<div class="payment-row">
                    <span>${paymentDate} - תשלום</span>
                    <span class="amount">₪${paymentAmount.toFixed(2)}</span>
                  </div>`;
                }
              }).join('')}
              <div class="payment-row total-row">
                <span>סה"כ תשלומים</span>
                <span class="amount">₪${totalPayments.toFixed(2)}</span>
              </div>
          </div>
        `}

        <div class="footer">
          דוח נוצר ב: ${new Date().toLocaleDateString('he-IL')} | ${new Date().toLocaleTimeString('he-IL')}
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
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">תשלומים לחודש {selectedMonth}.{selectedYear}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-0">
              {payments.map((payment) => (
                <div key={payment.id} className="flex justify-between items-center py-2">
                  <span className="text-sm">{new Date(payment.paymentDate).toLocaleDateString('he-IL')}</span>
                  <span className="font-bold">
                    ₪{(payment.totalAmount || payment.amount || 0).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-800 pt-3 mt-3">
                <div className="grid items-center w-full gap-4" style={{gridTemplateColumns: '1fr auto'}}>
                  <span className="font-bold text-sm">סה"כ תשלומים:</span>
                  <span className="font-bold">₪{totalPayments.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}