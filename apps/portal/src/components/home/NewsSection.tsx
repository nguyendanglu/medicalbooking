import { news } from '@/data/mockData';

export const NewsSection = () => {
  return (
    <section className="bg-surface-container-lowest px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Tin tức & Kiến thức</h2>
            <p className="text-4xl font-bold tracking-tight text-on-surface mb-8">Cập nhật y khoa và lời khuyên sức khỏe</p>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              Khám phá những xu hướng y tế mới nhất và kiến thức chăm sóc sức khỏe chủ động từ đội ngũ chuyên gia của chúng tôi.
            </p>
            <button className="rounded-full bg-surface-container-low px-8 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/10">
              Đến Blog sức khỏe
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2">
            {news.map((item) => (
              <div key={item.title} className="group flex flex-col justify-between rounded-xl bg-surface-container-low p-8 transition-all hover:bg-primary/5">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary uppercase tracking-tighter">
                      {item.category}
                    </span>
                    <span className="text-xs text-on-surface-variant">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface leading-snug group-hover:text-primary transition-colors cursor-pointer">
                    {item.title}
                  </h3>
                </div>
                <button className="mt-8 flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Đọc thêm 
                  <span className="text-xl">→</span>
                </button>
              </div>
            ))}
            
            {/* Promo Card */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container p-8 text-center text-white">
              <h3 className="mb-4 text-2xl font-bold">Gói Tầm Soát Tổng Quát</h3>
              <p className="mb-6 text-primary-fixed-dim/80 text-sm">
                Ưu đãi 30% cho khách hàng mới đặt lịch qua App.
              </p>
              <button className="rounded-full bg-white px-8 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:scale-105">
                Tìm hiểu ưu đãi
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
