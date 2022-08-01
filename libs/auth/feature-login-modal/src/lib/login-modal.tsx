import NextLink from 'next/link';

import {
  Anchor,
  Button,
  Center,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';

import { useSessionContext } from '@auth/data-session';
import { PasswordInput, PrincipalInput } from '@auth/ui-login-form';

import { useLoginForm } from './hooks/use-login-form';

type Props = {
  // FakeLoadingMs determines the delay for validation error notification
  // This provides option to cut delay during tests. Defaults to 1000.
  fakeLoadingMs: number;
};

export const LoginModal = ({ fakeLoadingMs }: Props) => {
  const { openedLoginModal, closeLoginModal } = useSessionContext();
  const {
    closeModal,
    principalInputProps,
    passwordInputProps,
    isInvalid,
    isLoading,
    onSubmit,
  } = useLoginForm(closeLoginModal, fakeLoadingMs);

  return (
    <Modal
      centered
      opened={openedLoginModal}
      withCloseButton={false}
      size="32ch"
      padding={0}
      onClose={closeModal}
    >
      <Paper withBorder radius="md" p="xl" data-testid="login-paper">
        <LoadingOverlay
          visible={isLoading}
          // OverlayBlur={0.5}
          data-testid="login-loading-overlay"
        />
        <Stack justify="space-between" spacing="lg">
          <form onSubmit={onSubmit}>
            <Stack>
              <Center>
                <Title order={1}>veils</Title>
              </Center>
              <PrincipalInput
                isInvalid={isInvalid}
                value={principalInputProps.value}
                onChange={principalInputProps.onChange}
              />
              <PasswordInput
                isInvalid={isInvalid}
                value={passwordInputProps.value}
                onChange={passwordInputProps.onChange}
              />

              <Button type="submit" aria-label="submit login">
                Login
              </Button>
            </Stack>
          </form>

          <Group align="center" position="center">
            <Text color="dimmed" size="xs">
              Don&#39;t have an account?{' '}
            </Text>
            <NextLink passHref href="/register">
              <Anchor component="a" underline={false} size="xs">
                Register
              </Anchor>
            </NextLink>
          </Group>
        </Stack>
      </Paper>
    </Modal>
  );
};
