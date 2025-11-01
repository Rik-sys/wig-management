const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function initPricing() {
  await prisma.pricingSettings.deleteMany({});
  
  const ranges = [
    { minLength: 5, maxLength: 6, price: 6500 },
    { minLength: 7, maxLength: 9, price: 8000 },
    { minLength: 10, maxLength: 12, price: 8400 },
    { minLength: 12, maxLength: 15, price: 8900 },
    { minLength: 16, maxLength: 18, price: 9400 },
    { minLength: 19, maxLength: 20, price: 9900 }
  ];
  
  for (const range of ranges) {
    await prisma.pricingSettings.create({
      data: {
        skinType: 'רגיל',
        ...range
      }
    });
  }
  
  await prisma.pricingSettings.create({
    data: {
      skinType: 'מאוורר_תוספת',
      minLength: null,
      maxLength: null,
      price: 1000
    }
  });
  
  console.log('✅ מחירים אותחלו בהצלחה!');
}

initPricing()
  .catch(console.error)
  .finally(() => prisma.$disconnect());