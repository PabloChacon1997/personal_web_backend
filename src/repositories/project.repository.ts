import { AppDataSource } from "../config/database";
import { Project } from "../entities/Project";
import { removeUndefined } from "../utils/removeUndefined";



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

  findBySlug(slug: Project['slug']) {
    return this.repository.findOne({ where: { slug } });
  }
  findById(id: Project['id']) {
    return this.repository.findOne({ where: { id }, relations: { technologies: true } });
  }

  async update(id: Project['id'], data: Partial<Project>) {
    const project = await this.findById(id);
    const cleanData = removeUndefined(data);
    Object.assign(project!, cleanData)
    return this.repository.save(project!);
  }

  async delete(id: Project['id']) {
    await this.repository.delete(id);
  }
}