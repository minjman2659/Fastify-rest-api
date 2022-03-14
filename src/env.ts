import path = require('path');
import dotenv = require('dotenv');

const isDev = process.env.NODE_ENV !== 'production';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    isDev ? '.env.development' : '.env.production'
  ),
});
