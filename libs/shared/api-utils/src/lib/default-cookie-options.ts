import { CookieSerializeOptions } from 'cookie';

export const defaultCookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60,
  path: '/',
  sameSite: 'strict',
  secure: process.env['NODE_ENV'] === 'production',
} as CookieSerializeOptions;
