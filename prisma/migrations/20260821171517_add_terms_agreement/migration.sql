-- AlterTable
ALTER TABLE "users" ADD COLUMN     "agreed_at" TIMESTAMP(3),
ADD COLUMN     "agreed_to_terms" BOOLEAN NOT NULL DEFAULT false;
