import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserSignInRequestDto } from '../dto/request/user-sign-in.request.dto';
import { UserService } from '../../User/user.service';
import { ErrorMessagesEnum } from '../../../enums/error-messages.enum';
import { User } from '../../User/user.model';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  StrategyNamesEnum.LOCAL,
) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  async validate(
    username: UserSignInRequestDto['username'],
    password: UserSignInRequestDto['password'],
  ): Promise<User> {
    const user = await this.userService.findByUsername(username);

    if (!user || !user.password) {
      throw new UnauthorizedException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    if (await this.authService.isValidPassword(password, user.password)) {
      return user;
    }

    throw new UnauthorizedException(
      ErrorMessagesEnum.USERNAME_OR_PASSWORD_INCORRECT,
    );
  }
}
