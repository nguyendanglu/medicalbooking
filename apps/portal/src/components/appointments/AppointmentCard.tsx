import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Appointment } from '../../data/appointmentTypes';
import { StatusBadge } from './StatusBadge';

interface AppointmentCardProps {
  appointment: Appointment;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const formattedDate = new Date(appointment.date).toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 border border-surface-container-high hover:border-primary/20 transition-all shadow-sm group">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-surface-container-high border border-surface-container-high">
          {appointment.doctor.image ? (
            <Image
              src={appointment.doctor.image}
              alt={appointment.doctor.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {appointment.doctor.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                {appointment.doctor.name}
              </h3>
              <p className="text-sm text-on-surface-variant font-medium">
                {appointment.doctor.specialty} • {appointment.serviceType.title}
              </p>
            </div>
            <StatusBadge status={appointment.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 text-sm text-on-surface-variant bg-surface-container rounded-lg px-3 py-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-on-surface-variant bg-surface-container rounded-lg px-3 py-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{appointment.timeSlot}</span>
            </div>
            {appointment.location && (
              <div className="flex items-center gap-3 text-sm text-on-surface-variant bg-surface-container rounded-lg px-3 py-2 md:col-span-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{appointment.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
