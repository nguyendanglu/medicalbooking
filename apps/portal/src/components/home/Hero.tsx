export const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-20 text-center lg:px-8">
      <div className="max-w-4xl">
        <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          Chào mừng đến với Smart Clinic
        </span>
        <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight text-on-surface md:text-7xl">
          Trải nghiệm Y tế <br />
          <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
            Kỹ thuật số bậc nhất
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
          Chúng tôi tái định nghĩa sự chăm sóc thông qua công nghệ hiện đại, mang đến sự serene 
          và Authority trong mọi điểm chạm y tế.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button className="rounded-full bg-gradient-to-br from-primary to-primary-container px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95">
            Đặt lịch khám ngay
          </button>
          <button className="rounded-full border-2 border-primary/20 bg-transparent px-8 py-4 text-lg font-bold text-primary transition-all hover:bg-primary/5">
            Tư vấn 24/7
          </button>
        </div>
      </div>

      <div className="mt-20 grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {[
          { label: 'Bác sĩ chuyên khoa', value: '50+' },
          { label: 'Bệnh nhân tin tưởng', value: '10k+' },
          { label: 'Hệ thống phòng khám', value: '05' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-surface-container-low p-8 text-center">
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-on-surface-variant uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
