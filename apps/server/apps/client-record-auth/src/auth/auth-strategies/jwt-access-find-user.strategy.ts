import { Inject, Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/token.payload';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@client-record/server-shared/types/env.interface';
import { User } from '@client-record/data-source/core/models/user.model';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';

@Injectable()
export class JwtAccessFindUserStrategy extends PassportStrategy(
  Strategy,
  StrategyNamesEnum.JWT_ACCESS_FIND_USER,
) {
  constructor(
    configService: ConfigService<Env>,
    @Inject('CORE_SERVICE') private readonly coreServiceClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
      requestKey: 'tokenPayload',
    });
  }

  async validate(tokenPayload: TokenPayload): Promise<User | null> {
    const user$ = this.coreServiceClient.send<User, number>(
      'find_user_by_id',
      tokenPayload.sub,
    );

    const user = await lastValueFrom(user$);

    if (!user) {
      return null;
    }

    return user;
  }
}
