import { IValidateData } from './type';

export abstract class Validate {
  static isEmail(email: string): IValidateData {
    const mailFormat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailFormat)) {
      return {
        isError: true,
        messageError: 'Email is wrong format.',
      };
    }
    return {
      isError: false,
    };
  }

  static isPassword(password: string): IValidateData {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})',
    );
    const mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
    );

    if (strongRegex.test(password)) {
      return {
        isError: false,
        messageError: 'Strong',
      };
    } else if (mediumRegex.test(password)) {
      return {
        isError: false,
        messageError: 'Medium',
      };
    }
    return {
      isError: true,
      messageError: 'Serious',
    };
  }

  static isPhoneNumber(phoneNumber: string): IValidateData {
    const phoneFormat1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const phoneFormat2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

    if (phoneNumber.match(phoneFormat1) ?? phoneNumber.match(phoneFormat2)) {
      return {
        isError: false,
      };
    }
    return {
      isError: true,
      messageError: 'Phone number is wrong.',
    };
  }

  static isCurrency(amount: string): IValidateData {
    const currencyRegex = /^\d+(?:\.\d{0,2})$/;
    if (currencyRegex.test(amount)) {
      return {
        isError: false,
      };
    }
    return {
      isError: true,
      messageError: 'Amount is wrong format.',
    };
  }

  // eslint-disable-next-line no-unused-vars
  static isDateTime(dateTime: string): IValidateData {
    return {
      isError: false,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static isFile(path: string, fileExtensions?: string[]): IValidateData {
    return {
      isError: false,
    };
  }

  static isJsonString(json: string): boolean {
    try {
      const jsonPare = JSON.parse(json);
      return typeof jsonPare === 'object';
    } catch (e) {
      return false;
    }
  }

  static isStringArray(value: any): boolean {
    if (Array.isArray(value)) {
      let result = true;

      value.forEach((item: any) => {
        if (typeof item !== 'string') {
          result = false;
        }
      });

      return result;
    }

    return false;
  }

  static isString(value: any): boolean {
    return typeof value !== 'undefined' && typeof value === 'string';
  }
}
