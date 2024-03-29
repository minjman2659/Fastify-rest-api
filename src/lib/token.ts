import { FastifyReply } from 'fastify';
import * as jwt from 'jsonwebtoken';
import { IPayload, IOption } from 'types/token';

const { SECRET_KEY, CLIENT_HOST, API_HOST } = process.env;

const IS_DEV: boolean = process.env.NODE_ENV !== 'production';

export const generateToken = (
  payload: IPayload,
  option: IOption
): Promise<string> => {
  const jwtOptions = {
    issuer: API_HOST,
    expiresIn: '30d',
    ...option,
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, jwtOptions, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const decodeToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

export const setTokenCookie = (reply: FastifyReply, tokens: any): void => {
  const { accessToken, refreshToken } = tokens;

  reply.setCookie('access_token', accessToken, {
    httpOnly: true,
    domain: !IS_DEV ? CLIENT_HOST : undefined,
    maxAge: 1000 * 60 * 60 * 1, // 1 hour(milliseconds)
    secure: !IS_DEV,
  });

  reply.setCookie('refresh_token', refreshToken, {
    httpOnly: true,
    domain: !IS_DEV ? CLIENT_HOST : undefined,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 Days(milliseconds)
    secure: !IS_DEV,
  });
};
