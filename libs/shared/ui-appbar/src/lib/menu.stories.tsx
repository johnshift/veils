import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Menu } from './menu';

export default {
  title: 'ui-appbar/Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

type Props = {
  isLoading: boolean;
  isLoggedIn: boolean;
};

const MenuWrapper = ({ isLoading, isLoggedIn }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const authFn = () => {
    console.log(`authFn: Log${isLoggedIn ? 'out' : 'in'}`);
  };

  return (
    <Menu
      isOpen={isOpen}
      isLoading={isLoading}
      isLoggedIn={isLoggedIn}
      setIsOpen={setIsOpen}
      authFn={authFn}
    />
  );
};

const Template: ComponentStory<typeof MenuWrapper> = (args) => (
  <MenuWrapper {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  isLoggedIn: false,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  isLoggedIn: false,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  isLoading: false,
  isLoggedIn: true,
};
