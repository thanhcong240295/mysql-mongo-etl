import { config as awsConfig } from 'aws-sdk';
import crypto from 'crypto';

import config from '@/config';

const configInstance = () => {
  awsConfig.update({
    region: config.aws.region || 'ap-southeast-1',
    secretAccessKey: config.aws.secretAccessKey,
    accessKeyId: config.aws.accessKeyId,
  });

  awsConfig.apiVersions = {
    stepfunctions: '2016-11-23',
    sqs: '2012-11-05',
    secretsmanager: '',
    s3: '2006-03-01',
    ses: '2010-12-01' || '2019-09-27',
    cloudwatchlogs: '2014-03-28',
    sns: '2010-03-31',
  };

  return awsConfig;
};

const generateHash = (username: string, clientId: string, clientHash: string) => {
  return crypto
    .createHmac('SHA256', clientHash)
    .update(username + clientId)
    .digest('base64');
};

export const awsClient = {
  configInstance,
  generateHash,
};
