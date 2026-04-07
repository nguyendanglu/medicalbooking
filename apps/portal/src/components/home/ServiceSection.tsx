import { services } from '@/data/mockData';

const ServiceIcon = ({ name }: { name: string }) => {
  // Simple SVG mapping
  if (name === 'Home') return (
    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
  if (name === 'Smartphone') return (
    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
  return (
    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
};

export const ServiceSection = () => {
  return (
    <section className="bg-surface-container-low px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Dịch vụ cốt lõi</h2>
          <p className="text-4xl font-bold tracking-tight text-on-surface">Giải pháp chăm sóc sức khỏe toàn diện</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div 
              key={service.title} 
              className="group rounded-xl bg-surface-container-lowest p-10 transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 transition-colors group-hover:bg-primary/10">
                <ServiceIcon name={service.icon} />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-on-surface">{service.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">
                {service.description}
              </p>
              <button className="mt-8 text-sm font-bold text-primary hover:underline">
                Tìm hiểu thêm →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
