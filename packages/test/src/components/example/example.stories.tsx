import { h } from '@stencil/core';
import { StoryObj } from '@storybook/html';
import readme from './readme.md';

export default {
  title: 'Components/Example',
  parameters: {
    docs: {
      page: readme,
    },
  },
};

export const Default: StoryObj = {
  render: (args) => <test-example {...args}></test-example>,
};
