import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
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
    createAppointment(body: any): Promise<{
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
