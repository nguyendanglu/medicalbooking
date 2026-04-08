'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess(true);
      // Auto-redirect after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />
      
      <main className="flex min-h-screen flex-col lg:flex-row pt-20">
        {/* Left Side: Brand Story & Values */}
        <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-24 bg-surface-container-low overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 max-w-lg">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-8">
              Smart Clinic Ecosystem
            </span>
            <h1 className="mb-8 text-5xl font-extrabold leading-tight tracking-tight text-on-surface xl:text-6xl">
              Your health, <br />
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                reimagined for life.
              </span>
            </h1>
            <p className="mb-12 text-lg leading-relaxed text-on-surface-variant">
              Join the Smart Clinic ecosystem. Access premium healthcare curated specifically for your lifestyle and needs.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface-container-lowest shadow-sm">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Digital Records</h3>
                  <p className="text-sm text-on-surface-variant">Access your full medical history and results securely, anytime.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface-container-lowest shadow-sm">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Instant Booking</h3>
                  <p className="text-sm text-on-surface-variant">Connect with top specialists and book appointments in seconds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="flex w-full items-center justify-center px-6 py-24 lg:w-1/2 lg:px-12 xl:px-24 bg-surface">
          <div className="w-full max-w-md">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-on-surface mb-4">Create Account</h2>
              <p className="text-on-surface-variant">Start your journey to a healthier you today.</p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl bg-error/10 p-4 text-sm font-medium text-error">
                {error}
              </div>
            )}

            {success ? (
              <div className="rounded-3xl bg-primary/10 p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-on-surface">Registration Successful!</h3>
                <p className="text-on-surface-variant">Welcome to the sanctuary of health. Redirecting you to login...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface">Họ</label>
                    <input 
                      required
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Nguyễn"
                      className="w-full p-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface">Tên</label>
                    <input 
                      required
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Văn A"
                      className="w-full p-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface">Email</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full p-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface">Mật khẩu</label>
                  <input 
                    required
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    minLength={8}
                    className="w-full p-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                  <p className="text-xs text-on-surface-variant">Tối thiểu 8 ký tự, bao gồm chữ cái và số.</p>
                </div>

                <div className="flex items-center gap-3">
                  <input required type="checkbox" id="terms" className="h-5 w-5 rounded border-surface-container-high text-primary focus:ring-primary" />
                  <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed">
                    Tôi đồng ý với <Link href="#" className="font-bold text-primary hover:underline">Điều khoản Dịch vụ</Link> và <Link href="#" className="font-bold text-primary hover:underline">Chính sách Bảo mật</Link>.
                  </label>
                </div>

                <button 
                  disabled={isLoading}
                  className="w-full rounded-full bg-primary py-4 text-center font-bold text-white shadow-xl transition-all hover:bg-primary-container active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? 'Đang xử lý...' : 'Đăng ký ngay'}
                </button>
              </form>
            )}

            <div className="mt-12 text-center text-sm">
              <span className="text-on-surface-variant">Already have an account? </span>
              <Link href="/login" className="font-bold text-primary hover:underline">Sign In</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-lowest py-10 px-6 text-center text-xs text-on-surface-variant/60 border-t border-surface-container-low">
        <p>© 2024 The Clinical Editorial. The Curated Sanctuary for Healthcare.</p>
      </footer>
    </div>
  );
}
