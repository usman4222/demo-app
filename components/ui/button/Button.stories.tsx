import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";

// Story metadata
const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

// Default Button
export const Default: Story = {
  args: {
    children: "Click Me",
    variant: "default",
    size: "default",
  },
};

// Destructive Button
export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
    size: "default",
  },
};

// Outline Button
export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
    size: "default",
  },
};
