-- CreateEnum
CREATE TYPE "HealthCondition" AS ENUM ('WELLNESS_CHECK', 'HYPERTENSION', 'PHYSIOTHERAPY', 'POST_OP_RECOV');

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "patientId" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "patient_profiles" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "condition" "HealthCondition" DEFAULT 'WELLNESS_CHECK',
    "birthday" TIMESTAMP(3),
    "gender" TEXT,
    "bloodType" TEXT,
    "address" TEXT,
    "medicalHistory" TEXT,
    "allergies" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_documents" (
    "id" SERIAL NOT NULL,
    "patientProfileId" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medical_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_profiles_userId_key" ON "patient_profiles"("userId");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_profiles" ADD CONSTRAINT "patient_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_documents" ADD CONSTRAINT "medical_documents_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "patient_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
