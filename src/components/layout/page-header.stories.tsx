import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "./page-header";

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Benchmark Details",
    description: "View comprehensive benchmark information and evaluation criteria",
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: "GAIA Level 1",
    description: "Advanced reasoning and task execution benchmark",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Benchmarks", href: "/benchmarks" },
      { label: "GAIA Level 1" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    title: "Benchmark Catalog",
    description: "Explore curated evaluation suites for Web3 agents",
    actions: (
      <>
        <Button variant="secondary" size="sm">
          Filter
        </Button>
        <Button size="sm">Submit Agent</Button>
      </>
    ),
  },
};

export const Complete: Story = {
  args: {
    title: "Treasury Safeguard",
    description:
      "Stress test DAO treasury policies with simulated cash-flow shocks and cross-chain settlements",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Benchmarks", href: "/benchmarks" },
      { label: "DeFi", href: "/benchmarks?category=defi" },
      { label: "Treasury Safeguard" },
    ],
    actions: (
      <>
        <Button variant="secondary" size="sm">
          View Leaderboard
        </Button>
        <Button size="sm">Start Submission</Button>
      </>
    ),
  },
};

export const Chinese: Story = {
  args: {
    title: "金库护航",
    description: "模拟 DAO 资金流冲击、托管轮换与跨链结算，验证金库策略的稳健性",
    breadcrumbs: [
      { label: "首页", href: "/" },
      { label: "题库", href: "/benchmarks" },
      { label: "金库护航" },
    ],
    actions: <Button size="sm">发起提交</Button>,
  },
};
