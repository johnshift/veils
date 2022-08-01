import { ChangeEventHandler } from 'react';

import { TextInput } from '@mantine/core';

import { PLACEHOLDER_PRINCIPAL } from '@auth/core-login/constants';

type Props = {
  isLoading: boolean;
  isInvalid: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const PrincipalInput = ({ isLoading, isInvalid, value, onChange }: Props) => (
  <TextInput
    required
    placeholder={PLACEHOLDER_PRINCIPAL}
    error={isInvalid}
    disabled={isLoading}
    value={value}
    onChange={onChange}
  />
);
