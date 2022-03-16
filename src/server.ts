import fastify, { FastifyRequest } from 'fastify';

import User from 'entity/User';
import { hashPassword } from 'lib';
import { IUser } from 'types/user';

export default class Server {
  app = fastify({ logger: true });

  constructor() {
    this.routes();
  }

  routes() {
    this.app.get('/', async () => {
      return { hello: 'world' };
    });
    this.app.post(
      '/auth/register',
      async (req: FastifyRequest<{ Body: IUser }>, reply) => {
        const { email, username, password } = req.body;
        const user = User.create({
          email,
          username,
          password: hashPassword(password),
        });

        reply.send(user);
      }
    );
  }

  start(PORT: string) {
    try {
      this.app.listen(PORT, (err, address) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Server is running, port number is ${PORT}`);
      });
    } catch (err) {
      this.app.log.error(err);
    }
  }
}
