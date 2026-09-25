import z from "zod";

export const idParamsSchema = z.object({
  id: z.uuid({ message: 'El id debe ser un UUID válido' })
})

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10)
})


export type IdParam = z.infer<typeof idParamsSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;