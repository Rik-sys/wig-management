// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }



// 'use client';

// import { useEffect, useState } from 'react';
// import { Layout } from '@/components/layout/Layout';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { PlusCircle, Users, Package, CreditCard } from 'lucide-react';

// export default function HomePage() {
//   const [stats, setStats] = useState({
//     totalFaniyas: 0,
//     pendingOrders: 0,
//     completedOrders: 0,
//     totalDebt: 0
//   });

//   const [faniyas, setFaniyas] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // טעינת פאניות
//       const faniyasRes = await fetch('/api/faniyas');
//       const faniyasData = await faniyasRes.json();
      
//       if (Array.isArray(faniyasData)) {
//         setFaniyas(faniyasData);
        
//         // חישוב סטטיסטיקות
//         const totalDebt = faniyasData.reduce((sum: number, faniya: any) => 
//           sum + (faniya.totalDebt || 0), 0);
        
//         setStats({
//           totalFaniyas: faniyasData.length,
//           pendingOrders: 0, // נעדכן מאוחר יותר
//           completedOrders: 0, // נעדכן מאוחר יותר  
//           totalDebt
//         });
//       }
//     } catch (error) {
//       console.error('שגיאה בטעינת נתונים:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addNewFaniya = async () => {
//     const name = prompt('הכנס שם הפאנית החדשה:');
//     if (!name) return;

//     try {
//       const response = await fetch('/api/faniyas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name })
//       });

//       if (response.ok) {
//         alert('פאנית נוספה בהצלחה!');
//         fetchData(); // רענון הנתונים
//       } else {
//         const error = await response.json();
//         alert(`שגיאה: ${error.error}`);
//       }
//     } catch (error) {
//       alert('שגיאה בהוספת פאנית');
//     }
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

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">מערכת ניהול פאות</h1>
//           <Button onClick={addNewFaniya} className="flex items-center gap-2">
//             <PlusCircle className="w-4 h-4" />
//             פאנית חדשה
//           </Button>
//         </div>

//         {/* כרטיסי סטטיסטיקות */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">סה״כ פאניות</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalFaniyas}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
//               <Package className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
//               <Package className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-600">{stats.completedOrders}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">סה״כ חובות</CardTitle>
//               <CreditCard className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-red-600">₪{stats.totalDebt.toFixed(2)}</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* רשימת פאניות */}
//         <Card>
//           <CardHeader>
//             <CardTitle>פאניות</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {faniyas.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">
//                 אין פאניות במערכת. הוסף פאנית חדשה כדי להתחיל.
//               </p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {faniyas.map((faniya) => (
//                   <Card key={faniya.id} className="cursor-pointer hover:bg-gray-50">
//                     <CardContent className="p-4">
//                       <h3 className="font-semibold text-lg mb-2">{faniya.name}</h3>
//                       <div className="space-y-1 text-sm text-gray-600">
//                         <p>הזמנות: {faniya._count?.orders || 0}</p>
//                         <p>תשלומים: {faniya._count?.payments || 0}</p>
//                         {faniya.totalDebt > 0 && (
//                           <p className="text-red-600 font-semibold">
//                             חוב: ₪{faniya.totalDebt.toFixed(2)}
//                           </p>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* הודעות מערכת */}
//         <Card>
//           <CardContent className="p-6">
//             <h3 className="font-semibold mb-2">💡 המערכת מוכנה לפעולה!</h3>
//             <ul className="text-sm text-gray-600 space-y-1">
//               <li>✅ בסיס הנתונים הותקן בהצלחה</li>
//               <li>✅ משתמשים ראשוניים נוצרו (admin/admin123)</li>
//               <li>✅ ניתן להוסיף פאניות חדשות</li>
//               <li>🔄 בשלבים הבאים: הזמנות, תשלומים ודוחות</li>
//             </ul>
//           </CardContent>
//         </Card>
//       </div>
//     </Layout>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { Layout } from '@/components/layout/Layout';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { PlusCircle, Users, Package, CreditCard } from 'lucide-react';

// export default function HomePage() {
//   const [stats, setStats] = useState({
//     totalFaniyas: 0,
//     pendingOrders: 0,
//     completedOrders: 0,
//     totalDebt: 0
//   });

//   const [faniyas, setFaniyas] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // טעינת פאניות
//       const faniyasRes = await fetch('/api/faniyas');
//       const faniyasData = await faniyasRes.json();
      
//       if (Array.isArray(faniyasData)) {
//         setFaniyas(faniyasData);
        
//         // חישוב סטטיסטיקות
//         const totalDebt = faniyasData.reduce((sum: number, faniya: any) => 
//           sum + (faniya.totalDebt || 0), 0);
        
//         setStats({
//           totalFaniyas: faniyasData.length,
//           pendingOrders: 0, // נעדכן מאוחר יותר
//           completedOrders: 0, // נעדכן מאוחר יותר  
//           totalDebt
//         });
//       }
//     } catch (error) {
//       console.error('שגיאה בטעינת נתונים:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addNewFaniya = async () => {
//     const name = prompt('הכנס שם הפאנית החדשה:');
//     if (!name) return;

//     try {
//       const response = await fetch('/api/faniyas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name })
//       });

//       if (response.ok) {
//         alert('פאנית נוספה בהצלחה!');
//         fetchData(); // רענון הנתונים
//       } else {
//         const error = await response.json();
//         alert(`שגיאה: ${error.error}`);
//       }
//     } catch (error) {
//       alert('שגיאה בהוספת פאנית');
//     }
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

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">מערכת ניהול פאות</h1>
//           <Button onClick={addNewFaniya} className="flex items-center gap-2">
//             <PlusCircle className="w-4 h-4" />
//             פאנית חדשה
//           </Button>
//         </div>

