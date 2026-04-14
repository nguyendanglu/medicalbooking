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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("./appointments.service");
let AppointmentsController = class AppointmentsController {
    appointmentsService;
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    getAppointments(userId) {
        return this.appointmentsService.getUserAppointments(userId);
    }
    getDoctors() {
        return this.appointmentsService.getDoctors();
    }
    getServices() {
        return this.appointmentsService.getServices();
    }
    getTimeSlots() {
        return this.appointmentsService.getTimeSlots();
    }
    createAppointment(body) {
        return this.appointmentsService.createAppointment(body);
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "getAppointments", null);
__decorate([
    (0, common_1.Get)('doctors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "getDoctors", null);
__decorate([
    (0, common_1.Get)('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "getServices", null);
__decorate([
    (0, common_1.Get)('time-slots'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "getTimeSlots", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "createAppointment", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map