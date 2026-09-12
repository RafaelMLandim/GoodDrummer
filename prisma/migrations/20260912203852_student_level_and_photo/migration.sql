-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "currentLevelId" TEXT,
ADD COLUMN     "photoDataUrl" TEXT;

-- Backfill existing students to the first level (Iniciante) before enforcing NOT NULL
UPDATE "Student" SET "currentLevelId" = (SELECT "id" FROM "Level" ORDER BY "order" ASC LIMIT 1)
WHERE "currentLevelId" IS NULL;

ALTER TABLE "Student" ALTER COLUMN "currentLevelId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_currentLevelId_fkey" FOREIGN KEY ("currentLevelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
