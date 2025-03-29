/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Buy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `Buy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buy" ADD COLUMN     "paymentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Buy_paymentId_key" ON "Buy"("paymentId");
