import { Validate } from '../validation';

export abstract class MongooseTransform {
  static transformObject(doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    function toCamel(source: any) {
      const result: any = {};

      if (source instanceof Array) {
        return source.map((value) => {
          if (typeof value === 'object') {
            value = toCamel(value);
          }

          return value;
        });
      } else {
        for (const origKey in source) {
          // eslint-disable-next-line no-prototype-builtins
          if (source.hasOwnProperty(origKey)) {
            let value: any;

            let newKey: string = '';
            for (let i = 0; i < origKey.length; i++) {
              const char = origKey[i];

              if (char === '_') {
                newKey += origKey[i + 1].toUpperCase();

                i += 1;
              } else {
                newKey += char;
              }
            }

            value = source[origKey];
            if (value instanceof Array || (value !== null && value.constructor === Object)) {
              value = toCamel(value);
            }

            const isJsonString = Validate.isJsonString(value);
            if (isJsonString) {
              const json = JSON.parse(value);

              value = toCamel(json);
            }

            result[newKey] = value;
          }
        }
      }

      return result;
    }

    return toCamel(ret);
  }
}
