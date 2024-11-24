'use server';

import { routes } from '@/config/routes';
import { accounts } from '@/libs/backend/accounts';
import { cookies } from '@/libs/backend/cookies';
import { project } from '@/libs/backend/project';
import { users } from '@/libs/backend/users';
import { redirect } from 'next/navigation';
import { ID, Query } from 'node-appwrite';

const { BASE_URL: baseUrl } = process.env;

const registerAction = async ({ email, password, name }: RegisterParams) => {
  try {
    const search = await users.listUsers(email);
    if (search !== null && search?.total > 0) {
      return {
        type: 'error',
        message: 'El usuario ya existe.',
      };
    }

    await project.createAccount(ID.unique(), email, password, name);
    const { secret, expire } = await users.createSession(email, password);
    cookies.setCookie(secret, expire);

    const url = `${baseUrl}/callbacks/auth/verify-user`;
    await accounts.createEmailVerification(url);
    await accounts.signOut();
  } catch (error: any) {
    console.error(error);
    return { message: error.message, type: 'error' };
  }
  redirect(`${routes.public.register}/?success=true`);
};

const loginAction = async ({ email, password }: LoginParams) => {
  try {
    const account = await users.listUsers(email);
    if (account?.total === 0 || account === null) {
      return { message: 'Credenciales inválidas', type: 'error' };
    }

    if (account?.users[0].emailVerification === false) {
      return { message: 'Credenciales inválidas', type: 'error' };
    }
    const { secret, expire } = await users.createSession(email, password);
    cookies.setCookie(secret, expire);
  } catch (error: any) {
    console.error(error);
    return { message: error?.message, type: 'error' };
  }
  redirect(routes.protected.index);
};

const forgotPasswordAction = async ({ email }: ForgotPasswordParams) => {
  try {
    const url = `${baseUrl}/reset-password`;
    await users.createPasswordRecovery(email, url);
  } catch (error: any) {
    console.error(error);
    return { message: error.message, type: 'error' };
  }
  redirect(`${routes.public.forgotPassword}?success=true`);
};

const logoutAction = async () => {
  try {
    await accounts.signOut();
  } catch (error: any) {
    console.error(error);
  }
  redirect(routes.public.login);
};

const resetPasswordAction = async ({ password, secret, userId }: ResetPasswordParams) => {
  try {
    if (!userId || !secret) return { message: 'link inválido o expirado' };
    await users.confirmPasswordRecovery(userId, secret, password);
  } catch (error: any) {
    console.error(error);
    return { message: error?.message, type: 'error' };
  }
  redirect(routes.public.login);
};

export { registerAction, loginAction, forgotPasswordAction, logoutAction, resetPasswordAction };
