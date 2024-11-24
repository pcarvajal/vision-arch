import { createAdminClient, createSessionClient } from '@/libs/backend/appwrite';
import { cookies } from './cookies';
import { OAuthProvider } from 'node-appwrite';

export const accounts = {
  getAccount: async () => {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error: any) {
      console.error('getAccount', error);
      throw new Error('Error al obtener la cuenta');
    }
  },
  getSession: async () => {
    try {
      const { account } = await createSessionClient();
      return await account.getSession('current');
    } catch (error: any) {
      console.error('getSession', error);
      return null;
    }
  },
  getPreferences: async () => {
    try {
      const { account } = await createSessionClient();
      return await account.getPrefs();
    } catch (error: any) {
      console.error('getPreferences', error);
      return null;
    }
  },
  createOAuth2Session: async (
    provider: OAuthProvider,
    successUrl?: string,
    failureUrl?: string,
  ) => {
    try {
      const { account } = await createAdminClient();
      return await account.createOAuth2Token(provider, successUrl, failureUrl);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear la sesión OAuth2');
    }
  },
  createAccount: async (accountId: string, email: string, password: string, name: string) => {
    try {
      const { account } = await createSessionClient();
      return await account.create(accountId, email, password, name);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear la cuenta');
    }
  },
  updateName: async (name: string) => {
    try {
      const { account } = await createSessionClient();
      return await account.updateName(name);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar el nombre');
    }
  },
  updatePassword: async (password: string, currentPassword: string) => {
    try {
      const { account } = await createSessionClient();
      return await account.updatePassword(password, currentPassword);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar la contraseña');
    }
  },
  updatePhone: async (phone: string, userId: string) => {
    try {
      const { users } = await createAdminClient();
      return await users.updatePhone(userId, phone);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar el teléfono');
    }
  },
  updatePrefs: async (prefs: Record<string, unknown>) => {
    try {
      const { account } = await createSessionClient();
      return await account.updatePrefs(prefs);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar las preferencias');
    }
  },
  createEmailVerification: async (url: string) => {
    try {
      const { account } = await createSessionClient();
      return await account.createVerification(url);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear la verificación de correo electrónico');
    }
  },
  signOut: async () => {
    try {
      const { account } = await createSessionClient();
      await account.deleteSession('current');
      cookies.deleteCurrentCookie();
    } catch (error) {
      console.error('signOut', error);
    }
  },
};
