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
}