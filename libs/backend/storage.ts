import { createSessionClient } from '@/libs/backend/appwrite';

export const storage = {
  createFile: async (bucketId: string, fileId: string, file: File, permissions: string[]) => {
    try {
      const { storage } = await createSessionClient();
      return await storage.createFile(bucketId, fileId, file, permissions);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear el archivo');
    }
  },
  deleteFile: async (bucketId: string, fileId: string) => {
    try {
      const { storage } = await createSessionClient();
      return await storage.deleteFile(bucketId, fileId);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al eliminar el archivo');
    }
  },
  updateFile: async (bucketId: string, fileId: string, name: string, permissions: string[]) => {
    try {
      const { storage } = await createSessionClient();
      return await storage.updateFile(bucketId, fileId, name, permissions);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar el archivo');
    }
  },
};
