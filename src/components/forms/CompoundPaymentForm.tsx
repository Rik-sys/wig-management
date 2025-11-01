// 'use client';

// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { PlusCircle, Trash2, CreditCard, Banknote, Building2 } from 'lucide-react';

// interface PaymentPart {
//   id: string;
//   amount: string;
//   paymentType: 'מזומן' | 'צ\'ק' | 'העברה בנקאית';
//   checkNumber?: string;
//   checkDueDate?: string;
//   bankReference?: string;
//   notes?: string;
// }

// interface CompoundPaymentFormProps {
//   faniyaId: string;
//   onSubmit: (paymentData: any) => void;
//   onCancel: () => void;
// }

// export function CompoundPaymentForm({ faniyaId, onSubmit, onCancel }: CompoundPaymentFormProps) {
//   const [paymentParts, setPaymentParts] = useState<PaymentPart[]>([
//     {
//       id: '1',
//       amount: '',
//       paymentType: 'מזומן',
//       notes: ''
//     }
//   ]);
//   const [generalNotes, setGeneralNotes] = useState('');

//   const addPaymentPart = () => {
//     const newPart: PaymentPart = {
//       id: Date.now().toString(),
//       amount: '',
//       paymentType: 'מזומן',
//       notes: ''
//     };
//     setPaymentParts([...paymentParts, newPart]);
//   };

//   const removePaymentPart = (id: string) => {
//     if (paymentParts.length > 1) {
//       setPaymentParts(paymentParts.filter(part => part.id !== id));
//     }
//   };

//   const updatePaymentPart = (id: string, field: keyof PaymentPart, value: string) => {
//     setPaymentParts(paymentParts.map(part => 
//       part.id === id ? { ...part, [field]: value } : part
//     ));
//   };

//   const calculateTotal = () => {
//     return paymentParts.reduce((sum, part) => sum + (parseFloat(part.amount) || 0), 0);
//   };

//   const getPaymentTypeIcon = (type: string) => {
//     switch (type) {
//       case 'מזומן': return <Banknote className="w-4 h-4" />;
//       case 'צ\'ק': return <CreditCard className="w-4 h-4" />;
//       case 'העברה בנקאית': return <Building2 className="w-4 h-4" />;
//       default: return <CreditCard className="w-4 h-4" />;
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // בדיקת תקינות
//     const validParts = paymentParts.filter(part => parseFloat(part.amount) > 0);
//     if (validParts.length === 0) {
//       alert('אנא הוסף לפחות חלק תשלום אחד עם סכום');
//       return;
//     }

//     // בדיקה שכל הצ'קים יש להם מספר ותאריך פרעון
//     const checksWithoutDetails = validParts.filter(part => 
//       part.paymentType === 'צ\'ק' && (!part.checkNumber || !part.checkDueDate)
//     );
//     if (checksWithoutDetails.length > 0) {
//       alert('אנא מלא מספר צ\'ק ותאריך פרעון לכל הצ\'קים');
//       return;
//     }

//     // בדיקה שכל ההעברות יש להן אסמכתא
//     const transfersWithoutRef = validParts.filter(part => 
//       part.paymentType === 'העברה בנקאית' && !part.bankReference
//     );
//     if (transfersWithoutRef.length > 0) {
//       alert('אנא מלא מספר אסמכתא לכל ההעברות הבנקאיות');
//       return;
//     }

//     const paymentData = {
//       faniyaId,
//       totalAmount: calculateTotal(),
//       notes: generalNotes,
//       paymentParts: validParts.map(part => ({
//         amount: parseFloat(part.amount),
//         paymentType: part.paymentType,
//         checkNumber: part.checkNumber || null,
//         checkDueDate: part.checkDueDate ? new Date(part.checkDueDate) : null,
//         bankReference: part.bankReference || null,
//         notes: part.notes || null
//       }))
//     };

//     onSubmit(paymentData);
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <CreditCard className="w-5 h-5" />
//           תשלום חדש
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
          
//           {/* סיכום כולל */}
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <span className="text-lg font-medium">סה״כ תשלום:</span>
//               <Badge variant="secondary" className="text-lg px-3 py-1">
//                 ₪{calculateTotal().toFixed(2)}
//               </Badge>
//             </div>
//           </div>

