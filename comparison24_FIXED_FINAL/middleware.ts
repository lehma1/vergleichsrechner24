import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { verifyToken } from './src/lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isAdminRoute = pathname.startsWith('/admin');
  const isUserRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/profile');

  const payload = token ? verifyToken(token) : null;

  if (isAdminRoute) {
    if (!payload || payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (isUserRoute) {
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (isAuthRoute && payload) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/profile/:path*', '/login', '/register'],
};
