'use server';

import { RolesEnum } from '@/config/enum';
import { accounts } from '@/libs/backend/accounts';
import { databases } from '@/libs/backend/databases';
import { teams } from '@/libs/backend/teams';
import { parseStringify } from '@/libs/utils';
import { CreateCompanyParams } from '@/types';
import { Company, User } from '@/types/types';
import { ID } from 'node-appwrite';

const {
  APPWRITE_DATABASE_ID: databaseId,
  APPWRITE_COMPANIES_ID: companiesId,
  APPWRITE_USERS_ID: usersId,
} = process.env;

const saveCompanyAction = async (params: CreateCompanyParams) => {
  try {
    const account = await accounts.getAccount();

    const team = await teams.createTeam(ID.unique(), params.name, [
      RolesEnum.OWNER,
    ]);

    const company = await databases.createDocument<Company>(
      databaseId!,
      companiesId!,
      team?.$id,
      { ...params },
    );

    await databases.createDocument<User>(databaseId!, usersId!, account.$id, {
      name: account.name,
      email: account.email,
      companyId: company.$id,
      companyName: company.name,
      teamId: team.$id,
      teamName: team.name,
      avatar: account.prefs?.avatar,
    });

    return parseStringify(company);
  } catch (error: any) {
    console.error('Error saving company data:', error);
    return { message: error?.message, type: 'error' };
  }
};

const updateCompanyAction = async (params: CreateCompanyParams) => {
  try {
    const team = await teams.getCurrentAccountTeams();

    if (team?.total === 0 || !team?.teams || !team?.teams[0]) {
      return { message: 'No tiene asignado un team', type: 'error' };
    }

    const company = await databases.updateDocument<Company>(
      databaseId!,
      companiesId!,
      team.teams[0].$id,
      { ...params },
    );

    return parseStringify(company);
  } catch (error: any) {
    console.error('Error updating company data:', error);
    return { message: error?.message, type: 'error' };
  }
};

const getCompanyAction = async (id: string) => {
  try {
    const company = await databases.getDocument<Company>(
      databaseId!,
      companiesId!,
      id,
    );

    if (!company) {
      return { message: 'Company not found', type: 'error' };
    }

    return parseStringify(company);
  } catch (error: any) {
    console.error('Error getting company data:', error);
    return { message: error?.message, type: 'error' };
  }
};

export { saveCompanyAction, getCompanyAction, updateCompanyAction };
