import { FastifyRequest, FastifyReply } from 'fastify';

export default class AuthCtrl {
  static register = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(201);
  };

  static login = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200);
  };

  static logout = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.setCookie('access_token', null, {
      maxAge: 0,
      httpOnly: true,
    });
    reply.setCookie('refresh_token', null, {
      maxAge: 0,
      httpOnly: true,
    });

    reply.status(200);
  };
}
