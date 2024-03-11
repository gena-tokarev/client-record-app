import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/token.payload';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';
import { Env } from '@client-record/shared/types/env.interface';
import { User, UserService } from '@client-record/user';

@Injectable()
export class JwtAccessFindUserStrategy extends PassportStrategy(
  Strategy,
  StrategyNamesEnum.JWT_ACCESS_FIND_USER,
) {
  constructor(
    configService: ConfigService<Env>,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
      requestKey: 'tokenPayload',
    });
  }

  async validate(tokenPayload: TokenPayload): Promise<User | null> {
    const user = await this.userService.findById(tokenPayload.sub);

    if (!user) {
      return null;
    }

    return user;
  }
}