-- CreateTable
CREATE TABLE "payment_parts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paymentId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "paymentType" TEXT NOT NULL,
    "checkNumber" TEXT,
    "checkDueDate" DATETIME,
    "bankReference" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "payment_parts_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- הוספת העמודה החדשה עם default value
ALTER TABLE "payments" ADD COLUMN "totalAmount" REAL NOT NULL DEFAULT 0;

-- עדכון הנתונים הקיימים - העתקת amount ל-totalAmount
UPDATE "payments" SET "totalAmount" = "amount" WHERE "amount" IS NOT NULL;

-- יצירת payment_parts עבור התשלומים הקיימים
INSERT INTO "payment_parts" ("id", "paymentId", "amount", "paymentType", "checkNumber", "checkDueDate", "notes", "createdAt", "updatedAt")
SELECT 
  'part_' || "id" as "id",
  "id" as "paymentId", 
  "amount" as "amount",
  "paymentType" as "paymentType",
  NULL as "checkNumber",
  "checkDueDate" as "checkDueDate", 
  "notes" as "notes",
  "createdAt" as "createdAt",
  "updatedAt" as "updatedAt"
FROM "payments";

-- מחיקת העמודות הישנות (נעשה בזהירות)
-- יצירת טבלה זמנית
CREATE TABLE "payments_new" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "faniyaId" TEXT NOT NULL,
    "totalAmount" REAL NOT NULL,
    "paymentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "payments_new_faniyaId_fkey" FOREIGN KEY ("faniyaId") REFERENCES "faniyas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- העתקת הנתונים החדשים
INSERT INTO "payments_new" ("id", "faniyaId", "totalAmount", "paymentDate", "notes", "createdAt", "updatedAt")
SELECT "id", "faniyaId", "totalAmount", "paymentDate", "notes", "createdAt", "updatedAt"
FROM "payments";

-- מחיקת הטבלה הישנה והחלפה
DROP TABLE "payments";
ALTER TABLE "payments_new" RENAME TO "payments";

-- עדכון ה-foreign key ב-payment_parts
-- (SQLite דורש DROP ו-CREATE מחדש)
CREATE TABLE "payment_parts_new" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paymentId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "paymentType" TEXT NOT NULL,
    "checkNumber" TEXT,
    "checkDueDate" DATETIME,
    "bankReference" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "payment_parts_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "payment_parts_new" SELECT * FROM "payment_parts";
DROP TABLE "payment_parts";
ALTER TABLE "payment_parts_new" RENAME TO "payment_parts";
