

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const postSchema = z.object({
  id: z.uuid(),
  title: z.string({error: 'El titulo es requerido'}).min(2).max(100).openapi({example: 'Modelos IA'}),
  miniature: z.string().min(2).max(100).optional(),
  content: z.string({error: 'El contenido es requerido'}).min(2),
  author: z.string().min(2).max(100).optional(),
  path: z.string({error: 'El path es requerido'}).min(2).max(150).openapi({example: '/modelos_ia'}),
  createdAt: z.date()
});

export const createPostSchema = postSchema.pick({
  title: true,
  content: true,
});

export const updatePostSchema = createPostSchema;



export type CreatePostDto = z.infer<typeof createPostSchema>;
export type UpdatePostDto = z.infer<typeof updatePostSchema>;