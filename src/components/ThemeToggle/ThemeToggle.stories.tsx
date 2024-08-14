import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import ThemeToggle from "./ThemeToggle";

const meta = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const lightMode: Story = {
  args: {
    theme: "light",
  },
};

export const DarkMode: Story = {
  args: {
    theme: "dark",
  },
};
