import { Center, Group, Paper } from '@mantine/core';

import { Brand, Menu, ThemeToggle } from '@shared/ui-appbar';
import { PagePaddingWrapper } from '@shared/util-wrappers';

import { useAppbar } from './hooks/use-appbar';

export const Appbar = () => {
  const {
    isDark,
    toggleTheme,
    sessionIsLoading,
    isLoggedIn,
    menuIsOpen,
    menuOnOpen,
    menuOnClose,
    logoutLoading,
    authFn,
  } = useAppbar();

  return (
    <Paper
      shadow="md"
      py="sm"
      sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 3 }}
    >
      <PagePaddingWrapper>
        <Center sx={{ justifyContent: 'space-between' }}>
          <Brand />
          <Group>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <Menu
              isOpen={menuIsOpen}
              isLoading={sessionIsLoading || logoutLoading}
              isLoggedIn={isLoggedIn}
              authFn={authFn}
              onOpen={menuOnOpen}
              onClose={menuOnClose}
            />
          </Group>
        </Center>
      </PagePaddingWrapper>
    </Paper>
  );
};
