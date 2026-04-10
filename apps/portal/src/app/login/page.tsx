'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOME_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();

      // Store user data in localStorage (or handle auth correctly depending on architecture)
      if (typeof window !== 'undefined' && data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-12">
        {/* Decorative background elements */}
        <div className="absolute top-[20%] left-[10%] h-[30%] w-[30%] rounded-full bg-primary/5 blur-3xl -z-10" />
        <div className="absolute bottom-[20%] right-[10%] h-[30%] w-[30%] rounded-full bg-primary/5 blur-3xl -z-10" />

        <div className="w-full max-w-md">
          <div className="bg-surface-container-low rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-surface-container">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-on-surface mb-3 tracking-tight">Welcome Back.</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Access your personalized sanctuary of health and curated care.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl bg-error/10 p-4 text-sm font-medium text-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider ml-1">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full p-4 rounded-2xl bg-surface-container border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Mật khẩu</label>
                  <Link href="#" className="text-xs font-bold text-primary hover:underline">
                    Quên mật khẩu?
                  </Link>
                </div>
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full p-4 rounded-2xl bg-surface-container border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                />
              </div>

              <div className="pt-2">
                <button
                  disabled={isLoading}
                  className="w-full rounded-full bg-primary py-4 text-center font-bold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-container hover:text-on-primary-container active:scale-[0.98] disabled:opacity-50"
                >
                  {isLoading ? 'Đang xử lý...' : 'Sign In'}
                </button>
              </div>
            </form>

            <div className="mt-10 text-center text-sm border-t border-surface-container pt-8">
              <span className="text-on-surface-variant">Don't have an account? </span>

              <Link href="/register" className="font-bold text-primary hover:underline">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-on-surface-variant/60">
            <p>© 2024 The Clinical Editorial. <br />The Curated Sanctuary for Healthcare.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
