import { setupServer } from 'msw/node';

import { fakeSession, mockSessionResponse } from '@auth/util-test-session';
import { render, screen, waitFor } from '@shared/data-testutils';

import { useSessionContext } from '../context/session-context';
import { SessionProvider } from './session-provider';

// Setup msw server
const mswServer = setupServer();
beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());

describe('SessionProvider', () => {
  test('values', async () => {
    // Mock session response
    const body = fakeSession();
    mswServer.use(mockSessionResponse(200, body, undefined, 200));

    // Test component
    const TestComponent = () => {
      const {
        id,
        username,
        veil,
        firstName,
        lastName,
        avatar,
        veilAvatar,
        isLoading,
      } = useSessionContext();

      return (
        <>
          <p data-testid="id">{id}</p>
          <p data-testid="username">{username}</p>
          <p data-testid="veil">{veil}</p>
          <p data-testid="firstName">{firstName}</p>
          <p data-testid="lastName">{lastName}</p>
          <p data-testid="avatar">{avatar}</p>
          <p data-testid="veilAvatar">{veilAvatar}</p>
          <p data-testid="isLoading">{isLoading.toString()}</p>
        </>
      );
    };

    // Render component
    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>,
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    });

    // Assert values
    expect(screen.getByTestId('id')).toHaveTextContent(body.id);
    expect(screen.getByTestId('username')).toHaveTextContent(body.username);
    expect(screen.getByTestId('veil')).toHaveTextContent(body.veil);
    expect(screen.getByTestId('firstName')).toHaveTextContent(body.firstName);
    expect(screen.getByTestId('lastName')).toHaveTextContent(body.lastName);
    expect(screen.getByTestId('avatar')).toHaveTextContent(body.avatar);
    expect(screen.getByTestId('veilAvatar')).toHaveTextContent(body.veilAvatar);
    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
  });
});
