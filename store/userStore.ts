import { Account, Company } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  account: Account | null;
  company: Company | null;
  setAccount: (account: Account) => void;
  updateAccount: (account: Account) => void;
  setCompany: (account: Company) => void;
  updateCompany: (account: Company) => void;
  clearPersistedStore: () => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      account: null,
      setAccount: (account) => set({ account }),
      updateAccount: (account) => set((state) => ({ ...state, account })),
      company: null,
      setCompany: (company) => set({ company }),
      updateCompany: (company) => set((state) => ({ ...state, company })),
      clearPersistedStore: () => {
        useUserStore.persist.clearStorage();
        set({ account: null, company: null });
      },
    }),
    { name: 'user-store' },
  ),
);

export default useUserStore;
