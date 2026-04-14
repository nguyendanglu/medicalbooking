import React from 'react';
import { ClipboardList } from 'lucide-react';
import Link from 'next/link';

interface EmptyAppointmentsProps {
  type: 'upcoming' | 'history';
}

export const EmptyAppointments: React.FC<EmptyAppointmentsProps> = ({ type }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-surface-container-low rounded-3xl border-2 border-dashed border-surface-container-high">
      <div className="bg-primary/10 p-4 rounded-full mb-6">
        <ClipboardList className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-on-surface mb-2">
        {type === 'upcoming' ? 'Không có lịch hẹn sắp tới' : 'Không có lịch sử khám'}
      </h3>
      <p className="text-on-surface-variant max-w-sm mb-8">
        {type === 'upcoming' 
          ? 'Bạn chưa có lịch hẹn nào được đăng ký. Hãy đặt lịch ngay để được chăm sóc sức khỏe tốt nhất.' 
          : 'Lịch sử khám bệnh của bạn sẽ xuất hiện tại đây sau khi bạn hoàn thành các buổi khám.'}
      </p>
      {type === 'upcoming' && (
        <Link 
          href="/booking" 
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary-container transition-all"
        >
          Đặt lịch ngay
        </Link>
      )}
    </div>
  );
};
