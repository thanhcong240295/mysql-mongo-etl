import { SchemaTypes } from 'mongoose';

import { mongooseConstants } from '@/constants';

export const baseSchema = {
  create_date: { type: Date, required: false },
  create_by: {
    type: SchemaTypes.ObjectId,
    required: false,
    ref: mongooseConstants.ModelName.user,
  },
  update_date: { type: Date, required: false },
  update_by: {
    type: SchemaTypes.ObjectId,
    required: false,
    ref: mongooseConstants.ModelName.user,
  },
  is_delete: { type: Boolean, default: false, required: false },
};
