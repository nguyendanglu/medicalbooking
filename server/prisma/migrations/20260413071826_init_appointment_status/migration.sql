-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'RESCHEDULED');

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING';
