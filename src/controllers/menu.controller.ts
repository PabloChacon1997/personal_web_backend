import { Request, Response } from "express";
import { CustomError } from "../utils/custom.error";
import { MenuService } from "../services/menu.service";
import { createMenuSchema } from "../schemas/menu.schema";



export class MenuController {
  constructor(
    public readonly menuService: MenuService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({error: 'Internal server error'});
  }

  public createMenu = (req: Request, res: Response) => {
    const result = createMenuSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.menuService.create(result.data)
      .then(menu => res.json(menu))
      .catch(error => this.handleError(error, res));
  }
}