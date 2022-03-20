import { FastifyPluginCallback } from 'fastify';
import authRouter from './auth';
import postRouter from './posts';

const v1Router: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(authRouter, { prefix: '/auth' });
  fastify.register(postRouter, { prefix: '/posts' });

  done();
};

export default v1Router;
