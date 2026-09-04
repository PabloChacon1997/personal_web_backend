import { Request, Response } from "express";
import { registerSchema } from "../schemas/auth.schema";
import { AuthService } from "../services/auth.service";


export class AuthController {
  constructor(
    public readonly authService: AuthService
  ) {}
  public register = (req: Request, res: Response) => {
    const userRegister = registerSchema.safeParse(req.body);
    if (!userRegister.success) {
      return res.status(400).json({error: 'Error'});
    }

    this.authService.register(userRegister.data)
      .then(user => res.json(user))
      .catch(error => res.status(500).json({error: error.message}));
  }
}