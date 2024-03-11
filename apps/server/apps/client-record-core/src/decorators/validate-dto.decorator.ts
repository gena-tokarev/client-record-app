import { SetMetadata } from '@nestjs/common';

export const VALIDATED_DTO_METADATA_KEY = 'validate_dto';

export const ValidateDTO = (dtoClass: any) =>
  SetMetadata(VALIDATED_DTO_METADATA_KEY, dtoClass);
