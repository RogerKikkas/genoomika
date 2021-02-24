/*
  Warnings:

  - Added the required column `dateOfBirth` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL,
ADD COLUMN     "age" INTEGER NOT NULL;
