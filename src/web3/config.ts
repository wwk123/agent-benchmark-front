import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { defineChain } from "viem";

const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID ?? "demo";

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_ID) {
  console.warn(
    "[web3] NEXT_PUBLIC_WALLETCONNECT_ID 未配置，已使用 demo projectId，仅供开发联调使用。",
  );
}

// iExec Bellecour 测试链
export const bellecour = defineChain({
  id: 134,
  name: 'iExec Bellecour',
  network: 'bellecour',
  nativeCurrency: { name: 'xRLC', symbol: 'xRLC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://bellecour.iex.ec'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://blockscout-bellecour.iex.ec' },
  },
  testnet: true,
});

const baseChains = [mainnet, sepolia, bellecour] as const;
const baseTransports = {
  [mainnet.id]: http(),
  [sepolia.id]: http(),
  [bellecour.id]: http(),
} as const;

const createClientConfig = () =>
  getDefaultConfig({
    appName: "Agent Benchmark",
    projectId: walletConnectId,
    chains: baseChains,
    transports: baseTransports,
    ssr: true,
  });

export const wagmiConfig =
  typeof window === "undefined"
    ? createConfig({
        chains: baseChains,
        transports: baseTransports,
        connectors: [],
        ssr: true,
      })
    : createClientConfig();
