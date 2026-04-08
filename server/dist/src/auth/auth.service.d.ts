import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    register(data: any): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        role: string;
    }>;
    login(email: string, pass: string): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
