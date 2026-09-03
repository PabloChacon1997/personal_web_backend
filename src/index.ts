import 'reflect-metadata';

import { envs } from './config/envs';
import { AppRoutes } from './server/routes';
import { Server } from "./server/server";
import { AppDataSource } from './config/database';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  });

  
  AppDataSource.initialize()
    .then(() => {
      console.log('Conectado a la base de datos')
    })
    .catch((error) => console.log('Error al conectar a la base de datos: ', error))

  server.start();
}