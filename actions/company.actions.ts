'use server';

import { RolesEnum } from '@/config/enum';
import {
  CREATE_RESOURCE_ERROR,
  RESOURCE_NOT_FOUND_ERROR,
  TEAM_EXISTS_ERROR,
  UNHANDLED_ERROR,
  UPDATE_RESOURCE_ERROR,
} from '@/config/errors';
import { accounts } from '@/libs/backend/accounts';
import { databases } from '@/libs/backend/databases';
import { teams } from '@/libs/backend/teams';
import { users } from '@/libs/backend/users';
import { mapDocument } from '@/libs/mapper';
import {
  IActionResponse,
  ICreateCompanyResponse,
  IGetCompanyResponse,
} from '@/types/actions';
import { ICompany, ICompanyModel, IUser, IUserModel } from '@/types/appwrite';
import { ICreateCompanyParams } from '@/types/forms';
import { ID, Query } from 'node-appwrite';

const {
  APPWRITE_DATABASE_ID: databaseId,
  APPWRITE_COMPANIES_ID: companiesId,
  APPWRITE_USERS_ID: usersId,
} = process.env;

const saveCompanyAction = async (
  params: ICreateCompanyParams,
): Promise<IActionResponse<ICreateCompanyResponse>> => {
  try {
    const account = await accounts.getAccount();

    const teamExists = await users.findTeam([Query.equal('name', params.name)]);

    if (teamExists !== null && teamExists?.total > 0) {
      return {
        data: null,
        response: {
          ...TEAM_EXISTS_ERROR,
          message: 'Ya existe una compañia con ese nombre',
        },
      };
    }

    const team = await teams.createTeam(ID.unique(), params.name, [
      RolesEnum.owner,
    ]);

    const companyModel = await databases.createDocument<ICompanyModel>(
      databaseId!,
      companiesId!,
      team?.$id,
      {
        mission: params.mission,
        vision: params.vision,
        objetives: params.objetives,
        description: params.description,
        name: params.name,
      },
    );

    const user = {
      name: account.name,
      email: account.email,
      companyId: companyModel.$id,
      companyName: companyModel.name,
      teamId: team.$id,
      teamName: team.name,
      avatar: account.prefs?.avatar,
    };

    const userModel = await databases.createDocument<IUserModel>(
      databaseId!,
      usersId!,
      account.$id,
      user,
    );

    return {
      data: {
        company: mapDocument<ICompany>(companyModel),
        user: mapDocument<IUser>(userModel),
      },
    };
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

    const id = team.teams[0].$id;
    const updatedCompany = { ...params };

    const company = await databases.updateDocument<ICompanyModel>(
      databaseId!,
      companiesId!,
      id,
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
