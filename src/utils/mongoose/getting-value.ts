export abstract class MongooseGettingValue {
  static getDecimalValue(value: any) {
    return parseFloat(value);
  }
}
