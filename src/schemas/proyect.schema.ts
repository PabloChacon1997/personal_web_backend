import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);


export const projectSchema = z.object({
  id: z.uuid(),
  title: z.string({ error: 'EL titulo es obligatorio' }).min(2,{ error: 'Minimo debe contener 2 caracteres' }).max(150).openapi({ example: 'Mi proyecto' }),
  description: z.string({ error: 'La descripción es obligatoria' }).min(10,{ error: 'Minimo debe contener 10 caracteres' }).openapi({ example: 'Mi proyecto' }),
  githubUrl: z.url().optional(),
  liveUrl: z.url().optional(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  position: z.number().default(0),
  technologyIds: z.array(z.uuid()).min(1,'Debe seleccionar almenos una tecnología'),
  coverImage: z.any().optional().openapi({type: 'string', format: 'binary', description: 'Imagen de portada'})
});

export const slugSchema = z.object({
  slug: z.string().min(1, 'El slug debe tener almenos 1 caracter').max(50)
});

export const createProjectSchema = projectSchema.pick({
  title: true,
  description: true,
  githubUrl: true,
  liveUrl: true,
  featured: true,
  active: true,
  position: true,
  technologyIds: true,
  coverImage: true
});


export const updateProjectSchema = projectSchema.pick({
  title: true,
  description: true,
  githubUrl: true,
  liveUrl: true,
  featured: true,
  active: true,
  position: true,
  technologyIds: true,
  coverImage: true
}).partial();

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;