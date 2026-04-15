import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value;
  const { pathname } = request.nextUrl;

  // Paths that do not require authentication
  const isPublicPath = pathname.startsWith('/login') || pathname.startsWith('/api/auth');

  if (!token && !isPublicPath) {
    // If there is no token and the path is protected, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    try {
      // Decode JWT payload without verifying signature (since Middleware Edge Runtime can't use crypto directly without jose)
      // The backend /api/auth/login validates the signature.
      const payloadBase64Url = token.split('.')[1];
      const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
      const payload = JSON.parse(payloadJson);

      const role = payload.role;
      const isAdminRole = ['ADMIN', 'DOCTOR', 'STAFF'].includes(role);

      if (!isAdminRole && !isPublicPath) {
        // Redirection for forbidden access (e.g. PATIENT)
        return NextResponse.redirect(new URL('/forbidden', request.url));
      }

      if (isAdminRole && pathname === '/login') {
        // If already logged in, no need to see login page again
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (e) {
      // Invalid token format
      if (!isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
