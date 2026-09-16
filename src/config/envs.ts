import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  PORT: get('PORT').default(4000).asPortNumber(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  DATABASE_URL_DIRECT: get('DATABASE_URL_DIRECT').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  CLOUDINARY_NAME: get('CLOUDINARY_NAME').required().asString(),
  CLOUDINARY_API_KEY: get('CLOUDINARY_API_KEY').required().asString(),
  CLOUDINARY_API_SECRET: get('CLOUDINARY_API_SECRET').required().asString(),
}



