import Joi from 'joi';

import { DataTransferMethod, DataTransferTableName } from '@/enums';

export abstract class HttpRequestValidation {
  static validate() {
    return {
      body: Joi.object().keys({
        id: Joi.number().min(0).required(),
        method: Joi.string()
          .valid(...Object.values(DataTransferMethod))
          .required(),
        table: Joi.string()
          .valid(...Object.keys(DataTransferTableName))
          .required(),
      }),
    };
  }
}
