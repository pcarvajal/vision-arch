'use server';

import { routes } from '@/config/routes';
import { accounts } from '@/libs/backend/accounts';
import { databases } from '@/libs/backend/databases';
import { teams } from '@/libs/backend/teams';
import { Artifact, ArtifactTypes } from '@/types/types';
import { redirect } from 'next/navigation';
import { ID } from 'node-appwrite';

const { APPWRITE_DATABASE_ID: databaseId, APPWRITE_ARTIFACTS_ID: artifactsId } =
  process.env;

const saveArtifactAction = async (params: CreateArtifactParams) => {
  try {
    const account = await accounts.getAccount();
    const team = await teams.getCurrentAccountTeams();

    if (team?.total === 0 || !team?.teams || !team?.teams[0]) {
      return { message: 'No tiene asignado un team', type: 'error' };
    }

    const newArtifact = {
      name: params.name,
      description: params.description,
      yearProjection: params.yearProjection,
      type: params.type as ArtifactTypes,
      data: params.data,
      userId: account.$id,
      companyId: team.teams[0].$id,
      createdBy: account.name,
    };

    await databases.createDocument<Artifact>(
      databaseId!,
      artifactsId!,
      ID.unique(),
      { ...newArtifact },
    );
  } catch (error: any) {
    console.error('Error guardando artefacto:', error);
    return { message: error?.message, type: 'error' };
  }
  redirect(routes.protected.index);
};

export { saveArtifactAction };
