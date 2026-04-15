import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_HOME_URL || 'http://127.0.0.1:3000';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    console.log('[Doctors Proxy] Request received');

    if (!token) {
      console.warn('[Doctors Proxy] No token found in cookies');
      return NextResponse.json({ error: 'Unauthorized: No session token found' }, { status: 401 });
    }

    // Use 127.0.0.1 to avoid localhost resolution issues in some environments
    const backendRoot = process.env.NEXT_PUBLIC_BACKEND_HOME_URL?.replace('localhost', '127.0.0.1') || 'http://127.0.0.1:3000';
    const targetUrl = `${backendRoot}/appointments/doctors`;
    
    console.log(`[Doctors Proxy] Calling backend: ${targetUrl}`);

    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log(`[Doctors Proxy] Backend status: ${res.status}`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[Doctors Proxy] Backend error: ${errorText}`);
      return NextResponse.json({ error: errorText || 'Backend error' }, { status: res.status });
    }

    const data = await res.json();
    console.log(`[Doctors Proxy] Success: ${data.length} doctors`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[Doctors Proxy] Fatal error:', error);
    return NextResponse.json({ 
      error: 'Proxy Error', 
      message: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}
