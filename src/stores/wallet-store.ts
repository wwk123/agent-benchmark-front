/**
 * Zustand store for wallet and user state management
 * Based on approved Stage 6 plan
 * Persists to sessionStorage for temporary state preservation
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "@/types/models";

type WalletStoreState = {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  roles: UserRole[];

  // Actions
  setWallet: (address: string, chainId: number) => void;
  setRoles: (roles: UserRole[]) => void;
  disconnect: () => void;
  reset: () => void;
};

const initialState = {
  address: null,
  chainId: null,
  isConnected: false,
  roles: [] as UserRole[],
};

export const useWalletStore = create<WalletStoreState>()(
  persist(
    (set) => ({
      ...initialState,

      setWallet: (address: string, chainId: number) => {
        set({
          address,
          chainId,
          isConnected: true,
        });
      },

      setRoles: (roles: UserRole[]) => {
        set({ roles });
      },

      disconnect: () => {
        set(initialState);
        // Also clear sessionStorage tokens
        if (typeof sessionStorage !== "undefined") {
          sessionStorage.removeItem("access_token");
        }
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "wallet-storage",
      storage: {
        getItem: (name) => {
          if (typeof sessionStorage === "undefined") return null;
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          if (typeof sessionStorage === "undefined") return;
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          if (typeof sessionStorage === "undefined") return;
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
