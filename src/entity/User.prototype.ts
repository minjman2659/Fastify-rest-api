import User from './User';
import * as _ from 'lodash';

import { IPayload, IOption } from 'types/token';
import { hashPassword } from 'lib';
import { generateToken } from 'lib/token';

// instance methods
User.prototype.generateUserToken = async function generateUserToken() {
  const payload: IPayload = {
    id: this.id,
    username: this.username,
    email: this.email,
  };
  const option1: IOption = {
    subject: 'refresh_token',
    expiresIn: '30d',
  };
  const option2: IOption = {
    subject: 'access_token',
    expiresIn: '1h',
  };

  const refreshToken: any = await generateToken(payload, option1);
  const accessToken: any = await generateToken(payload, option2);

  return {
    refreshToken,
    accessToken,
  };
};

User.prototype.refreshUserToken = async function refreshUserToken(
  refreshTokenExp: number,
  originalRefreshToken: any
) {
  const now = new Date().getTime();
  const diff = refreshTokenExp * 1000 - now;
  let refreshToken = originalRefreshToken;

  const payload: IPayload = {
    id: this.id,
    username: this.username,
    email: this.email,
  };
  const option1: IOption = {
    subject: 'refresh_token',
    expiresIn: '30d',
  };
  const option2: IOption = {
    subject: 'access_token',
    expiresIn: '1h',
  };

  // 15일 이하인 경우
  if (diff < 1000 * 60 * 60 * 24 * 15) {
    refreshToken = await generateToken(payload, option1);
  }
  const accessToken = await generateToken(payload, option2);

  return { refreshToken, accessToken };
};

User.prototype.validatePassword = function validatePassword(
  password: string
): boolean {
  const hashed = hashPassword(password);
  if (!this.password) {
    throw new Error('PASSWORD REQUIRED');
  }
  return this.password === hashed;
};

User.prototype.toRes = function toRes(): any {
  const userInfo = _.omit(this, ['password']);
  return userInfo;
};
