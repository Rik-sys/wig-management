import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Context {
  params: { id: string }
}

// GET - קבלת פאנית ספציפית
export async function GET(request: NextRequest, { params }: Context) {
  try {
    const faniya = await prisma.faniya.findUnique({
      where: {
        id: params.id
      },
      include: {
        _count: {
          select: {
            orders: true,
            payments: true
          }
        }
      }
    });

    if (!faniya) {
      return NextResponse.json(
        { error: 'פאנית לא נמצאה' },
        { status: 404 }
      );
    }

    return NextResponse.json(faniya);
  } catch (error) {
    console.error('שגיאה בטעינת פאנית:', error);
    return NextResponse.json(
      { error: 'שגיאה בטעינת נתונים' },
      { status: 500 }
    );
  }
}

// PUT - עדכון פאנית
export async function PUT(request: NextRequest, { params }: Context) {
  try {
    const updateData = await request.json();

    const faniya = await prisma.faniya.update({
      where: {
        id: params.id
      },
      data: updateData,
      include: {
        _count: {
          select: {
            orders: true,
            payments: true
          }
        }
      }
    });

    return NextResponse.json(faniya);
  } catch (error) {
    console.error('שגיאה בעדכון פאנית:', error);
    return NextResponse.json(
      { error: 'שגיאה בעדכון פאנית' },
      { status: 500 }
    );
  }
}

// DELETE - מחיקת פאנית
export async function DELETE(request: NextRequest, { params }: Context) {
  try {
    await prisma.faniya.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: 'פאנית נמחקה בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת פאנית:', error);
    return NextResponse.json(
      { error: 'שגיאה במחיקת פאנית' },
      { status: 500 }
    );
  }
}