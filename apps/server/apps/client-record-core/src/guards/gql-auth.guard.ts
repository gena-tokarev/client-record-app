import { ErrorMessagesEnum } from '@client-record/server-shared/enums/error-messages.enum';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException(ErrorMessagesEnum.NO_TOKEN);
    }

    try {
      await lastValueFrom(
        this.authServiceClient.send('validate_token', {
          token,
        }),
      );
    } catch (error) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHENTICATED);
    }

    return true;
  }
}
