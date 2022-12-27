import { CustomHelpers } from 'joi';

const objectId = (value: string, helpers: CustomHelpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message({ custom: '"{{#label}}" must be a valid mongo id' });
  }
  return value;
};

const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 8) {
    return helpers.message({ custom: 'password must be at least 8 characters' });
  }
  if (!value.match(/\d/) ?? !value.match(/[a-zA-Z]/)) {
    return helpers.message({ custom: 'password must contain at least 1 letter and 1 number' });
  }
  return value;
};

const phoneNumber = (value: string, helpers: CustomHelpers) => {
  const phoneFormat1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const phoneFormat2 = /^\+?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

  if (value.match(phoneFormat1) ?? value.match(phoneFormat2)) {
    return value;
  }

  return helpers.message({ custom: 'Invalid phone number' });
};

export { objectId, password, phoneNumber };
