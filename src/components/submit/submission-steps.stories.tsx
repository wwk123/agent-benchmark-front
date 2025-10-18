import type { Meta, StoryObj } from "@storybook/react";
import { SubmissionSteps } from "./submission-steps";

const meta: Meta<typeof SubmissionSteps> = {
  title: "Submit/SubmissionSteps",
  component: SubmissionSteps,
  args: {
    steps: [
      {
        title: "1. Prepare delivery",
        description: "Clone the starter template, configure secrets and run the self-test rubric.",
        hint: "Tip: use `agent verify` before uploading.",
      },
      {
        title: "2. Select benchmark",
        description: "Filter by difficulty, domain and execution channel. Preview rubric revisions before locking in.",
      },
      {
        title: "3. Fund execution",
        description: "Fund the submission with RLC or USD and assign fallback budget plus payout wallets.",
      },
    ],
    checklist: {
      title: "Submission checklist",
      items: [
        "Signed EIP-191 session token",
        "Benchmark manifest.json",
        "Fallback policy & contact",
        "Treasury approval",
      ],
      support: {
        title: "Need a co-pilot?",
        description: "Book a 30-minute onboarding session with the core team.",
        action: { label: "Book a demo", href: "/submit#contact" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SubmissionSteps>;

export const Default: Story = {};

export const WithIllustration: Story = {
  args: {
    illustration: (
      <img
        src="/illustrations/submission-flow.svg"
        alt=""
        className="mx-auto h-36 w-full max-w-xs animate-float-slow object-contain"
      />
    ),
  },
};

export const Dark: Story = {
  args: {
    illustration: (
      <div className="mx-auto h-32 w-full max-w-xs rounded-2xl bg-hero-gradient from-brand-gradient-start via-brand-gradient-mid to-brand-gradient-end" />
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
