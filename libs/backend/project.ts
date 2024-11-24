import { createClient } from '@/libs/backend/appwrite';
import { Account } from 'node-appwrite';

export const project = {
  createAccount: async (id: string, email: string, password: string, name: string) => {
    console.log('createAccount', id, email, password, name);
    try {
      const client = await createClient();
      const account = new Account(client);
      return await account.create(id, email, password, name);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear la cuenta');
    }
  },
  createVerificationEmail: async (session: string, url: string) => {
    try {
      const client = await createClient();
      client.setSession(session);
      const account = new Account(client);
      return await account.createVerification(url);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al enviar el correo de verificación');
    }
  },
};
