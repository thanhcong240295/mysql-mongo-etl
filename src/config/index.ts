import 'dotenv/config';
import Joi from 'joi';

const envVarsSchema = Joi.object()
  .keys({
    // System
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),

    // Mongodb
    MONGO_HOST: Joi.string().required().description('Mongo DB host'),
    MONGO_PORT: Joi.string().required().description('Mongo DB port'),
    MONGO_DATABASE: Joi.string().required().description('Mongo DB database name'),
    MONGO_ROOT_USER: Joi.string().required().description('Mongo DB username'),
    MONGO_ROOT_PASSWORD: Joi.string().required().description('Mongo DB password'),
    COLLATION_LOCALE: Joi.string().required().description('Mongo DB local'),

    // MySQL
    MYSQL_HOST: Joi.string().required().description('MySQL DB host'),
    MYSQL_PORT: Joi.string().required().description('MySQL DB port'),
    MYSQL_DATABASE: Joi.string().required().description('MySQL DB database name'),
    MYSQL_ROOT_USER: Joi.string().required().description('MySQL DB username'),
    MYSQL_ROOT_PASSWORD: Joi.string().required().description('MySQL DB password'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  aws: {
    region: envVars.AWS_REGION,
    userPoolId: envVars.AWS_USER_POOL_ID,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    appClientId: envVars.AWS_APP_CLIENT_ID,
  },
  mongoose: {
    url: `mongodb://${envVars.MONGO_ROOT_USER}:${envVars.MONGO_ROOT_PASSWORD}@${envVars.MONGO_HOST}:${envVars.MONGO_PORT}/${envVars.MONGO_DATABASE}?authSource=admin`,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    collationLocale: envVars.COLLATION_LOCALE,
  },
  mysql: {
    url: `mysql://${envVars.MYSQL_ROOT_USER}:${envVars.MYSQL_ROOT_PASSWORD}@${envVars.MYSQL_HOST}:${envVars.MYSQL_PORT}/${envVars.MYSQL_DATABASE}`,
  },
};

export default config;
