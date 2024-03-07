import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';

@Injectable()
export class GraphqlJwtAccessGuard extends AuthGuard(StrategyNamesEnum.JWT_ACCESS) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
