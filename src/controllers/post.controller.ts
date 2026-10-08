import { Request, Response } from "express";

import { CustomError } from "../utils/custom.error";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema";
import { PostService } from "../services/post.service";
import { idParamsSchema, PaginationQuery, pathParamsSchema } from "../schemas/common.schema";


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

  public getAll = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query as unknown as PaginationQuery;
    this.postService.getAll(page, limit)
      .then(posts => res.json(posts))
      .catch(error => this.handleError(error, res));
  }

  public getByPath = (req: Request, res: Response) => {
    const param = pathParamsSchema.safeParse(req.params);
    if (!param.success) {
      const errors = param.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.postService.getByPath(param.data.path)
      .then(post => res.json(post))
      .catch(error => this.handleError(error, res));
  }

  public update = (req: Request, res: Response) =>  {
    const param = idParamsSchema.safeParse(req.params);
    if (!param.success) {
      const errors = param.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    const result = updatePostSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.postService.update(param.data.id, result.data)
      .then(post => res.json(post))
      .catch(error => this.handleError(error, res));
  }

  public delete = (req: Request, res: Response) => {
    const param = idParamsSchema.safeParse(req.params);
    if (!param.success) {
      const errors = param.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.postService.delete(param.data.id)
      .then(post => res.json(post))
      .catch(error => this.handleError(error, res));
  }

  public uploadMiniature = (req: Request, res: Response) => {
    const param = idParamsSchema.safeParse(req.params);
    if (!param.success) {
      const errors = param.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    if (!req.file) {
      const error = new Error('No se envio ninguna imagen');
      return res.status(400).json({error: error.message})
    }

    this.postService.uploadMiniature(param.data.id, req.file.buffer)
      .then(post => res.json(post))
      .catch(error => this.handleError(error, res));
  }
}