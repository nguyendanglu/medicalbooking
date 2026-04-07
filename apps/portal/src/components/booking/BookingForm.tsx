'use client';

import { useState } from 'react';
import Image from 'next/image';
import { serviceTypes, doctors, timeSlots } from '@/data/mockData';

export const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: 'clinic',
    doctorId: 'dr-mitchell',
    timeSlot: '',
    patientName: '',
    email: '',
    phone: '',
  });

  const selectedService = serviceTypes.find(s => s.id === formData.serviceType);
  const selectedDoctor = doctors.find(d => d.id === formData.doctorId);

  return (
    <div className="mx-auto max-w-4xl py-12 px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-on-surface mb-4">Đặt Lịch Khám</h1>
        <p className="text-on-surface-variant">Bắt đầu hành trình chăm sóc sức khỏe của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                  key={type.id}
                  onClick={() => setFormData({ ...formData, serviceType: type.id })}
                  className={`flex flex-col p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.serviceType === type.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-surface-container-low hover:border-primary/20'
                  }`}
                >
                  <h3 className="font-bold text-on-surface mb-1">{type.title}</h3>
                  <p className="text-sm text-on-surface-variant">{type.description}</p>
                </button>
              ))}
            </div>
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
                  key={doctor.id}
                  onClick={() => setFormData({ ...formData, doctorId: doctor.id })}
                  className={`flex items-center gap-6 w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.doctorId === doctor.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-surface-container-low hover:border-primary/20'
                  }`}
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-surface-container-high">
                    <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">{doctor.name}</h3>
                    <p className="text-sm text-on-surface-variant">{doctor.specialty} • {doctor.experience}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Step 3: Availability */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm">3</span>
              Chọn thời gian
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setFormData({ ...formData, timeSlot: slot })}
                  className={`py-3 rounded-xl border-2 font-bold transition-all ${
                    formData.timeSlot === slot 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-surface-container-low text-on-surface hover:border-primary/20'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </section>

          {/* Step 4: Patient Info */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm">4</span>
              Thông tin bệnh nhân
            </h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Họ và tên" 
                className="w-full p-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="tel" 
                  placeholder="Số điện thoại" 
                  className="p-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="p-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6 rounded-3xl bg-surface-container-low p-8">
            <h2 className="text-lg font-bold text-on-surface">Tóm tắt đặt lịch</h2>
            
            <div className="space-y-4 border-b border-surface-container-high pb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Hình thức:</span>
                <span className="font-bold text-on-surface">{selectedService?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Bác sĩ:</span>
                <span className="font-bold text-on-surface">{selectedDoctor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Thời gian:</span>
                <span className="font-bold text-on-surface">{formData.timeSlot || 'Chưa chọn'}</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-on-surface-variant font-bold">Tổng phí:</span>
              <span className="text-2xl font-bold text-primary">${selectedService?.price}.00</span>
            </div>

            <button className="w-full rounded-full bg-primary py-4 text-center font-bold text-white shadow-xl transition-all hover:bg-primary-container active:scale-95">
              Xác nhận Đặt lịch
            </button>
            <p className="text-center text-xs text-on-surface-variant leading-relaxed">
              Bằng việc nhấn xác nhận, bạn đồng ý với các điều khoản bảo mật của The Clinical Editorial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
