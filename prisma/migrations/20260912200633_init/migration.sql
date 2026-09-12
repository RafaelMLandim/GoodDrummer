-- CreateEnum
CREATE TYPE "LevelColor" AS ENUM ('GREEN', 'YELLOW', 'RED', 'GOLD');

-- CreateEnum
CREATE TYPE "ModuleCategory" AS ENUM ('RUDIMENTOS_TECNICA', 'GROOVES_RITMOS', 'LEITURA_TEORIA', 'VIRADAS_FILLS', 'REPERTORIO', 'VIRTUOSIDADE_CHOPS', 'AUTONOMIA_ESTUDIO');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('RUDIMENTO', 'TECNICA', 'GROOVE', 'LEITURA', 'VIRADA', 'MUSICA');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('LOCKED', 'IN_TRAINING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "worldName" TEXT NOT NULL,
    "color" "LevelColor" NOT NULL,
    "globalGoal" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ModuleCategory" NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ExerciseType" NOT NULL,
    "teacherTip" TEXT NOT NULL,
    "detail" TEXT,
    "targetBpm" INTEGER,
    "artist" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "avatarSeed" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProgress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "status" "ProgressStatus" NOT NULL DEFAULT 'LOCKED',
    "stars" INTEGER NOT NULL DEFAULT 0,
    "currentBpm" INTEGER,
    "bestBpm" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BpmRecord" (
    "id" TEXT NOT NULL,
    "progressId" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BpmRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_order_key" ON "Level"("order");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProgress_studentId_exerciseId_key" ON "StudentProgress"("studentId", "exerciseId");

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BpmRecord" ADD CONSTRAINT "BpmRecord_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "StudentProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
