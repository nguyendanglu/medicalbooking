import { NextResponse } from 'next/server';

let failedLoginAttempts: Record<string, { count: number; lockedUntil: number | null }> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Rate limiting / Lockout check (Task 2.5)
    const attemptInfo = failedLoginAttempts[email] || { count: 0, lockedUntil: null };
    if (attemptInfo.lockedUntil && attemptInfo.lockedUntil > Date.now()) {
      return NextResponse.json({ error: 'Account locked' }, { status: 429 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';
    
    // Call the NestJS backend
    const res = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Increment attempts
        attemptInfo.count += 1;
        if (attemptInfo.count >= 5) {
          attemptInfo.lockedUntil = Date.now() + 10 * 60 * 1000; // 10 minutes
        }
        failedLoginAttempts[email] = attemptInfo;
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: res.status });
    }

    const data = await res.json();
    
    // Clear locked attempts on successful login
    if (failedLoginAttempts[email]) {
      delete failedLoginAttempts[email];
    }

    // Set secure cookie (Task 2.3)
    const response = NextResponse.json({ success: true, user: data.user });
    
    response.cookies.set({
      name: 'admin_session',
      value: data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 10 * 60 * 60, // 10 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
