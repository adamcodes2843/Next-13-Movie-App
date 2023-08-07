/*
  Warnings:

  - You are about to alter the column `title` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `review` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(800)`.
  - Added the required column `movie` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "voteCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "movie" TEXT NOT NULL,
ADD COLUMN     "voteCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "review" SET DATA TYPE VARCHAR(800);
