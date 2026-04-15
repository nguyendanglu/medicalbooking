-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('STABLE', 'OBSERVATION', 'CRITICAL');

-- AlterTable
ALTER TABLE "patient_profiles" ADD COLUMN     "image" TEXT,
ADD COLUMN     "status" "PatientStatus" NOT NULL DEFAULT 'STABLE';
