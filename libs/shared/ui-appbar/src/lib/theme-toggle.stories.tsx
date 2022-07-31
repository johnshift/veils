import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeToggle } from './theme-toggle';

export default {
  title: 'ui-appbar/ThemeToggle',
  component: ThemeToggle,
} as ComponentMeta<typeof ThemeToggle>;

const Template: ComponentStory<typeof ThemeToggle> = (args) => (
  <ThemeToggle {...args} />
);

export const DarkActive = Template.bind({});
DarkActive.args = {
  isDark: true,
  toggleTheme: () => null,
};

export const LightActive = Template.bind({});
LightActive.args = {
  isDark: false,
  toggleTheme: () => null,
};
