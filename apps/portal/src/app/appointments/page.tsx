'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, ArrowLeft } from 'lucide-react';
import { useAppointments } from '../../hooks/useAppointments';
import { AppointmentStatus } from '../../data/appointmentTypes';
import { AppointmentCard } from '../../components/appointments/AppointmentCard';
import { EmptyAppointments } from '../../components/appointments/EmptyAppointments';

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const { data: appointments, isLoading, error } = useAppointments();

  const upcomingStatuses = [
    AppointmentStatus.PENDING,
    AppointmentStatus.CONFIRMED,
    AppointmentStatus.CHECKED_IN,
    AppointmentStatus.IN_PROGRESS
  ];

  const historyStatuses = [
    AppointmentStatus.COMPLETED,
    AppointmentStatus.CANCELLED,
    AppointmentStatus.RESCHEDULED
  ];

  const filteredAppointments = appointments?.filter(app => 
    activeTab === 'upcoming' 
      ? upcomingStatuses.includes(app.status)
      : historyStatuses.includes(app.status)
  ) || [];

  // Sort: Upcoming (soonest first), History (latest first)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return activeTab === 'upcoming' ? dateA - dateB : dateB - dateA;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-12 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại trang chủ
          </Link>
          <h1 className="text-4xl font-bold text-on-surface">Lịch hẹn của tôi</h1>
          <p className="text-on-surface-variant mt-2">Theo dõi và quản lý các cuộc hẹn y khoa của bạn</p>
        </div>

        <Link 
          href="/booking" 
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-primary-container transition-all active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Đặt lịch mới
        </Link>
      </div>

      <div className="flex gap-2 p-1.5 bg-surface-container-low rounded-2xl w-fit mb-10 border border-surface-container-high">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'upcoming' 
              ? 'bg-primary text-white shadow-md' 
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Sắp tới
          {appointments && appointments.filter(a => upcomingStatuses.includes(a.status)).length > 0 && (
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'upcoming' ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
              {appointments.filter(a => upcomingStatuses.includes(a.status)).length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'history' 
              ? 'bg-primary text-white shadow-md' 
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Lịch sử
        </button>
      </div>

      {sortedAppointments.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {sortedAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <EmptyAppointments type={activeTab} />
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">
          Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
        </div>
      )}
    </div>
  );
}
