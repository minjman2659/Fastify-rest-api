import { FastifyPluginCallback } from 'fastify';
import PostCtrl from './posts.ctrl';

const postRouter: FastifyPluginCallback = (fastify, options, done) => {
  fastify.post('/', PostCtrl.createPost);
  fastify.get('/', PostCtrl.getPostList);
  fastify.get('/:postId', PostCtrl.getPost);
  fastify.patch('/:postId', PostCtrl.updatePost);
  fastify.delete('/:postId', PostCtrl.deletePost);

  done();
};

export default postRouter;
