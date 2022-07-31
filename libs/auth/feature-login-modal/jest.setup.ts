import '@testing-library/jest-dom';

// Testing-library user-event is incredibly slow
// It tries to mimic what an actual user interaction does
// Therefore we increase jest timeout
jest.setTimeout(15_000);
