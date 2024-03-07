import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../../User/user.model';
import { ErrorNamesEnum } from '../../../enums/error-names.enum';
import { SymbolKeysRegistryEnum } from '../../../enums/symbol-keys.registry.enum';

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
