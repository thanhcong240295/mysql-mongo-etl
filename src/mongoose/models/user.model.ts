import { IUserModel } from '@/mongoose';
import { Schema, SchemaTypes, model } from 'mongoose';

import config from '@/config';
import { mongooseConstants } from '@/constants';
import { MongooseConvert, MongooseTransform } from '@/utils';

import { baseSchema } from './base.model';

const userSchema: Schema = new Schema(
  {
    _id: {
      type: SchemaTypes.ObjectId,
      required: false,
      auto: true,
      get: MongooseConvert.convertObjectIdToString,
    },
    email: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    nick_name: { type: String, required: false },
    password: { type: String, required: false },
    ...baseSchema,
  },
  {
    timestamps: {
      createdAt: mongooseConstants.TimestampSchema.createDate,
      updatedAt: mongooseConstants.TimestampSchema.updateDate,
    },
    collation: {
      locale: config.mongoose.collationLocale,
      strength: 1,
    },
    toJSON: {
      getters: true,
      transform: MongooseTransform.transformObject,
    },
  },
);

export const UserModel = model<IUserModel>(
  mongooseConstants.ModelName.user,
  userSchema,
  mongooseConstants.CollectionName.user,
);
