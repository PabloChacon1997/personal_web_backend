import { Request, Response } from "express";

import { NewsletterService } from "../services/newsletter.service";
import { CustomError } from "../utils/custom.error";
import { subscribeSchema } from "../schemas/newsletter.schema";
import { idParamsSchema, PaginationQuery } from "../schemas/common.schema";


export class NewsletterController {
  constructor(
    public readonly newsletterService: NewsletterService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({error: 'Internal server error'});
  }

  public getAll = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query as unknown as PaginationQuery;
    this.newsletterService.getAll(page, limit)
      .then(newsletters => res.json(newsletters))
      .catch(error => this.handleError(error, res));
  }
  
  public subscribe = (req: Request, res: Response) => {
    const result = subscribeSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.newsletterService.subscribe(result.data)
      .then(newsletter => res.status(201).json(newsletter))
      .catch(error => this.handleError(error, res));
  }

  public delete = (req: Request, res: Response) => {
    const param = idParamsSchema.safeParse(req.params);
    if (!param.success) {
      const errors = param.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.newsletterService.delete(param.data.id)
      .then(newsletter => res.json(newsletter))
      .catch(error => this.handleError(error, res));
  }
}