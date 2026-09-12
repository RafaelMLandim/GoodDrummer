-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMININO');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "gender" "Gender";
