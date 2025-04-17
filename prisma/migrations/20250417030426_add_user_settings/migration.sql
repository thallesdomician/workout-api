/*
  Warnings:

  - You are about to drop the column `isDefault` on the `Measurement` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AppTheme" AS ENUM ('LIGHT', 'DARK', 'SYSTEM', 'NEW');

-- AlterTable
ALTER TABLE "Measurement" DROP COLUMN "isDefault";

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weightUnit" "BodyMeasurementUnit" NOT NULL DEFAULT 'KG',
    "distanceUnit" "BodyMeasurementUnit" NOT NULL DEFAULT 'M',
    "sizeUnit" "BodyMeasurementUnit" NOT NULL DEFAULT 'CM',
    "appTheme" "AppTheme" NOT NULL DEFAULT 'SYSTEM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
