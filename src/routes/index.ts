import { FastifyPluginCallback, FastifyRequest, FastifyReply } from 'fastify';
import v1Router from './v1';

const routes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(v1Router, { prefix: '/v1' });

  done();
};

export default routes;
