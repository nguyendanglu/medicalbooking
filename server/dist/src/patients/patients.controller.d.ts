import { PatientsService } from './patients.service';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(search?: string, condition?: string, status?: string): Promise<{
        id: number;
        userId: string;
        condition: import("@prisma/client").$Enums.HealthCondition | null;
        status: import("@prisma/client").$Enums.PatientStatus;
        birthday: Date | null;
        gender: string | null;
        bloodType: string | null;
        address: string | null;
        image: string | null;
        createdAt: Date;
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
        };
        lastAppointment: {
            doctor: {
                name: string;
                specialty: string;
            };
            serviceType: {
                title: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            doctorId: string;
            serviceTypeId: string;
            timeSlot: string;
            date: string;
            patientId: number | null;
            patientName: string;
            patientPhone: string;
            reason: string;
            userId: string | null;
            status: import("@prisma/client").$Enums.AppointmentStatus;
        };
        appointmentCount: number;
        documentCount: number;
    }[]>;
    findOne(id: number): Promise<({
        appointments: ({
            doctor: {
                name: string;
                specialty: string;
            };
            serviceType: {
                title: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            doctorId: string;
            serviceTypeId: string;
            timeSlot: string;
            date: string;
            patientId: number | null;
            patientName: string;
            patientPhone: string;
            reason: string;
            userId: string | null;
            status: import("@prisma/client").$Enums.AppointmentStatus;
        })[];
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
        };
        documents: {
            id: number;
            createdAt: Date;
            patientProfileId: number;
            fileUrl: string;
            fileName: string;
            fileType: string;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.PatientStatus;
        condition: import("@prisma/client").$Enums.HealthCondition | null;
        birthday: Date | null;
        gender: string | null;
        bloodType: string | null;
        address: string | null;
        image: string | null;
        medicalHistory: string | null;
        allergies: string | null;
    }) | null>;
}
