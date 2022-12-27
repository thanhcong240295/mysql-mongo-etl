import mongoose, { Mongoose } from 'mongoose';

import config from '@/config';
import { logger } from '@/utils';

export class MongooseConnection {
  private static isConnected: boolean = false;
  private static db: Mongoose;

  public static async getConnection() {
    if (this.isConnected) {
      return this.db;
    }

    this.db = await this.connect();
  }

  private static async connect() {
    try {
      const con = await mongoose.connect(config.mongoose.url);

      this.isConnected = true;

      logger.info('Mongoose connection is OK');

      return con;
    } catch (error) {
      logger.error(error);
      logger.info('Mongoose connection is BAD');
      throw error;
    }
  }
}
