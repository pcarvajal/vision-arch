// Appwrite Types

import { Models } from 'node-appwrite';

export interface Account extends Models.User<Models.Preferences> {}

export interface User extends Models.Document {
  id: string | undefined;
  name: string;
  email: string;
  companyId: string;
  companyName: string;
  teamId: string;
  teamName: string;
  avatar: string | undefined;
}

export interface Company extends Models.Document {
  id: string | undefined;
  name: string;
  description: string;
  mission: string;
  vision: string;
  objetives: string;
}
