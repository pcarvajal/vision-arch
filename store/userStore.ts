import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ICompanyStore {
  id: string;
  name: string;
}

export interface IUserStore {
  id: string;
  email: string;
  name: string;
  company: ICompanyStore | null;
}

export interface UserStateStore {
  user: IUserStore | null;
  loading: boolean;
}

export interface UserActionsStore {
  setUser: (user: IUserStore) => void;
  updateUser: (user: IUserStore) => void;
  setLoading: (loading: boolean) => void;
  clearPersistedStore: () => void;
}

interface UserStore extends UserStateStore, UserActionsStore {}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      setUser: (user) => set({ user }),
      updateUser: (user) => set({ user: { ...get().user, ...user } }),
      setLoading: (loading) => set({ loading }),
      clearPersistedStore: () => set({ user: null, loading: false }),
    }),
    {
      name: 'user-store',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['loading'].includes(key)),
        ),
    },
  ),
);

export default useUserStore;
