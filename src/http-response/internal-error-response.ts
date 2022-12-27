import { MESSAGE } from './constants';
import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

export class InternalErrorResponse extends ResponseSuccess {
  constructor(message = MESSAGE.INTERNAL_ERROR) {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}
