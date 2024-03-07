import { Response } from 'express';
import { TokenNamesEnum } from '../../../enums/token-names.enum';

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
