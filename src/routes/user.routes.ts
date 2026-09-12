import { Router } from "express";
import { UserController } from '../controllers/user.controller';
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";


export class UserRoutes {
  static get routes():  Router {
    const router = Router();
    const userService = new UserService()
    const userController = new UserController(userService);

    router.get('/me',[AuthMiddleware.authenticate], userController.getMe);
    router.get('/users',[AuthMiddleware.authenticate], userController.getUsers);
    router.post('/user',[AuthMiddleware.authenticate], userController.createUser);

    return router;
  }
}