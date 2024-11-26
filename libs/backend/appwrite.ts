'use server';
import { cookies } from 'next/headers';
import { Client, Account, Databases, Teams, Storage, Users, Locale } from 'node-appwrite';

const {
  APPWRITE_ENDPOINT: ENDPOINT,
  APPWRITE_PROJECT: PROJECT,
  APPWRITE_KEY: API_KEY,
} = process.env;

// Client
export async function createSessionClient() {
  const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT!);

  const session = cookies().get('session');
  if (!session || !session.value) {
    throw new Error('Sesion de cliente no encontrada, al crear cliente');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get db() {
      return new Databases(client);
    },
    get teams() {
      return new Teams(client);
    },
    get storage() {
      return new Storage(client);
    },
    get locale() {
      return new Locale(client);
    },
  };
}
// Admin
export async function createAdminClient() {
  const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT!).setKey(API_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get db() {
      return new Databases(client);
    },
    get users() {
      return new Users(client);
    },
    get client() {
      return client;
    },
    get teams() {
      return new Teams(client);
    },
  };
}
// Project
export async function createClient() {
  return new Client().setEndpoint(ENDPOINT!).setProject(PROJECT!);
}
