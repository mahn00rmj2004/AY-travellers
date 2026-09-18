-- CreateEnum
CREATE TYPE "UmrahRequestStatus" AS ENUM ('PENDING', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "umrah_customization_requests" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "travel_dates" TEXT NOT NULL,
    "transport" TEXT NOT NULL,
    "hotel_city" TEXT NOT NULL,
    "hotel_name" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" "UmrahRequestStatus" NOT NULL DEFAULT 'PENDING',
    "admin_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "umrah_customization_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "umrah_customization_requests_email_idx" ON "umrah_customization_requests"("email");

-- CreateIndex
CREATE INDEX "umrah_customization_requests_status_idx" ON "umrah_customization_requests"("status");

-- CreateIndex
CREATE INDEX "umrah_customization_requests_created_at_idx" ON "umrah_customization_requests"("created_at");

-- AddForeignKey
ALTER TABLE "umrah_customization_requests" ADD CONSTRAINT "umrah_customization_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
