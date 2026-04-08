import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async getDoctors() {
    return this.prisma.doctor.findMany();
  }

  async getServices() {
    return this.prisma.serviceType.findMany();
  }

  async getTimeSlots() {
    return this.prisma.timeSlot.findMany({
      orderBy: { time: 'asc' }
    });
  }

  async createAppointment(data: any) {
    return this.prisma.appointment.create({
      data: {
        doctorId: data.doctorId,
        serviceTypeId: data.serviceTypeId,
        timeSlot: data.timeSlot,
        date: data.date,
        patientName: data.patientName,
        patientPhone: data.patientPhone,
        reason: data.reason
      }
    });
  }
}

