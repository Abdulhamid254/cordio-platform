import 'dotenv/config';
import { DataSource } from 'typeorm';

/** Used by the TypeORM CLI for running migrations. */
export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
