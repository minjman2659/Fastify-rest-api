import 'reflect-metadata';
import './env';

import fastify from 'fastify';
import { FastifyCookieOptions } from 'fastify-cookie';
import cookie from 'fastify-cookie';
import { CustomCors } from 'plugins/custom-cors';
import Database from './database';
import routes from 'routes';

const { PORT, POSTGRES_HOST } = process.env;

if (!PORT || !POSTGRES_HOST) {
  throw new Error('MISSING_ENV');
}

const database: Database = new Database();
database.getConnection();

async function Server() {
  const server = fastify({ logger: false });

  server.register(CustomCors);
  server.register(cookie, {
    secret: process.env.SECRET_KEY,
  } as FastifyCookieOptions);

  server.register(routes, { prefix: '/api' });

  server.listen(process.env.PORT, (err, address) => {
    if (err) {
      server.log.error(err);
      return;
    }
    console.log(`Server is Running: ${address}`);
    // console.log(`Swagger: ${address}/api/documentation`);
    console.log(`Database: ${process.env.POSTGRES_HOST}`);
  });
}

Server();
