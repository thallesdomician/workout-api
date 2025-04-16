-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('GIF', 'IMAGE', 'YOUTUBE_VIDEO');

-- CreateTable
CREATE TABLE "ExerciseMedia" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,

    CONSTRAINT "ExerciseMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseMedia" ADD CONSTRAINT "ExerciseMedia_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
