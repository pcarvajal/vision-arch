import { Account, Company } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserState = {
  account: Account | null;
  company: Company | null;
  loading: boolean;
};

export type UserActions = {
  setAccount: (account: Account) => void;
  updateAccount: (account: Account) => void;
  setCompany: (account: Company) => void;
  updateCompany: (account: Company) => void;
  setLoading: (loading: boolean) => void;
  clearPersistedStore: () => void;
};

export type UserStore = UserState & UserActions;

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      account: null,
      setAccount: (account) => set({ account }),
      updateAccount: (account) => set((state) => ({ ...state, account })),
      company: null,
      setCompany: (company) => set({ company }),
      updateCompany: (company) => set((state) => ({ ...state, company })),
      loading: false,
      setLoading: (loading) => set({ loading }),
      clearPersistedStore: () => {
        useUserStore.persist.clearStorage();
        set({ account: null, company: null });
      },
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
