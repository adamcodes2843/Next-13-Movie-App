-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "filter" TEXT NOT NULL DEFAULT 'none',
    "sort" TEXT NOT NULL DEFAULT 'none',
    "colorTheme" TEXT NOT NULL DEFAULT 'green',
    "darkMode" BOOLEAN NOT NULL DEFAULT true,
    "view" TEXT NOT NULL DEFAULT 'grid',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
