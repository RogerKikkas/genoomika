/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name,userId]` on the table `UserRole`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserRole.name_userId_unique" ON "UserRole"("name", "userId");
