/*
  Warnings:

  - You are about to drop the column `createdFromTemplateId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `WorkoutTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutTemplateExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutTemplateSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_createdFromTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutTemplate" DROP CONSTRAINT "WorkoutTemplate_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutTemplateExercise" DROP CONSTRAINT "WorkoutTemplateExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutTemplateExercise" DROP CONSTRAINT "WorkoutTemplateExercise_workoutTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutTemplateSet" DROP CONSTRAINT "WorkoutTemplateSet_templateExerciseId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "createdFromTemplateId",
ADD COLUMN     "folderId" TEXT,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "WorkoutTemplate";

-- DropTable
DROP TABLE "WorkoutTemplateExercise";

-- DropTable
DROP TABLE "WorkoutTemplateSet";

-- CreateTable
CREATE TABLE "WorkoutFolder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutFolder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "WorkoutFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutFolder" ADD CONSTRAINT "WorkoutFolder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
