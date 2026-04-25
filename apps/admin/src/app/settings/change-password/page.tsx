import type { Metadata } from 'next';
import Link from 'next/link';
import ChangePasswordForm from '@/components/settings/ChangePasswordForm';

export const metadata: Metadata = {
  title: 'Change Password | Security Settings | Aura Admin',
  description: 'Securely update your administrative account password.',
};

export default function ChangePasswordPage() {
  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <nav className="fixed left-0 top-0 h-full flex flex-col py-8 w-64 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-3xl z-50">
        <div className="px-6 mb-12">
          <h1 className="text-xl font-bold tracking-tight text-blue-900 dark:text-blue-200 font-headline">
            The Clinical Editorial
          </h1>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">
            Smart Clinic Admin
          </p>
        </div>

        <div className="flex-1 px-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-200/50 transition-colors"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link
            href="/appointments"
            className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-200/50 transition-colors"
          >
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-sm font-medium">Appointments</span>
          </Link>
          <Link
            href="/patients"
            className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-200/50 transition-colors"
          >
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">Patient CRM</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-200/50 transition-colors"
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm font-medium">Clinic Stats</span>
          </Link>
          {/* Settings — active state */}
          <Link
            href="/settings/change-password"
            className="flex items-center gap-3 px-4 py-3 rounded-full text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-600 bg-slate-200/50 transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>

        <div className="px-6 mt-auto space-y-3 pt-6 border-t border-slate-200/50">
          <Link href="#" className="flex items-center gap-3 text-slate-500 text-sm hover:text-blue-600">
            <span className="material-symbols-outlined text-lg">help_outline</span>
            Support
          </Link>
          <Link href="/login" className="flex items-center gap-3 text-slate-500 text-sm hover:text-blue-600">
            <span className="material-symbols-outlined text-lg">logout</span>
            Sign Out
          </Link>
        </div>
      </nav>

      {/* ── Top bar ───────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 flex items-center justify-between px-8 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm shadow-blue-900/5">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/dashboard" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">
            Dashboard
          </Link>
          <span className="material-symbols-outlined text-slate-300 text-base">chevron_right</span>
          <span className="text-slate-500 font-medium">Settings</span>
          <span className="material-symbols-outlined text-slate-300 text-base">chevron_right</span>
          <span className="text-primary font-bold">Change Password</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications_active</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-xs font-bold text-on-surface">Chief Administrator</p>
              <p className="text-[10px] text-slate-500">Dr. Julian Vance</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold">
              JV
            </div>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <main className="ml-64 pt-24 p-8 min-h-screen">
        {/* Page header (task 2.4) */}
        <header className="mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Security Settings</p>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">
            Change Password
          </h2>
          <p className="text-slate-500 font-medium max-w-lg">
            Maintain the integrity of your clinical administrator account by updating your
            credentials regularly.
          </p>
        </header>

        <div className="max-w-2xl relative">
          {/* Decorative glows matching the design reference */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <section className="bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-[0_40px_40px_-20px_rgba(25,28,30,0.06)] relative z-10 border border-outline-variant/10">
            <ChangePasswordForm />
          </section>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="text-[11px] text-on-surface-variant font-medium tracking-wide">
              Contact{' '}
              <a href="#" className="text-primary hover:underline">
                IT Security Support
              </a>{' '}
              if you are unable to reset your password.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
