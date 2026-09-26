import { Request, Response } from "express";

import { CustomError } from "../utils/custom.error";
import { ProjectService } from "../services/project.service";
import { createProjectSchema, slugSchema, updateProjectSchema } from "../schemas/proyect.schema";
import { idParamsSchema, PaginationQuery } from "../schemas/common.schema";


export class ProjectController {

  constructor(
    public readonly projectService: ProjectService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({error: 'Internal server error'});
  }

  public create = (req: Request, res: Response) => {
    const result = createProjectSchema.safeParse({
      ...req.body,
      position: +req.body.position
    });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }
    this.projectService.create(req.body, req.file?.buffer)
      .then(project => res.status(201).json(project))
      .catch(error => this.handleError(error, res));
  }

  public getAll = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query as unknown as PaginationQuery;
    this.projectService.getAll(+page, +limit)
      .then(projects => res.json(projects))
      .catch(error => this.handleError(error, res));
  }

  public getBySlug = (req: Request, res: Response) => {
    const param = slugSchema.safeParse(req.params);
    if (!param.success) {
      const errors = param.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }
    this.projectService.getBySlug(param.data.slug)
      .then(projects => res.json(projects))
      .catch(error => this.handleError(error, res));
  }

  public update = (req: Request, res: Response) => {
    const param = idParamsSchema.safeParse(req.params);
    if (!param.success) {
      const errors = param.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }
    const result = updateProjectSchema.safeParse({
      ...req.body,
    });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }
    this.projectService.update(param.data.id, result.data, req.file?.buffer)
      .then(project => res.json(project))
      .catch(error => this.handleError(error, res));
  }

  public delete = (req: Request, res: Response) => {
    const param = idParamsSchema.safeParse(req.params);
    if (!param.success) {
      const errors = param.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.projectService.delete(param.data.id)
      .then(project => res.json(project))
      .catch(error => this.handleError(error, res));
  }
}