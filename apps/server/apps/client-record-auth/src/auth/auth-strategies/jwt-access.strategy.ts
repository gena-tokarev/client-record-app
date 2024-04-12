import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/token.payload';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';
import { Env } from '@client-record/server/shared/types/env.interface';
import { ErrorMessagesEnum } from '@client-record/server/shared/enums/error-messages.enum';
import { User } from '@client-record/server/data-source/core/models/user.model';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  StrategyNamesEnum.JWT_ACCESS,
) {
  constructor(
    configService: ConfigService<Env>,
    @Inject('CORE_SERVICE') private readonly coreServiceClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
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
