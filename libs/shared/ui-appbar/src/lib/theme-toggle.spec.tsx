import { render, screen, user } from '@shared/ui-testutils';

import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  test('light theme', async () => {
    // Arrange props
    const isDark = false;
    const toggleTheme = jest.fn();

    // Render component
    render(<ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />);

    // Assert light theme components
    const button = await screen.findByRole('button', {
      name: 'toggle dark theme',
    });
    expect(button.firstChild).toHaveClass('icon-tabler-moon-stars');

    // Assert button can be clicked
    await user.click(screen.getByRole('button', { name: 'toggle dark theme' }));
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  test('dark theme', async () => {
    // Arrange props
    const isDark = true;
    const toggleTheme = jest.fn();

    // Render component
    render(<ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />);

    // Assert light theme components
    const button = await screen.findByRole('button', {
      name: 'toggle light theme',
    });
    expect(button.firstChild).toHaveClass('icon-tabler-sun');

    // Assert button can be clicked
    await user.click(
      screen.getByRole('button', { name: 'toggle light theme' }),
    );
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
