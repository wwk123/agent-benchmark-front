import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Utilities/Motion",
  parameters: {
    layout: "centered",
  },
  decorators: [
    (StoryComponent) => (
      <div className="w-full max-w-xl bg-surface p-10">
        <StoryComponent />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const HoverTiltCard: Story = {
  render: () => (
    <div className="hover-tilt rounded-2xl border border-border bg-surface-contrast p-6 shadow-card">
      <h3 className="text-lg font-semibold text-brand-primary">Hover Tilt</h3>
      <p className="mt-2 text-sm text-text-secondary">
        Move your cursor around to preview the perspective hover effect used on benchmark or submission cards.
      </p>
    </div>
  ),
};

export const ShimmerCta: Story = {
  render: () => (
    <button className="relative overflow-hidden rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-surface-contrast shadow-cta-focus transition hover:-translate-y-0.5 hover:shadow-brand-glow">
      <span className="animate-shimmer absolute inset-0 opacity-70" aria-hidden />
      <span className="relative">Hover to Shimmer</span>
    </button>
  ),
};
