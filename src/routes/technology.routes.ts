import { Router } from "express";
import { TechnologyController } from "../controllers/technology.controller";


export class TechnologyRoutes {
  static get routes():  Router {
    const router = Router();
    const technologyController = new TechnologyController();

    router.get('/', technologyController.getAll)

    return router;
  }
}