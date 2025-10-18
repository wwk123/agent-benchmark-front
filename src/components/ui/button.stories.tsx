import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ['autodocs'],
  args: {
    children: "主要按钮",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variants
export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "次要按钮",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "第三按钮",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "危险按钮",
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    children: "小尺寸",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "大尺寸按钮",
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "禁用按钮",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "加载中",
  },
};

// With Icon
export const WithIconLeft: Story = {
  args: {
    icon: <span>→</span>,
    iconPosition: "left",
    children: "带图标按钮",
  },
};

export const WithIconRight: Story = {
  args: {
    icon: <span>→</span>,
    iconPosition: "right",
    children: "带图标按钮",
  },
};

// English
export const EnglishPrimary: Story = {
  args: {
    children: "Primary Button",
  },
};
