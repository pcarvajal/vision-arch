import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    companyId?: string;
    companyName: string;
    teamId: string;
    teamName: string;
  } | null;

  setUser: (user: {
    id: string;
    name: string;
    email: string;
    companyId?: string;
    companyName: string;
    teamId: string;
    teamName: string;
  }) => void;
  clearUser: () => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
);

export default useUserStore;
