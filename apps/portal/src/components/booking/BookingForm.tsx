'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

const bookingSchema = z.object({
  serviceTypeId: z.string().min(1, 'Vui lòng chọn dịch vụ'),
  doctorId: z.string().min(1, 'Vui lòng chọn bác sĩ'),
  date: z.string().min(1, 'Vui lòng chọn ngày'),
  timeSlot: z.string().min(1, 'Vui lòng chọn giờ'),
  patientName: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  patientPhone: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  reason: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const BookingForm = () => {
  const router = useRouter();
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceTypeId: '',
      doctorId: '',
      date: new Date().toISOString().split('T')[0], // Default to today
      timeSlot: '',
      patientName: '',
      patientPhone: '',
      email: '',
      reason: 'Khám định kỳ', // Default reason or let user type
    },
  });

  const formData = watch();

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOME_URL}/appointments/services`).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOME_URL}/appointments/doctors`).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOME_URL}/appointments/time-slots`).then(res => res.json())
    ]).then(([servicesData, doctorsData, timeSlotsData]) => {
      setServiceTypes(servicesData);
      setDoctors(doctorsData);
      setTimeSlots(timeSlotsData);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const selectedService = serviceTypes.find(s => s.id === formData.serviceTypeId);
  const selectedDoctor = doctors.find(d => d.id === formData.doctorId);

  const onSubmit = async (data: BookingFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOME_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: data.doctorId,
          serviceTypeId: data.serviceTypeId,
          timeSlot: data.timeSlot,
          date: new Date(data.date).toISOString(),
          patientName: data.patientName,
          patientPhone: data.patientPhone,
          reason: data.reason || 'Không có',
        }),
      });

      if (response.ok) {
        alert('Đặt lịch thành công!');
        router.push('/');
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error.');
    }
  };

  if (loading) {
    return <div className="text-center py-20">Đang tải...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl py-12 px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-on-surface mb-4">Đặt Lịch Khám</h1>
        <p className="text-on-surface-variant">Bắt đầu hành trình chăm sóc sức khỏe của bạn</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Step 1: Service Type */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm">1</span>
              Hình thức khám
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceTypes.map((type) => (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => setValue('serviceTypeId', type.id)}
                  className={`flex flex-col p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.serviceTypeId === type.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-surface-container-low hover:border-primary/20'
                  }`}
                >
                  <h3 className="font-bold text-on-surface mb-1">{type.name}</h3>
                  <p className="text-sm text-on-surface-variant">{type.description}</p>
                </button>
              ))}
            </div>
            {errors.serviceTypeId && <p className="text-red-500 text-sm mt-2">{errors.serviceTypeId.message}</p>}
          </section>

          {/* Step 2: Specialist */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm">2</span>
              Chọn chuyên gia
            </h2>
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <button
                  type="button"
                  key={doctor.id}
                  onClick={() => setValue('doctorId', doctor.id)}
                  className={`flex items-center gap-6 w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.doctorId === doctor.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-surface-container-low hover:border-primary/20'
                  }`}
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-surface-container-high">
                    {/* Placeholder image if property missing */}
                    <div className="w-full h-full bg-neutral-200"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">{doctor.name}</h3>
                    <p className="text-sm text-on-surface-variant">{doctor.specialty}</p>
                  </div>
                </button>
              ))}
            </div>
            {errors.doctorId && <p className="text-red-500 text-sm mt-2">{errors.doctorId.message}</p>}
          </section>

          {/* Step 3: Availability */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm">3</span>
              Chọn thời gian
            </h2>
            <div className="mb-4">
              <input type="date" {...register('date')} className="w-full p-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none" min={new Date().toISOString().split('T')[0]} />
              {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date.message}</p>}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot.id}
                  onClick={() => setValue('timeSlot', slot.time)}
                  className={`py-3 rounded-xl border-2 font-bold transition-all ${
                    formData.timeSlot === slot.time 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-surface-container-low text-on-surface hover:border-primary/20'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            {errors.timeSlot && <p className="text-red-500 text-sm mt-2">{errors.timeSlot.message}</p>}
          </section>

          {/* Step 4: Patient Info */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm">4</span>
              Thông tin bệnh nhân
            </h2>
            <div className="space-y-4">
              <div>
                <input 
                  type="text" 
                  {...register('patientName')}
                  placeholder="Họ và tên" 
                  className="w-full p-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none"
                />
                {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input 
                    type="tel" 
                    {...register('patientPhone')}
                    placeholder="Số điện thoại" 
                    className="w-full p-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none"
                  />
                  {errors.patientPhone && <p className="text-red-500 text-sm mt-1">{errors.patientPhone.message}</p>}
                </div>
                <div>
                  <input 
                    type="email" 
                    {...register('email')}
                    placeholder="Email (Tùy chọn)" 
                    className="w-full p-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6 rounded-3xl bg-surface-container-low p-8">
            <h2 className="text-lg font-bold text-on-surface">Tóm tắt đặt lịch</h2>
            
            <div className="space-y-4 border-b border-surface-container-high pb-6 text-sm">
              <div className="flex justify-between items-center gap-4">
                <span className="text-on-surface-variant min-w-[80px]">Hình thức:</span>
                <span className="font-bold text-on-surface text-right">{selectedService?.name || 'Chưa chọn'}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-on-surface-variant min-w-[80px]">Bác sĩ:</span>
                <span className="font-bold text-on-surface text-right">{selectedDoctor?.name || 'Chưa chọn'}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-on-surface-variant min-w-[80px]">Thời gian:</span>
                <span className="font-bold text-on-surface text-right">{formData.timeSlot ? `${formData.timeSlot} ${formData.date}` : 'Chưa chọn'}</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-on-surface-variant font-bold">Tổng phí:</span>
              <span className="text-2xl font-bold text-primary">${selectedService?.price || 0}.00</span>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-primary py-4 text-center font-bold text-white shadow-xl transition-all hover:bg-primary-container active:scale-95 disabled:opacity-50">
              {isSubmitting ? 'Đang xử lý...' : 'Xác nhận Đặt lịch'}
            </button>
            <p className="text-center text-xs text-on-surface-variant leading-relaxed">
              Bằng việc nhấn xác nhận, bạn đồng ý với các điều khoản bảo mật.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

