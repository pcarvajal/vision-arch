import { IAccountModel, IUser } from '@/types/appwrite';

interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
}

type WithAppwriteMeta<T> = T & AppwriteDocument;

export const mapDocument = <T>(doc: WithAppwriteMeta<T>): T => {
  const { $id, $createdAt, $updatedAt, ...data } = doc;
  return {
    id: $id,
    createdAt: $createdAt,
    updatedAt: $updatedAt,
    ...data,
  } as T;
};

export const mapAccountToUser = (
  account: WithAppwriteMeta<IAccountModel>,
): IUser => {
  return {
    id: account.$id,
    name: account.name,
    email: account.email,
    companyId: account.prefs.companyId,
    companyName: account.prefs.companyName,
    teamId: account.prefs.teamId,
    teamName: account.prefs.teamName,
    avatar: account.prefs.avatar,
  };
};
