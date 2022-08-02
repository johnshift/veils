import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Fix: "ReferenceError: ResizeObserver is not defined"
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

jest.setTimeout(15_000);
