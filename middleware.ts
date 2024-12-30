import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routes } from './config/routes';
import { accounts } from './libs/backend/accounts';
import { teams } from './libs/backend/teams';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    `/`,
    `/company`,
    `/artifacts`,
    `/artifacts/goals`,
    `/artifacts/goals/create`,
    `/artifacts/goals/visualize`,
    `/artifacts/goals/edit`,
    '/artifacts/blueprints',
    `/artifacts/blueprints/create`,
    `/artifacts/blueprints/visualize`,
    `/artifacts/blueprints/edit`,
    '/artifacts/csvlod',
    `/artifacts/csvlod/create`,
    `/artifacts/csvlod/visualize`,
    `/artifacts/csvlod/edit`,
  ];
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

    // User is logged in but no have a team, redirect to create company
    if (pathname !== routes.protected.company && isLoggedIn) {
      const team = await teams.getCurrentAccountTeams();
      if (team === null || team?.total === 0) {
        return NextResponse.redirect(
          new URL(routes.protected.company, request.nextUrl.origin),
        );
      }
    }

    return NextResponse.next();
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
    `/artifacts/goals/create`,
    `/artifacts/goals/visualize`,
    `/artifacts/goals/edit`,
    '/artifacts/blueprints',
    `/artifacts/blueprints/create`,
    `/artifacts/blueprints/visualize`,
    `/artifacts/blueprints/edit`,
    '/artifacts/csvlod',
    `/artifacts/csvlod/create`,
    `/artifacts/csvlod/visualize`,
    `/artifacts/csvlod/edit`,
  ],
};
