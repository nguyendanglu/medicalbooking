import { PrismaService } from '../prisma/prisma.service';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDoctors(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        specialty: string;
        experience: string;
        image: string | null;
        rating: number | null;
    }[]>;
    getServices(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        icon: string | null;
        price: number | null;
    }[]>;
    getTimeSlots(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        time: string;
    }[]>;
    createAppointment(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        serviceTypeId: string;
        timeSlot: string;
        date: string;
        patientName: string;
        patientPhone: string;
        reason: string;
        userId: string | null;
    }>;
}
