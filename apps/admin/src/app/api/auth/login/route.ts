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

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_HOME_URL || 'http://127.0.0.1:3000';
    console.log(`Attempting login at: ${backendUrl}/auth/login for ${email}`);

    // Call the NestJS backend
    const res = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).catch(err => {
      console.error('Fetch to backend failed:', err);
      throw new Error(`Connection to backend failed: ${err.message}`);
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Backend returned ${res.status}: ${errorText}`);
      if (res.status === 401) {
        attemptInfo.count += 1;
        if (attemptInfo.count >= 5) {
          attemptInfo.lockedUntil = Date.now() + 10 * 60 * 1000;
        }
        failedLoginAttempts[email] = attemptInfo;
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: res.status });
    }

    const data = await res.json();
    console.log('Login successful, received data for user:', data.user?.email);
    
    if (failedLoginAttempts[email]) {
      delete failedLoginAttempts[email];
    }

    const response = NextResponse.json({ success: true, user: data.user });
    
    response.cookies.set({
      name: 'admin_session',
      value: data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 10 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error('CRITICAL API ERROR:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal Server Error',
      details: error.stack 
    }, { status: 500 });
  }
}

