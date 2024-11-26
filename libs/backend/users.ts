import { createAdminClient } from '@/libs/backend/appwrite';
import { Models, Query } from 'node-appwrite';

export const users = {
  listUsers: async (key: string, value: string) => {
    try {
      const { users } = await createAdminClient();
      const list = await users.list(undefined, `?${key}=${value}`);
      return list;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
  createUser: async (id: string, email: string, password: string, name: string) => {
    try {
      const { users } = await createAdminClient();
      return await users.create(id, email, undefined, password, name);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear el usuario');
    }
  },
  getUser: async (userId: string) => {
    try {
      const { users } = await createAdminClient();
      return await users.get(userId);
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
  updateName: async (userId: string, name: string) => {
    try {
      const { users } = await createAdminClient();
      return await users.updateName(userId, name);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar el nombre');
    }
  },
  updatePassword: async (userId: string, password: string) => {
    try {
      const { users } = await createAdminClient();
      return await users.updatePassword(userId, password);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar la contraseña');
    }
  },
  createSession: async (email: string, password: string) => {
    try {
      const { account } = await createAdminClient();
      return await account.createEmailPasswordSession(email, password);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al iniciar sesión');
    }
  },
  createPasswordRecovery: async (email: string, url: string) => {
    try {
      const { account } = await createAdminClient();
      return await account.createRecovery(email, url);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al solicitar la recuperación de contraseña');
    }
  },
  confirmPasswordRecovery: async (userId: string, secret: string, password: string) => {
    try {
      const { account } = await createAdminClient();
      return await account.updateRecovery(userId, secret, password);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al confirmar la recuperación de contraseña');
    }
  },
  findTeam: async (query: string[]) => {
    try {
      const { teams } = await createAdminClient();
      return await teams.list(query);
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
  updateDocument: async <T extends Models.Document>(
    databaseId: string,
    collectionId: string,
    documentId: string,
    data: Omit<T, keyof Models.Document>,
    permissions?: string[],
  ) => {
    try {
      const { db } = await createAdminClient();
      return await db.updateDocument<T>(databaseId, collectionId, documentId, data, permissions);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar el documento');
    }
  },
  createDocument: async <T extends Models.Document>(
    databaseId: string,
    collectionId: string,
    documentId: string,
    data: Omit<T, keyof Models.Document>,
    permissions?: string[],
  ) => {
    try {
      const { db } = await createAdminClient();
      return await db.createDocument<T>(databaseId, collectionId, documentId, data, permissions);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear el documento');
    }
  },
  updatePreferences: async (userId: string, preferences: Record<string, unknown>) => {
    try {
      const { users } = await createAdminClient();
      return await users.updatePrefs(userId, preferences);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar las preferencias');
    }
  },
};
