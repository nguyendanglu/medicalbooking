import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-surface-container-lowest/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-container" />
          <span className="font-display text-xl font-bold tracking-tight text-on-surface">
            The Clinical Editorial
          </span>
        </div>
        
        <div className="hidden gap-8 md:flex">
          {[
            { name: 'Trang chủ', href: '/' },
            { name: 'Dịch vụ', href: '/services' },
            { name: 'Bác sĩ', href: '#' },
            { name: 'Tin tức', href: '/news' },
            { name: 'Hồ sơ y tế', href: '#' }
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

        <Link 
          href="/login"
          className="rounded-full bg-surface-container-high px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
        >
          Đăng nhập
        </Link>
      </div>
    </nav>
  );
};
