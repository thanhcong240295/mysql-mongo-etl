import { MESSAGE } from './constants';
import { ErrorType } from './enum';
import { ResponseError } from './response-error';

export class NoEntryError extends ResponseError {
  constructor(message = MESSAGE.ENTRY_NOT_EXISTS) {
    super(ErrorType.NO_ENTRY, message);
  }
}
