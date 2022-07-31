import { DispatchWithoutAction, ReactNode } from 'react';

import { Modal } from '@mantine/core';

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: DispatchWithoutAction;
};

export const AuthModal = ({ isOpen, onClose, children }: Props) => (
  <Modal
    centered
    closeOnEscape
    opened={isOpen}
    withCloseButton={false}
    onClose={() => {
      console.log('on Close called');
      onClose();
    }}
  >
    {children}
  </Modal>
);
