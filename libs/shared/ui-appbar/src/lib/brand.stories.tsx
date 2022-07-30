import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Brand } from './brand';

export default {
  title: 'ui-appbar/brand',
  component: Brand,
} as ComponentMeta<typeof Brand>;

const Template: ComponentStory<typeof Brand> = () => <Brand />;

export const Default = Template.bind({});
