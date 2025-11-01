// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// export async function GET() {
//   try {
//     const settings = await prisma.pricingSettings.findMany();
    
//     const pricing = {
//       regular: settings.find(s => s.skinType === 'רגיל')?.pricePerCm || 15,
//       fan: settings.find(s => s.skinType === 'מאוורר')?.pricePerCm || 18
//     };

//     return NextResponse.json(pricing);
//   } catch (error) {
//     console.error('שגיאה בטעינת מחירים:', error);
//     return NextResponse.json({ regular: 15, fan: 18 });
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { regular, fan } = await request.json();

//     await prisma.pricingSettings.upsert({
//       where: { skinType: 'רגיל' },
//       update: { pricePerCm: regular },
//       create: { skinType: 'רגיל', pricePerCm: regular }
//     });

//     await prisma.pricingSettings.upsert({
//       where: { skinType: 'מאוורר' },
//       update: { pricePerCm: fan },
//       create: { skinType: 'מאוורר', pricePerCm: fan }
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('שגיאה בעדכון מחירים:', error);
//     return NextResponse.json({ error: 'שגיאה בעדכון' }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.pricingSettings.findMany({
      orderBy: [
        { skinType: 'asc' },
        { minLength: 'asc' }
      ]
    });
    
    // ארגון המחירים
    const regularRanges = settings.filter(s => s.skinType === 'רגיל');
    const fanSupplement = settings.find(s => s.skinType === 'מאוורר_תוספת')?.price || 1000;

    return NextResponse.json({
      regularRanges,
      fanSupplement
    });
  } catch (error) {
    console.error('שגיאה בטעינת מחירים:', error);
    return NextResponse.json({ 
      regularRanges: [],
      fanSupplement: 1000
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { regularRanges, fanSupplement } = await request.json();

    // מחיקת כל המחירים הישנים
    await prisma.pricingSettings.deleteMany({});

    // הוספת טווחי מחירים חדשים
    for (const range of regularRanges) {
      await prisma.pricingSettings.create({
        data: {
          skinType: 'רגיל',
          minLength: range.minLength,
          maxLength: range.maxLength,
          price: range.price
        }
      });
    }

    // הוספת תוספת מאוורר
    await prisma.pricingSettings.create({
      data: {
        skinType: 'מאוורר_תוספת',
        minLength: null,
        maxLength: null,
        price: fanSupplement
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('שגיאה בעדכון מחירים:', error);
    return NextResponse.json({ error: 'שגיאה בעדכון' }, { status: 500 });
  }
}