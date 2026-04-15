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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AppointmentsService = class AppointmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDoctors() {
        return this.prisma.doctor.findMany();
    }
    async getServices() {
        return this.prisma.serviceType.findMany();
    }
    async getTimeSlots() {
        return this.prisma.timeSlot.findMany({
            orderBy: { time: 'asc' }
        });
    }
    async createAppointment(data) {
        return this.prisma.appointment.create({
            data: {
                doctorId: data.doctorId,
                serviceTypeId: data.serviceTypeId,
                timeSlot: data.timeSlot,
                date: data.date,
                patientName: data.patientName,
                patientPhone: data.patientPhone,
                reason: data.reason,
                userId: data.userId,
                status: client_1.AppointmentStatus.PENDING,
            }
        });
    }
    async getUserAppointments(userId) {
        return this.prisma.appointment.findMany({
            where: { userId },
            include: {
                doctor: true,
                serviceType: true,
            },
            orderBy: {
                date: 'desc',
            },
        });
    }
    async getAdminAppointments(filters) {
        const where = {};
        if (filters.date)
            where.date = filters.date;
        if (filters.doctorId)
            where.doctorId = filters.doctorId;
        if (filters.status)
            where.status = filters.status;
        return this.prisma.appointment.findMany({
            where,
            include: {
                doctor: true,
                serviceType: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async updateAppointmentStatus(id, status) {
        return this.prisma.appointment.update({
            where: { id },
            data: { status },
            include: {
                doctor: true,
                serviceType: true,
            },
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map