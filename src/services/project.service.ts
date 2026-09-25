import { ProjectRepository } from "../repositories/project.repository";
import { TechnologyRepository } from "../repositories/technology.repository";
import { CreateProjectDto } from "../schemas/proyect.schema";
import { CustomError } from "../utils/custom.error";
import { slugify } from "../utils/slugify";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";


export class ProjectService {
  private projectRepository = new ProjectRepository();
  private techRepository = new TechnologyRepository();

  private async generateUniqueSlug(title: string) {
    const baseSlug = slugify(title);
    return baseSlug;
  }

  private async validateTechnologies(technologyIds: string[]) {
    const technologies = await this.techRepository.findByIds(technologyIds);
    if (technologies.length !== technologyIds.length) throw CustomError.badRequest('Una o más tecnologias no existen');
    return technologies;
  }

  async create(data: CreateProjectDto, coverImageBuffer?: Buffer) {
    const technologies = await this.validateTechnologies(data.technologyIds);
    const slug = await this.generateUniqueSlug(data.title);

    let coverImage: string | undefined;
    if (coverImageBuffer) {
      coverImage = await uploadToCloudinary(coverImageBuffer)
    }

    const { technologyIds, githubUrl, liveUrl,...newData } = data;
    return this.projectRepository.create({
      ...newData,
      githubUrl: githubUrl ?? null,
      liveUrl: liveUrl ?? null,
      slug,
      technologies,
      ...(coverImage && { coverImage }),
    })
  }

  async getAll(page: number, limit: number) {
    const [ projects, total ] = await this.projectRepository.findAll(page, limit);
    return {
      data: projects,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit)
      }
    }
  }
}