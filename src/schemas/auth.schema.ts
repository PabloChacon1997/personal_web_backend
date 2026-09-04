import { z } from "zod";


export const registerSchema = z.object({
  firstname: z.string().min(2).max(100),
  lastname: z.string().min(2).max(100),
  email: z.email(),
  active: z.boolean().default(false),
  password: z.string().min(8),
});

export type RegisterInput = z.infer<typeof registerSchema>;