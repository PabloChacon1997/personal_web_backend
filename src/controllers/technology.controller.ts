import { NextFunction, Request, Response } from "express";
import { TechnologyRepository } from "../repositories/technology.repository";


const technologyRepository = new TechnologyRepository()

export class TechnologyController {
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const technologies = await technologyRepository.findAll();
      return res.status(200).json(technologies);
    } catch (error) {
      return next(error);
    }
  }
}