import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PostService } from "../services/post.service";



export class PostRoutes {
  static get routes():  Router {
    const router = Router();

    const postService = new PostService();
    const postController = new PostController(postService);

    router.post('/', [AuthMiddleware.authenticate], postController.create);

    return router;
  }
}