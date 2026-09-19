import { Request, Response } from "express";
import { CustomError } from "../utils/custom.error";
import { UserService } from "../services/user.service";
import { createUserDtoSchema, updateUserDtoSchema } from "../schemas/user.schema";


export class UserController {
  constructor(
    public readonly userService: UserService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({error: 'Internal server error'});
  }

  public getMe = (req: Request, res: Response) => {
    const { password, ...userEntity } = req.user!
    return res.send({user: userEntity});
  }

  public getUsers = async (req: Request, res: Response) => {
    const active = req.query.active as string | undefined;
    this.userService.findAll(active)
      .then(users => res.json(users))
      .catch(error => this.handleError(error, res));
  }

  public createUser = async (req: Request, res: Response) => {

    const result = createUserDtoSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.userService.createUser(result.data, req.file?.buffer)
      .then(users => res.status(201).json(users))
      .catch(error => this.handleError(error, res));
  }

  public updateUser = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = updateUserDtoSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.userService.updateUser(id, req.body, req.file?.buffer)
      .then(users => res.json(users))
      .catch(error => this.handleError(error, res));
  }

  public deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    if (req.user!.id === id) {
      const error = new Error('No puedes eliminar tu propio usuario');
      return res.status(400).json({error: error.message});
    }
    this.userService.deleteUser(id)
      .then(users => res.json(users))
      .catch(error => this.handleError(error, res));
  }
}