import 'reflect-metadata';
import './env';

import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyCookieOptions } from 'fastify-cookie';
import cookie from 'fastify-cookie';
import Database from './database';

import { IUser } from 'types/user';

const { PORT, POSTGRES_HOST } = process.env;

if (!PORT || !POSTGRES_HOST) {
  throw new Error('MISSING_ENV');
}

const database: Database = new Database();
database.getConnection();

async function bootstrap() {
  const server = fastify({ logger: false });

  server.register(cookie, {
    secret: process.env.SECRET_KEY,
  } as FastifyCookieOptions);

  server.get(
    '/',
    async (req: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) => {
      reply.send('Hello World!');
    }
  );

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

bootstrap();
