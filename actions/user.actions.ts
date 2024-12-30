import { RESOURCE_NOT_FOUND_ERROR, UNHANDLED_ERROR } from '@/config/errors';
import { accounts } from '@/libs/backend/accounts';
import { databases } from '@/libs/backend/databases';
import { parseStringify } from '@/libs/utils';
import { IActionResponse, IGetUserResponse } from '@/types/actions';
import { IUserModel } from '@/types/appwrite';
import { mapDocument } from '../libs/mapper';
import { IUser } from '../types/appwrite';

const { APPWRITE_DATABASE_ID: databaseId, APPWRITE_USERS_ID: usersId } =
  process.env;

const getUserAction = async (): Promise<IActionResponse<IGetUserResponse>> => {
  try {
    const account = await accounts.getAccount();
    const userModel = await databases.getDocument<IUserModel>(
      databaseId!,
      usersId!,
      account.$id,
    );

    if (!userModel) {
      return {
        data: null,
        response: {
          ...RESOURCE_NOT_FOUND_ERROR,
          message: 'No se pudo obtener el usuario',
        },
      };
    }

    return { data: { user: mapDocument<IUser>(userModel) } };
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UNHANDLED_ERROR,
        message: 'No se pudo obtener el usuario',
      },
    };
  }
};

const getUserPreferencesAction = async () => {
  try {
    const account = await accounts.getPreferences();
    return parseStringify(account);
  } catch (error: any) {
    console.error('Error getting user preferences:', error);
    return { message: error?.message, type: 'error' };
  }
};

export { getUserPreferencesAction, getUserAction };
