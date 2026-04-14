'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-surface-container-lowest/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-container" />
          <span className="font-display text-xl font-bold tracking-tight text-on-surface">
            The Clinical Editorial
          </span>
        </Link>

        <div className="hidden gap-8 md:flex">
          {[
            { name: 'Trang chủ', href: '/' },
            { name: 'Dịch vụ', href: '/services' },
            { name: 'Lịch Khám', href: '/appointments' },
            { name: 'Bác sĩ', href: '#' },
            { name: 'Tin tức', href: '/news' },
            { name: 'Hồ sơ y tế', href: '/appointments' }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
              </div>
              <div className="hidden flex-col md:flex">
                <span className="text-sm font-semibold text-on-surface leading-none mb-1">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant/70 font-bold">
                  {user.role === 'PATIENT' ? 'Bệnh nhân' : user.role}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-full bg-error/10 px-6 py-2.5 text-sm font-semibold text-error transition-all hover:bg-error/20"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-full bg-surface-container-high px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
};
