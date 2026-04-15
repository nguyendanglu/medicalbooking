'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  date: string;
  status: string;
  reason: string;
  doctor: {
    id: string;
    name: string;
    specialty: string;
  };
  serviceType: {
    id: string;
    title: string;
    description: string;
  };
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (dateFilter) params.append('date', dateFilter);
      if (statusFilter) params.append('status', statusFilter);
      if (doctorFilter) params.append('doctorId', doctorFilter);

      const res = await fetch(`/api/appointments?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch appointments');

      const data = await res.json();
      setAppointments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [dateFilter, statusFilter, doctorFilter]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('/api/appointments/doctors');
        if (res.ok) {
          const data = await res.json();
          setDoctors(data);
        } else {
          const errData = await res.json();
          console.error('Failed to fetch doctors:', errData);
          setError(`Doctor Fetch Error: ${errData.message || res.statusText}`);
        }
      } catch (err: any) {
        console.error('Failed to fetch doctors:', err);
        setError(`Connection error while fetching doctors: ${err.message}`);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAppointments();
    }, 300);
    return () => clearTimeout(timer);
  }, [dateFilter, statusFilter, doctorFilter, fetchAppointments]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');

      // Update local state
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED': return 'bg-blue-100 text-blue-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'COMPLETED': return 'bg-green-100 text-green-700';
      case 'CANCELLED': return 'bg-red-100 text-red-700';
      case 'RESCHEDULED': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
      window.location.href = '/login';
    }
  };

  return (
    <div className="bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* SideNavBar Shell */}
      <nav className="fixed left-0 top-0 h-full flex flex-col py-8 w-64 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-3xl z-50 border-r border-slate-200/50">
        <div className="px-6 mb-12">
          <h1 className="text-xl font-bold tracking-tight text-blue-900 dark:text-blue-200 font-headline">The Clinical Editorial</h1>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">Smart Clinic Admin</p>
        </div>

        <div className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-200/50 transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/appointments" className="flex items-center gap-3 px-4 py-3 rounded-full text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-600 bg-slate-200/50 transition-colors">
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
        </div>

        <div className="px-6 mt-auto space-y-6">
          <div className="space-y-3 pt-6 border-t border-slate-200/50">
            <button onClick={handleLogout} className="flex items-center gap-3 text-slate-500 text-sm hover:text-blue-600 w-full text-left">
              <span className="material-symbols-outlined text-lg">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* TopAppBar Shell */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 flex items-center justify-between px-8 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm shadow-blue-900/5 border-b border-slate-200/50">
        <div className="flex items-center gap-8">
          <span className="text-lg font-black bg-gradient-to-br from-blue-700 to-blue-500 bg-clip-text text-transparent font-headline">Aura Admin Portal</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-xs font-bold text-on-surface text-blue-900">Clinic Staff</p>
              <p className="text-[10px] text-slate-500 text-blue-900">Administrative Access</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              CS
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-24 p-8 min-h-screen">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Appointment Registry</h2>
            <p className="text-on-surface-variant font-medium text-slate-500">Manage and monitor daily clinical schedules across all departments.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-surface-container-lowest text-primary px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all border border-slate-100">
              <span className="material-symbols-outlined text-lg">file_download</span>
              Export PDF
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-lg">add</span>
              New Appointment
            </button>
          </div>
        </header>

        {/* Filters Tonal Section */}
        <section className="bg-slate-100/50 p-6 rounded-xl mb-8 flex flex-wrap items-center gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Filter by Date</label>
            <input
              type="date"
              className="bg-white border-none rounded-md px-4 py-2.5 text-sm w-48 shadow-sm focus:ring-2 focus:ring-primary/20"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Assigned Doctor</label>
            <select
              className="bg-white border-none rounded-md px-4 py-2.5 text-sm w-48 shadow-sm focus:ring-2 focus:ring-primary/20"
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
            >
              <option value="">All Doctors</option>
              {doctors.map(dr => (
                <option key={dr.id} value={dr.id}>{dr.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Status</label>
            <div className="flex gap-2">
              {['', 'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${statusFilter === s ? 'bg-primary text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  {s || 'All'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setDateFilter(''); setStatusFilter(''); setDoctorFilter(''); }}
            className="ml-auto p-3 text-primary hover:bg-primary/5 rounded-full transition-colors"
            title="Reset Filters"
          >
            <span className="material-symbols-outlined">restart_alt</span>
          </button>
        </section>

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Main Data Table Container */}
          <div className="col-span-12 xl:col-span-9">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient Details</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service & Doctor</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-blue-900">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        <span className="material-symbols-outlined animate-spin mb-2 block text-3xl">sync</span>
                        Loading clinical records...
                      </td>
                    </tr>
                  ) : appointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        No appointments found for the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="font-bold text-on-surface">{appt.patientName}</div>
                          <div className="text-xs text-slate-500">{appt.reason}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{appt.patientPhone}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-bold text-primary">
                            {new Date(appt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                          <div className="text-xs text-slate-500">
                            {appt.date}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-bold text-on-surface">{appt.serviceType.title}</div>
                          <div className="text-xs text-slate-500">with {appt.doctor.name}</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(appt.status)}`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2">
                            {appt.status !== 'CONFIRMED' && appt.status !== 'COMPLETED' && (
                              <button
                                onClick={() => handleUpdateStatus(appt.id, 'CONFIRMED')}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              >
                                <span className="material-symbols-outlined">check_circle</span>
                              </button>
                            )}
                            {appt.status !== 'CANCELLED' && appt.status !== 'COMPLETED' && (
                              <button
                                onClick={() => handleUpdateStatus(appt.id, 'CANCELLED')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <span className="material-symbols-outlined">cancel</span>
                              </button>
                            )}
                            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                              <span className="material-symbols-outlined">more_vert</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Bento Column */}
          <div className="col-span-12 xl:col-span-3 space-y-6">
            {/* Today's Load Card */}
            <div className="bg-primary p-6 rounded-xl text-white relative overflow-hidden shadow-xl shadow-primary/20">
              <div className="relative z-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-4 font-body">Today's Load</h3>
                <div className="flex items-end gap-2 mb-2 font-headline">
                  <span className="text-5xl font-black">{appointments.length}</span>
                  <span className="text-sm font-medium mb-1 opacity-80">Bookings</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold bg-white/20 w-fit px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  Active Session
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <span className="material-symbols-outlined text-9xl" style={{ fontSize: '150px' }}>calendar_month</span>
              </div>
            </div>

            {/* Urgent Actions */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <span className="material-symbols-outlined text-lg">warning</span>
                <h3 className="text-[10px] font-bold uppercase tracking-widest font-body">Urgent Actions</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                  <p className="text-xs font-medium text-red-900">
                    {appointments.filter(a => a.status === 'PENDING').length} appointments waiting for confirmation.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                  <p className="text-xs font-medium text-red-900">
                    Doctor schedule conflicts detected for next week.
                  </p>
                </li>
              </ul>
            </div>

            {/* Help Card */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 font-body">Clinical Support</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">Need assistance with rescheduling or patient emergency?</p>
              <button className="w-full bg-white border border-slate-200 text-primary py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
                Open Support Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Global Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-blue-900">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Total Active</p>
              <p className="text-2xl font-black text-blue-900">{appointments.filter(a => a.status === 'CONFIRMED').length}</p>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-center gap-4 text-blue-900">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-amber-500/70 uppercase tracking-widest">Pending Review</p>
              <p className="text-2xl font-black text-amber-700">{appointments.filter(a => a.status === 'PENDING').length}</p>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex items-center gap-4 text-blue-900">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/20">
              <span className="material-symbols-outlined">done_all</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Completed Today</p>
              <p className="text-2xl font-black text-purple-900">{appointments.filter(a => a.status === 'COMPLETED').length}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
