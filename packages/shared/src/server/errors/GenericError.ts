import { ErrorNamesEnum } from '../enums/error-names.enum';
import { SymbolKeysRegistryEnum } from '../enums/symbol-keys.registry.enum';

export class GenericError extends Error {
  constructor(name: ErrorNamesEnum, message: string) {
    super(message);
    this[Symbol.for(SymbolKeysRegistryEnum.ERROR_ID)] = name;
  }
}
