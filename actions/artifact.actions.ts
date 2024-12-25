'use server';

import {
  RESOURCE_NOT_FOUND_ERROR,
  UNHANDLED_ERROR,
  USER_NOT_TEAM_ERROR,
} from '@/config/errors';
import { routes } from '@/config/routes';
import { accounts } from '@/libs/backend/accounts';
import { databases } from '@/libs/backend/databases';
import { teams } from '@/libs/backend/teams';
import { mapDocument } from '@/libs/mapper';
import {
  IActionResponse,
  IGetArtifactResponse,
  IGetArtifactsResponse,
} from '@/types/actions';
import { IArtifact, IArtifactModel } from '@/types/appwrite';
import { ICreateArtifactParams } from '@/types/forms';
import { redirect } from 'next/navigation';
import { ID, Query } from 'node-appwrite';
import { TArtifactType } from '..';

const { APPWRITE_DATABASE_ID: databaseId, APPWRITE_ARTIFACTS_ID: artifactsId } =
  process.env;

const saveArtifactAction = async (
  params: ICreateArtifactParams,
): Promise<IActionResponse> => {
  try {
    const account = await accounts.getAccount();
    const team = await teams.getCurrentAccountTeams();

    if (team?.total === 0 || !team?.teams || !team?.teams[0]) {
      return { data: null, response: { ...USER_NOT_TEAM_ERROR } };
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

    const id = ID.unique();
    const newArtifact: IArtifact = {
      ...params,
      id: id,
      userId: account.$id,
      companyId: team.teams[0].$id,
      createdBy: account.name,
    };

    await databases.createDocument<IArtifactModel>(
      databaseId!,
      artifactsId!,
      id,
      { ...newArtifact },
    );
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: { ...UNHANDLED_ERROR, message: 'Error guardando el artefacto' },
    };
  }
  redirect(routes.protected.index);
};

const getArtifactsAction = async (
  type: TArtifactType,
): Promise<IActionResponse<IGetArtifactsResponse>> => {
  try {
    const artifacts = await databases.getDocuments<IArtifactModel>(
      databaseId!,
      artifactsId!,
      [Query.equal('type', type), Query.orderAsc('yearProjection')],
    );

    if (artifacts === null) {
      return {
        data: null,
        response: {
          ...RESOURCE_NOT_FOUND_ERROR,
          message: 'No se encuentran artefactos',
        },
      };
    }

    return {
      data: {
        artifacts: artifacts.documents.map((artifact) =>
          mapDocument<IArtifact>(artifact),
        ),
        total: artifacts.total,
      },
    };
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UNHANDLED_ERROR,
        message: 'Ocurrió un error al solicitar los artefactos',
      },
    };
  }
};

const getArtifactAction = async (
  id: string,
): Promise<IActionResponse<IGetArtifactResponse>> => {
  console.log('ID', id);
  try {
    const artifact = await databases.getDocument<IArtifactModel>(
      databaseId!,
      artifactsId!,
      id,
    );

    if (artifact === null) {
      return {
        data: null,
        response: {
          ...RESOURCE_NOT_FOUND_ERROR,
          message: 'No se encontró el artefacto',
        },
      };
    }
    return { data: { artifact: mapDocument<IArtifact>(artifact) } };
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UNHANDLED_ERROR,
        message: 'Ocurrió un error al solicitar el artefacto',
      },
    };
  }
};

const getArtifactByYearProjectionAndType = async (
  yearProjection: number,
  type: TArtifactType,
): Promise<IActionResponse<IGetArtifactResponse>> => {
  try {
    const artifact = await databases.getDocuments<IArtifactModel>(
      databaseId!,
      artifactsId!,
      [
        Query.equal('yearProjection', yearProjection),
        Query.equal('type', type),
      ],
    );

    if (artifact?.total === 0 || artifact === null || artifact.total > 1) {
      return {
        data: null,
        response: {
          ...RESOURCE_NOT_FOUND_ERROR,
          message: 'No se encontró el artefacto',
        },
      };
    }

    return {
      data: { artifact: mapDocument<IArtifact>(artifact.documents[0]) },
    };
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UNHANDLED_ERROR,
        message: 'Ocurrió un error al solicita el artefacto',
      },
    };
  }
};

const updateArtifactAction = async (
  id: string,
  data: string,
): Promise<IActionResponse<IGetArtifactResponse>> => {
  try {
    const artifact = await databases.updateDocument<IArtifactModel>(
      databaseId!,
      artifactsId!,
      id,
      {
        data: data,
      },
    );
    return { data: { artifact: mapDocument<IArtifact>(artifact) } };
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UNHANDLED_ERROR,
        message: 'Ocurrió un error al actualizar el artefacto',
      },
    };
  }
};

const deleteArtifactAction = async (
  id: string,
): Promise<IActionResponse | void> => {
  try {
    await databases.deleteDocument(databaseId!, artifactsId!, id);
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UNHANDLED_ERROR,
        message: 'Ocurrió un error eliminando el artefacto',
      },
    };
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
