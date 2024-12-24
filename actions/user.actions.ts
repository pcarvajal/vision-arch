import { accounts } from '@/libs/backend/accounts';
import { parseStringify } from '@/libs/utils';

const getUserPreferencesAction = async () => {
  try {
    const account = await accounts.getPreferences();
    return parseStringify(account);
  } catch (error: any) {
    console.error('Error getting user preferences:', error);
    return { message: error?.message, type: 'error' };
  }
};

export { getUserPreferencesAction };
