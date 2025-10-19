/**
 * Authentication hooks for wallet login/logout
 * Based on approved Stage 6 plan
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDisconnect, useSignMessage } from "wagmi";
import { useWalletStore } from "@/stores/wallet-store";
import { useSubmissionStore } from "@/stores/submission-store";
import type { LoginNonceResponse, LoginResponse } from "@/types/models";
import { apiFetch } from "@/lib/api-client";
import { defaultLocale, locales } from "@/i18n/settings";

/**
 * Wallet login with EIP-191 signature
 * Flow: Get nonce -> Sign message -> Submit signature -> Store JWT
 */
export function useWalletLogin() {
  const { signMessageAsync } = useSignMessage();
  const { setWallet, setRoles } = useWalletStore();

  return useMutation({
    mutationFn: async (params: { address: string; chainId: number }) => {
      const { address, chainId } = params;

      // Step 1: Get nonce from server
      const nonceResponse = await apiFetch<LoginNonceResponse>(
        "/api/v1/auth/nonce",
        {
          method: "POST",
          body: JSON.stringify({ address }),
        }
      );

      // Step 2: Create EIP-191 message
      const timestamp = Date.now();
      const message = `Welcome to Agent Benchmark!

Sign this message to authenticate your wallet.

Address: ${address}
Nonce: ${nonceResponse.nonce}
Timestamp: ${timestamp}

This signature will not trigger any blockchain transaction or cost gas fees.`;

      // Step 3: Sign message with wallet
      const signature = await signMessageAsync({ message });

      // Step 4: Submit signature to server
      const loginResponse = await apiFetch<LoginResponse>("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({
          address,
          signature,
          nonce: nonceResponse.nonce,
          chainId,
        }),
      });

      return { ...loginResponse, address, chainId };
    },
    onSuccess: (data) => {
      // Store wallet info in Zustand
      setWallet(data.address, data.chainId);
      setRoles(data.user.roles);

      // Store JWT in sessionStorage
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("access_token", data.accessToken);
      }
    },
  });
}

/**
 * Logout - clears all state and tokens
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { disconnect: disconnectWallet } = useWalletStore();
  const { reset: resetSubmission } = useSubmissionStore();
  const { disconnect } = useDisconnect();

  return useMutation({
    mutationFn: async () => {
      // Call logout API
      try {
        await apiFetch("/api/v1/auth/logout", { method: "POST" });
      } catch (error) {
        // Continue with client-side cleanup even if API fails
        console.error("Logout API error:", error);
      }
    },
    onSuccess: () => {
      // Clear sessionStorage
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem("access_token");
      }

      // Reset Zustand stores
      disconnect();
      disconnectWallet();
      resetSubmission();

      // Clear React Query cache
      queryClient.clear();

      // Redirect to homepage
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const segments = currentPath.split("/").filter(Boolean);
        const candidateLocale = segments[0];
        const targetLocale = candidateLocale && locales.includes(candidateLocale as (typeof locales)[number])
          ? candidateLocale
          : defaultLocale;
        window.location.href = `/${targetLocale}`;
      }
    },
  });
}
