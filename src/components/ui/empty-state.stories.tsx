import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";

const meta = {
  title: "UI/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No items found",
    description: "There are no items to display at this time.",
  },
};

export const Search: Story = {
  args: {
    variant: "search",
    title: "No results found",
    description: "Try adjusting your search criteria or filters to find what you're looking for.",
    action: {
      label: "Clear filters",
      onClick: () => alert("Filters cleared"),
    },
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Something went wrong",
    description: "We encountered an error loading this content. Please try again or contact support if the problem persists.",
    action: {
      label: "Try again",
      onClick: () => alert("Retrying..."),
    },
  },
};

export const Inbox: Story = {
  args: {
    variant: "inbox",
    title: "All caught up!",
    description: "You have no new notifications at this time. Check back later for updates.",
  },
};

export const WithAction: Story = {
  args: {
    title: "No benchmarks available",
    description: "There are no benchmarks matching your selected criteria.",
    action: {
      label: "Browse all benchmarks",
      onClick: () => alert("Navigating to benchmarks..."),
    },
  },
};

export const Chinese: Story = {
  args: {
    variant: "search",
    title: "未找到结果",
    description: "尝试调整搜索条件或筛选器以找到您要查找的内容。",
    action: {
      label: "清除筛选",
      onClick: () => alert("已清除筛选条件"),
    },
  },
};

export const InPageContext: Story = {
  args: {
    title: "No submissions yet",
    description: "You haven't submitted any agents for evaluation. Start your first submission to see it listed here.",
    variant: "inbox",
  },
  render: () => (
    <div className="min-h-[400px] space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">My Submissions</h2>
        <button className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white">
          New Submission
        </button>
      </div>
      <EmptyState
        variant="inbox"
        title="No submissions yet"
        description="You haven't submitted any agents for evaluation. Start your first submission to see it listed here."
        action={{
          label: "Submit your first agent",
          onClick: () => alert("Starting submission..."),
        }}
      />
    </div>
  ),
};