//         {/* כרטיסי סטטיסטיקות */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">סה״כ פאניות</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalFaniyas}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
//               <Package className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
//               <Package className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-600">{stats.completedOrders}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">סה״כ חובות</CardTitle>
//               <CreditCard className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-red-600">₪{stats.totalDebt.toFixed(2)}</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* רשימת פאניות */}
//         <Card>
//           <CardHeader>
//             <CardTitle>פאניות</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {faniyas.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">
//                 אין פאניות במערכת. הוסף פאנית חדשה כדי להתחיל.
//               </p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {faniyas.map((faniya) => (
//                   <Card 
//                     key={faniya.id} 
//                     className="cursor-pointer hover:bg-gray-50 transition-colors"
//                     onClick={() => window.location.href = `/faniya/${faniya.id}`}
//                   >
//                     <CardContent className="p-4">
//                       <h3 className="font-semibold text-lg mb-2">{faniya.name}</h3>
//                       <div className="space-y-1 text-sm text-gray-600">
//                         <p>הזמנות: {faniya._count?.orders || 0}</p>
//                         <p>תשלומים: {faniya._count?.payments || 0}</p>
//                         {faniya.totalDebt > 0 && (
//                           <p className="text-red-600 font-semibold">
//                             חוב: ₪{faniya.totalDebt.toFixed(2)}
//                           </p>
//                         )}
//                       </div>
//                       <Button 
//                         className="mt-3 w-full" 
//                         size="sm"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           window.location.href = `/faniya/${faniya.id}`;
//                         }}
//                       >
//                         פתח דף פאנית
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* הודעות מערכת
//         <Card>
//           <CardContent className="p-6">
//             <h3 className="font-semibold mb-2">💡 המערכת מוכנה לפעולה!</h3>
//             <ul className="text-sm text-gray-600 space-y-1">
//               <li>✅ בסיס הנתונים הותקן בהצלחה</li>
//               <li>✅ משתמשים ראשוניים נוצרו (admin/admin123)</li>
//               <li>✅ ניתן להוסיף פאניות חדשות</li>
//               <li>🔄 בשלבים הבאים: הזמנות, תשלומים ודוחות</li>
//             </ul>
//           </CardContent>
//         </Card> */}
//       </div>
//     </Layout>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, Package, CreditCard } from 'lucide-react';

export default function HomePage() {
  const [stats, setStats] = useState({
    totalFaniyas: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalDebt: 0
  });

  const [faniyas, setFaniyas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // טעינת פאניות
      const faniyasRes = await fetch('/api/faniyas');
      const faniyasData = await faniyasRes.json();
      
      // טעינת כל ההזמנות
      const ordersRes = await fetch('/api/orders');
      const ordersData = await ordersRes.json();
      
      if (Array.isArray(faniyasData)) {
        setFaniyas(faniyasData);
        
        // חישוב סטטיסטיקות
        const totalDebt = faniyasData.reduce((sum: number, faniya: any) => 
          sum + (faniya.totalDebt || 0), 0);
        
        // חישוב הזמנות ממתינות ומוכנות
        const pendingOrders = Array.isArray(ordersData) ? 
          ordersData.filter((order: any) => !order.isCompleted).length : 0;
        const completedOrders = Array.isArray(ordersData) ? 
          ordersData.filter((order: any) => order.isCompleted).length : 0;
        
        setStats({
          totalFaniyas: faniyasData.length,
          pendingOrders,
          completedOrders,
          totalDebt
        });
      }
    } catch (error) {
      console.error('שגיאה בטעינת נתונים:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNewFaniya = async () => {
    const name = prompt('הכנס שם הפאנית החדשה:');
    if (!name) return;

    try {
      const response = await fetch('/api/faniyas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      });

      if (response.ok) {
        alert('פאנית נוספה בהצלחה!');
        fetchData(); // רענון הנתונים
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
      }
    } catch (error) {
      alert('שגיאה בהוספת פאנית');
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
          <h1 className="text-3xl font-bold text-gray-900">מערכת ניהול פאות</h1>
          <Button onClick={addNewFaniya} className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            פאנית חדשה
          </Button>
        </div>

        {/* כרטיסי סטטיסטיקות */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">סה״כ פאניות</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFaniyas}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">הזמנות ממתינות</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">הזמנות מוכנות</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completedOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">סה״כ חובות</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₪{stats.totalDebt.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* רשימת פאניות */}
        <Card>
          <CardHeader>
            <CardTitle>פאניות</CardTitle>
          </CardHeader>
          <CardContent>
            {faniyas.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                אין פאניות במערכת. הוסף פאנית חדשה כדי להתחיל.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {faniyas.map((faniya) => (
                  <Card 
                    key={faniya.id} 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => window.location.href = `/faniya/${faniya.id}`}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{faniya.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>הזמנות: {faniya._count?.orders || 0}</p>
                        <p>תשלומים: {faniya._count?.payments || 0}</p>
                        {faniya.totalDebt > 0 && (
                          <p className="text-red-600 font-semibold">
                            חוב: ₪{faniya.totalDebt.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <Button 
                        className="mt-3 w-full" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/faniya/${faniya.id}`;
                        }}
                      >
                        פתח דף פאנית
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* הודעות מערכת */}
        {/* <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">💡 המערכת מוכנה לפעולה!</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ בסיס הנתונים הותקן בהצלחה</li>
              <li>✅ משתמשים ראשוניים נוצרו (admin/admin123)</li>
              <li>✅ ניתן להוסיף פאניות חדשות</li>
              <li>🔄 בשלבים הבאים: הזמנות, תשלומים ודוחות</li>
            </ul>
          </CardContent>
        </Card> */}
      </div>
    </Layout>
  );
}