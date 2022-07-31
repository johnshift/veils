import { render, screen, user, waitFor } from '@shared/ui-testutils';

import { AuthModal } from './auth-modal';

describe('AuthModal', () => {
  test('opened', async () => {
    // Arrange props
    const isOpen = true;
    const onClose = jest.fn();
    const contentTestId = 'test-content';
    const content = <div data-testid={contentTestId}>hello world</div>;

    // Render component
    render(
      <AuthModal isOpen={isOpen} onClose={onClose}>
        {content}
      </AuthModal>,
    );

    // Assert content present
    await screen.findByTestId(contentTestId);

    // Assert onClose is called
    // Need two escapes: for focus, for closing
    await user.keyboard('{Escape}{Escape}');
    expect(onClose).toBeCalled();
  });

  test('closed', async () => {
    // Arrange props
    const isOpen = false;
    const onClose = jest.fn();
    const contentTestId = 'test-content';
    const content = <div data-testid={contentTestId}>hello world</div>;

    // Render component
    render(
      <AuthModal isOpen={isOpen} onClose={onClose}>
        {content}
      </AuthModal>,
    );

    // Assert content is not present
    expect(screen.queryByTestId(contentTestId)).not.toBeInTheDocument();
  });
});
