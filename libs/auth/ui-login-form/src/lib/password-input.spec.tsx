import {
  PLACEHOLDER_PASSWORD,
  TESTID_PASSWORD_VISIBILITY,
} from '@auth/core-login/constants';
import { render, screen, user } from '@shared/ui-testutils';

import { PasswordInput } from './password-input';

describe('PasswordInput', () => {
  test('default', async () => {
    // Arrange props

    const isInvalid = false;
    const value = '';
    const onChange = jest.fn();

    render(<PasswordInput isInvalid={isInvalid} value={value} onChange={onChange} />);

    // Assert default
    const input = screen.getByPlaceholderText(PLACEHOLDER_PASSWORD);
    expect(input).toBeEnabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('type', 'password');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).toHaveValue(value);

    // Assert onChange
    await user.type(input, '12345');
    expect(onChange).toHaveBeenCalledTimes(5);

    // Assert toggle password
    const toggleVisibility = screen.getByTestId(TESTID_PASSWORD_VISIBILITY);
    await user.click(toggleVisibility);
    expect(input).toHaveAttribute('type', 'text');
    await user.click(toggleVisibility);
    expect(input).toHaveAttribute('type', 'password');
  });

  test('isInvalid', async () => {
    // Arrange props

    const isInvalid = true;
    const value = '';
    const onChange = jest.fn();

    render(<PasswordInput isInvalid={isInvalid} value={value} onChange={onChange} />);

    // Assert disabled
    expect(screen.getByPlaceholderText(PLACEHOLDER_PASSWORD).parentNode).toBeInvalid();
  });
});
