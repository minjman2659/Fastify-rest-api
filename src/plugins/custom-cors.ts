import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { mode } from 'lib';

const callback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.addHook('onRequest', (request, reply, done) => {
    const origin = request.headers.origin || request.headers.host;

    if (mode.isDev) {
      reply.header('Access-Control-Allow-Origin', origin);
    }

    reply.header(
      'Access-Control-Allow-Methods',
      'POST, PUT, GET, DELETE, PATCH, OPTIONS',
    );
    reply.header(
      'Access-Control-Allow-Headers',
      'Content-Type, X-Requested-With',
    );
    reply.header('Access-Control-Allow-Credentials', true);

    if (request.method === 'OPTIONS') {
      reply.status(204);
    } else {
      done();
    }
  });
  done();
};

export const CustomCors = fp(callback, { name: 'CustomCors' });
