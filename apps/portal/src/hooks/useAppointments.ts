'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Appointment } from '../data/appointmentTypes';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_HOME_URL || 'http://localhost:3000';

export function useAppointments() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user?.id) setUserId(user.id);
        }
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
      }
    }
  }, []);

  return useQuery<Appointment[]>({
    queryKey: ['appointments', userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }

      const response = await fetch(`${API_URL}/appointments/list?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      return response.json();
    },
    enabled: !!userId,
  });
}
