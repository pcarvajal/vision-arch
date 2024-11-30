import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routes } from './config/routes';
import { accounts } from './libs/backend/accounts';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = [`/`, `/company`, `/artifacts`, `/artifacts/goals`];
  const publicRoutes = [`/login`, `/register`];

  const isProtectedRoute = protectedRoutes.some((route) => pathname === route);
  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  let isLoggedIn = false;

  try {
    await accounts.getAccount();
    isLoggedIn = true;
  } catch (error) {
    isLoggedIn = false;
  }

  if (isProtectedRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(routes.public.login, request.nextUrl.origin),
      );
    }
    return NextResponse.next(); // Permite el acceso si está logueado
  }

  if (isPublicRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(routes.protected.index, request.nextUrl.origin),
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/company',
    '/artifacts',
    '/login',
    '/register',
    '/artifacts/goals',
  ],
};
