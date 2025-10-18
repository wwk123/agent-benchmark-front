import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./status-badge";

const meta = {
  title: "UI/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    status: "pending",
  },
};

export const Running: Story = {
  args: {
    status: "running",
  },
};

export const Completed: Story = {
  args: {
    status: "completed",
  },
};

export const Failed: Story = {
  args: {
    status: "failed",
  },
};

export const Cancelled: Story = {
  args: {
    status: "cancelled",
  },
};

export const WithoutDot: Story = {
  args: {
    status: "completed",
    showDot: false,
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusBadge status="pending" />
      <StatusBadge status="running" />
      <StatusBadge status="completed" />
      <StatusBadge status="failed" />
      <StatusBadge status="cancelled" />
    </div>
  ),
};

export const InTableContext: Story = {
  render: () => (
    <div className="w-full max-w-2xl rounded-lg border border-border">
      <table className="w-full">
        <thead className="bg-surface-muted">
          <tr>
            <th className="p-3 text-left text-sm font-medium">Submission ID</th>
            <th className="p-3 text-left text-sm font-medium">Status</th>
            <th className="p-3 text-left text-sm font-medium">Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border">
            <td className="p-3 text-sm">sub-2045</td>
            <td className="p-3">
              <StatusBadge status="running" />
            </td>
            <td className="p-3 text-sm text-text-secondary">2h ago</td>
          </tr>
          <tr className="border-t border-border bg-surface-muted">
            <td className="p-3 text-sm">sub-2044</td>
            <td className="p-3">
              <StatusBadge status="completed" />
            </td>
            <td className="p-3 text-sm text-text-secondary">6h ago</td>
          </tr>
          <tr className="border-t border-border">
            <td className="p-3 text-sm">sub-2043</td>
            <td className="p-3">
              <StatusBadge status="failed" />
            </td>
            <td className="p-3 text-sm text-text-secondary">1d ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
