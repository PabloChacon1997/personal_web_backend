import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  PORT: get('PORT').default(4000).asPortNumber(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  DATABASE_URL_DIRECT: get('DATABASE_URL_DIRECT').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
}



