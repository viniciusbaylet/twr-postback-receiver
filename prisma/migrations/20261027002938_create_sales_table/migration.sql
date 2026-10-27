-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "status" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_transactionId_key" ON "sales"("transactionId");
