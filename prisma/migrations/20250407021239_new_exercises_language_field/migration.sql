-- DropIndex
DROP INDEX "Exercise_externalId_key";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ALTER COLUMN "externalId" DROP NOT NULL;
