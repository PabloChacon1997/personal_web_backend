import { AppDataSource } from "../config/database";
import { Post } from "../entities/Post";



export class PostRepository {
  private repository = AppDataSource.getRepository(Post)

  create(data: Partial<Post>) {
    const post = this.repository.create(data);
    return this.repository.save(post);
  }

  findByPath(path: Post['path']) {
    return this.repository.findOne({ where: { path } })
  }

  findById(id: Post['id']) {
    return this.repository.findOne({ where: { id } })
  }

  findAll(page: number, limit: number) {
    return this.repository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page -1) * limit,
      take: limit
    })
  }

  async update(id: Post['id'], data: Partial<Post>) {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: Post['id']) {
    await this.repository.delete(id);
  }
}