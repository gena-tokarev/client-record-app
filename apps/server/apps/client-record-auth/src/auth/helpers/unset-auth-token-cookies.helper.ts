import { TokenNamesEnum } from 'apps/client-record-auth/src/auth/types/token-names.enum';
import { Response } from 'express';

export function unsetAuthTokenCookiesHelper(
  res: Response,
  name: TokenNamesEnum,
) {
  res.cookie(name, '', {
    expires: new Date(0),
    httpOnly: name === TokenNamesEnum.ACCESS,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}
