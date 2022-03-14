import fastify from 'fastify';

export default class Server {
  app = fastify({ logger: true });

  constructor() {
    this.routes();
  }

  routes() {
    this.app.get('/', async () => {
      return { hello: 'world' };
    });
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
