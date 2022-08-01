import { ComponentMeta, ComponentStory } from '@storybook/react';
import { screen, userEvent, within } from '@storybook/testing-library';

import { Button } from '@mantine/core';

import {
  ERR_INCORRECT_LOGIN,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PRINCIPAL,
} from '@auth/core-login/constants';
import { emptySession } from '@auth/core-session/empty-session';
import { useSessionContext } from '@auth/data-session/context/session-context';
import { mockLoginResponse } from '@auth/util-test-login';
import { fakeSession, mockSessionResponse } from '@auth/util-test-session';
import { ERR_NETWORK } from '@shared/core-common/constants';

import { LoginModal } from './login-modal';

export default {
  title: 'ui-appbar/LoginModal',
  component: LoginModal,
} as ComponentMeta<typeof LoginModal>;

const Modal = () => {
  const { openLoginModal } = useSessionContext();

  return (
    <div>
      <Button onClick={openLoginModal}>open login modal</Button>
      <LoginModal />
    </div>
  );
};

const Template: ComponentStory<typeof Modal> = () => <Modal />;
const fillDetails = async (
  canvasElement: HTMLElement,
  principal?: string,
  password?: string,
) => {
  const canvas = within(canvasElement);

  // Open Menu
  await userEvent.click(canvas.getByRole('button', { name: 'open login modal' }));

  // Components
  const principalInput = await screen.findByPlaceholderText(PLACEHOLDER_PRINCIPAL);
  const passwordInput = await screen.findByPlaceholderText(PLACEHOLDER_PASSWORD);

  // Type invalid payload
  await userEvent.type(principalInput, principal || 'demo');
  await userEvent.type(passwordInput, password || '123456');
  await userEvent.keyboard('{Enter}');
};

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole('button', { name: 'open login modal' }));
};

Default.parameters = {
  msw: {
    handlers: [
      // Mock not loggedin
      mockSessionResponse(200, emptySession),
    ],
  },
};

export const Loading = Template.bind({});
Loading.parameters = {
  msw: {
    handlers: [
      // Mock not loggedin
      mockSessionResponse(200, emptySession),
      // Mock long running request
      mockLoginResponse(
        400,
        { session: emptySession, message: ERR_NETWORK },
        false,
        5000,
      ),
    ],
  },
};
Loading.play = async ({ canvasElement }) => {
  await fillDetails(canvasElement);
};

export const ValidationError = Template.bind({});
ValidationError.parameters = {
  msw: {
    handlers: [
      // Mock not loggedin
      mockSessionResponse(200, emptySession),
    ],
  },
};
ValidationError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Open Menu
  await userEvent.click(canvas.getByRole('button', { name: 'open login modal' }));

  // Components
  const principalInput = await screen.findByPlaceholderText(PLACEHOLDER_PRINCIPAL);
  const passwordInput = await screen.findByPlaceholderText(PLACEHOLDER_PASSWORD);

  // Type invalid payload
  await userEvent.type(principalInput, 'demo!');
  await userEvent.type(passwordInput, '123456');
  await userEvent.keyboard('{Enter}');
};

export const ApiError = Template.bind({});
ApiError.parameters = {
  msw: {
    handlers: [
      // Mock not loggedin
      mockSessionResponse(200, emptySession),
      // Mock long running request
      mockLoginResponse(
        401,
        { session: emptySession, message: ERR_INCORRECT_LOGIN },
        false,
        1000,
      ),
    ],
  },
};
ApiError.play = async ({ canvasElement }) => {
  await fillDetails(canvasElement);
};

export const NetworkError = Template.bind({});
NetworkError.parameters = {
  msw: {
    handlers: [
      // Mock not loggedin
      mockSessionResponse(200, emptySession),
      // Mock long running request
      mockLoginResponse(500, undefined, true),
    ],
  },
};
NetworkError.play = async ({ canvasElement }) => {
  await fillDetails(canvasElement);
};

export const Success = Template.bind({});
const successSession = fakeSession();
Success.parameters = {
  msw: {
    handlers: [
      // Mock not loggedin
      mockSessionResponse(200, emptySession),
      // Mock long running request
      mockLoginResponse(
        200,
        { session: successSession, message: `Welcome ${successSession.firstName}` },
        false,
        1000,
      ),
    ],
  },
};
Success.play = async ({ canvasElement }) => {
  await fillDetails(canvasElement);
};
