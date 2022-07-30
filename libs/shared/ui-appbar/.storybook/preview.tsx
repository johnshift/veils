import React from 'react';

import { useDarkMode } from 'storybook-dark-mode';

import { Center } from '@mantine/core';

import { MantineWrapper } from '@shared/util-common/mantine';

export const parameters = { layout: 'fullscreen' };

const ThemeWrapper = (props: { children: React.ReactNode }) => (
  <MantineWrapper colorScheme={useDarkMode() ? 'dark' : 'light'}>
    <Center style={{ width: '100vw', height: '100vh' }}>
      {props.children}
    </Center>
  </MantineWrapper>
);

export const decorators = [
  // eslint-disable-next-line @typescript-eslint/ban-types
  (renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
];
