import { Router } from 'express';
import { AuthRoutes } from '../routes/auth.routes';
import { UserRoutes } from '../routes/user.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/user', UserRoutes.routes );



    return router;
  }


}

