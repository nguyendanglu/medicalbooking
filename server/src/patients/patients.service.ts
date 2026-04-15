import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, condition?: string, status?: string) {
    const where: any = {};

    if (condition) {
      where.condition = condition;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.user = {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const profiles = await this.prisma.patientProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        appointments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            doctor: { select: { name: true, specialty: true } },
            serviceType: { select: { title: true } },
          },
        },
        _count: {
          select: { appointments: true, documents: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return profiles.map((p) => ({
      id: p.id,
      userId: p.userId,
      condition: p.condition,
      status: p.status,
      birthday: p.birthday,
      gender: p.gender,
      bloodType: p.bloodType,
      address: p.address,
      image: p.image,
      createdAt: p.createdAt,
      user: p.user,
      lastAppointment: p.appointments[0] || null,
      appointmentCount: p._count.appointments,
      documentCount: p._count.documents,
    }));
  }

  async findOne(id: number) {
    return this.prisma.patientProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        appointments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            doctor: { select: { name: true, specialty: true } },
            serviceType: { select: { title: true } },
          },
        },
        documents: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }
}
