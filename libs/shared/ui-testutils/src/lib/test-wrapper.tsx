import { ReactNode } from 'react';

import { MantineWrapper } from '@shared/util-wrappers/mantine';

interface Props {
  children: ReactNode;
}

export const TestWrapper = ({ children }: Props) => (
  <MantineWrapper>{children}</MantineWrapper>
);
