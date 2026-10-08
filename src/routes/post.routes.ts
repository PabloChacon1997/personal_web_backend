import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PostService } from "../services/post.service";
import { upload } from "../middlewares/upload.middleware";



export class PostRoutes {
  static get routes():  Router {
    const router = Router();

    const postService = new PostService();
    const postController = new PostController(postService);

    router.post('/', [AuthMiddleware.authenticate], postController.create);
    router.get('/',  postController.getAll);
    router.get('/:path',  postController.getByPath);
    router.put('/:id', [AuthMiddleware.authenticate], postController.update);
    router.delete('/:id', [AuthMiddleware.authenticate], postController.delete);
    router.patch('/:id/miniature', [AuthMiddleware.authenticate, upload('miniature')], postController.uploadMiniature);

    return router;
  }
}