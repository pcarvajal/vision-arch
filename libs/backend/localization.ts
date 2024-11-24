import { createSessionClient } from '@/libs/backend/appwrite';

export const localization = {
  getUserLocale: async () => {
    try {
      const { locale } = await createSessionClient();
      return await locale.get();
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
  listCountries: async () => {
    try {
      const { locale } = await createSessionClient();
      return await locale.listCountries();
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
};
