import { Dispatch, DispatchWithoutAction, SetStateAction } from 'react';

import { Menu as BaseMenu, Burger, Loader } from '@mantine/core';
import { IconLogin } from '@tabler/icons';

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  authFn: DispatchWithoutAction;
};

export const Menu = ({
  isOpen,
  isLoading,
  isLoggedIn,
  setIsOpen,
  authFn,
}: Props) => (
  <BaseMenu
    width={180}
    shadow="md"
    opened={isOpen}
    position="bottom-end"
    aria-label={`${isOpen ? 'close' : 'open'} appbar menu`}
    onChange={setIsOpen}
  >
    <BaseMenu.Target>
      <Burger opened={isOpen} />
    </BaseMenu.Target>

    <BaseMenu.Dropdown>
      <BaseMenu.Label>Actions</BaseMenu.Label>
      <BaseMenu.Item
        icon={
          isLoading ? (
            <Loader size="xs" data-testid="auth-loader" />
          ) : (
            <IconLogin />
          )
        }
        disabled={isLoading}
        onClick={authFn}
      >
        {isLoading ? 'Loading' : `Log${isLoggedIn ? 'out' : 'in'}`}
      </BaseMenu.Item>
    </BaseMenu.Dropdown>
  </BaseMenu>
);
