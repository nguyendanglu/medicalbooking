import { PrismaService } from '../prisma/prisma.service';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(search?: string, condition?: string, status?: string): Promise<any>;
    findOne(id: number): Promise<any>;
}
