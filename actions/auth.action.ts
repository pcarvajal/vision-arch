'use server';

import { routes } from '@/config/routes';
import { accounts } from '@/libs/backend/accounts';
import { cookies } from '@/libs/backend/cookies';
import { databases } from '@/libs/backend/databases';
import { project } from '@/libs/backend/project';
import { teams } from '@/libs/backend/teams';
import { users } from '@/libs/backend/users';
import { parseStringify } from '@/libs/utils';
import {
  ForgotPasswordParams,
  LoginParams,
  RegisterParams,
  ResetPasswordParams,
} from '@/types';
import { Company, CompanyModel } from '@/types/types';
import { redirect } from 'next/navigation';
import { ID } from 'node-appwrite';

const { BASE_URL: baseUrl } = process.env;
const {
  APPWRITE_DATABASE_ID: databaseId,
  APPWRITE_COMPANIES_ID: companiesId,
  APPWRITE_USERS_ID: usersId,
} = process.env;

const registerAction = async ({
  email,
  password,
  name,
  companyName,
}: RegisterParams) => {
  try {
    const search = await users.listUsers('email', email);

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

    await accounts.updatePrefs({ companyName });

    await accounts.signOut();
  } catch (error: any) {
    console.error(error);
    return { message: error.message, type: 'error' };
  }
  redirect(`${routes.public.register}/?success=true`);
};

const loginAction = async ({ email, password }: LoginParams) => {
  try {
    const { secret, expire } = await users.createSession(email, password);
    await cookies.setCookie(secret, expire);

    const account = await accounts.getAccount();
    const team = await teams.getCurrentAccountTeams();

    if (team?.total === 0 || !team?.teams || !team?.teams[0]) {
      return parseStringify({ account, company: null });
    }

    const result = await databases.getDocument<CompanyModel>(
      databaseId!,
      companiesId!,
      team.teams[0].$id,
    );

    if (result === null) {
      return { message: 'No se encontró la compañia', type: 'error' };
    }

    const company: Company = { id: result.$id, ...result };

    return parseStringify({ account, company });
  } catch (error: any) {
    console.error(error);
    return { message: error?.message, type: 'error' };
  }
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

const resetPasswordAction = async ({
  password,
  secret,
  userId,
}: ResetPasswordParams) => {
  try {
    if (!userId || !secret) return { message: 'link inválido o expirado' };
    await users.confirmPasswordRecovery(userId, secret, password);
  } catch (error: any) {
    console.error(error);
    return { message: error?.message, type: 'error' };
  }
  redirect(routes.public.login);
};

export {
  registerAction,
  loginAction,
  forgotPasswordAction,
  logoutAction,
  resetPasswordAction,
};
