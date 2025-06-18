import type { Meta, StoryObj } from '@storybook/react-vite';

import Description from './Description';

const meta = {
  component: Description,
} satisfies Meta<typeof Description>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};