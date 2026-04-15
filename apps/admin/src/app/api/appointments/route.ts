import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_HOME_URL || 'http://127.0.0.1:3000';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    console.log('[Appointments Proxy] Request received');

    if (!token) {
      console.warn('[Appointments Proxy] No token found in cookies');
      return NextResponse.json({ error: 'Unauthorized: No session token found' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    // Use 127.0.0.1 to avoid localhost resolution issues
    const backendRoot = process.env.NEXT_PUBLIC_BACKEND_HOME_URL?.replace('localhost', '127.0.0.1') || 'http://127.0.0.1:3000';
    const targetUrl = `${backendRoot}/appointments/admin${queryString ? `?${queryString}` : ''}`;
    
    console.log(`[Appointments Proxy] Calling backend: ${targetUrl}`);

    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch (e) {
        const text = await res.text();
        errorData = { error: text || `Backend returned status ${res.status}` };
      }
      return NextResponse.json(errorData, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Appointments API Proxy Error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error in Proxy', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const backendRoot = process.env.NEXT_PUBLIC_BACKEND_HOME_URL?.replace('localhost', '127.0.0.1') || 'http://127.0.0.1:3000';
    const res = await fetch(`${backendRoot}/appointments/${id}/status`, {
      method: 'PATCH',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch (e) {
        const text = await res.text();
        errorData = { error: text || `Backend returned status ${res.status}` };
      }
      return NextResponse.json(errorData, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Appointments API PATCH Proxy Error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error in Proxy (PATCH)', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
