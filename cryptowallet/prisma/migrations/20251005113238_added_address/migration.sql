/*
  Warnings:

  - Added the required column `btcadd` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ethadd` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soladd` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "btcadd" TEXT NOT NULL,
ADD COLUMN     "ethadd" TEXT NOT NULL,
ADD COLUMN     "soladd" TEXT NOT NULL;
