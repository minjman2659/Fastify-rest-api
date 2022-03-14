import 'reflect-metadata';
import './env';

import Server from './server';
import Database from './database';

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('MISSING PORT ENV');
}

const server: Server = new Server();
const database: Database = new Database();

database.getConnection();
server.start(PORT);
