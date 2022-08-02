import { useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useLogoutMutation } from '@auth/data-logout';
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

  // Logout mutation
  const { isLoading: logoutLoading, mutate: logoutMutate } =
    useLogoutMutation();

  // Auth fn
  const authFn = () => {
    isLoggedIn ? logoutMutate() : openLoginModal();
  };

  return {
    isDark: colorScheme === 'dark',
    toggleTheme: toggleColorScheme,
    sessionIsLoading,
    isLoggedIn,
    menuIsOpen,
    menuOnOpen: menuHandlers.open,
    menuOnClose: menuHandlers.close,
    logoutLoading,
    authFn,
  };
};
