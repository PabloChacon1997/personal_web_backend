import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProjectController } from "../controllers/project.controller";
import { ProjectService } from "../services/project.service";
import { upload } from "../middlewares/upload.middleware";


export class ProjectRoutes {
  static get routes():  Router {
    const router = Router();

    const projectService = new ProjectService();
    const projectController = new ProjectController(projectService);

    router.post('/', [AuthMiddleware.authenticate, upload('coverImage')], projectController.create);
    router.get('/', projectController.getAll);

    return router;
  }
}