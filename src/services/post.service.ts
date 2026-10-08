import { Post } from "../entities/Post";
import { PostRepository } from "../repositories/post.repository";
import { CreatePostDto, UpdatePostDto } from "../schemas/post.schema";
import { CustomError } from "../utils/custom.error";
import { slugify } from "../utils/slugify";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";


export class PostService {
  private postRepository = new PostRepository();
  async create(data: CreatePostDto, author: Post['author']) {
    const generateUniquePath = slugify(data.title)
    const existing = await this.postRepository.findByPath(generateUniquePath);
    if (existing) throw CustomError.conflict('Ya existe un post con este path');

    await this.postRepository.create({
      ...data,
      path: generateUniquePath,
      author,
    });

    return "Post creado correctamente";
  }


  async uploadMiniature(id: Post['id'], buffer: Buffer) {
    await this.getById(id);
    const miniatureUrl = await uploadToCloudinary(buffer);
    const updated = await this.postRepository.update(id, { miniature: miniatureUrl })
    return updated!;
  }

  async getAll(page: number, limit: number) {
    const [ posts, total ] = await this.postRepository.findAll(page, limit);
    return {
      data: posts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit)
      }
    }
  }

  async getById(id: Post['id']) {
    const post = await this.postRepository.findById(id);
    if (!post) throw CustomError.notFound('Post no encontrado');
    return post;
  }
  
  async getByPath(path: Post['path']) {
    const post = await this.postRepository.findByPath(path);
    if (!post) throw CustomError.notFound('Post no encontrado');
    return post;
  }

  async update(id: Post['id'], data: UpdatePostDto) {
    await this.getById(id);
    const generateUniquePath = slugify(data.title)
    const existing = await this.postRepository.findByPath(generateUniquePath);
    if (existing && existing.id !== id) throw CustomError.conflict('Ya existe un post con este path');
    await this.postRepository.update(id, data);
    return "Post actualizado correctamente";
  }

  async delete(id: Post['id']) {
    await this.getById(id);
    await this.postRepository.delete(id);
    return "Post eliminado correctamente";
  }
}