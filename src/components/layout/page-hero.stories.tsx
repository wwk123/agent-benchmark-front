import type { Meta, StoryObj } from "@storybook/react";
import { PageHero } from "./page-hero";

const meta = {
  title: "Layout/PageHero",
  component: PageHero,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    badge: "Benchmark catalog",
    title: "Discover curated benchmark suites",
    description:
      "Browse production-ready evaluation tracks that simulate treasury operations, compliance reviews and automated workflows with verifiable scoring.",
    actions: [
      { label: "Start submission", href: "/submit", variant: "primary" },
      { label: "View leaderboard", href: "/leaderboard", variant: "secondary" },
    ],
  },
} satisfies Meta<typeof PageHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
