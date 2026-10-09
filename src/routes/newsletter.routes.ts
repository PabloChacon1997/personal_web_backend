import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { NewsletterController } from "../controllers/newsletter.controller";
import { NewsletterService } from "../services/newsletter.service";



export class NewsletterRoutes {
  static get routes():  Router {
    const router = Router();

    const newsletterService = new NewsletterService();
    const newsletterContoller = new NewsletterController(newsletterService);

    router.get('/', [AuthMiddleware.authenticate, AuthMiddleware.requireAdmin], newsletterContoller.getAll);
    router.post('/', newsletterContoller.subscribe)
    router.delete('/:id', [AuthMiddleware.authenticate, AuthMiddleware.requireAdmin], newsletterContoller.delete);

    return router;
  }
}