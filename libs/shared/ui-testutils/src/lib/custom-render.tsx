import { ReactElement } from 'react';

import { RenderOptions, render } from '@testing-library/react';

import { TestWrapper } from './test-wrapper';

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: TestWrapper, ...options });
