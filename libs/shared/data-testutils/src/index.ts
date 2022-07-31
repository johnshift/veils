export { TestWrapper } from './lib/test-wrapper';

// Re-export
export * from '@testing-library/react';

// Override render
export { customRender as render } from './lib/custom-render';
