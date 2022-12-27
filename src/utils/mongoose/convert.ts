import { Types } from 'mongoose';

export abstract class MongooseConvert {
  static convertObjectIdToString(value: Types.ObjectId) {
    return String(value);
  }
}
