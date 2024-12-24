'use server';

import { RolesEnum } from '@/config/enum';
import {
  CREATE_RESOURCE_ERROR,
  RESOURCE_NOT_FOUND_ERROR,
  UNHANDLED_ERROR,
  UPDATE_RESOURCE_ERROR,
} from '@/config/errors';
import { accounts } from '@/libs/backend/accounts';
import { databases } from '@/libs/backend/databases';
import { teams } from '@/libs/backend/teams';
import { mapDocument } from '@/libs/mapper';
import { parseStringify } from '@/libs/utils';
import { IActionResponse, IGetCompanyResponse } from '@/types/actions';
import { ICompany, ICompanyModel, IUserModel } from '@/types/appwrite';
import { ICreateCompanyParams } from '@/types/forms';
import { ID } from 'node-appwrite';

const {
  APPWRITE_DATABASE_ID: databaseId,
  APPWRITE_COMPANIES_ID: companiesId,
  APPWRITE_USERS_ID: usersId,
} = process.env;

const saveCompanyAction = async (
  params: ICreateCompanyParams,
): Promise<IActionResponse<IGetCompanyResponse>> => {
  try {
    const account = await accounts.getAccount();

    const team = await teams.createTeam(ID.unique(), params.name, [
      RolesEnum.owner,
    ]);

    const newCompany: ICompany = params;

    const company = await databases.createDocument<ICompanyModel>(
      databaseId!,
      companiesId!,
      team?.$id,
      { ...newCompany },
    );

    await databases.createDocument<IUserModel>(
      databaseId!,
      usersId!,
      account.$id,
      {
        name: account.name,
        email: account.email,
        companyId: company.$id,
        companyName: company.name,
        teamId: team.$id,
        teamName: team.name,
        avatar: account.prefs?.avatar,
      },
    );

    return { data: { company: mapDocument<ICompany>(company) } };
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...CREATE_RESOURCE_ERROR,
        message: 'No se pudo crear la compañia',
      },
    };
  }
};

const updateCompanyAction = async (
  params: ICreateCompanyParams,
): Promise<IActionResponse<IGetCompanyResponse>> => {
  try {
    const team = await teams.getCurrentAccountTeams();

    if (team?.total === 0 || !team?.teams || !team?.teams[0]) {
      return {
        data: null,
        response: {
          ...RESOURCE_NOT_FOUND_ERROR,
          message: 'No se pudo encontrar un team asignado a la compañia',
        },
      };
    }

    const updatedCompany: ICompany = params;
    const company = await databases.updateDocument<ICompanyModel>(
      databaseId!,
      companiesId!,
      team.teams[0].$id,
      { ...updatedCompany },
    );

    return { data: { company: mapDocument<ICompany>(company) } };
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UPDATE_RESOURCE_ERROR,
        message: 'No se pudo actualizar la compañia',
      },
    };
  }
};

const getCompanyAction = async (
  id: string,
): Promise<IActionResponse<IGetCompanyResponse>> => {
  try {
    const company = await databases.getDocument<ICompanyModel>(
      databaseId!,
      companiesId!,
      id,
    );

    if (!company) {
      return {
        data: null,
        response: {
          ...RESOURCE_NOT_FOUND_ERROR,
          message: 'No se pudo encontrar la compañia',
        },
      };
    }

    return { data: { company: mapDocument<ICompany>(company) } };
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UPDATE_RESOURCE_ERROR,
        message: 'No se pudo encontrar la compañia',
      },
    };
  }
};

export { saveCompanyAction, getCompanyAction, updateCompanyAction };
