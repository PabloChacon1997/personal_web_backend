import { Request, Response } from "express";

import { CustomError } from "../utils/custom.error";
import { ProjectService } from "../services/project.service";


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
    this.projectService.create(req.body, req.file?.buffer)
      .then(project => res.status(201).json(project))
      .catch(error => this.handleError(error, res));
  }
}