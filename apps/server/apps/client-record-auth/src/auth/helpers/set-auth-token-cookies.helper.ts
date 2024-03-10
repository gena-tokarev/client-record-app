import { TokenNamesEnum } from 'apps/client-record-auth/src/auth/types/token-names.enum';
import { Response } from 'express';

export function setAuthTokenCookiesHelper(
  res: Response,
  name: TokenNamesEnum,
  value: string,
) {
  res.cookie(name, value, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: name === TokenNamesEnum.REFRESH,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}
