import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  companyId: string | null;
  companyName: string;
  teamId: string;
  teamName: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (user: User) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (user) => set((state) => ({ ...state, user })),
    }),
    { name: 'user-store' },
  ),
);

export default useUserStore;
