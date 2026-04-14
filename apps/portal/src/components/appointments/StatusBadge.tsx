import React from 'react';
import { AppointmentStatus } from '../../data/appointmentTypes';
import { getStatusTheme } from '../../utils/appointmentUtils';

interface StatusBadgeProps {
  status: AppointmentStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const theme = getStatusTheme(status);

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${theme.bg} ${theme.text} ${theme.border}`}>
      {theme.label}
    </span>
  );
};
