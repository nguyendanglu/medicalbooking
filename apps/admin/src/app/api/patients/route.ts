import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    console.log('[Patients Proxy] Request received');

    if (!token) {
      console.warn('[Patients Proxy] No token found in cookies');
      return NextResponse.json({ error: 'Unauthorized: No session token found' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const backendRoot = process.env.NEXT_PUBLIC_BACKEND_HOME_URL?.replace('localhost', '127.0.0.1') || 'http://127.0.0.1:3000';
    const targetUrl = `${backendRoot}/patients/admin${queryString ? `?${queryString}` : ''}`;

    console.log(`[Patients Proxy] Calling backend: ${targetUrl}`);

    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log(`[Patients Proxy] Backend status: ${res.status}`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[Patients Proxy] Backend error: ${errorText}`);
      return NextResponse.json({ error: errorText || 'Backend error' }, { status: res.status });
    }

    const data = await res.json();
    console.log(`[Patients Proxy] Success: ${data.length} patients`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[Patients Proxy] Fatal error:', error);
    return NextResponse.json({
      error: 'Proxy Error',
      message: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
