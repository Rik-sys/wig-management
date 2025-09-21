// src/app/api/faniyas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - קבלת כל הפאניות
export async function GET() {
  try {
    const faniyas = await prisma.faniya.findMany({
      include: {
        _count: {
          select: {
            orders: true,
            payments: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(faniyas);
  } catch (error) {
    console.error('שגיאה בטעינת פאניות:', error);
    return NextResponse.json(
      { error: 'שגיאה בטעינת נתונים' },
      { status: 500 }
    );
  }
}

// POST - יצירת פאנית חדשה
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'שם הפאנית חובה' },
        { status: 400 }
      );
    }

    const faniya = await prisma.faniya.create({
      data: {
        name: name.trim()
      }
    });

    return NextResponse.json(faniya);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'פאנית בשם זה כבר קיימת' },
        { status: 409 }
      );
    }

    console.error('שגיאה ביצירת פאנית:', error);
    return NextResponse.json(
      { error: 'שגיאה ביצירת פאנית' },
      { status: 500 }
    );
  }
}
