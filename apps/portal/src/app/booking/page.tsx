'use client';

import { Navbar } from '@/components/layout/Navbar';
import { BookingForm } from '@/components/booking/BookingForm';

export default function BookingPage() {
  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />
      <main className="pt-20">
        <BookingForm />
      </main>
      
      <footer className="bg-surface-container-lowest py-10 px-6 text-center text-xs text-on-surface-variant/60 border-t border-surface-container-low">
        <p>© 2024 The Clinical Editorial. The Curated Sanctuary for Healthcare.</p>
      </footer>
    </div>
  );
}
