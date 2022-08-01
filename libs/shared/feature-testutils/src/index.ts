import userEvent from '@testing-library/user-event';

// Wrapper
export { TestWrapper } from './lib/test-wrapper';

// Re-export
export * from '@testing-library/react';

// Override render
export { customRender as render } from './lib/custom-render';

// User event
export const user = userEvent.setup();
