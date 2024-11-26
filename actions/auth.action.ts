'use server';

import { roles } from '@/config/constants';
import { routes } from '@/config/routes';
import { accounts } from '@/libs/backend/accounts';
import { cookies } from '@/libs/backend/cookies';
import { project } from '@/libs/backend/project';
import { teams } from '@/libs/backend/teams';
import { users } from '@/libs/backend/users';
import { parseStringify } from '@/libs/utils';
import { User } from '@/types/types';
import { redirect } from 'next/navigation';
import { ID, Query } from 'node-appwrite';

const { BASE_URL: baseUrl } = process.env;

const registerAction = async ({ email, password, name, companyName }: RegisterParams) => {
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

    const preferencesParams: UserPreferencesParams = {
      companyName,
      companyId: null,
      teamId: null,
      teamName: null,
    };

    await accounts.updatePrefs({ ...preferencesParams });
    await accounts.signOut();
  } catch (error: any) {
    console.error(error);
    return { message: error.message, type: 'error' };
  }
  redirect(`${routes.public.register}/?success=true`);
};

const loginAction = async ({ email, password }: LoginParams) => {
  try {
    const account = await users.listUsers('email', email);

    if (account?.total === 0 || account === null) {
      return { message: 'Credenciales inválidas', type: 'error' };
    }

    if (account?.users[0].emailVerification === false) {
      return { message: 'Credenciales inválidas', type: 'error' };
    }
    const { secret, expire } = await users.createSession(email, password);
    await cookies.setCookie(secret, expire);

    const preferences = await accounts.getPreferences();

    if (
      preferences?.companyName &&
      !preferences?.teamId &&
      !preferences?.teamName &&
      !preferences?.companyId
    ) {
      const team = await teams.createTeam(ID.unique(), preferences.companyName, [...roles]);

      const preferencesParams: UserPreferencesParams = {
        companyId: null,
        companyName: preferences.companyName,
        teamId: team.$id,
        teamName: team.name,
      };

      await accounts.updatePrefs({ ...preferencesParams });
    }
    const accountData = await accounts.getAccount();
    const preferencesData = await accounts.getPreferences();

    const user: User = {
      id: accountData.$id,
      name: accountData.name,
      email: accountData.email,
      companyId: preferencesData?.companyId,
      companyName: preferencesData?.companyName,
      teamId: preferencesData?.teamId,
      teamName: preferencesData?.teamName,
    };

    return parseStringify(user);
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
