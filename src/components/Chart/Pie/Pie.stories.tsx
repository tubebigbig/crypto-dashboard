import type { Meta, StoryObj } from "@storybook/react";
import Pie from "./Pie";

const meta = {
  title: "Components/Chart/Pie",
  component: Pie,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Pie>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [400, 300, 200, 100],
    labels: ["apple", "banana", "cherry", "orange"],
    labelsColor: "black",
    toolTipLabel: "Fruits",
    legendPosition: "top",
  },
};
