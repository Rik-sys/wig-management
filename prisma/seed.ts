// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 מתחיל seeding...')

  // יצירת משתמש admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'מנהל המערכת',
      role: 'admin'
    }
  })

  console.log('✅ נוצר משתמש admin (שם משתמש: admin, סיסמה: admin123)')

  // יצירת משתמש מזכירה
  const secretaryPassword = await bcrypt.hash('secretary123', 10)
  
  const secretary = await prisma.user.upsert({
    where: { username: 'secretary' },
    update: {},
    create: {
      username: 'secretary',
      password: secretaryPassword,
      name: 'מזכירה',
      role: 'user'
    }
  })

  console.log('✅ נוצר משתמש מזכירה (שם משתמש: secretary, סיסמה: secretary123)')

  // הוספת הגדרות מחיר
  const regularSkin = await prisma.pricingSettings.upsert({
    where: { skinType: 'רגיל' },
    update: {},
    create: {
      skinType: 'רגיל',
      pricePerCm: 15.0
    }
  })

  const fanSkin = await prisma.pricingSettings.upsert({
    where: { skinType: 'מאוורר' },
    update: {},
    create: {
      skinType: 'מאוורר',
      pricePerCm: 18.0
    }
  })

  console.log('✅ נוצרו הגדרות מחיר (רגיל: ₪15, מאוורר: ₪18)')

  // יצירת פאנית לדוגמה
  const sampleFaniya = await prisma.faniya.create({
    data: {
      name: 'שרה כהן',
      totalDebt: 0,
      totalPayments: 0
    }
  })

  console.log('✅ נוצרה פאנית לדוגמה: שרה כהן')

  // יצירת הזמנה לדוגמה
  const sampleOrder = await prisma.order.create({
    data: {
      faniyaId: sampleFaniya.id,
      customerName: 'רחל לוי',
      length: 55,
      skinType: 'רגיל',
      color: 'חום כהה',
      highlights: 'עדינים',
      pattern: 'ייבוש טבעי תנועה גדולה',
      discount: 50,
      totalPrice: 775, // 55 * 15 - 50 = 775
      notes: 'הזמנה לדוגמה',
      isCompleted: false
    }
  })

  console.log('✅ נוצרה הזמנה לדוגמה')

  console.log('🎉 Seeding הושלם בהצלחה!')
  console.log('📝 פרטי כניסה:')
  console.log('   Admin: admin / admin123')
  console.log('   Secretary: secretary / secretary123')
}

main()
  .catch((e) => {
    console.error('❌ שגיאה בseeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })