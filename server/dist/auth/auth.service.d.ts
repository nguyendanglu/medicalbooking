import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    register(data: any): Promise<any>;
    login(email: string, pass: string): Promise<{
        message: string;
        user: any;
    }>;
}
