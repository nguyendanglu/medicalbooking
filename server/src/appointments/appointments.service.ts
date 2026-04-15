import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) { }

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
        reason: data.reason,
        userId: data.userId,
        status: AppointmentStatus.PENDING,
      }
    });
  }

  async getUserAppointments(userId: string) {
    return this.prisma.appointment.findMany({
      where: { userId },
      include: {
        doctor: true,
        serviceType: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getAdminAppointments(filters: { date?: string; doctorId?: string; status?: AppointmentStatus }) {
    const where: any = {};
    if (filters.date) where.date = filters.date;
    if (filters.doctorId) where.doctorId = filters.doctorId;
    if (filters.status) where.status = filters.status;

    return this.prisma.appointment.findMany({
      where,
      include: {
        doctor: true,
        serviceType: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateAppointmentStatus(id: string, status: AppointmentStatus) {
    return this.prisma.appointment.update({
      where: { id },
      data: { status },
      include: {
        doctor: true,
        serviceType: true,
      },
    });
  }
}

