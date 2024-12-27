'use server';

import {
  DELETE_RESOURCE_ERROR,
  RESOURCE_NOT_FOUND_ERROR,
  UNHANDLED_ERROR,
  USER_EXISTS_ERROR,
} from '@/config/errors';
import { routes } from '@/config/routes';
import { accounts } from '@/libs/backend/accounts';
import { cookies } from '@/libs/backend/cookies';
import { databases } from '@/libs/backend/databases';
import { project } from '@/libs/backend/project';
import { teams } from '@/libs/backend/teams';
import { users } from '@/libs/backend/users';
import { mapDocument } from '@/libs/mapper';
import { IActionResponse, ILoginActionResponse } from '@/types/actions';
import { ICompany, ICompanyModel, IUser, IUserModel } from '@/types/appwrite';
import {
  IForgotPasswordParams,
  ILoginParams,
  IRegisterParams,
  IResetPasswordParams,
} from '@/types/forms';
import { redirect } from 'next/navigation';
import { ID } from 'node-appwrite';
import { IAccountModel } from '../types/appwrite';

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
}: IRegisterParams): Promise<IActionResponse> => {
  try {
    const search = await users.listUsers('email', email);

    if (search !== null && search?.total > 0) {
      return { data: null, ...USER_EXISTS_ERROR };
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
    return { data: null, ...UNHANDLED_ERROR };
  }
  redirect(`${routes.public.register}/?success=true`);
};

const loginAction = async ({
  email,
  password,
}: ILoginParams): Promise<IActionResponse<ILoginActionResponse>> => {
  try {
    const { secret, expire } = await users.createSession(email, password);
    await cookies.setCookie(secret, expire);

    const accountModel: IAccountModel = await accounts.getAccount();
    const team = await teams.getCurrentAccountTeams();

    if (team?.total === 0 || !team?.teams || !team?.teams[0]) {
      try {
        await databases.deleteDocument(databaseId!, usersId!, accountModel.$id);
      } catch (error: any) {
        console.error({ ...DELETE_RESOURCE_ERROR, error });
      }

      return { data: { account: accountModel, user: null, company: null } };
    }

    let user = null;
    const userModel = await databases.getDocument<IUserModel>(
      databaseId!,
      usersId!,
      accountModel.$id,
    );

    if (userModel) {
      user = mapDocument<IUser>(userModel);
    }

    const companyModel = await databases.getDocument<ICompanyModel>(
      databaseId!,
      companiesId!,
      team.teams[0].$id,
    );

    if (companyModel === null) {
      return {
        data: null,
        response: {
          ...RESOURCE_NOT_FOUND_ERROR,
          message: 'No se encontró la compañia.',
        },
      };
    }

    const company = mapDocument<ICompany>(companyModel);
    return { data: { user, company, account: accountModel } };
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UNHANDLED_ERROR,
        message: 'Ocurrió un error al intentar ingresar',
      },
    };
  }
};

const forgotPasswordAction = async ({
  email,
}: IForgotPasswordParams): Promise<IActionResponse> => {
  try {
    const url = `${baseUrl}/reset-password`;
    await users.createPasswordRecovery(email, url);
  } catch (error: any) {
    console.error(error);
    return { data: null, ...UNHANDLED_ERROR };
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
}: IResetPasswordParams) => {
  try {
    if (!userId || !secret) return { message: 'link inválido o expirado' };
    await users.confirmPasswordRecovery(userId, secret, password);
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UNHANDLED_ERROR,
        message: 'Ocurrió un error al intentar cambiar la contraseña',
      },
    };
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
