/*
  Warnings:

  - Added the required column `updated_at` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "payfast_fee" DECIMAL(10,2),
ADD COLUMN     "payfast_order_id" TEXT,
ADD COLUMN     "payfast_payment_id" TEXT,
ADD COLUMN     "payfast_response" JSONB,
ADD COLUMN     "payfast_signature" TEXT,
ADD COLUMN     "payfast_tracking_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "payfast_callbacks" (
    "id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payfast_callbacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payfast_callbacks_payment_id_idx" ON "payfast_callbacks"("payment_id");

-- CreateIndex
CREATE INDEX "payfast_callbacks_verified_processed_idx" ON "payfast_callbacks"("verified", "processed");

-- AddForeignKey
ALTER TABLE "payfast_callbacks" ADD CONSTRAINT "payfast_callbacks_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
