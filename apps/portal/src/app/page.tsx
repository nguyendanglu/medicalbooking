'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { ServiceSection } from '@/components/home/ServiceSection';
import { DoctorSection } from '@/components/home/DoctorSection';
import { NewsSection } from '@/components/home/NewsSection';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero />
        <ServiceSection />
        <DoctorSection />
        <NewsSection />
      </main>
      
      <footer className="bg-surface-container-lowest py-20 px-6 lg:px-8 border-t border-surface-container-low">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <span className="font-display text-xl font-bold tracking-tight text-on-surface">
                The Clinical Editorial
              </span>
            </div>
            <p className="text-on-surface-variant max-w-sm leading-relaxed">
              Xây dựng nền tảng y tế kỹ thuật số hiện đại, kết nối khách hàng với hệ sinh thái y tế chất lượng cao.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-on-surface mb-6">Liên kết</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>Dịch vụ</li>
              <li>Chuyên gia</li>
              <li>Đặt lịch</li>
              <li>Liên hệ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-on-surface mb-6">Pháp lý</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>Chính sách bảo mật</li>
              <li>Điều khoản sử dụng</li>
              <li>Bảo mật y tế (HIPAA)</li>
            </ul>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl mt-20 pt-8 border-t border-surface-container-low flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant/60">
          <p>© 2024 The Clinical Editorial. The Curated Sanctuary for Healthcare.</p>
          <div className="flex gap-8">
            <span>Powered by Smart Clinic Systems</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
