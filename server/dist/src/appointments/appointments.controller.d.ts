import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    getDoctors(): Promise<{
        id: string;
        name: string;
        specialty: string;
        experience: string;
        image: string | null;
        rating: number | null;
        createdAt: Date;
        updatedAt: Date;
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
    createAppointment(body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        timeSlot: string;
        date: string;
        patientName: string;
        patientPhone: string;
        reason: string;
        doctorId: string;
        serviceTypeId: string;
        userId: string | null;
    }>;
}
