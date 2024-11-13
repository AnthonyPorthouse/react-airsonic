import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Globe } from "lucide-react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,

  parameters: {
    layout: "centered",
  },

  args: {
    children: <span className="flex-grow">My Button</span>,
    className: "!w-64",
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicButton: Story = {};

export const ButtonWithIcon: Story = {
  args: {
    renderIcon: () => <Globe className="w-6" />,
  },
};
