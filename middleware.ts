import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { accounts } from './libs/backend/accounts';
import { routes } from './config/routes';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === routes.public.login) {
    return NextResponse.next();
  }

  const protectedRoutes = [`/`, `/company`, `/artifacts`];
  const publicRoutes = [`/login`, `/register`];
  const isProtectedRoute = protectedRoutes.find((route) => pathname.includes(route));
  const isPublicRoute = publicRoutes.find((route) => pathname.includes(route));

  if (isProtectedRoute) {
    try {
      await accounts.getAccount();
      return NextResponse.next();
    } catch (error: any) {
      await accounts.signOut();
      return NextResponse.redirect(new URL(routes.public.login, request.nextUrl.origin));
    }
  }

  if (isPublicRoute) {
    try {
      await accounts.getAccount();
      return NextResponse.redirect(new URL(routes.protected.index, request.nextUrl.origin));
    } catch (error: any) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/company', '/login', '/register', '/artifacts'],
};
