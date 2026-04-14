'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { 
  Video, 
  MessageSquare, 
  ChevronRight, 
  Droplets, 
  FlaskConical, 
  Lock, 
  Pill, 
  Info
} from 'lucide-react';

export default function HealthRecordPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage');
      }
    }
  }, []);

  const userName = user?.firstName || 'Adrian';

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-grow py-12 px-6 max-w-lg mx-auto w-full">
        {/* User Welcome Section */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-secondary font-medium">
            Your medical records are synchronized and secure.
          </p>
        </header>

        {/* Telemedicine Integration */}
        <section className="grid grid-cols-2 gap-4 mb-10">
          <button className="col-span-1 bg-primary text-white p-6 rounded-[2rem] flex flex-col items-start gap-4 transition-transform active:scale-95 shadow-xl shadow-primary/20">
            <div className="bg-white/20 p-2.5 rounded-2xl">
              <Video className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-lg leading-tight text-left">
              Video Call
            </span>
          </button>
          <button className="col-span-1 bg-surface-container-lowest text-primary p-6 rounded-[2rem] flex flex-col items-start gap-4 transition-transform active:scale-95 shadow-sm border border-surface-container">
            <div className="bg-primary/10 p-2.5 rounded-2xl">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-lg leading-tight text-left">
              Chat with<br />Doctor
            </span>
          </button>
        </section>

        {/* Quick Access Sections */}
        <div className="space-y-12">
          {/* Lab Results */}
          <section>
            <div className="flex justify-between items-end mb-4 px-1">
              <h2 className="font-display text-2xl font-bold text-on-surface">Lab Results</h2>
              <button className="text-primary font-bold text-sm hover:underline">View History</button>
            </div>
            <div className="space-y-3">
              <div className="bg-surface-container-lowest p-5 rounded-[2rem] shadow-sm border border-surface-container-low flex items-center justify-between group cursor-pointer hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface leading-tight">Complete Blood Count</h4>
                    <p className="text-sm text-on-surface-variant">Updated 2 days ago</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-outline-variant group-hover:text-primary transition-colors" />
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-[2rem] shadow-sm border border-surface-container-low flex items-center justify-between group cursor-pointer hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface leading-tight">Metabolic Panel</h4>
                    <p className="text-sm text-on-surface-variant">Oct 14, 2023</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-outline-variant group-hover:text-primary transition-colors" />
              </div>
            </div>
          </section>

          {/* Diagnostic Imaging */}
          <section>
            <div className="flex justify-between items-end mb-4 px-1">
              <h2 className="font-display text-2xl font-bold text-on-surface">Diagnostic Imaging</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
              <div className="flex-none w-64 h-48 rounded-[2rem] bg-surface-container-high overflow-hidden relative group cursor-pointer shadow-md">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt="Medical ultrasound scan" 
                  src="https://images.unsplash.com/photo-1579154235602-3c35bd4c8438?auto=format&fit=crop&q=80&w=400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <p className="text-white font-bold text-lg">Abdominal Ultrasound</p>
                  <p className="text-white/80 text-sm">Sep 28, 2023</p>
                </div>
              </div>
              
              <div className="flex-none w-48 h-48 rounded-[2rem] bg-surface-container-high overflow-hidden relative opacity-80 group cursor-not-allowed">
                <img 
                  className="w-full h-full object-cover grayscale" 
                  alt="Radiology x-ray" 
                  src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Lock className="w-10 h-10 text-white opacity-80" />
                </div>
              </div>
            </div>
          </section>

          {/* Prescriptions */}
          <section>
            <div className="flex justify-between items-end mb-4 px-1">
              <h2 className="font-display text-2xl font-bold text-on-surface">Prescriptions</h2>
              <span className="bg-primary-container/20 text-primary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                2 Active
              </span>
            </div>
            <div className="bg-surface-container-low rounded-[2.5rem] p-1 border border-surface-container-high/30">
              <div className="bg-surface-container-lowest p-8 rounded-[2.3rem] shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-primary leading-tight">Amoxicillin 500mg</h3>
                    <p className="text-base text-secondary font-medium">Capsule • 3x Daily</p>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-2xl">
                    <Pill className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-on-surface-variant bg-surface-container-low p-4 rounded-2xl border border-surface-container-high/50">
                  <Info className="w-5 h-5 flex-shrink-0 text-primary" />
                  <p className="font-medium italic">Take with food. Finish the full course.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer (Simplified for Mobile) */}
      <footer className="mt-12 bg-surface-container-low/30 py-12 px-6 border-t border-surface-container">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <div className="font-display font-bold text-lg text-on-surface">The Clinical Editorial</div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            © 2024 The Clinical Editorial. <br />The Curated Sanctuary for Healthcare.
          </p>
        </div>
      </footer>
    </div>
  );
}
