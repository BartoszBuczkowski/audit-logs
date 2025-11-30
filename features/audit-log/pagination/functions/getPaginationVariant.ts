export type PaginationVariant = "all" | "nearStart" | "nearEnd" | "middle";

export const getPaginationVariant = (
  page: number,
  totalPages: number,
  maxVisible: number
): PaginationVariant => {
  if (totalPages <= maxVisible) {
    return "all";
  }
  if (page <= 3) {
    return "nearStart";
  }
  if (page >= totalPages - 2) {
    return "nearEnd";
  }
  return "middle";
};
