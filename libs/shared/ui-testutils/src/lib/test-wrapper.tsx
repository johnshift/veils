import { ReactNode } from 'react';

import { MantineWrapper } from '@shared/util-common/mantine';

interface Props {
  children: ReactNode;
}

export const TestWrapper = ({ children }: Props) => (
  <MantineWrapper>{children}</MantineWrapper>
);
