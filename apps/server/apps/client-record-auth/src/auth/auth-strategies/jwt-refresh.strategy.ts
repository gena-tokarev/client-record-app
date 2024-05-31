import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/token.payload';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Env } from '@client-record/server-shared/types/env.interface';
import { ErrorMessagesEnum } from '@client-record/server-shared/enums/error-messages.enum';
import { User } from '@client-record/data-source/core/models/user.model';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  StrategyNamesEnum.JWT_REFRESH,
) {
  constructor(
    configService: ConfigService<Env>,
    @Inject('CORE_SERVICE') private readonly coreServiceClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      requestKey: 'tokenPayload',
    });
  }

  async validate(tokenPayload: TokenPayload): Promise<User> {
    const user$ = this.coreServiceClient.send<User, number>(
      'find_user_by_id',
      tokenPayload.sub,
    );

    const user = await lastValueFrom(user$);

    if (!user) {
      throw new UnauthorizedException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }
}
