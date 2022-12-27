import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

export class SuccessMsgResponse extends ResponseSuccess {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}
