import { useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useSessionContext } from '@auth/data-session';

// UseAppbar hook separates logic from ui
export const useAppbar = () => {
  // Theme controls
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // Session
  const {
    id,
    isLoading: sessionIsLoading,
    openLoginModal,
  } = useSessionContext();
  const isLoggedIn = id.trim().length > 0;

  // Menu controls
  const [menuIsOpen, menuHandlers] = useDisclosure(false);

  // Auth fn
  const authFn = () => {
    console.count('authFn');
    isLoggedIn ? console.log('todo: logout') : openLoginModal();
  };

  return {
    isDark: colorScheme === 'dark',
    toggleTheme: toggleColorScheme,
    sessionIsLoading,
    isLoggedIn,
    menuIsOpen,
    menuOnOpen: menuHandlers.open,
    menuOnClose: menuHandlers.close,
    authFn,
  };
};
