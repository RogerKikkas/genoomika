/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[code]` on the table `Visit`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Visit.code_unique" ON "Visit"("code");
