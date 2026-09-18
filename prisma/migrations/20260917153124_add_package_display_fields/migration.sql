-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_destination_id_fkey";

-- AlterTable
ALTER TABLE "packages" ADD COLUMN     "badge" TEXT,
ADD COLUMN     "badgeColor" TEXT,
ADD COLUMN     "book_href" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "details" JSONB,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "meta" JSONB,
ADD COLUMN     "price_display" TEXT,
ADD COLUMN     "price_note" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "subtitle" TEXT,
ALTER COLUMN "destination_id" DROP NOT NULL,
ALTER COLUMN "price_per_person" DROP NOT NULL,
ALTER COLUMN "duration_days" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
