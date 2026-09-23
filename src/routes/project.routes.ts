import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProjectController } from "../controllers/project.controller";


export class ProjectRoutes {
  static get routes():  Router {
    const router = Router();

    const projectController = new ProjectController();

    router.post('/', [AuthMiddleware.authenticate], projectController.create);

    return router;
  }
}