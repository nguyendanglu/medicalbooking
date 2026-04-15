"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PatientsService = class PatientsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(search, condition, status) {
        const where = {};
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
    async findOne(id) {
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
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map