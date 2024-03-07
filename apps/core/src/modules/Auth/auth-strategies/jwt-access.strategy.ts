import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../../types/env.interface';
import { TokenPayload } from '../types/token.payload';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';
import { User } from '../../User/user.model';
import { ErrorMessagesEnum } from '../../../enums/error-messages.enum';
import { UserService } from '../../User/user.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  StrategyNamesEnum.JWT_ACCESS,
) {
  constructor(
    configService: ConfigService<Env>,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
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
