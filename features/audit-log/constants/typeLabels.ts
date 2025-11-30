import { Type } from "@/lib/db/types";

export const typeLabels: Record<Type, string> = {
  [Type.Added]: "Added",
  [Type.Deleted]: "Deleted",
  [Type.Modified]: "Modified",
};
