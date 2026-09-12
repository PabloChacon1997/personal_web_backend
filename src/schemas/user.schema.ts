import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";


extendZodWithOpenApi(z);


export const userSchema = z.object({
    id: z.uuid(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.enum(['user','admin']),
    active: z.boolean(),
    avatar: z.string(),
    createdAt: z.date(),
  })

export const meResponseSchema = z.object({
  user: userSchema.pick({
    id: true,
    firstname: true,
    lastname: true,
    email: true,
    role: true,
    active: true,
    avatar: true,
    createdAt: true,
  })
})


export const userListSchema = z.array(userSchema);

export const listUsersQuerySchema = z.object({
  active: z.enum(['true', 'false'])
    .optional()
    .openapi({
      description: 'Filtra por usuarios activos o inectivos. Si se omite, trae todos',
      example: 'true'
    })
})