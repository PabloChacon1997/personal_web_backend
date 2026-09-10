import { NextFunction, Request, Response } from "express";

import { JwtAdapter } from "../config/jwt.adapter";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/User";


declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

const userRepository = new UserRepository();

export class AuthMiddleware {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({error: 'No existe el token'});
    if(!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Token inválido'});
    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken<{id: string}>(token);
      if(!payload) return res.status(401).json({error: 'Token inválido'});
      const user = await userRepository.findById(payload.id);
      if(!user) return res.status(401).json({error: 'Invalid token - user'});
      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}