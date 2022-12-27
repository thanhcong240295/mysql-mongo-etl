import { CognitoIdentityServiceProvider } from 'aws-sdk';

import config from '@/config';

const getUserByPhoneNumber = async (phoneNumber: string) => {
  const cognito = new CognitoIdentityServiceProvider();

  const params: CognitoIdentityServiceProvider.ListUsersRequest = {
    Filter: `phone_number = "${phoneNumber}"`,
    UserPoolId: config.aws.userPoolId,
  };

  const res = await cognito.listUsers(params).promise();

  if (res.$response.error) {
    return Promise.reject(res.$response.error);
  }

  return res.Users?.[0];
};

const createNewUser = async (phoneNumber: string, password: string) => {
  const username = phoneNumber.split('+')[1];

  const cognito = new CognitoIdentityServiceProvider();

  const params: CognitoIdentityServiceProvider.SignUpRequest = {
    ClientId: config.aws.appClientId,
    Password: password,
    Username: username,
    UserAttributes: [
      {
        Name: 'phone_number',
        Value: phoneNumber,
      },
    ],
  };

  const res = await cognito.signUp(params).promise();

  if (res.$response.error) {
    return Promise.reject(res.$response.error);
  }

  return res.$response.data;
};

const signIn = async (username: string, password: string) => {
  const cognito = new CognitoIdentityServiceProvider();

  const params: AWS.CognitoIdentityServiceProvider.InitiateAuthRequest = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: config.aws.appClientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  const res = await cognito.initiateAuth(params).promise();

  if (res.$response.error) {
    return Promise.reject(res.$response.error);
  }

  return res.$response.data;
};

const signInWithoutPassword = async (username: string) => {
  const cognito = new CognitoIdentityServiceProvider();

  const params: AWS.CognitoIdentityServiceProvider.InitiateAuthRequest = {
    AuthFlow: 'CUSTOM_AUTH',
    ClientId: config.aws.appClientId,
    AuthParameters: {
      USERNAME: username,
    },
  };

  const res = await cognito.initiateAuth(params).promise();

  if (res.$response.error) {
    return Promise.reject(res.$response.error);
  }

  return res.$response.data;
};

const respondToAuthChallenge = async (
  challengeName: string,
  session: string,
  username: string,
  code: string,
) => {
  const cognito = new CognitoIdentityServiceProvider();

  const ChallengeResponses = {
    USERNAME: username,
  };

  if (challengeName === 'CUSTOM_CHALLENGE') {
    ChallengeResponses['ANSWER'] = code;
  }

  if (challengeName === 'SMS_MFA') {
    ChallengeResponses['SMS_MFA_CODE'] = code;
  }

  const params: CognitoIdentityServiceProvider.RespondToAuthChallengeRequest = {
    ChallengeName: challengeName,
    ClientId: config.aws.appClientId,
    Session: session,
    ChallengeResponses: ChallengeResponses,
  };

  const res = await cognito.respondToAuthChallenge(params).promise();

  if (res.$response.error) {
    return Promise.reject(res.$response.error);
  }

  return res.$response.data;
};

const refreshToken = async (refreshToken: string) => {
  const cognito = new CognitoIdentityServiceProvider();

  const params: CognitoIdentityServiceProvider.InitiateAuthRequest = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: config.aws.appClientId,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  };

  const res = await cognito.initiateAuth(params).promise();

  if (res.$response.error) {
    return Promise.reject(res.$response.error);
  }

  return res.$response.data;
};

const forgotPassword = async (phoneNumber: string) => {
  const cognito = new CognitoIdentityServiceProvider();

  const params: CognitoIdentityServiceProvider.ForgotPasswordRequest = {
    ClientId: config.aws.appClientId,
    Username: phoneNumber,
  };

  const res = await cognito.forgotPassword(params).promise();

  if (res.$response.error) {
    return Promise.reject(res.$response.error);
  }

  return res.$response.data;
};

const confirmNewPassword = async (otp: string, newPassword: string, phoneNumber: string) => {
  const cognito = new CognitoIdentityServiceProvider();

  const params: CognitoIdentityServiceProvider.ConfirmForgotPasswordRequest = {
    ClientId: config.aws.appClientId,
    ConfirmationCode: otp,
    Password: newPassword,
    Username: phoneNumber,
  };

  const res = await cognito.confirmForgotPassword(params).promise();

  if (res.$response.error) {
    return Promise.reject(res.$response.error);
  }

  return res.$response.data;
};

export const awsCognito = {
  getUserByPhoneNumber,
  createNewUser,
  signIn,
  respondToAuthChallenge,
  signInWithoutPassword,
  refreshToken,
  forgotPassword,
  confirmNewPassword,
};
