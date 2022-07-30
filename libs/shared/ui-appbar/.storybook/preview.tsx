import React from 'react';

import { useDarkMode } from 'storybook-dark-mode';

import { MantineWrapper } from '@shared/util-common';

export const parameters = { layout: 'fullscreen' };

const ThemeWrapper = (props: { children: React.ReactNode }) => (
  <MantineWrapper colorScheme={useDarkMode() ? 'dark' : 'light'}>
    {props.children}
  </MantineWrapper>
);

export const decorators = [
  // eslint-disable-next-line @typescript-eslint/ban-types
  (renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
];
