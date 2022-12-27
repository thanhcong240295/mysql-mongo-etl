import { MESSAGE } from './constants';
import { ErrorType } from './enum';
import { ResponseError } from './response-error';

export class ForbiddenError extends ResponseError {
  constructor(message = MESSAGE.PERMISSION_DENIED) {
    super(ErrorType.FORBIDDEN, message);
  }
}
