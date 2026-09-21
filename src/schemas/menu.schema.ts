import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const createMenuSchema = z.object({
  title: z.string({error: 'El titulo es requerido'}).min(2).max(100).openapi({example: 'Proyectos'}),
  path: z.string({error: 'El path es requerido'}).min(2).max(150).openapi({example: '/proyectos'}),
  position: z.number().int().default(0).openapi({example: 1}),
  active: z.boolean().default(true),
});
export const createMenuResponseSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  path: z.string(),
  position: z.number(),
  active: z.boolean(),
  createdAt: z.date()
});

export const updateMenuSchema = createMenuSchema.pick({
  title: true,
  path: true,
  position: true,
  active: true
});

export type CreateMenuDto = z.infer<typeof createMenuSchema>
export type UpdateMenuDto = z.infer<typeof updateMenuSchema>