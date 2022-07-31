import { DispatchWithoutAction } from 'react';

import { ActionIcon } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';

type Props = {
  isDark: boolean;
  toggleTheme: DispatchWithoutAction;
};

export const ThemeToggle = ({ isDark, toggleTheme }: Props) => (
  <ActionIcon
    size="xl"
    aria-label={`toggle ${isDark ? 'light' : 'dark'} theme`}
    onClick={() => toggleTheme()}
  >
    {isDark ? <IconSun /> : <IconMoonStars />}
  </ActionIcon>
);
