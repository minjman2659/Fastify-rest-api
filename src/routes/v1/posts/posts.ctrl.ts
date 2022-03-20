import { FastifyRequest, FastifyReply } from 'fastify';

export default class PostCtrl {
  static createPost = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(201);
  };

  static getPost = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200);
  };

  static getPostList = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200);
  };

  static updatePost = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200);
  };

  static deletePost = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200);
  };
}
