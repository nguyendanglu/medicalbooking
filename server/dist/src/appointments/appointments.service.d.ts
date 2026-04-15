import { PrismaService } from '../prisma/prisma.service';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDoctors(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
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
        status: import("@prisma/client").$Enums.AppointmentStatus;
    }>;
    getUserAppointments(userId: string): Promise<({
        doctor: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            specialty: string;
            experience: string;
            image: string | null;
            rating: number | null;
        };
        serviceType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            icon: string | null;
            price: number | null;
        };
    } & {
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
        status: import("@prisma/client").$Enums.AppointmentStatus;
    })[]>;
}
