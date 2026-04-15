'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

// ─── Interfaces ─────────────────────────────────────────────────────────────
interface PatientUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

interface PatientAppointment {
  id: string;
  date: string;
  timeSlot: string;
  status: string;
  reason: string;
  doctor: { name: string; specialty: string };
  serviceType: { title: string };
}

interface MedicalDocument {
  id: number;
  fileUrl: string;
  fileName: string;
  fileType: string;
  createdAt: string;
}

interface PatientProfile {
  id: number;
  userId: string;
  condition: string | null;
  status: string;
  birthday: string | null;
  gender: string | null;
  bloodType: string | null;
  address: string | null;
  image: string | null;
  medicalHistory?: string | null;
  allergies?: string | null;
  createdAt: string;
  user: PatientUser;
  lastAppointment: PatientAppointment | null;
  appointmentCount: number;
  documentCount: number;
  appointments?: PatientAppointment[];
  documents?: MedicalDocument[];
}

// ─── Helper Functions ────────────────────────────────────────────────────────
const getStatusStyle = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'STABLE': return 'bg-green-100 text-green-700';
    case 'OBSERVATION': return 'bg-yellow-100 text-yellow-700';
    case 'CRITICAL': return 'bg-red-100 text-red-700';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const getConditionStyle = (condition: string | null) => {
  switch (condition) {
    case 'WELLNESS_CHECK': return 'bg-blue-100 text-blue-700';
    case 'HYPERTENSION': return 'bg-orange-100 text-orange-700';
    case 'PHYSIOTHERAPY': return 'bg-purple-100 text-purple-700';
    case 'POST_OP_RECOV': return 'bg-teal-100 text-teal-700';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const getConditionLabel = (condition: string | null) => {
  switch (condition) {
    case 'WELLNESS_CHECK': return 'Wellness Check';
    case 'HYPERTENSION': return 'Hypertension';
    case 'PHYSIOTHERAPY': return 'Physiotherapy';
    case 'POST_OP_RECOV': return 'Post-Op Recovery';
    default: return condition || 'Unknown';
  }
};

const getApptStatusStyle = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'CONFIRMED': return 'bg-blue-100 text-blue-700';
    case 'PENDING': return 'bg-yellow-100 text-yellow-700';
    case 'COMPLETED': return 'bg-green-100 text-green-700';
    case 'CANCELLED': return 'bg-red-100 text-red-700';
    case 'IN_PROGRESS': return 'bg-indigo-100 text-indigo-700';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const getInitials = (user: PatientUser) => {
  const first = user.firstName?.[0] || '';
  const last = user.lastName?.[0] || '';
  return (first + last).toUpperCase() || user.email[0].toUpperCase();
};

const getFullName = (user: PatientUser) => {
  if (user.firstName || user.lastName) {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  }
  return user.email;
};

const avatarColors = [
  'bg-blue-500', 'bg-purple-500', 'bg-teal-500', 'bg-rose-500',
  'bg-amber-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-pink-500',
];
const getAvatarColor = (id: number) => avatarColors[id % avatarColors.length];

// ─── Main Component ──────────────────────────────────────────────────────────
export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientProfile[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'documents'>('overview');

  // Filters
  const [search, setSearch] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPatients = useCallback(async (s: string, c: string, st: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (s) params.append('search', s);
      if (c) params.append('condition', c);
      if (st) params.append('status', st);
      const res = await fetch(`/api/patients?${params.toString()}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Error ${res.status}`);
      }
      const data = await res.json();
      setPatients(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchPatients(search, conditionFilter, statusFilter);
    }, 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [search, conditionFilter, statusFilter, fetchPatients]);

  const handleSelectPatient = async (patient: PatientProfile) => {
    setSelectedPatient(patient);
    setActiveTab('overview');
    setIsDetailLoading(true);
    try {
      const res = await fetch(`/api/patients/${patient.id}`);
      if (res.ok) {
        const detail = await res.json();
        setSelectedPatient(detail);
      }
    } catch (err) {
      console.error('Failed to load patient detail:', err);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch {
      window.location.href = '/login';
    }
  };

  const CONDITIONS = [
    { value: '', label: 'All Conditions' },
    { value: 'WELLNESS_CHECK', label: 'Wellness Check' },
    { value: 'HYPERTENSION', label: 'Hypertension' },
    { value: 'PHYSIOTHERAPY', label: 'Physiotherapy' },
    { value: 'POST_OP_RECOV', label: 'Post-Op Recovery' },
  ];
  const STATUSES = [
    { value: '', label: 'All Status' },
    { value: 'STABLE', label: 'Stable' },
    { value: 'OBSERVATION', label: 'Observation' },
    { value: 'CRITICAL', label: 'Critical' },
  ];

  return (
    <div className="bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* ── Sidebar ── */}
      <nav className="fixed left-0 top-0 h-full flex flex-col py-8 w-64 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-3xl z-50 border-r border-slate-200/50">
        <div className="px-6 mb-12">
          <h1 className="text-xl font-bold tracking-tight text-blue-900 dark:text-blue-200 font-headline">The Clinical Editorial</h1>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">Smart Clinic Admin</p>
        </div>
        <div className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-200/50 transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/appointments" className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-200/50 transition-colors">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-sm font-medium">Appointments</span>
          </Link>
          <Link href="/patients" className="flex items-center gap-3 px-4 py-3 rounded-full text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-600 bg-slate-200/50 transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            <span className="text-sm font-medium">Patient CRM</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-200/50 transition-colors">
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

      {/* ── Main Canvas ── */}
      <main className="ml-64 min-h-screen">
        <div className="flex h-screen overflow-hidden pt-0">

          {/* ── Left: Patient List ── */}
          <div className={`flex flex-col ${selectedPatient ? 'w-[55%]' : 'w-full'} transition-all duration-300 overflow-hidden border-r border-slate-200/50`}>
            {/* Header */}
            <div className="px-8 pt-10 pb-6 border-b border-slate-100 bg-white/60 backdrop-blur-sm">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-extrabold font-headline text-slate-900 tracking-tight">Patient Directory</h1>
                  <p className="text-slate-500 mt-1 text-sm font-medium">
                    {isLoading ? 'Loading...' : `${patients.length} patient${patients.length !== 1 ? 's' : ''} found`}
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">search</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email..."
                  className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => setConditionFilter(conditionFilter === c.value && c.value !== '' ? '' : c.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${conditionFilter === c.value ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {c.label}
                  </button>
                ))}
                <div className="w-px bg-slate-200 mx-1" />
                {STATUSES.filter(s => s.value !== '').map(s => (
                  <button
                    key={s.value}
                    onClick={() => setStatusFilter(statusFilter === s.value ? '' : s.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      statusFilter === s.value
                        ? s.value === 'STABLE' ? 'bg-green-600 text-white' : s.value === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-yellow-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Patient Cards */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm">{error}</div>
              )}

              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-40" />
                        <div className="h-3 bg-slate-200 rounded w-56" />
                      </div>
                    </div>
                  </div>
                ))
              ) : patients.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                  <span className="material-symbols-outlined text-6xl mb-4">person_search</span>
                  <p className="font-semibold text-lg">No patients found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                patients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => handleSelectPatient(patient)}
                    className={`w-full text-left bg-white rounded-2xl p-5 border-2 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                      selectedPatient?.id === patient.id ? 'border-blue-500 shadow-blue-100 shadow-lg' : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${getAvatarColor(patient.id)}`}>
                        {patient.image
                          ? <img src={patient.image} alt="" className="w-full h-full object-cover rounded-2xl" />
                          : getInitials(patient.user)
                        }
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-bold text-slate-900 truncate">{getFullName(patient.user)}</p>
                            <p className="text-xs text-slate-500 truncate">{patient.user.email}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex-shrink-0 ${getStatusStyle(patient.status)}`}>
                            {patient.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                          {patient.condition && (
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getConditionStyle(patient.condition)}`}>
                              {getConditionLabel(patient.condition)}
                            </span>
                          )}
                          {patient.gender && (
                            <span className="text-[10px] text-slate-400 font-medium">· {patient.gender}</span>
                          )}
                          {patient.bloodType && (
                            <span className="text-[10px] text-slate-400 font-medium">· {patient.bloodType}</span>
                          )}
                        </div>

                        {patient.lastAppointment && (
                          <p className="text-xs text-slate-400 mt-2">
                            Last visit: <span className="font-medium text-slate-600">{patient.lastAppointment.date}</span>
                            {' — '}{patient.lastAppointment.doctor?.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ── Right: Patient Detail Drawer ── */}
          {selectedPatient && (
            <div className="w-[45%] flex flex-col bg-white overflow-hidden" style={{ animation: 'slideIn 0.25s ease-out' }}>
              {/* Drawer Header */}
              <div className="relative px-8 pt-10 pb-6 bg-gradient-to-br from-blue-700 to-blue-500 text-white">
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-white text-xl">close</span>
                </button>

                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white font-bold text-2xl mb-4 ${getAvatarColor(selectedPatient.id)} ring-4 ring-white/30`}>
                  {selectedPatient.image
                    ? <img src={selectedPatient.image} alt="" className="w-full h-full object-cover rounded-3xl" />
                    : getInitials(selectedPatient.user)
                  }
                </div>

                <h2 className="text-2xl font-extrabold font-headline">{getFullName(selectedPatient.user)}</h2>
                <p className="text-blue-100 text-sm mt-1">{selectedPatient.user.email}</p>

                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${getStatusStyle(selectedPatient.status)}`}>
                    {selectedPatient.status}
                  </span>
                  {selectedPatient.condition && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getConditionStyle(selectedPatient.condition)}`}>
                      {getConditionLabel(selectedPatient.condition)}
                    </span>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-100">
                {(['overview', 'appointments', 'documents'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab === 'overview' ? 'Overview' : tab === 'appointments' ? `Visits (${selectedPatient.appointmentCount ?? 0})` : `Docs (${selectedPatient.documentCount ?? 0})`}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {isDetailLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <>
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <div className="px-8 py-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: 'Gender', value: selectedPatient.gender || 'N/A', icon: 'wc' },
                            { label: 'Blood Type', value: selectedPatient.bloodType || 'N/A', icon: 'bloodtype' },
                            { label: 'Birthday', value: selectedPatient.birthday ? new Date(selectedPatient.birthday).toLocaleDateString() : 'N/A', icon: 'cake' },
                            { label: 'Member Since', value: new Date(selectedPatient.createdAt).toLocaleDateString(), icon: 'schedule' },
                          ].map((item) => (
                            <div key={item.label} className="bg-slate-50 rounded-2xl p-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-slate-400 text-sm">{item.icon}</span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.label}</span>
                              </div>
                              <p className="font-bold text-slate-900 text-sm">{item.value}</p>
                            </div>
                          ))}
                        </div>

                        {selectedPatient.address && (
                          <div className="bg-slate-50 rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="material-symbols-outlined text-slate-400 text-sm">location_on</span>
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Address</span>
                            </div>
                            <p className="font-medium text-slate-700 text-sm">{selectedPatient.address}</p>
                          </div>
                        )}

                        {selectedPatient.medicalHistory && (
                          <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Medical History</h3>
                            <div className="bg-blue-50 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed border-l-4 border-blue-400">
                              {selectedPatient.medicalHistory}
                            </div>
                          </div>
                        )}

                        {selectedPatient.allergies && (
                          <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Allergies</h3>
                            <div className="bg-red-50 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed border-l-4 border-red-400">
                              {selectedPatient.allergies}
                            </div>
                          </div>
                        )}

                        {!selectedPatient.medicalHistory && !selectedPatient.allergies && (
                          <div className="text-center py-8 text-slate-400">
                            <span className="material-symbols-outlined text-4xl mb-2">medical_information</span>
                            <p className="text-sm">No medical notes on file</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Appointments Tab */}
                    {activeTab === 'appointments' && (
                      <div className="px-8 py-6 space-y-3">
                        {!selectedPatient.appointments || selectedPatient.appointments.length === 0 ? (
                          <div className="text-center py-12 text-slate-400">
                            <span className="material-symbols-outlined text-5xl mb-3">calendar_today</span>
                            <p className="text-sm font-medium">No appointment history</p>
                          </div>
                        ) : (
                          selectedPatient.appointments.map((appt) => (
                            <div key={appt.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-bold text-slate-900 text-sm">{appt.serviceType?.title || 'Appointment'}</p>
                                  <p className="text-xs text-slate-500 mt-0.5">{appt.doctor?.name} · {appt.doctor?.specialty}</p>
                                  <p className="text-xs text-slate-400 mt-1">{appt.date} at {appt.timeSlot}</p>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getApptStatusStyle(appt.status)}`}>
                                  {appt.status}
                                </span>
                              </div>
                              {appt.reason && (
                                <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200">{appt.reason}</p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* Documents Tab */}
                    {activeTab === 'documents' && (
                      <div className="px-8 py-6 space-y-3">
                        {!selectedPatient.documents || selectedPatient.documents.length === 0 ? (
                          <div className="text-center py-12 text-slate-400">
                            <span className="material-symbols-outlined text-5xl mb-3">folder_open</span>
                            <p className="text-sm font-medium">No documents on file</p>
                          </div>
                        ) : (
                          selectedPatient.documents.map((doc) => (
                            <a
                              key={doc.id}
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                            >
                              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-blue-600 text-lg">description</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-slate-900 truncate">{doc.fileName}</p>
                                <p className="text-xs text-slate-500">{doc.fileType} · {new Date(doc.createdAt).toLocaleDateString()}</p>
                              </div>
                              <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600 transition-colors">open_in_new</span>
                            </a>
                          ))
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
