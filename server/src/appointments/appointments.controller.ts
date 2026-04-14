import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('list')
  getAppointments(@Query('userId') userId: string) {
    return this.appointmentsService.getUserAppointments(userId);
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

