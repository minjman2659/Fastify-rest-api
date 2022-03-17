import { createConnection, ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PW,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
};

export default class Database {
  async getConnection(): Promise<void> {
    console.log(config);
    try {
      await createConnection(config);
      console.log('DB connection is established');
    } catch (err) {
      console.log(`Unable to connect to be DB: ${err}`);
    }
  }
}
