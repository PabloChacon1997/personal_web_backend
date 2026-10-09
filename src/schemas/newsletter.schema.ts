import z from "zod";

export const subscribeSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().trim().toLowerCase().max(100)
});

export type SubscribeDto = z.infer<typeof subscribeSchema>;