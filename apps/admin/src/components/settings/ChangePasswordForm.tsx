'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// ─── Zod schema (task 3.2) ────────────────────────────────────────────────────
const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/\d/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function calcStrength(password: string): { score: number; label: string; hint: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@#$!%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;

  const labels = ['', 'Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const hints = [
    '',
    'Try adding uppercase letters',
    'Try adding numbers',
    'Add a symbol for "Strong"',
    'Great password!',
    'Excellent password!',
  ];
  return { score, label: labels[score] || '', hint: hints[score] || '' };
}

const strengthColors = [
  '',
  'bg-error',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-emerald-600',
];

// ─── Secure input field with show/hide toggle (task 3.4) ──────────────────────
interface PasswordFieldProps {
  id: string;
  label: string;
  icon: string;
  placeholder: string;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm<ChangePasswordFormValues>>['register']>;
  showStrength?: boolean;
  currentValue?: string;
}

function PasswordField({
  id,
  label,
  icon,
  placeholder,
  error,
  registration,
  showStrength,
  currentValue = '',
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const strength = showStrength ? calcStrength(currentValue) : null;

  return (
    <div className="group">
      <label htmlFor={id} className="block text-xs font-semibold text-secondary mb-2 ml-1">
        {label}
      </label>
      <div className="relative mb-1">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl select-none">
          {icon}
        </span>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full pl-12 pr-12 py-4 bg-surface-container-low border rounded-lg transition-all text-on-surface placeholder:text-outline-variant outline-none focus:ring-2 focus:bg-white ${
            error
              ? 'border-error focus:ring-error/30'
              : 'border-transparent focus:ring-primary/30'
          }`}
          {...registration}
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-xl">
            {visible ? 'visibility_off' : 'visibility'}
          </span>
        </button>
      </div>

      {/* Strength meter (task 3.3) */}
      {showStrength && currentValue.length > 0 && strength && (
        <div className="px-1 mt-2 mb-1">
          <div className="flex gap-1 h-1.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-full h-full transition-all ${
                  i < strength.score ? strengthColors[strength.score] : 'bg-outline-variant/30'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">
              {strength.label}
            </span>
            <span className="text-[10px] text-on-surface-variant font-medium">{strength.hint}</span>
          </div>
        </div>
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-error mt-1.5 ml-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Toast component (task 4.2) ────────────────────────────────────────────────
type ToastType = 'success' | 'error' | null;
interface ToastProps { type: ToastType; message: string }

function Toast({ type, message }: ToastProps) {
  if (!type) return null;
  const isSuccess = type === 'success';
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-semibold shadow-lg border ${
        isSuccess
          ? 'bg-green-50 text-green-800 border-green-200'
          : 'bg-error-container text-on-error-container border-error/20'
      }`}
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        {isSuccess ? 'check_circle' : 'error'}
      </span>
      {message}
    </div>
  );
}

// ─── Security requirements checklist (task 3.3) ───────────────────────────────
interface Requirement { label: string; met: boolean }

function RequirementsList({ password }: { password: string }) {
  const requirements: Requirement[] = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One numeric character', met: /\d/.test(password) },
    { label: 'One special symbol (@, #, $)', met: /[@#$!%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
  ];

  return (
    <div className="bg-surface-container-low/50 rounded-xl p-6 border border-outline-variant/15">
      <h4 className="text-[11px] font-bold text-on-surface uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">shield</span>
        Security Requirements
      </h4>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {requirements.map((req) => (
          <li key={req.label} className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span
              className={`material-symbols-outlined text-sm transition-colors ${
                req.met ? 'text-green-600' : 'text-outline-variant'
              }`}
              style={req.met ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {req.met ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main form component (task 3.1) ───────────────────────────────────────────
export default function ChangePasswordForm() {
  const router = useRouter();
  const [toast, setToast] = useState<{ type: ToastType; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const newPasswordValue = watch('newPassword', '');

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: null, message: '' }), 5000);
  };

  // Task 4.1: Connect form to API; Task 4.3: Security logout on success
  const onSubmit = async (data: ChangePasswordFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        showToast('error', json.error || 'Failed to update password.');
        return;
      }

      // Task 4.3: Security logout — clear session then redirect to /login
      showToast('success', 'Password updated successfully! Signing you out...');
      reset();

      setTimeout(async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
      }, 1500);
    } catch {
      showToast('error', 'A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Toast notifications (task 4.2) */}
      {toast.type && <Toast type={toast.type} message={toast.message} />}

      {/* Field group */}
      <div className="space-y-6">
        <PasswordField
          id="currentPassword"
          label="Current Password"
          icon="lock"
          placeholder="••••••••••••"
          error={errors.currentPassword?.message}
          registration={register('currentPassword')}
        />

        <PasswordField
          id="newPassword"
          label="New Password"
          icon="lock_reset"
          placeholder="Min. 8 characters"
          error={errors.newPassword?.message}
          registration={register('newPassword')}
          showStrength
          currentValue={newPasswordValue}
        />

        <PasswordField
          id="confirmPassword"
          label="Confirm New Password"
          icon="verified_user"
          placeholder="Re-type new password"
          error={errors.confirmPassword?.message}
          registration={register('confirmPassword')}
        />
      </div>

      {/* Live security requirements checklist */}
      <RequirementsList password={newPasswordValue} />

      {/* Actions */}
      <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
        <button
          type="submit"
          id="btn-update-password"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-full text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined text-base animate-spin">autorenew</span>
              Updating…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">lock_reset</span>
              Update Password
            </>
          )}
        </button>
        <button
          type="button"
          id="btn-cancel-change-password"
          onClick={() => router.back()}
          className="w-full md:w-auto px-8 py-4 bg-surface-container-high text-primary font-bold rounded-full text-sm hover:bg-surface-container-highest transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
