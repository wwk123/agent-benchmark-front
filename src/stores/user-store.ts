import { create } from 'zustand';

type UserRole = 'creator' | 'miner' | 'dao_member' | 'operator' | 'admin';

type UserState = {
  roles: UserRole[];
  currentRole: UserRole | null;
  setRoles: (roles: UserRole[]) => void;
  switchRole: (role: UserRole) => void;
};

export const useUserStore = create<UserState>((set) => ({
  roles: [],
  currentRole: null,
  setRoles: (roles) => set({ roles, currentRole: roles[0] || null }),
  switchRole: (role) => set({ currentRole: role }),
}));
