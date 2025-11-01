import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.pricingSettings.findMany();
    
    const pricing = {
      regular: settings.find(s => s.skinType === 'רגיל')?.pricePerCm || 15,
      fan: settings.find(s => s.skinType === 'מאוורר')?.pricePerCm || 18
    };

    return NextResponse.json(pricing);
  } catch (error) {
    console.error('שגיאה בטעינת מחירים:', error);
    return NextResponse.json({ regular: 15, fan: 18 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { regular, fan } = await request.json();

    await prisma.pricingSettings.upsert({
      where: { skinType: 'רגיל' },
      update: { pricePerCm: regular },
      create: { skinType: 'רגיל', pricePerCm: regular }
    });

    await prisma.pricingSettings.upsert({
      where: { skinType: 'מאוורר' },
      update: { pricePerCm: fan },
      create: { skinType: 'מאוורר', pricePerCm: fan }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('שגיאה בעדכון מחירים:', error);
    return NextResponse.json({ error: 'שגיאה בעדכון' }, { status: 500 });
  }
}