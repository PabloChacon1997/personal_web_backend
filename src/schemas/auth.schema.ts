import { z } from "zod";


export const registerSchema = z.object({
  firstname: z.string({error: 'El nombre es obligatorio' }).min(2,{ error: 'Minimo 2 caracteres' }).max(100),
  lastname: z.string({ error: 'El apellido es obligatorio' }).min(2,{ error: 'Minimo 2 caracteres' }).max(100),
  email: z.email({ error: 'El eamil es obligatorio' }),
  active: z.boolean().default(false),
  password: z.string({ error: 'La contraseña es obligatoria' }).min(8, { error: 'La contraseña debe tener minimo 8 caracteres' } ),
});

export type RegisterInput = z.infer<typeof registerSchema>;