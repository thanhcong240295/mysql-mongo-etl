import { MESSAGE } from './constants';
import { ErrorType } from './enum';
import { ResponseError } from './response-error';

export class NoDataError extends ResponseError {
  constructor(message = MESSAGE.NO_DATA_AVAILABLE) {
    super(ErrorType.NO_DATA, message);
  }
}
