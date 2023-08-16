/*
  Warnings:

  - You are about to drop the column `highlightsReviewed` on the `User` table. All the data in the column will be lost.
  - Made the column `xp` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "allowComments" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "highlightsReviewed",
ADD COLUMN     "displayName" TEXT,
ALTER COLUMN "xp" SET NOT NULL,
ALTER COLUMN "xp" SET DEFAULT 0;
