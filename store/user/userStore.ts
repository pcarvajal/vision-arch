import { IAccountModel, ICompany, IUser } from '@/types/appwrite';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserStateStore {
  user: IUser | null;
  account: IAccountModel | null;
  company: ICompany | null;
  loading: boolean;
}

export interface UserActionsStore {
  setUser: (user: IUser) => void;
  updateUser: (user: IUser) => void;
  setAccount: (account: IAccountModel) => void;
  updateAccount: (account: IAccountModel) => void;
  setCompany: (company: ICompany) => void;
  updateCompany: (company: ICompany) => void;
  setLoading: (loading: boolean) => void;
  clearPersistedStore: () => void;
}

interface UserStore extends UserStateStore, UserActionsStore {}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      account: null,
      company: null,
      loading: false,
      setUser: (user) => set({ user }),
      updateUser: (user) => set({ user: { ...get().user, ...user } }),
      setAccount: (account) => set({ account }),
      updateAccount: (account) =>
        set({ account: { ...get().account, ...account } }),
      setCompany: (company) => set({ company }),
      updateCompany: (company) =>
        set({ company: { ...get().company, ...company } }),
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
