import { ComponentMeta, ComponentStory } from '@storybook/react';
import { screen, userEvent, within } from '@storybook/testing-library';

import {
  ERR_INCORRECT_LOGIN,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PRINCIPAL,
} from '@auth/core-login';
import { MSG_LOGOUT_DONE } from '@auth/core-logout';
import { emptySession } from '@auth/core-session';
import { mockLoginResponse } from '@auth/util-test-login';
import { mockLogoutResponse } from '@auth/util-test-logout';
import { fakeSession, mockSessionResponse } from '@auth/util-test-session';
import { ERR_INTERNAL } from '@shared/core-common';

import { Appbar } from './appbar';

export default {
  title: 'ui-appbar/LoginModal',
  component: Appbar,
} as ComponentMeta<typeof Appbar>;

const Template: ComponentStory<typeof Appbar> = () => <Appbar />;

export const SessionLoading = Template.bind({});
SessionLoading.parameters = {
  msw: {
    handlers: [
      // Mock session loading
      mockSessionResponse(400, emptySession, false, 1000 * 60),
    ],
  },
};
SessionLoading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Open menu
  userEvent.click(canvas.getByRole('button', { name: 'open appbar menu' }));
};

// Submit login util fn
const submitLogin = async (
  canvasElement: HTMLElement,
  principal?: string,
  password?: string,
) => {
  const canvas = within(canvasElement);

  // Open menu
  userEvent.click(canvas.getByRole('button', { name: 'open appbar menu' }));

  // Open login form
  await userEvent.click(await screen.findByRole('menuitem', { name: 'Login' }));

  // Components
  const principalInput = await screen.findByPlaceholderText(
    PLACEHOLDER_PRINCIPAL,
  );
  const passwordInput = await screen.findByPlaceholderText(
    PLACEHOLDER_PASSWORD,
  );

  // Type invalid payload
  await userEvent.type(principalInput, principal || 'demo');
  await userEvent.type(passwordInput, password || '123456');
  await userEvent.keyboard('{Enter}');
};

export const LoginValidationError = Template.bind({});
LoginValidationError.parameters = {
  msw: {
    handlers: [
      // Mock not logged in
      mockSessionResponse(200, emptySession),
      // No need to mock login response
      // since request does not passthrough during validation
    ],
  },
};
LoginValidationError.play = async ({ canvasElement }) => {
  await submitLogin(canvasElement, 'demo!');
};

export const LoginNetworkError = Template.bind({});
LoginNetworkError.parameters = {
  msw: {
    handlers: [
      // Mock not logged in
      mockSessionResponse(200, emptySession),
      // Mock login response
      mockLoginResponse(400, undefined, true),
    ],
  },
};
LoginNetworkError.play = async ({ canvasElement }) => {
  await submitLogin(canvasElement);
};

export const LoginApiError = Template.bind({});
LoginApiError.parameters = {
  msw: {
    handlers: [
      // Mock not logged in
      mockSessionResponse(200, emptySession),
      // Mock login response
      mockLoginResponse(400, { message: ERR_INCORRECT_LOGIN }, false, 1000),
    ],
  },
};
LoginApiError.play = async ({ canvasElement }) => {
  await submitLogin(canvasElement);
};

export const LoginInternalError = Template.bind({});
LoginInternalError.parameters = {
  msw: {
    handlers: [
      // Mock not logged in
      mockSessionResponse(200, emptySession),
      // Mock login response
      mockLoginResponse(500, { message: ERR_INTERNAL }, false, 1000),
    ],
  },
};
LoginInternalError.play = async ({ canvasElement }) => {
  await submitLogin(canvasElement);
};

export const LoginSuccess = Template.bind({});
const loginSuccessSession = fakeSession();
LoginSuccess.parameters = {
  msw: {
    handlers: [
      // Mock not logged in
      mockSessionResponse(200, emptySession),
      // Mock login response
      mockLoginResponse(
        200,
        {
          session: loginSuccessSession,
          message: `Welcome ${loginSuccessSession.firstName}`,
        },
        false,
        1000,
      ),
    ],
  },
};
LoginSuccess.play = async ({ canvasElement }) => {
  await submitLogin(canvasElement);
};

export const LogoutNetworkError = Template.bind({});
LogoutNetworkError.parameters = {
  msw: {
    handlers: [
      // Mock logged in
      mockSessionResponse(200, fakeSession()),
      // Mock logout response
      mockLogoutResponse(400, undefined, true),
    ],
  },
};
LogoutNetworkError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Open menu
  userEvent.click(canvas.getByRole('button', { name: 'open appbar menu' }));

  // Open login form
  await userEvent.click(
    await screen.findByRole('menuitem', { name: 'Logout' }),
  );
};

export const LogoutInternalError = Template.bind({});
LogoutInternalError.parameters = {
  msw: {
    handlers: [
      // Mock logged in
      mockSessionResponse(200, fakeSession()),
      // Mock logout response
      mockLogoutResponse(500, { message: ERR_INTERNAL }, false, 1000),
    ],
  },
};
LogoutInternalError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Open menu
  userEvent.click(canvas.getByRole('button', { name: 'open appbar menu' }));

  // Open login form
  await userEvent.click(
    await screen.findByRole('menuitem', { name: 'Logout' }),
  );
};

export const LogoutSuccess = Template.bind({});
LogoutSuccess.parameters = {
  msw: {
    handlers: [
      // Mock logged in
      mockSessionResponse(200, fakeSession()),
      // Mock logout response
      mockLogoutResponse(200, { message: MSG_LOGOUT_DONE }, false, 1000),
    ],
  },
};
LogoutSuccess.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Open menu
  userEvent.click(canvas.getByRole('button', { name: 'open appbar menu' }));

  // Open login form
  await userEvent.click(
    await screen.findByRole('menuitem', { name: 'Logout' }),
  );
};
