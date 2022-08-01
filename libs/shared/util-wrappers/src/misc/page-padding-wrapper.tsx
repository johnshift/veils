import React from 'react';

import { Box } from '@mantine/core';

export const PagePaddingWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Box
    sx={(theme) => ({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      // Responsive paddings
      [theme.fn.largerThan('md')]: {
        paddingLeft: '15%',
        paddingRight: '15%',
      },
      [theme.fn.largerThan('lg')]: {
        paddingLeft: '23%',
        paddingRight: '23%',
      },
      [theme.fn.largerThan('xl')]: {
        paddingLeft: '30%',
        paddingRight: '30%',
      },

      // Children of this component should have full width
      '> *': {
        width: '100%',
      },
    })}
  >
    {children}
  </Box>
);
