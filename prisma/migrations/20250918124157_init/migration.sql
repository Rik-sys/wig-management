-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "faniyas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "totalDebt" REAL NOT NULL DEFAULT 0,
    "totalPayments" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "faniyaId" TEXT NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerName" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "skinType" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "babyHairType" TEXT,
    "openingTone" TEXT,
    "pattern" TEXT NOT NULL,
    "notes" TEXT,
    "discount" REAL NOT NULL DEFAULT 0,
    "totalPrice" REAL NOT NULL,
    "sentToTrass" BOOLEAN NOT NULL DEFAULT false,
    "trassOperator" TEXT,
    "trassSentDate" DATETIME,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "deliveryDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "orders_faniyaId_fkey" FOREIGN KEY ("faniyaId") REFERENCES "faniyas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "faniyaId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "paymentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentType" TEXT NOT NULL,
    "checkDueDate" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "payments_faniyaId_fkey" FOREIGN KEY ("faniyaId") REFERENCES "faniyas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pricing_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "skinType" TEXT NOT NULL,
    "pricePerCm" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "monthly_reports" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "faniyaId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "totalOrders" INTEGER NOT NULL,
    "totalRevenue" REAL NOT NULL,
    "totalPayments" REAL NOT NULL,
    "monthlyDebt" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "monthly_reports_faniyaId_fkey" FOREIGN KEY ("faniyaId") REFERENCES "faniyas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "faniyas_name_key" ON "faniyas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_settings_skinType_key" ON "pricing_settings"("skinType");

-- CreateIndex
CREATE UNIQUE INDEX "monthly_reports_faniyaId_year_month_key" ON "monthly_reports"("faniyaId", "year", "month");
