/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exercise_externalId_key" ON "Exercise"("externalId");
