import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
        accessToken: string;
    }>;
}
