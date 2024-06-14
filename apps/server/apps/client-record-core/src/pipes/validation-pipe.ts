import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class ValidationPipe<T> implements PipeTransform<T> {
  constructor(private schema: ZodSchema<T>) {}

  transform(value: T): T {
    try {
      return this.schema.parse(value);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadRequestException(e.errors);
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
