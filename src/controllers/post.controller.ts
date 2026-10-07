import { Request, Response } from "express";

import { CustomError } from "../utils/custom.error";
import { createPostSchema } from "../schemas/post.schema";
import { PostService } from "../services/post.service";


export class PostController {
  constructor(
    public readonly postService: PostService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({error: 'Internal server error'});
  }

  public create = (req: Request, res: Response) => {
    const result = createPostSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }
    const author = `${req.user!.firstname} ${req.user!.lastname}`;
    this.postService.create(result.data, author)
      .then(post => res.status(201).json(post))
      .catch(error => this.handleError(error, res));
  }
}