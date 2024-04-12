import { Test } from '@nestjs/testing';
import { AuthDuplicatedEmailErrorInterceptor } from './duplicated-email-error.interceptor';
import {
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { SymbolKeysRegistryEnum } from '@client-record/server/shared/enums/symbol-keys.registry.enum';
import { ErrorNamesEnum } from '@client-record/server/shared/enums/error-names.enum';

describe('AuthDuplicatedEmailErrorInterceptor', () => {
  let interceptor: AuthDuplicatedEmailErrorInterceptor;
  let executionContext: ExecutionContext;
  let callHandler: CallHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthDuplicatedEmailErrorInterceptor],
    }).compile();

    interceptor = moduleRef.get<AuthDuplicatedEmailErrorInterceptor>(
      AuthDuplicatedEmailErrorInterceptor,
    );
    executionContext = {} as ExecutionContext;
    callHandler = {
      handle: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should catch AuthDuplicatedEmailError and throw a ConflictException', (done) => {
    const duplicatedEmailError = new Error('Duplicated Email Error');
    duplicatedEmailError[Symbol.for(SymbolKeysRegistryEnum.ERROR_ID)] =
      ErrorNamesEnum.AUTH_DUPLICATED_EMAIL_ERROR;

    jest
      .spyOn(callHandler, 'handle')
      .mockReturnValueOnce(throwError(() => duplicatedEmailError));

    interceptor.intercept(executionContext, callHandler).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(ConflictException);
        expect(err.message).toEqual(ErrorNamesEnum.AUTH_DUPLICATED_EMAIL_ERROR);
        done();
      },
    });
  });

  it('should not catch other errors', (done) => {
    const otherError = new Error('Other Error');

    jest
      .spyOn(callHandler, 'handle')
      .mockReturnValueOnce(throwError(() => otherError));

    interceptor.intercept(executionContext, callHandler).subscribe({
      error: (err) => {
        expect(err).toBe(otherError);
        done();
      },
    });
  });

  it('should pass the result without any errors', (done) => {
    const user = { id: 1, email: 'test@example.com' };

    jest.spyOn(callHandler, 'handle').mockReturnValueOnce(of(user));

    interceptor.intercept(executionContext, callHandler).subscribe({
      next: (result) => {
        expect(result).toBe(user);
        done();
      },
    });
  });
});
