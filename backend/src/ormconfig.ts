import { env } from 'process';
import { ConnectionOptions } from 'typeorm';

const isDev = env.APP_ENV !== 'production';

const username = env.POSTGRES_USER || 'root';
const password = env.POSTGRES_PASSWORD || '1234';
const database = env.POSTGRES_DB || 'db';
const port = Number(env.POSTGRES_PORT) || 5432;
const host = env.POSTGRES_HOST || '127.0.0.1';

const config: ConnectionOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],

  synchronize: isDev,
  migrationsRun: !isDev,

  logging: true,
  logger: 'file',
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;
