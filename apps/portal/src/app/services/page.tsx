'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { healthPackages } from '@/data/mockData';
import { PackageCard } from '@/components/services/PackageCard';
import { ConsultationSection } from '@/components/services/ConsultationSection';

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">
                Tailored Precision
              </h2>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-on-surface mb-8 leading-[1.1]">
                Curated Health <br /> 
                <span className="text-primary-container">Packages</span>
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl">
                Experience a sanctuary of precision medicine. Our editorial approach to health screening ensures every test is a step toward profound well-being and longevity.
              </p>
            </div>
          </div>
        </section>

        {/* Package Grid */}
        <section className="bg-surface-container-low px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {healthPackages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* Bespoke Consultation */}
        <ConsultationSection />
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
