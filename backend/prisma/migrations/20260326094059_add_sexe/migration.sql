-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('HOMME', 'FEMME');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "sexe" "Sexe" NOT NULL DEFAULT 'HOMME';