//           {/* חלקי התשלום */}
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-medium">חלקי התשלום</h3>
//               <Button type="button" onClick={addPaymentPart} size="sm" variant="outline">
//                 <PlusCircle className="w-4 h-4 mr-2" />
//                 הוסף חלק
//               </Button>
//             </div>

//             {paymentParts.map((part, index) => (
//               <Card key={part.id} className="p-4">
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex items-center gap-2">
//                     {getPaymentTypeIcon(part.paymentType)}
//                     <span className="font-medium">חלק {index + 1}</span>
//                   </div>
//                   {paymentParts.length > 1 && (
//                     <Button
//                       type="button"
//                       onClick={() => removePaymentPart(part.id)}
//                       size="sm"
//                       variant="destructive"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label>סכום *</Label>
//                     <Input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       value={part.amount}
//                       onChange={(e) => updatePaymentPart(part.id, 'amount', e.target.value)}
//                       placeholder="0.00"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label>סוג תשלום</Label>
//                     <Select 
//                       value={part.paymentType} 
//                       onValueChange={(value: any) => updatePaymentPart(part.id, 'paymentType', value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="מזומן"> מזומן</SelectItem>
//                         <SelectItem value="צ'ק"> צ'ק</SelectItem>
//                         <SelectItem value="העברה בנקאית"> העברה בנקאית</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 {/* פרטים נוספים לפי סוג תשלום */}
//                 {part.paymentType === 'צ\'ק' && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-3 bg-yellow-50 rounded">
//                     <div>
//                       <Label>מספר צ'ק *</Label>
//                       <Input
//                         value={part.checkNumber || ''}
//                         onChange={(e) => updatePaymentPart(part.id, 'checkNumber', e.target.value)}
//                         placeholder="מספר הצ'ק"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label>תאריך פרעון *</Label>
//                       <Input
//                         type="date"
//                         value={part.checkDueDate || ''}
//                         onChange={(e) => updatePaymentPart(part.id, 'checkDueDate', e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {part.paymentType === 'העברה בנקאית' && (
//                   <div className="mt-4 p-3 bg-green-50 rounded">
//                     <Label>מספר אסמכתא / הפניה *</Label>
//                     <Input
//                       value={part.bankReference || ''}
//                       onChange={(e) => updatePaymentPart(part.id, 'bankReference', e.target.value)}
//                       placeholder="מספר ההעברה או אסמכתא"
//                       required
//                     />
//                   </div>
//                 )}

//                 <div className="mt-4">
//                   <Label>הערות לחלק זה</Label>
//                   <Input
//                     value={part.notes || ''}
//                     onChange={(e) => updatePaymentPart(part.id, 'notes', e.target.value)}
//                     placeholder="הערות אופציונליות"
//                   />
//                 </div>
//               </Card>
//             ))}
//           </div>

//           {/* הערות כלליות */}
//           <div>
//             <Label>הערות כלליות לתשלום</Label>
//             <Textarea
//               value={generalNotes}
//               onChange={(e) => setGeneralNotes(e.target.value)}
//               placeholder="הערות נוספות על התשלום"
//               rows={3}
//             />
//           </div>

//           {/* כפתורים */}
//           <div className="flex justify-end space-x-4 pt-4 border-t">
//             <Button type="button" variant="outline" onClick={onCancel}>
//               ביטול
//             </Button>
//             <Button type="submit" disabled={calculateTotal() === 0}>
//               שמור תשלום (₪{calculateTotal().toFixed(2)})
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, CreditCard } from 'lucide-react';

interface PaymentPart {
  id: string;
  amount: string;
  paymentType: 'מזומן' | 'צ\'ק' | 'העברה בנקאית';
  checkNumber?: string;
  checkDueDate?: string;
  bankReference?: string;
}

interface CompoundPaymentFormProps {
  faniyaId: string;
  onSubmit: (paymentData: any) => void;
  onCancel: () => void;
}

