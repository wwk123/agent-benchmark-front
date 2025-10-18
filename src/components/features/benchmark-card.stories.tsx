import type { Meta, StoryObj } from "@storybook/react";
import { BenchmarkCard, type BenchmarkCardProps } from "./benchmark-card";

const sampleBenchmark: BenchmarkCardProps["benchmark"] = {
  id: "treasury-safeguard",
  title: "Treasury Safeguard",
  description: "Stress test DAO treasury policies with simulated cash-flow shocks and cross-chain settlements.",
  difficulty: "hard",
  questionCount: 24,
  executionChannels: ["self-miner", "iexec"],
  estimatedCost: {
    selfMiner: 3.4,
    iexec: 4.8,
  },
  tags: ["treasury", "automation", "ResultAnchor"],
  resultAnchorAddress: "0x1234",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const meta: Meta<typeof BenchmarkCard> = {
  title: "Features/BenchmarkCard",
  component: BenchmarkCard,
  args: {
    benchmark: sampleBenchmark,
  },
};

export default meta;
type Story = StoryObj<typeof BenchmarkCard>;

export const Light: Story = {};

export const WithIllustration: Story = {
  args: {
    illustration: <img src="/illustrations/benchmark-hero.svg" alt="" className="h-32 w-32 opacity-80" />,
  },
};

export const Dark: Story = {
  args: {
    illustration: (
      <div className="h-32 w-32 rounded-full bg-brand-gradient-mid/40 blur-lg" aria-hidden />
    ),
  },
  decorators: [
    (StoryComponent) => (
      <div className="dark bg-surface-inverted p-6">
        <StoryComponent />
      </div>
    ),
  ],
};
