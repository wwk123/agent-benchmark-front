import type { Meta, StoryObj } from "@storybook/react";
import { Package, Settings, CreditCard, Play, CheckCircle } from "lucide-react";
import { Stepper } from "./stepper";

const meta = {
  title: "UI/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalDefault: Story = {
  args: {
    orientation: "horizontal",
    steps: [
      { label: "Package Agent", status: "completed" },
      { label: "Select Benchmark", status: "completed" },
      { label: "Configure", status: "current" },
      { label: "Payment", status: "pending" },
      { label: "Execute", status: "pending" },
    ],
  },
};

export const HorizontalWithDescriptions: Story = {
  args: {
    orientation: "horizontal",
    steps: [
      {
        label: "Package Agent",
        description: "Prepare artifacts",
        status: "completed",
      },
      {
        label: "Select Benchmark",
        description: "Choose evaluation",
        status: "completed",
      },
      {
        label: "Configure",
        description: "Set parameters",
        status: "current",
      },
      {
        label: "Payment",
        description: "Fund execution",
        status: "pending",
      },
    ],
  },
};

export const HorizontalWithIcons: Story = {
  args: {
    orientation: "horizontal",
    steps: [
      {
        label: "Package",
        icon: <Package className="size-5" />,
        status: "completed",
      },
      {
        label: "Configure",
        icon: <Settings className="size-5" />,
        status: "current",
      },
      {
        label: "Payment",
        icon: <CreditCard className="size-5" />,
        status: "pending",
      },
      {
        label: "Execute",
        icon: <Play className="size-5" />,
        status: "pending",
      },
    ],
  },
};

export const HorizontalWithError: Story = {
  args: {
    orientation: "horizontal",
    steps: [
      { label: "Package Agent", status: "completed" },
      { label: "Select Benchmark", status: "completed" },
      { label: "Configure", status: "completed" },
      { label: "Payment", status: "error" },
      { label: "Execute", status: "pending" },
    ],
  },
};

export const VerticalDefault: Story = {
  args: {
    orientation: "vertical",
    steps: [
      {
        label: "Prepare delivery",
        description: "Clone template and run self-test",
        status: "completed",
      },
      {
        label: "Select benchmark",
        description: "Filter by difficulty and domain",
        status: "completed",
      },
      {
        label: "Fund execution",
        description: "Fund with RLC or USD",
        status: "current",
      },
      {
        label: "Monitor run",
        description: "Track live status and logs",
        status: "pending",
      },
      {
        label: "Review & publish",
        description: "Download scorecards and proofs",
        status: "pending",
      },
    ],
  },
};

export const VerticalWithIcons: Story = {
  args: {
    orientation: "vertical",
    steps: [
      {
        label: "Package Agent",
        description: "Prepare your agent artifacts",
        icon: <Package className="size-5" />,
        status: "completed",
      },
      {
        label: "Configuration",
        description: "Set execution parameters",
        icon: <Settings className="size-5" />,
        status: "completed",
      },
      {
        label: "Payment",
        description: "Fund the submission",
        icon: <CreditCard className="size-5" />,
        status: "current",
      },
      {
        label: "Execution",
        description: "Run your agent",
        icon: <Play className="size-5" />,
        status: "pending",
      },
      {
        label: "Results",
        description: "View scores and proofs",
        icon: <CheckCircle className="size-5" />,
        status: "pending",
      },
    ],
  },
};

export const Chinese: Story = {
  args: {
    orientation: "horizontal",
    steps: [
      { label: "准备交付物", status: "completed" },
      { label: "选择题库", status: "completed" },
      { label: "资金准备", status: "current" },
      { label: "监控执行", status: "pending" },
      { label: "审核与发布", status: "pending" },
    ],
  },
};

export const InSubmissionForm: Story = {
  render: () => (
    <div className="space-y-8">
      <Stepper
        orientation="horizontal"
        steps={[
          { label: "Select Benchmark", status: "completed" },
          { label: "Configure Agent", status: "completed" },
          { label: "Select Channel", status: "current" },
          { label: "Confirm Cost", status: "pending" },
          { label: "Payment", status: "pending" },
        ]}
      />

      <div className="rounded-lg border border-border p-6">
        <h3 className="mb-4 text-lg font-semibold">Select Execution Channel</h3>
        <p className="text-sm text-text-secondary">
          Choose how you want to execute your agent evaluation.
        </p>
      </div>

      <div className="flex justify-between">
        <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium">
          Back
        </button>
        <button className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white">
          Continue
        </button>
      </div>
    </div>
  ),
};
