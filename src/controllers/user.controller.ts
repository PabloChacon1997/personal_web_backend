import { Request, Response } from "express";
import { CustomError } from "../utils/custom.error";
import { UserService } from "../services/user.service";


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
}