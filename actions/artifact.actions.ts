'use server';

import { routes } from '@/config/routes';
import { accounts } from '@/libs/backend/accounts';
import { databases } from '@/libs/backend/databases';
import { teams } from '@/libs/backend/teams';
import { parseStringify } from '@/libs/utils';
import { IArtifact, IArtifactModel } from '@/types/appwrite';
import { ICreateArtifactParams } from '@/types/forms';
import { redirect } from 'next/navigation';
import { ID, Query } from 'node-appwrite';
import { TArtifactType } from '..';

const { APPWRITE_DATABASE_ID: databaseId, APPWRITE_ARTIFACTS_ID: artifactsId } =
  process.env;

const saveArtifactAction = async (params: ICreateArtifactParams) => {
  try {
    const account = await accounts.getAccount();
    const team = await teams.getCurrentAccountTeams();

    if (team?.total === 0 || !team?.teams || !team?.teams[0]) {
      return { message: 'No tiene asignado un team', type: 'error' };
    }

    const artifacts = await databases.getDocuments<IArtifactModel>(
      databaseId!,
      artifactsId!,
      [
        Query.equal('type', params.type),
        Query.equal('yearProjection', params.yearProjection),
      ],
    );

    if (artifacts && artifacts?.documents?.length > 0) {
      await databases.deleteDocument(
        databaseId!,
        artifactsId!,
        artifacts.documents[0].$id,
      );
    }

    const newArtifact: IArtifact = {
      ...params,
      userId: account.$id,
      companyId: team.teams[0].$id,
      createdBy: account.name,
    };

    await databases.createDocument<IArtifactModel>(
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

const getArtifactsAction = async (type: TArtifactType) => {
  try {
    const artifacts = await databases.getDocuments<IArtifactModel>(
      databaseId!,
      artifactsId!,
      [Query.equal('type', type), Query.orderAsc('yearProjection')],
    );

    if (artifacts === null) {
      return { message: 'No se encuentran artefactos creados', type: 'error' };
    }

    return parseStringify(artifacts.documents);
  } catch (error: any) {
    console.error('Error obteniendo artefactos:', error);
    return { message: error?.message, type: 'error' };
  }
};

const getArtifactAction = async (id: string) => {
  try {
    const artifact = await databases.getDocument<IArtifactModel>(
      databaseId!,
      artifactsId!,
      id,
    );

    if (artifact === null) {
      return { message: 'No se encuentra el artefacto', type: 'error' };
    }
    return parseStringify(artifact);
  } catch (error: any) {
    console.error('Error obteniendo artefacto:', error);
    return { message: error?.message, type: 'error' };
  }
};

const getArtifactByYearProjectionAndType = async (
  yearProjection: number,
  type: TArtifactType,
) => {
  try {
    const artifact = await databases.getDocuments<IArtifactModel>(
      databaseId!,
      artifactsId!,
      [
        Query.equal('yearProjection', yearProjection),
        Query.equal('type', type),
      ],
    );
    return parseStringify(artifact?.documents);
  } catch (error: any) {
    console.error('Error obteniendo artefacto por año de proyección:', error);
    return { message: error?.message, type: 'error' };
  }
};

const updateArtifactAction = async (id: string, data: string) => {
  try {
    await databases.updateDocument<IArtifactModel>(
      databaseId!,
      artifactsId!,
      id,
      {
        data: data,
      },
    );
  } catch (error: any) {
    console.error('Error actualizando artefacto:', error);
    return { message: error?.message, type: 'error' };
  }
};

const deleteArtifactAction = async (id: string) => {
  try {
    await databases.deleteDocument(databaseId!, artifactsId!, id);
  } catch (error: any) {
    console.error('Error eliminando artefacto:', error);
    return { message: error?.message, type: 'error' };
  }
};

export {
  saveArtifactAction,
  getArtifactsAction,
  getArtifactAction,
  updateArtifactAction,
  deleteArtifactAction,
  getArtifactByYearProjectionAndType,
};
