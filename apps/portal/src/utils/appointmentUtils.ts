import { AppointmentStatus } from '../data/appointmentTypes';

export const getStatusTheme = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-200',
        label: 'Đã xác nhận',
      };
    case AppointmentStatus.PENDING:
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        label: 'Chờ xác nhận',
      };
    case AppointmentStatus.CHECKED_IN:
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-200',
        label: 'Đã đến',
      };
    case AppointmentStatus.IN_PROGRESS:
      return {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        border: 'border-purple-200',
        label: 'Đang khám',
      };
    case AppointmentStatus.COMPLETED:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-200',
        label: 'Đã hoàn thành',
      };
    case AppointmentStatus.CANCELLED:
      return {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-200',
        label: 'Đã hủy',
      };
    case AppointmentStatus.RESCHEDULED:
      return {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        border: 'border-orange-200',
        label: 'Đã đổi lịch',
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-200',
        label: status,
      };
  }
};
