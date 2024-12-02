import { Account, ArtifactObject, Company } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  account: Account | null;
  setAccount: (account: Account) => void;
  updateAccount: (account: Account) => void;
  company: Company | null;
  setCompany: (account: Company) => void;
  updateCompany: (account: Company) => void;
  artifactObject: ArtifactObject | null;
  setArtifactObject: (artifactObject: ArtifactObject) => void;
  updateArtifactObject: (artifactObject: ArtifactObject) => void;
  deleteArtifactObject: () => void;
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
      artifactObject: null,
      setArtifactObject: (artifactObject) => set({ artifactObject }),
      updateArtifactObject: (artifactObject) =>
        set((state) => ({ ...state, artifactObject })),
      deleteArtifactObject: () => set({ artifactObject: null }),
      clearPersistedStore: () => {
        useUserStore.persist.clearStorage();
        set({ account: null, company: null, artifactObject: null });
      },
    }),
    { name: 'user-store' },
  ),
);

export default useUserStore;
