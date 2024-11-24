import { createSessionClient } from '@/libs/backend/appwrite';

export const teams = {
  getCurrentAccountTeams: async () => {
    try {
      const { teams } = await createSessionClient();
      return await teams.list();
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
  createTeam: async (id: string, name: string, roles?: string[]) => {
    try {
      const { teams } = await createSessionClient();
      return teams.create(id, name, roles);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear el equipo');
    }
  },
  deleteTeam: async (teamId: string) => {
    try {
      const { teams } = await createSessionClient();
      return await teams.delete(teamId);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al eliminar el equipo');
    }
  },
  updateMembershipStatus: async (
    teamId: string,
    membershipId: string,
    userId: string,
    secret: string,
  ) => {
    try {
      const { teams } = await createSessionClient();
      return await teams.updateMembershipStatus(teamId, membershipId, userId, secret);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar el estado de la membresía');
    }
  },
  getTeamsByFilter: async (query: string[]) => {
    try {
      const { teams } = await createSessionClient();
      return teams.list(query);
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
  getTeamMemberships: async (teamId: string, query: string[]) => {
    try {
      const { teams } = await createSessionClient();
      return teams.listMemberships(teamId, query);
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
  getTeamMembership: async (teamId: string, membershipId: string) => {
    try {
      const { teams } = await createSessionClient();
      return teams.getMembership(teamId, membershipId);
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
  createTeamMembership: async (
    teamId: string,
    email: string,
    roles: string[],
    url: string,
    name: string,
  ) => {
    try {
      const { teams } = await createSessionClient();
      return teams.createMembership(teamId, roles, email, undefined, undefined, url, name);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear la membresía del equipo');
    }
  },
};
