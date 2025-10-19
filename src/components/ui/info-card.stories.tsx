import type { Meta, StoryObj } from "@storybook/react";
import { TrendingUp, Users, Award, DollarSign } from "lucide-react";
import { InfoCard } from "./info-card";

const meta = {
  title: "UI/InfoCard",
  component: InfoCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Total Submissions",
    value: "1,234",
  },
};

export const WithDescription: Story = {
  args: {
    title: "Active Users",
    value: "892",
    description: "Last 30 days",
  },
};

export const WithIcon: Story = {
  args: {
    title: "Total Benchmarks",
    value: "42",
    description: "Across all categories",
    icon: <Award className="size-5" />,
  },
};

export const WithTrendUp: Story = {
  args: {
    title: "Success Rate",
    value: "94.2%",
    description: "Last 7 days",
    icon: <TrendingUp className="size-5" />,
    trend: {
      direction: "up",
      value: "+5.3%",
    },
  },
};

export const WithTrendDown: Story = {
  args: {
    title: "Average Cost",
    value: "3.2 RLC",
    description: "Per execution",
    icon: <DollarSign className="size-5" />,
    trend: {
      direction: "down",
      value: "-12.5%",
    },
  },
};

export const Horizontal: Story = {
  args: {
    title: "Total Participants",
    value: "1,567",
    description: "Active this month",
    icon: <Users className="size-5" />,
    orientation: "horizontal",
    trend: {
      direction: "up",
      value: "+8.2%",
    },
  },
};

export const Chinese: Story = {
  args: {
    title: "总提交数",
    value: "1,234",
    description: "近30天",
    icon: <TrendingUp className="size-5" />,
    trend: {
      direction: "up",
      value: "+12.5%",
    },
  },
};

export const Grid: Story = {
  args: {
    title: "Total Submissions",
    value: "1,234",
  },
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <InfoCard
        title="Total Submissions"
        value="1,234"
        description="All time"
        icon={<TrendingUp className="size-5" />}
        trend={{ direction: "up", value: "+12%" }}
      />
      <InfoCard
        title="Active Benchmarks"
        value="42"
        description="Available now"
        icon={<Award className="size-5" />}
      />
      <InfoCard
        title="Success Rate"
        value="94.2%"
        description="Last 30 days"
        icon={<Users className="size-5" />}
        trend={{ direction: "up", value: "+5.3%" }}
      />
      <InfoCard
        title="Avg Cost"
        value="3.2 RLC"
        description="Per execution"
        icon={<DollarSign className="size-5" />}
        trend={{ direction: "down", value: "-8%" }}
      />
    </div>
  ),
};
