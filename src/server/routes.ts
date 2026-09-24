import { Router } from 'express';

import { AuthRoutes } from '../routes/auth.routes';
import { UserRoutes } from '../routes/user.routes';
import { MenuRoutes } from '../routes/menu.routes';
import { ProjectRoutes } from '../routes/project.routes';
import { TechnologyRoutes } from '../routes/technology.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/user', UserRoutes.routes );
    router.use('/api/menu', MenuRoutes.routes );
    router.use('/api/project', ProjectRoutes.routes );
    router.use('/api/technology', TechnologyRoutes.routes );



    return router;
  }


}

