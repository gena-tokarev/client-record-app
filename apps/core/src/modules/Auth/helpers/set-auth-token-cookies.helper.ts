import { Response } from 'express';
import { TokenNamesEnum } from '../../../enums/token-names.enum';

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
