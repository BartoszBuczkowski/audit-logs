import { z } from "zod";

export const paramsSchema = z.object({
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
  orderBy: z.enum(["created_date"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  userEmail: z.string().optional(),
  entityType: z.coerce.number().optional(),
  type: z.coerce.number().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
