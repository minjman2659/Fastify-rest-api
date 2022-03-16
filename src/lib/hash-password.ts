import * as crypto from 'crypto';

const { PASSWORD_SALT } = process.env;

if (!PASSWORD_SALT) {
  throw new Error('MISSING_ENVAR');
}

const hashPassword = (password: string): string => {
  return crypto
    .createHmac('sha512', PASSWORD_SALT)
    .update(password)
    .digest('hex');
};

export default hashPassword;
