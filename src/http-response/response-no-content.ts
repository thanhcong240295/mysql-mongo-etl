import { MESSAGE } from './constants';
import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

export class NoContentResponse extends ResponseSuccess {
  constructor(message = MESSAGE.NO_CONTENT) {
    super(StatusCode.FAILURE, ResponseStatus.NO_CONTENT, message);
  }
}
