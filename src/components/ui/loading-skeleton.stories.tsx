import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, CardSkeleton, TableSkeleton, ListSkeleton } from "./loading-skeleton";

const meta = {
  title: "UI/LoadingSkeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: "text",
    width: "60%",
  },
};

export const TextMultiple: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
};

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    height: "200px",
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    className: "size-12",
  },
};

export const Card: Story = {
  render: () => <CardSkeleton count={1} />,
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardSkeleton count={3} />
    </div>
  ),
};

export const Table: Story = {
  render: () => <TableSkeleton rows={5} columns={4} />,
};

export const TableLarge: Story = {
  render: () => <TableSkeleton rows={10} columns={6} />,
};

export const List: Story = {
  render: () => <ListSkeleton count={5} />,
};

export const ListShort: Story = {
  render: () => <ListSkeleton count={3} />,
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="size-16" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="200px" />
          <Skeleton variant="text" width="150px" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="70%" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <CardSkeleton count={3} />
      </div>
    </div>
  ),
};

export const BenchmarkDetailSkeleton: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border p-4">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" height="32px" />
          </div>
        ))}
      </div>

      {/* Content */}
      <Skeleton variant="rectangular" height="400px" />
    </div>
  ),
};
