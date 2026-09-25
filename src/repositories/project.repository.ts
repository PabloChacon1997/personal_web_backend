import { AppDataSource } from "../config/database";
import { Project } from "../entities/Project";



export class ProjectRepository {
  private repository = AppDataSource.getRepository(Project);

  create(data: Partial<Project>) {
    const project = this.repository.create(data)
    return this.repository.save(project);
  }

  async findAll(page: number, limit: number) {
    return this.repository.findAndCount({
      relations: {
        technologies: true
      },
      order: { position: 'ASC' },
      skip: (page -1) * limit,
      take: limit
    })
  }
}