import { doctors } from '@/data/mockData';
import Image from 'next/image';

export const DoctorSection = () => {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Đội ngũ chuyên gia</h2>
            <p className="text-4xl font-bold tracking-tight text-on-surface">Những bác sĩ đầu ngành tận tâm</p>
          </div>
          <button className="rounded-full border border-primary/20 px-6 py-2 text-sm font-bold text-primary transition-all hover:bg-primary/5">
            Xem tất cả chuyên gia
          </button>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {doctors.map((doctor) => (
            <div 
              key={doctor.name} 
              className="flex flex-col gap-8 rounded-2xl bg-surface-container-low p-8 sm:flex-row sm:items-center"
            >
              <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-xl bg-surface-container-high md:h-64 md:w-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <Image 
                  src={doctor.image} 
                  alt={doctor.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-2 text-sm font-bold text-primary uppercase tracking-wider">
                  BS {doctor.specialty}
                </div>
                <h3 className="mb-4 text-3xl font-bold text-on-surface">{doctor.name}</h3>
                <p className="mb-6 text-on-surface-variant leading-relaxed">
                  {doctor.experience}
                </p>
                <div className="flex gap-4">
                  <button className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-container">
                    Đặt lịch với bác sĩ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
