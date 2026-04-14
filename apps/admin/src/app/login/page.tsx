'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Proceed to dashboard directly for now
    router.push('/dashboard');
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-8 h-20">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-br from-blue-700 to-blue-500 bg-clip-text text-transparent font-headline tracking-tight font-semibold">
            Aura Health
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            <button className="text-slate-500 dark:text-slate-400 font-body text-sm tracking-wide hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors px-3 py-2 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">help_outline</span>
              Help
            </button>
            <button className="text-slate-500 dark:text-slate-400 font-body text-sm tracking-wide hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors px-3 py-2 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">language</span>
              English
            </button>
          </div>
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-full font-semibold text-sm active:scale-95 duration-150">
            Emergency Support
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Aesthetic Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-3xl"></div>
          <img 
            alt="medical background" 
            className="w-full h-full object-cover opacity-10 mix-blend-overlay grayscale" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxeo0o23FfjqAKep_deIXGpc5McPwOQRlKUaMP6kSZLu0r9P5aCWJViVm9SyVLFoLzy4Ga3dpApCFK4t2dOlYFwNVr-ltpRKfhIYAMoHylABX7-pew3yhYQr3_qYz2B05VUDg9dTAnpDvqHYpHMhd2bhQL3xeW0A0YRYzCfAkL45ts0r90ETtdTPtGi1NliaD_LIf8dYwtxQlnmZev7WRp7K_JakVUalVfdAebVX7usFtfUgSouK_EJ2sHQ-FwjgMIlp3IuHLXxg" 
          />
        </div>

        {/* Login Container */}
        <div className="relative z-10 w-full max-w-[1200px] px-6 grid md:grid-cols-12 gap-0 items-center">
          {/* Branding/Editorial Column */}
          <div className="hidden md:flex md:col-span-6 flex-col pr-12">
            <div className="mb-8">
              <span className="inline-block py-1 px-4 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-4">
                Secure Portal
              </span>
              <h1 className="text-5xl lg:text-6xl text-primary font-extrabold tracking-tight leading-tight mb-6 font-headline">
                Excellence in <br/>Clinical Care.
              </h1>
              <p className="text-lg text-secondary max-w-md leading-relaxed font-body">
                Access the Smart Clinic management system. Our integrated ecosystem provides the highest standard of administrative security and patient data integrity.
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-[1px] w-12 bg-outline-variant/30"></div>
              <span className="text-base text-outline font-medium">Aura Health Systems © 2024</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <div className="glass-panel p-10 md:p-12 rounded-xl shadow-2xl shadow-primary/5 border border-outline-variant/15">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-on-surface mb-2 tracking-tight">Admin Portal Login</h2>
                <p className="text-on-surface-variant text-sm">Please enter your credentials to manage your clinic.</p>
              </div>

              <form className="space-y-6" onSubmit={handleLogin}>
                {/* Input Field: Username */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant px-1" htmlFor="username">
                    Username or Email
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">person</span>
                    <input 
                      className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-md focus:ring-2 focus:ring-primary/30 transition-all text-on-surface placeholder:text-outline/50" 
                      id="username" 
                      name="username" 
                      placeholder="admin@aurahealth.com" 
                      type="text"
                    />
                  </div>
                </div>

                {/* Input Field: Password */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-semibold text-on-surface-variant" htmlFor="password">
                      Password
                    </label>
                    <Link className="text-xs font-semibold text-primary hover:text-primary-container transition-colors" href="#">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">lock</span>
                    <input 
                      className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-md focus:ring-2 focus:ring-primary/30 transition-all text-on-surface placeholder:text-outline/50" 
                      id="password" 
                      name="password" 
                      placeholder="••••••••" 
                      type="password"
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-3 px-1">
                  <input 
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-2 focus:ring-primary/20 accent-primary" 
                    id="remember" 
                    name="remember" 
                    type="checkbox"
                  />
                  <label className="text-sm text-secondary font-medium" htmlFor="remember">
                    Remember this session
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button 
                    className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-full font-bold text-base shadow-lg shadow-primary/20 active:scale-[0.98] transition-all hover:brightness-110" 
                    type="submit"
                  >
                    Sign In to Dashboard
                  </button>
                </div>
              </form>

              {/* Security Badge */}
              <div className="mt-10 pt-8 border-t border-outline-variant/15 flex items-center justify-center gap-4 grayscale opacity-60">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase">256-Bit Encrypted</span>
                </div>
                <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">security</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase">HIPAA Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/15 dark:border-slate-800/15 bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row justify-between items-center px-8 py-6 mt-auto">
        <div className="text-slate-400 dark:text-slate-500 font-body text-sm tracking-wide mb-4 md:mb-0">
          © 2024 Aura Health Systems. Secure Editorial Infrastructure.
        </div>
        <div className="flex gap-8">
          <Link className="text-slate-400 dark:text-slate-500 font-body text-sm tracking-wide hover:text-blue-500 transition-colors" href="#">
            Privacy Protocol
          </Link>
          <Link className="text-slate-400 dark:text-slate-500 font-body text-sm tracking-wide hover:text-blue-500 transition-colors" href="#">
            Security Whitepaper
          </Link>
          <Link className="text-slate-400 dark:text-slate-500 font-body text-sm tracking-wide hover:text-blue-500 transition-colors" href="#">
            System Status
          </Link>
        </div>
      </footer>
    </div>
  );
}
