import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
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
    illustration: <Image
        src="/illustrations/benchmark-hero.light.svg"
        alt=""
        width={128}
        height={128}
        className="size-32 opacity-80"
      />,
  },
};

export const Dark: Story = {
  args: {
    illustration: (
      <div className="size-32 rounded-full bg-brand-gradient-mid/40 blur-lg" aria-hidden />
    ),
  },
  decorators: [
    (StoryComponent) => (
      <div className="bg-surface-inverted p-6">
        <StoryComponent />
      </div>
    ),
  ],
};
