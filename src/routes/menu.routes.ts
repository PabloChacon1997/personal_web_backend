import { Router } from "express";

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { MenuController } from "../controllers/menu.controller";
import { MenuService } from "../services/menu.service";


export class MenuRoutes {
  static get routes():  Router {
    const router = Router();

    const menuService = new MenuService()
    const menuController = new MenuController(menuService);

    router.post('/menu', [AuthMiddleware.authenticate], menuController.createMenu);

    return router;
  }
}