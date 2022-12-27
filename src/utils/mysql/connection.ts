import { DataSource } from 'typeorm';

import config from '@/config';
import { UsersEntity } from '@/mysql/entities/user.entity';
import { logger } from '@/utils';

export class MySQLConnection {
  private static isConnected: boolean = false;
  private static db: DataSource;

  public static async getConnection() {
    if (this.isConnected) {
      return this.db;
    }

    this.db = await this.connect();
  }

  private static async connect() {
    try {
      const con = new DataSource({
        type: 'mysql',
        url: config.mysql.url,
        entities: [UsersEntity],
      });

      await con.initialize();

      this.isConnected = true;

      logger.info('MySQL connection is OK');

      return con;
    } catch (error) {
      logger.error(error);
      logger.info('MySQL connection is BAD');
      throw error;
    }
  }
}
