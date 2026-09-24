import { In } from "typeorm";

import { AppDataSource } from "../config/database";
import { Technology } from "../entities/Technology";


export class TechnologyRepository {
  private repository = AppDataSource.getRepository(Technology);

  findAll() {
    return this.repository.find({ order: { name: 'ASC' } });
  }

  findByIds(ids: string[]) {
    return this.repository.find({ where: { id: In(ids) } });
  }
}