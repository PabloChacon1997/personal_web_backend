import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";


export class AuthRoutes {
  static get routes():  Router {
    const router = Router()

    const authController = new AuthController();

    router.post('/register', authController.register);

    return router;
  }
}