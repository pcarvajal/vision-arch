import { routes } from '@/config/routes';
import { createClient } from '@/libs/backend/appwrite';
import { NextRequest, NextResponse } from 'next/server';
import { Account } from 'node-appwrite';

export async function GET(request: NextRequest) {
  const client = await createClient();

  const { searchParams } = new URL(request.url);

  const redirectTo = new URL(request.nextUrl.origin);

  try {
    const userId = searchParams.get('userId') as string;
    const secret = searchParams.get('secret') as string;

    const account = new Account(client);

    const verification = await account.updateVerification(userId, secret);

    if (!verification) {
      redirectTo.searchParams.set('verify-user', 'error');
      redirectTo.pathname = routes.public.login;
      return NextResponse.redirect(redirectTo);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error?.message);
    redirectTo.searchParams.set('verify-user', 'error');
    redirectTo.pathname = routes.public.login;
    return NextResponse.redirect(redirectTo);
  }
  redirectTo.searchParams.set('verify-user', 'success');
  redirectTo.pathname = routes.public.login;
  return NextResponse.redirect(redirectTo);
}
