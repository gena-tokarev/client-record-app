import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/token.payload';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';
import { User, UserService } from '@client-record/user';
import { Env } from '@client-record/shared/types/env.interface';
import { ErrorMessagesEnum } from '@client-record/shared/enums/error-messages.enum';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  StrategyNamesEnum.JWT_REFRESH,
) {
  constructor(
    configService: ConfigService<Env>,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      requestKey: 'tokenPayload',
    });
  }

  async validate(tokenPayload: TokenPayload): Promise<User> {
    const user = await this.userService.findById(tokenPayload.sub);

    if (!user) {
      throw new UnauthorizedException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }
}
