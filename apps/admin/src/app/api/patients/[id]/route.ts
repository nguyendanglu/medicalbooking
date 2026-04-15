import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    const { id } = await params;

    console.log(`[Patients Detail Proxy] Request for patient ${id}`);

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No session token found' }, { status: 401 });
    }

    const backendRoot = process.env.NEXT_PUBLIC_BACKEND_HOME_URL?.replace('localhost', '127.0.0.1') || 'http://127.0.0.1:3000';
    const targetUrl = `${backendRoot}/patients/admin/${id}`;

    console.log(`[Patients Detail Proxy] Calling backend: ${targetUrl}`);

    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[Patients Detail Proxy] Backend error: ${errorText}`);
      return NextResponse.json({ error: errorText || 'Backend error' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[Patients Detail Proxy] Fatal error:', error);
    return NextResponse.json({
      error: 'Proxy Error',
      message: error.message,
    }, { status: 500 });
  }
}
