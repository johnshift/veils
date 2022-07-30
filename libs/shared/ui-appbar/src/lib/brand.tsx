import NextLink from 'next/link';

import { Anchor } from '@mantine/core';

export const Brand = () => (
  <NextLink passHref href="/">
    <Anchor component="a" size={48} weight="bold" variant="text">
      veils
    </Anchor>
  </NextLink>
);
