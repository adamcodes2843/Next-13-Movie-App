-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "dateTimeUpdated" TIMESTAMP(3),
ALTER COLUMN "voteCount" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "dateTimeUpdated" TIMESTAMP(3),
ALTER COLUMN "voteCount" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoriteMovie" TEXT,
ADD COLUMN     "favoritePizza" TEXT,
ADD COLUMN     "highlightsReviewed" INTEGER,
ADD COLUMN     "xp" INTEGER;
