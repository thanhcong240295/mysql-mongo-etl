import { MESSAGE } from './constants';
import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

export class ForbiddenResponse extends ResponseSuccess {
  constructor(message = MESSAGE.FORBIDDEN) {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}
