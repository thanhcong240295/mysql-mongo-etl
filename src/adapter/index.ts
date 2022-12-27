import { DataTransferMethod } from '@/enums';
import { TransformData } from '@/transform';
import { MongooseConnection, MySQLConnection, logger } from '@/utils';

export class DataTransferAdapter {
  private readonly _tableName: string;
  private readonly _sourceId: string;
  private readonly _method: DataTransferMethod;

  constructor(tableName: string, sourceId: string, method: DataTransferMethod) {
    this._sourceId = sourceId;
    this._tableName = tableName;
    this._method = method;
  }

  private async getRepo() {
    logger.info(`Start get repo: ${JSON.stringify({ entityName: `${this._tableName}sEntity` })}`);

    const mysql = await MySQLConnection.getConnection();

    return mysql?.getRepository(`${this._tableName}sEntity`);
  }

  private async getCollection() {
    logger.info(
      `Start get collection: ${JSON.stringify({
        collection: this._tableName.toLocaleLowerCase(),
      })}`,
    );

    const mongoose = await MongooseConnection.getConnection();
    const db = mongoose?.connection;

    return db?.collection(this._tableName.toLocaleLowerCase());
  }

  private async getData() {
    logger.info(`Start get data from Mysql: ${JSON.stringify({ id: this._sourceId })}`);

    const repo = await this.getRepo();

    const res = await repo?.findOneBy({ id: this._sourceId });

    return res;
  }

  private async storeData(data: any) {
    logger.info(
      `Start store data to mongodb: ${JSON.stringify({ ...data, ref_id: this._sourceId })}`,
    );

    const collection = await this.getCollection();

    const res = await collection?.insertOne({ ...data, ref_id: this._sourceId });

    return res;
  }

  private async deleteData() {
    logger.info(`Start delete data from mongodb: ${JSON.stringify({ ref_id: this._sourceId })}`);

    const collection = await this.getCollection();

    const res = await collection?.deleteOne({ ref_id: this._sourceId });

    return res;
  }

  async transformData() {
    logger.info('Start transform data');

    if (this._method === DataTransferMethod.DELETE) {
      return this.deleteData();
    }

    const dataSource = await this.getData();

    const data = new TransformData(this._tableName, dataSource);

    await this.storeData(data.dataDestination);
  }
}
