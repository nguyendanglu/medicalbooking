import { Controller, Get, Post, Patch, Body, Query, Param, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AppointmentStatus } from '@prisma/client';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('list')
  getAppointments(@Query('userId') userId: string) {
    return this.appointmentsService.getUserAppointments(userId);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF', 'DOCTOR')
  getAdminAppointments(
    @Query('date') date?: string,
    @Query('doctorId') doctorId?: string,
    @Query('status') status?: AppointmentStatus,
  ) {
    return this.appointmentsService.getAdminAppointments({ date, doctorId, status });
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF', 'DOCTOR')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: AppointmentStatus,
  ) {
    return this.appointmentsService.updateAppointmentStatus(id, status);
  }

  @Get('doctors')
  getDoctors() {
    return this.appointmentsService.getDoctors();
  }

  @Get('services')
  getServices() {
    return this.appointmentsService.getServices();
  }

  @Get('time-slots')
  getTimeSlots() {
    return this.appointmentsService.getTimeSlots();
  }

  @Post()
  createAppointment(@Body() body: any) {
    return this.appointmentsService.createAppointment(body);
  }
}

