import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../../types/env.interface';
import { TokenPayload } from '../types/token.payload';
import { User } from '../../User/user.model';
import { UserService } from '../../User/user.service';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';

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
