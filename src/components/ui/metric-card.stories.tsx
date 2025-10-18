import type { Meta, StoryObj } from "@storybook/react";
import { MetricCard } from "./metric-card";

const meta = {
  title: "UI/MetricCard",
  component: MetricCard,
  parameters: {
    layout: "centered",
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    label: "可用题库",
    value: "40+",
  },
};

export const Horizontal: Story = {
  args: {
    label: "累计评测",
    value: "620+",
    orientation: "horizontal",
  },
};

export const WithIcon: Story = {
  args: {
    label: "执行通道",
    value: "iExec · 自建",
    icon: <span className="text-2xl">🚀</span>,
  },
};

export const English: Story = {
  args: {
    label: "Benchmarks available",
    value: "40+",
  },
};
