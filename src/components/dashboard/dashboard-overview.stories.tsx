import type { Meta, StoryObj } from "@storybook/react";
import { DashboardOverview } from "./dashboard-overview";

const meta: Meta<typeof DashboardOverview> = {
  title: "Dashboard/DashboardOverview",
  component: DashboardOverview,
  args: {
    metrics: [
      { label: "Active submissions", value: "3", description: "2 running · 1 pending review" },
      { label: "Credit balance", value: "276.4 RLC", description: "Auto top-up at 150 RLC" },
      { label: "Success rate", value: "94%", description: "Trailing 30 days" },
    ],
    recentSubmissions: {
      title: "Recent submissions",
      items: [
        { id: "sub-2045", name: "Atlas Vault – Treasury Safeguard", status: "Running", updatedAt: "18 min ago", channel: "Hybrid" },
        { id: "sub-2044", name: "SignalPilot – Market Intelligence", status: "Awaiting publish", updatedAt: "1h ago", channel: "Hybrid" },
      ],
      cta: { label: "View all submissions", href: "/dashboard/submissions" },
    },
    actions: {
      title: "Quick actions",
      ctaLabel: "Open",
      items: [
        { label: "Create benchmarking invite", description: "Share a curated track with partner teams.", href: "/dashboard/invites" },
        { label: "Sync wallet authorizations", description: "Review signer access and rotate credentials.", href: "/dashboard/security" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardOverview>;

export const Default: Story = {};

export const WithIllustration: Story = {
  args: {
    illustration: (
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Execution at a glance</h3>
        <p className="text-sm text-surface-contrast/80">
          Monitor funding, execution reliability and open tasks with a single tap. Switch to dark mode for nightly operations.
        </p>
      </div>
    ),
  },
};

export const Dark: Story = {
  args: {
    illustration: (
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Night shift view</h3>
        <p className="text-sm text-surface-contrast/80">
          Nightly operations mode highlights alerts while keeping the workspace calm and focused.
        </p>
      </div>
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
