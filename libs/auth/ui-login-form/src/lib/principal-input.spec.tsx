import { PLACEHOLDER_PRINCIPAL } from '@auth/core-login';
import { render, screen, user } from '@shared/ui-testutils';

import { PrincipalInput } from './principal-input';

describe('PrincipalInput', () => {
  test('default', async () => {
    // Arrange props

    const isInvalid = false;
    const value = '';
    const onChange = jest.fn();

    render(
      <PrincipalInput
        isInvalid={isInvalid}
        value={value}
        onChange={onChange}
      />,
    );

    // Assert default
    const input = screen.getByPlaceholderText(PLACEHOLDER_PRINCIPAL);
    expect(input).toBeEnabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).toHaveValue(value);

    // Assert onChange
    await user.type(input, '12345');
    expect(onChange).toHaveBeenCalledTimes(5);
  });

  test('isInvalid', async () => {
    // Arrange props

    const isInvalid = true;
    const value = '';
    const onChange = jest.fn();

    render(
      <PrincipalInput
        isInvalid={isInvalid}
        value={value}
        onChange={onChange}
      />,
    );

    // Assert disabled
    expect(screen.getByPlaceholderText(PLACEHOLDER_PRINCIPAL)).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});
