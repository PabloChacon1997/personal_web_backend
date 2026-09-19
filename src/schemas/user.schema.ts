import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";


extendZodWithOpenApi(z);


export const userSchema = z.object({
    id: z.uuid(),
    firstname: z.string({error: 'El nombre es obligatorio' }).min(2,{ error: 'Minimo 2 caracteres' }).max(100),
    lastname: z.string({error: 'El appelido es obligatorio' }).min(2,{ error: 'Minimo 2 caracteres' }).max(100),
    email: z.email({ error: 'El eamil es obligatorio' }),
    password: z.string({error: 'La contraseña es obligatoria' }).min(8,{ error: 'Minimo 8 caracteres' }).max(12),
    role: z.enum(['user','admin']).default('user'),
    active: z.boolean().default(false),
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

export const idQuerySchema = z.object({
  id: z.uuid()
    .openapi({
      description: 'Id del usuario',
      example: ''
    })
})

export const createUserDtoSchema = userSchema.pick({
  firstname: true,
  lastname: true,
  email: true,
  password: true,
  role: true,
  active: true,
});

export const createUserSchema = z.object({
  firstname: z.string({error: 'El nombre es obligatorio' }).min(2,{ error: 'Minimo 2 caracteres' }).max(100),
  lastname: z.string({error: 'El appelido es obligatorio' }).min(2,{ error: 'Minimo 2 caracteres' }).max(100),
  email: z.email({ error: 'El eamil es obligatorio' }),
  password: z.string({error: 'La contraseña es obligatoria' }).min(8,{ error: 'Minimo 8 caracteres' }).max(12),
  role: z.enum(['user','admin']).default('user'),
  active: z.boolean().default(false),
  avatar: z.any().optional().openapi({
    type: 'string',
    format: 'binary',
    description: 'Imagen de avatar (opcional)'
  }),
});

export const updateUserSchema = z.object({
  firstname: z.string({error: 'El nombre es obligatorio' }).min(2,{ error: 'Minimo 2 caracteres' }).max(100).optional(),
  lastname: z.string({error: 'El appelido es obligatorio' }).min(2,{ error: 'Minimo 2 caracteres' }).max(100).optional(),
  email: z.email({ error: 'El eamil es obligatorio' }).optional(),
  password: z.string({error: 'La contraseña es obligatoria' }).min(8,{ error: 'Minimo 8 caracteres' }).max(12).optional(),
  role: z.enum(['user','admin']).default('user').optional(),
  active: z.boolean().default(false).optional(),
  avatar: z.any().optional().openapi({
    type: 'string',
    format: 'binary',
    description: 'Imagen de avatar (opcional)'
  }),
});
export const responseSchema = z.string();
export const responseErrorSchema = z.object({
  error: z.string()
});

export const updateUserDtoSchema = userSchema.pick({
  firstname: true,
  lastname: true,
  email: true,
  password: true,
  role: true,
  active: true,
}).partial();


export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
