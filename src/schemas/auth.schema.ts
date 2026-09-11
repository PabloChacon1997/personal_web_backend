import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";


extendZodWithOpenApi(z);

export const registerSchema = z.object({
  firstname: z.string({error: 'El nombre es obligatorio' }).min(2,{ error: 'Minimo 2 caracteres' }).max(100),
  lastname: z.string({ error: 'El apellido es obligatorio' }).min(2,{ error: 'Minimo 2 caracteres' }).max(100),
  email: z.email({ error: 'El eamil es obligatorio' }),
  active: z.boolean().default(false),
  password: z.string({ error: 'La contraseña es obligatoria' }).min(8, { error: 'La contraseña debe tener minimo 8 caracteres' } ),
});

export const registerResponseSchema = z.object({
  id: z.uuid(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.email(),
  role: z.enum(['user','admin']),
  active: z.boolean(),
  avatar: z.string(),
  createdAt: z.date(),
})

export const loginSchema = z.object({
  email: z.email({ error: 'El eamil es obligatorio' }),
  password: z.string({ error: 'La contraseña es obligatoria' }).min(1),
});

export const loginResponseSchema = z.object({
  user: z.object({
    id: z.uuid(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.email(),
    role: z.enum(['user','admin']),
    active: z.boolean(),
    avatar: z.string(),
    createdAt: z.date(),
  }),
  token: z.string(),
  refresh: z.string(),
})

export const refreshSchema = z.object({
  refresh: z.string({ error: 'El refresh token es obligatorio'}).min(1),
});

export const refreshResponseSchema = z.string();

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshSchema>;