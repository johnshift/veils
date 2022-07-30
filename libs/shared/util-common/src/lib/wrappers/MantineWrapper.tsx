import { ReactNode, useEffect } from 'react';
import { useState } from 'react';

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

type Props = {
  children: ReactNode;
  colorScheme?: ColorScheme;
};

export const MantineWrapper = (props: Props) => {
  // Color scheme defaults to preferred color scheme (if props.colorScheme not provided)
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);

  useEffect(() => {
    // Override colorscheme if provided
    if (props.colorScheme) {
      setColorScheme(props.colorScheme);
    }
  }, [props.colorScheme]);

  console.log('useState colorScheme =', colorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        {props.children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
