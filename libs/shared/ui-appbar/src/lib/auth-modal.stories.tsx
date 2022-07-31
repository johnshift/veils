import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactNode, useState } from 'react';

import { AuthModal } from './auth-modal';

export default {
  title: 'ui-appbar/AuthModal',
  component: AuthModal,
} as ComponentMeta<typeof AuthModal>;

type Props = {
  isOpen: boolean;
  children: ReactNode;
};

const onClose = () => {
  console.log('onClose called');
};

const AuthModalWrapper = ({ isOpen, children }: Props) => (
  <AuthModal isOpen={isOpen} onClose={onClose}>
    <h1>Auth Modal Story</h1>
  </AuthModal>
);

const Template: ComponentStory<typeof AuthModalWrapper> = (args) => (
  <AuthModalWrapper {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
