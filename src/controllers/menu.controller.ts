import { Request, Response } from "express";
import { CustomError } from "../utils/custom.error";
import { MenuService } from "../services/menu.service";
import { createMenuSchema, updateMenuSchema } from "../schemas/menu.schema";
import { idParamsSchema, listQuery } from "../schemas/common.schema";



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
      .then(menu => res.status(201).json(menu))
      .catch(error => this.handleError(error, res));
  }

  public findAll = (req: Request, res: Response) => {
    const query = listQuery.safeParse(req.query);
    if (!query.success) {
      const errors = query.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }
    this.menuService.getAll(query.data.active)
      .then(menu => res.json(menu))
      .catch(error => this.handleError(error, res));
  }

  public updateManue = (req: Request, res: Response) => {
    const param = idParamsSchema.safeParse(req.params);
    if (!param.success) {
      const errors = param.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }
    
    const result = updateMenuSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.menuService.updateMenu(param.data.id,result.data)
      .then(menu => res.json(menu))
      .catch(error => this.handleError(error, res));
  }

  public deleteMenu = (req: Request, res: Response) => {
    const param = idParamsSchema.safeParse(req.params);
    if (!param.success) {
      const errors = param.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }
    this.menuService.deleteMenu(param.data.id)
      .then(menu => res.json(menu))
      .catch(error => this.handleError(error, res));
  }
}