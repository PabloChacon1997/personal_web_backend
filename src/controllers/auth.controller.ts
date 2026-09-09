import { Request, Response } from "express";
import { loginSchema, refreshSchema, registerSchema } from "../schemas/auth.schema";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../utils/custom.error";


export class AuthController {
  constructor(
    public readonly authService: AuthService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({error: 'Internal server error'});
  }

  public register = (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.authService.register(result.data)
      .then(user => res.json(user))
      .catch(error => this.handleError(error, res));
  }

  public login = (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.authService.login(result.data)
      .then(user => res.json(user))
      .catch(error => this.handleError(error, res));
  }

  public refreshToken = (req: Request, res: Response) => {
    const result = refreshSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({errors})
    }

    this.authService.refreshToken(result.data)
      .then(token => res.json(token))
      .catch(error => this.handleError(error, res));
  }
}