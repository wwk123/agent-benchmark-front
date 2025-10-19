"use client";

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../web3/config";

const RainbowKitProvider = dynamic(async () => {
  const mod = await import("@rainbow-me/rainbowkit");
  return mod.RainbowKitProvider;
}, { ssr: false });

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            // 401 未授权 → 触发刷新或登出
            if (error instanceof Error && error.message.includes('401')) {
              console.warn('[React Query] 401 Unauthorized - Token may need refresh');
              // TODO: 实现 Token 刷新逻辑
            }
            // 429 限流 → 显示提示
            if (error instanceof Error && error.message.includes('429')) {
              console.warn('[React Query] 429 Rate Limited');
              // TODO: 显示节流提示 Toast
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            console.error('[React Query Mutation] Error:', error);
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 分钟
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  const isClient = typeof window !== "undefined";

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {isClient ? <RainbowKitProvider>{children}</RainbowKitProvider> : children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
