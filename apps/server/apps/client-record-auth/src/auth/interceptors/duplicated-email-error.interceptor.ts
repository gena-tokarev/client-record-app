import { User } from '@client-record/server/data-source/core/models/user.model';
import { ErrorNamesEnum } from '@client-record/server/shared/enums/error-names.enum';
import { SymbolKeysRegistryEnum } from '@client-record/server/shared/enums/symbol-keys.registry.enum';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthDuplicatedEmailErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<User> {
    return next.handle().pipe(
      catchError((error) => {
        if (
          error[Symbol.for(SymbolKeysRegistryEnum.ERROR_ID)] ===
          ErrorNamesEnum.DUPLICATED_EMAIL
        ) {
          return throwError(() => new ConflictException(error));
        }
        return throwError(() => error);
      }),
    );
  }
}