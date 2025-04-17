/*
  Warnings:

  - You are about to drop the column `unit` on the `MeasurementEntry` table. All the data in the column will be lost.
  - Changed the type of `unit` on the `Measurement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BodyMeasurementUnit" AS ENUM ('KG', 'LBS', 'CM', 'M', 'INCH', 'FT');

-- AlterTable
ALTER TABLE "Measurement" DROP COLUMN "unit",
ADD COLUMN     "unit" "BodyMeasurementUnit" NOT NULL;

-- AlterTable
ALTER TABLE "MeasurementEntry" DROP COLUMN "unit";
