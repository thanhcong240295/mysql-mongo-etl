import { MESSAGE } from './constants';
import { ErrorType } from './enum';
import { ResponseError } from './response-error';

export class InternalError extends ResponseError {
  constructor(message = MESSAGE.INTERNAL_ERROR) {
    super(ErrorType.INTERNAL, message);
  }
}
