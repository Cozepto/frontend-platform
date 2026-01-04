import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Sanity/Hello",
};

export default meta;

export const Hello: StoryObj = {
  render: () => <div>Hello Storybook</div>,
};
