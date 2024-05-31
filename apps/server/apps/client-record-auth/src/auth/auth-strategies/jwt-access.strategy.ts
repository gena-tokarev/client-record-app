import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/token.payload';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@client-record/server-shared/types/env.interface';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';
import { AuthService } from '../auth.service';
import { lastValueFrom } from 'rxjs';
import { ErrorMessagesEnum } from '@client-record/server-shared/enums/error-messages.enum';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  StrategyNamesEnum.JWT_ACCESS,
) {
  constructor(
    configService: ConfigService<Env>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request?.token,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      requestKey: 'tokenPayload',
    });
  }

  async validate(tokenPayload: TokenPayload) {
    const user$ = this.authService.findUserByUsername(tokenPayload.username);

    const user = await lastValueFrom(user$);

    if (!user) {
      throw new UnauthorizedException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }
}
