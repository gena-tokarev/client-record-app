import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '@client-record/user';
dotenv.config();

export const DataSourceCore = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
  logger: 'advanced-console',
  logging: true,
});
