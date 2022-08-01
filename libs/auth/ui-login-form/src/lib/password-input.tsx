import { ChangeEventHandler } from 'react';

import { PasswordInput as BasePasswordInput } from '@mantine/core';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons';

import {
  PLACEHOLDER_PASSWORD,
  TESTID_PASSWORD_VISIBILITY,
} from '@auth/core-login/constants';

type Props = {
  isLoading: boolean;
  isInvalid: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const PasswordInput = ({ isLoading, isInvalid, value, onChange }: Props) => (
  <BasePasswordInput
    required
    label={PLACEHOLDER_PASSWORD}
    placeholder={PLACEHOLDER_PASSWORD}
    error={isInvalid}
    disabled={isLoading}
    value={value}
    visibilityToggleIcon={({ reveal, size }) => (
      <div data-testid={TESTID_PASSWORD_VISIBILITY}>
        {reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />}
      </div>
    )}
    onChange={onChange}
  />
);
