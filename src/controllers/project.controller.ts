import { Request, Response } from "express";

import { CustomError } from "../utils/custom.error";
import { ProjectService } from "../services/project.service";
import { createProjectSchema } from "../schemas/proyect.schema";


export class ProjectController {

  constructor(
    public readonly projectService: ProjectService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

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
    const { page = 1, limit = 10 } = req.query;
    this.projectService.getAll(+page, +limit)
      .then(projects => res.json(projects))
      .catch(error => this.handleError(error, res));
  }
}