import { DataTransferTableName } from '@/enums';
import { logger } from '@/utils';

export class TransformData {
  private readonly _tableName: string;
  private readonly _sourceData: any;
  public dataDestination: any;

  constructor(tableName: string, source: any) {
    this._sourceData = source;
    this._tableName = tableName;

    this.transform();
  }

  private transform() {
    logger.info('Start transform data');

    switch (this._tableName.toLocaleLowerCase()) {
      case DataTransferTableName.User:
        this.dataDestination = {
          name: this._sourceData.name,
          email: this._sourceData.email,
        };

        return this.dataDestination;

      default:
        throw Error('Not support.');
    }
  }
}
