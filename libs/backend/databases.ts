import { createSessionClient } from '@/libs/backend/appwrite';
import { Models } from 'node-appwrite';

export const databases = {
  getDocument: async <T extends Models.Document>(
    databaseId: string,
    collectionId: string,
    documentId: string,
  ) => {
    try {
      const { db } = await createSessionClient();
      return db.getDocument<T>(databaseId, collectionId, documentId);
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
  getDocuments: async <T extends Models.Document>(
    databaseId: string,
    collectionId: string,
    query: string[],
  ) => {
    try {
      const { db } = await createSessionClient();
      return db.listDocuments<T>(databaseId, collectionId, query);
    } catch (error: any) {
      console.error(error);
      return null;
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
      const { db } = await createSessionClient();
      return db.createDocument<T>(
        databaseId,
        collectionId,
        documentId,
        data,
        permissions,
      );
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear el documento');
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
      const { db } = await createSessionClient();
      return db.updateDocument<T>(
        databaseId,
        collectionId,
        documentId,
        data,
        permissions,
      );
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar el documento');
    }
  },
  deleteDocument: async (
    databaseId: string,
    collectionId: string,
    documentId: string,
  ) => {
    try {
      const { db } = await createSessionClient();
      return db.deleteDocument(databaseId, collectionId, documentId);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al eliminar el documento');
    }
  },
};
