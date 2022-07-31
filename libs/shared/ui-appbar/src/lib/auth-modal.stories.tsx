import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AuthModal } from './auth-modal';

export default {
  title: 'ui-appbar/AuthModal',
  component: AuthModal,
} as ComponentMeta<typeof AuthModal>;

type Props = {
  isOpen: boolean;
};

const onClose = () => {
  console.log('onClose called');
};

const AuthModalWrapper = ({ isOpen }: Props) => (
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
