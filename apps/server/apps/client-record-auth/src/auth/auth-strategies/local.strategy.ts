import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ErrorMessagesEnum } from '@client-record/server-shared/enums/error-messages.enum';
import { User } from '@client-record/data-source/core/models/user.model';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserSignInRequestDto } from '@client-record/packages/shared/dto/user-sign-in.request.dto';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  StrategyNamesEnum.LOCAL,
) {
  constructor(
    private authService: AuthService,
    @Inject('CORE_SERVICE') private readonly coreServiceClient: ClientProxy,
  ) {
    super();
  }

  async validate(
    username: UserSignInRequestDto['username'],
    password: UserSignInRequestDto['password'],
  ): Promise<User> {
    const user$ = this.coreServiceClient.send<User, string>(
      'find_user_by_username',
      username,
    );

    const user = await lastValueFrom(user$);

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
