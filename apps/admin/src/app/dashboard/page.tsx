'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* SideNavBar Shell */}
      <nav className="fixed left-0 top-0 h-full flex flex-col py-8 w-64 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-3xl z-50">
        <div className="px-6 mb-12">
          <h1 className="text-xl font-bold tracking-tight text-blue-900 dark:text-blue-200 font-headline">The Clinical Editorial</h1>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">Smart Clinic Admin</p>
        </div>

        <div className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-full text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-600 bg-slate-200/50 transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/appointments" className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-200/50 transition-colors">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-sm font-medium">Appointments</span>
          </Link>
          <Link href="/patients" className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-200/50 transition-colors">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">Patient CRM</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-200/50 transition-colors">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm font-medium">Clinic Stats</span>
          </Link>
          <Link href="/settings/change-password" className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-200/50 transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>

        <div className="px-6 mt-auto space-y-6">
          <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 px-6 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform">
            Quick Consultation
          </button>
          <div className="space-y-3 pt-6 border-t border-slate-200/50">
            <Link href="#" className="flex items-center gap-3 text-slate-500 text-sm hover:text-blue-600">
              <span className="material-symbols-outlined text-lg">help_outline</span>
              Support
            </Link>
            <Link href="/login" className="flex items-center gap-3 text-slate-500 text-sm hover:text-blue-600">
              <span className="material-symbols-outlined text-lg">logout</span>
              Sign Out
            </Link>
          </div>
        </div>
      </nav>

      {/* TopAppBar Shell */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 flex items-center justify-between px-8 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm shadow-blue-900/5">
        <div className="flex items-center gap-8">
          <span className="text-lg font-black bg-gradient-to-br from-blue-700 to-blue-500 bg-clip-text text-transparent font-headline">Aura Admin Portal</span>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 py-1">Recent Activity</Link>
            <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:opacity-80 transition-opacity">Alerts</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative flex items-center bg-surface-container-low px-4 py-2 rounded-xl focus-within:ring-2 ring-primary/20 transition-all">
            <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 outline-none text-sm p-0 w-64" placeholder="Search patients or records..." type="text" />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications_active</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <span className="material-symbols-outlined">mail</span>
            </button>
          </div>

          <button className="bg-error text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">
            Emergency Alert
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-xs font-bold text-on-surface">Chief Administrator</p>
              <p className="text-[10px] text-slate-500">Dr. Julian Vance</p>
            </div>
            <img 
              alt="Chief Administrator Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/10" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZmZw31JHZVUlpJmqn7Zj8MX8H33FYZ36E8R0QR-kZ_uauHCZNUWAURUvIvLh7-OSua7iqaa6J3YYNXYBTp6cfaoLvfddYtMpBYIS_7ql3vJfx4vE6sgspHFzOmrsWq3F4xmEy7wu-4IlUlPcfzrj7L5mqwrEah_lV6uw348174zTGRQkPm3ZrZ1YZZ6t-fSV84kzRwUMQmkRq7hRS7ZgQqP1csjeYWEbK2DPtay4wIBvsF0XcSZ0uMewplmXYJTUMRWT8nHpV6A" 
            />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-24 p-8 min-h-screen">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">Good Morning, Chief.</h2>
          <p className="text-slate-500 font-medium">Here is what’s happening at <span className="text-primary font-bold">The Clinical Editorial</span> today.</p>
        </header>

        {/* Metrics Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Appointments</p>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-black text-on-surface font-headline">128</h3>
              <p className="text-xs text-green-600 font-bold mt-1">+12% from last week</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-purple-600">person_add</span>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">New Patients</p>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-black text-on-surface font-headline">34</h3>
              <p className="text-xs text-green-600 font-bold mt-1">+5% from last month</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-green-600">payments</span>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Daily Revenue</p>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-black text-on-surface font-headline">$12,480</h3>
              <p className="text-xs text-slate-500 font-bold mt-1">Pending: $2,100</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-orange-600">stethoscope</span>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Doctor Availability</p>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-black text-on-surface font-headline">8/10</h3>
              <p className="text-xs text-orange-600 font-bold mt-1">2 on leave</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left & Center: Schedule & Trends */}
          <div className="lg:col-span-2 space-y-8">
            {/* Appointment Trends Chart */}
            <section className="bg-surface-container-low p-8 rounded-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-on-surface font-headline">Appointment Volume</h3>
                  <p className="text-sm text-slate-500">Weekly patient throughput analysis</p>
                </div>
                <select className="bg-white border-none outline-none rounded-full text-xs font-bold px-4 py-2 shadow-sm text-slate-600 cursor-pointer">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>

              <div className="h-64 flex items-end gap-4 px-4">
                <div className="flex-1 bg-primary/10 rounded-t-lg h-[40%] transition-all hover:bg-primary/20 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">42</span>
                </div>
                <div className="flex-1 bg-primary/10 rounded-t-lg h-[65%] transition-all hover:bg-primary/20 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">68</span>
                </div>
                <div className="flex-1 bg-primary/30 rounded-t-lg h-[85%] transition-all hover:bg-primary/40 relative group border-b-4 border-primary">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">92</span>
                </div>
                <div className="flex-1 bg-primary/10 rounded-t-lg h-[50%] transition-all hover:bg-primary/20 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">55</span>
                </div>
                <div className="flex-1 bg-primary/10 rounded-t-lg h-[70%] transition-all hover:bg-primary/20 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">74</span>
                </div>
                <div className="flex-1 bg-primary/10 rounded-t-lg h-[60%] transition-all hover:bg-primary/20 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">62</span>
                </div>
                <div className="flex-1 bg-primary/10 rounded-t-lg h-[45%] transition-all hover:bg-primary/20 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">48</span>
                </div>
              </div>
              <div className="flex justify-between mt-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                <span>Mon</span><span>Tue</span><span className="text-primary">Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </section>

            {/* Today's Schedule */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-on-surface font-headline">Today's Schedule</h3>
                <button className="text-primary text-sm font-bold hover:underline">View Full Calendar</button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow border border-outline-variant/10 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="text-center w-16">
                      <p className="text-lg font-black text-primary">09:30</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">AM</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200"></div>
                    <div>
                      <h4 className="font-bold text-on-surface">Arthur Pendragon</h4>
                      <p className="text-xs text-slate-500">General Consultation • Dr. Sarah Lee</p>
                    </div>
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">In Progress</span>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow border border-outline-variant/10 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="text-center w-16">
                      <p className="text-lg font-black text-slate-400">10:15</p>
                      <p className="text-[10px] font-bold text-slate-300 uppercase">AM</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200"></div>
                    <div>
                      <h4 className="font-bold text-on-surface">Morgana LeFay</h4>
                      <p className="text-xs text-slate-500">Dermatology Follow-up • Dr. Vance</p>
                    </div>
                  </div>
                  <span className="bg-slate-50 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Confirmed</span>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow border border-outline-variant/10 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="text-center w-16">
                      <p className="text-lg font-black text-slate-400">11:00</p>
                      <p className="text-[10px] font-bold text-slate-300 uppercase">AM</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200"></div>
                    <div>
                      <h4 className="font-bold text-on-surface">Gawain Smith</h4>
                      <p className="text-xs text-slate-500">Post-Op Checkup • Dr. Sarah Lee</p>
                    </div>
                  </div>
                  <span className="bg-orange-50 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Late</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Recent Activity & Status */}
          <aside className="space-y-8">
            {/* Status Card */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-8 rounded-xl shadow-xl shadow-blue-900/20">
              <h3 className="text-lg font-bold mb-4 font-headline">Clinic Capacity</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>OPD Waiting Area</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-[85%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Surgery Suites</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-[40%] rounded-full"></div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-white/10 hover:bg-white/20 py-2 rounded-full text-xs font-bold transition-colors">
                Manage Resources
              </button>
            </div>

            {/* Recent Activity Feed */}
            <section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10">
              <h3 className="text-lg font-bold text-on-surface mb-6 font-headline">Recent Activity</h3>
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-50 border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-sm font-bold text-on-surface">New Patient Registered</p>
                  <p className="text-xs text-slate-500">Elena Gilbert added to CRM • 12m ago</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-green-50 border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  </div>
                  <p className="text-sm font-bold text-on-surface">Payment Received</p>
                  <p className="text-xs text-slate-500">Invoice #9432 processed ($450.00) • 45m ago</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-orange-50 border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                  </div>
                  <p className="text-sm font-bold text-on-surface">Appointment Rescheduled</p>
                  <p className="text-xs text-slate-500">Arthur Pendragon moved to 9:30 AM • 1h ago</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-50 border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                  </div>
                  <p className="text-sm font-bold text-on-surface">Lab Results Uploaded</p>
                  <p className="text-xs text-slate-500">Patient: John Doe • 2h ago</p>
                </div>
              </div>
              <button className="w-full mt-8 text-slate-500 text-xs font-bold hover:text-primary transition-colors">
                Show All Activity
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
