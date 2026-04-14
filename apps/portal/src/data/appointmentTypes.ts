export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED',
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image?: string;
}

export interface ServiceType {
  id: string;
  title: string;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  serviceType: ServiceType;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  location?: string;
}
