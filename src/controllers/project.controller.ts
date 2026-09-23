import { Request, Response } from "express";

import { CustomError } from "../utils/custom.error";


export class ProjectController {
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({error: 'Internal server error'});
  }

  public create = (req: Request, res: Response) => {
    res.send('Crear proyecto')
  }
}