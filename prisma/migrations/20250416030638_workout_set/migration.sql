/*
  Warnings:

  - You are about to drop the column `reps` on the `WorkoutSet` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `WorkoutSet` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "WorkoutSetType" AS ENUM ('REPS', 'TIME', 'DISTANCE', 'RPE');

-- AlterTable
ALTER TABLE "WorkoutSet" DROP COLUMN "reps",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "WorkoutSetData" (
    "id" TEXT NOT NULL,
    "type" "WorkoutSetType" NOT NULL,

    CONSTRAINT "WorkoutSetData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepsSet" (
    "id" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "RepsSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSet" (
    "id" TEXT NOT NULL,
    "durationSeconds" INTEGER NOT NULL,

    CONSTRAINT "TimeSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistanceSet" (
    "id" TEXT NOT NULL,
    "distanceMeters" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DistanceSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RpeSet" (
    "id" TEXT NOT NULL,
    "rpe" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "RpeSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutSetData" ADD CONSTRAINT "WorkoutSetData_id_fkey" FOREIGN KEY ("id") REFERENCES "WorkoutSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepsSet" ADD CONSTRAINT "RepsSet_id_fkey" FOREIGN KEY ("id") REFERENCES "WorkoutSetData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSet" ADD CONSTRAINT "TimeSet_id_fkey" FOREIGN KEY ("id") REFERENCES "WorkoutSetData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistanceSet" ADD CONSTRAINT "DistanceSet_id_fkey" FOREIGN KEY ("id") REFERENCES "WorkoutSetData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RpeSet" ADD CONSTRAINT "RpeSet_id_fkey" FOREIGN KEY ("id") REFERENCES "WorkoutSetData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
