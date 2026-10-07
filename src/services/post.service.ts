import { Post } from "../entities/Post";
import { PostRepository } from "../repositories/post.repository";
import { CreatePostDto } from "../schemas/post.schema";
import { CustomError } from "../utils/custom.error";
import { slugify } from "../utils/slugify";


export class PostService {
  private postRepository = new PostRepository();
  async create(data: CreatePostDto, author: Post['author']) {
    const generateUniquePath = slugify(data.title)
    const existing = await this.postRepository.findByPath(generateUniquePath);
    if (existing) throw CustomError.conflict('Ya existe un post con este path');

    return this.postRepository.create({
      ...data,
      path: generateUniquePath,
      author,
    });
  }
}