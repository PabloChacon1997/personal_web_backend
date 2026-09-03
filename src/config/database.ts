import { DataSource } from "typeorm";
import { envs } from "./envs";


export const AppDataSource = new DataSource({
  type: 'postgres',
  url: envs.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
});