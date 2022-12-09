import create from 'zustand/vanilla';
import { UserType } from '@/types/user.type';
import { getUserFromCookie } from '@/utils/cookie';

interface UserStore {
  user: UserType | null;
  setUser: (data: UserType) => void;
  removeUser: () => void;
}

export const userStore = create<UserStore>((set) => ({
  user: getUserFromCookie(),
  setUser: (data) => set({ user: data }),
  removeUser: () => set({ user: null }),
}));
