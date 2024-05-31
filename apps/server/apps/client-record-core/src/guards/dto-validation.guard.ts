import {
  CanActivate,
  ExecutionContext,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { formatValidationErrorMessage } from '../../../client-record-auth/src/utils/format-validation-error-message';

export function DtoValidationGuard(dtoClass: any) {
  class DtoValidator<T extends {}> implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      if (!dtoClass) {
        return true;
      }

      const request = context.switchToHttp().getRequest();

      const data = request.body;
      const dtoInstance = new dtoClass();
      Object.assign(dtoInstance, data);

      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        const formattedErrors = formatValidationErrorMessage(errors);
        throw new UnprocessableEntityException(formattedErrors);
      }

      return true;
    }
  }

  return DtoValidator;
}