export function CompoundPaymentForm({ faniyaId, onSubmit, onCancel }: CompoundPaymentFormProps) {
  const [paymentParts, setPaymentParts] = useState<PaymentPart[]>([
    { id: '1', amount: '', paymentType: 'מזומן' }
  ]);
  const [generalNotes, setGeneralNotes] = useState('');

  const addPaymentPart = () => {
    setPaymentParts([...paymentParts, {
      id: Date.now().toString(),
      amount: '',
      paymentType: 'מזומן'
    }]);
  };

  const removePaymentPart = (id: string) => {
    if (paymentParts.length > 1) {
      setPaymentParts(paymentParts.filter(part => part.id !== id));
    }
  };

  const updatePaymentPart = (id: string, field: keyof PaymentPart, value: string) => {
    setPaymentParts(paymentParts.map(part => 
      part.id === id ? { ...part, [field]: value } : part
    ));
  };

  const calculateTotal = () => {
    return paymentParts.reduce((sum, part) => sum + (parseFloat(part.amount) || 0), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validParts = paymentParts.filter(part => parseFloat(part.amount) > 0);
    if (validParts.length === 0) {
      alert('אנא הוסף לפחות חלק תשלום אחד עם סכום');
      return;
    }

    const checksWithoutDetails = validParts.filter(part => 
      part.paymentType === 'צ\'ק' && (!part.checkNumber || !part.checkDueDate)
    );
    if (checksWithoutDetails.length > 0) {
      alert('אנא מלא מספר צ\'ק ותאריך פרעון לכל הצ\'קים');
      return;
    }

    const transfersWithoutRef = validParts.filter(part => 
      part.paymentType === 'העברה בנקאית' && !part.bankReference
    );
    if (transfersWithoutRef.length > 0) {
      alert('אנא מלא מספר אסמכתא לכל ההעברות הבנקאיות');
      return;
    }

    const paymentData = {
      faniyaId,
      totalAmount: calculateTotal(),
      notes: generalNotes,
      paymentParts: validParts.map(part => ({
        amount: parseFloat(part.amount),
        paymentType: part.paymentType,
        checkNumber: part.checkNumber || null,
        checkDueDate: part.checkDueDate ? new Date(part.checkDueDate) : null,
        bankReference: part.bankReference || null,
        notes: null
      }))
    };

    onSubmit(paymentData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            תשלום חדש
          </span>
          <span className="text-lg font-bold text-blue-600">
            סה"כ: ₪{calculateTotal().toFixed(2)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* טבלת חלקי תשלום */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>חלקי התשלום</Label>
              <Button type="button" onClick={addPaymentPart} size="sm" variant="outline">
                <PlusCircle className="w-4 h-4 mr-1" />
                הוסף
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-right">סוג</th>
                    <th className="p-2 text-right">סכום</th>
                    <th className="p-2 text-right">פרטים</th>
                    <th className="p-2 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {paymentParts.map((part) => (
                    <tr key={part.id} className="border-t">
                      <td className="p-2">
                        <Select 
                          value={part.paymentType} 
                          onValueChange={(value: any) => updatePaymentPart(part.id, 'paymentType', value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="מזומן">💵 מזומן</SelectItem>
                            <SelectItem value="צ'ק">🧾 צ'ק</SelectItem>
                            <SelectItem value="העברה בנקאית">🏦 העברה</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={part.amount}
                          onChange={(e) => updatePaymentPart(part.id, 'amount', e.target.value)}
                          placeholder="0.00"
                          className="h-8"
                          required
                        />
                      </td>
                      <td className="p-2">
                        {part.paymentType === 'צ\'ק' && (
                          <div className="flex gap-1">
                            <Input
                              value={part.checkNumber || ''}
                              onChange={(e) => updatePaymentPart(part.id, 'checkNumber', e.target.value)}
                              placeholder="מס' צ'ק"
                              className="h-8 text-xs"
                              required
                            />
                            <Input
                              type="date"
                              value={part.checkDueDate || ''}
                              onChange={(e) => updatePaymentPart(part.id, 'checkDueDate', e.target.value)}
                              className="h-8 text-xs"
                              required
                            />
                          </div>
                        )}
                        {part.paymentType === 'העברה בנקאית' && (
                          <Input
                            value={part.bankReference || ''}
                            onChange={(e) => updatePaymentPart(part.id, 'bankReference', e.target.value)}
                            placeholder="אסמכתא"
                            className="h-8 text-xs"
                            required
                          />
                        )}
                      </td>
                      <td className="p-2">
                        {paymentParts.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removePaymentPart(part.id)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* הערות */}
          <div>
            <Label>הערות</Label>
            <Textarea
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              placeholder="הערות נוספות"
              rows={2}
              className="text-sm"
            />
          </div>

          {/* כפתורים */}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              ביטול
            </Button>
            <Button type="submit" disabled={calculateTotal() === 0}>
              שמור (₪{calculateTotal().toFixed(2)})
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}