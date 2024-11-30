import { Account, Company } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  account: Account | null;
  setAccount: (account: Account) => void;
  updateAccount: (account: Account) => void;
  company: Company | null;
  setCompany: (account: Company) => void;
  updateCompany: (account: Company) => void;
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
    }),
    { name: 'user-store' },
  ),
);

export default useUserStore;
