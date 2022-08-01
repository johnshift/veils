import { ChangeEventHandler } from 'react';

import { TextInput } from '@mantine/core';

import { PLACEHOLDER_PRINCIPAL } from '@auth/core-login';

type Props = {
  isInvalid: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const PrincipalInput = ({ isInvalid, value, onChange }: Props) => (
  <TextInput
    required
    data-autofocus
    placeholder={PLACEHOLDER_PRINCIPAL}
    error={isInvalid}
    value={value}
    onChange={onChange}
  />
);
