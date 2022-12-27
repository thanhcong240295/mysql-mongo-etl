import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

export class FailureMsgResponse extends ResponseSuccess {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}
