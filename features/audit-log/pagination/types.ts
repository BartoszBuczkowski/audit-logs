export type AuditLogPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  currentLimit: number;
  onPageChange: (newPage: number) => void;
};
