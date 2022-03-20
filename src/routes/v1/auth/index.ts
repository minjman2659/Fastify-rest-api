import { FastifyPluginCallback } from 'fastify';
import AuthCtrl from './auth.ctrl';

const authRouter: FastifyPluginCallback = (fastify, options, done) => {
  fastify.post('/register', AuthCtrl.register);
  fastify.post('/login', AuthCtrl.login);
  fastify.post('/logout', AuthCtrl.logout);

  done();
};

export default authRouter;
