import { ERR_INVALID_REQUEST } from '@shared/core-common';

import { parsePayload } from './parse-payload';

describe('parsePayload', () => {
  test('object type', async () => {
    // Mock body
    const testBody = {
      message: 'test-message',
    };

    expect(parsePayload(testBody)).resolves.toBe(testBody);
  });

  test('string', async () => {
    // Mock body
    const testBody = '{"message":"test-message"}';

    expect(await parsePayload(testBody)).toStrictEqual({
      message: 'test-message',
    });
  });

  test('unparseable string', async () => {
    // Mock body
    const testBody = '{"message":"test-message"';

    expect(parsePayload(testBody)).rejects.toThrow(ERR_INVALID_REQUEST);
  });

  test('undefined', async () => {
    // Assert error
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(parsePayload(undefined)).rejects.toThrow(ERR_INVALID_REQUEST);
  });

  test('null', async () => {
    // Assert null
    expect(parsePayload(null)).rejects.toThrow(ERR_INVALID_REQUEST);
  });

  test('default', async () => {
    // Assert error
    expect(parsePayload(123)).rejects.toThrow(ERR_INVALID_REQUEST);
  });
});
