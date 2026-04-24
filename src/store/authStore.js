import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAdmin: false,
      loginAdmin: () => set({ isAdmin: true }),
      logoutAdmin: () => set({ isAdmin: false }),
    }),
    { name: 'chronos-auth' }
  )
);

export default useAuthStore;

