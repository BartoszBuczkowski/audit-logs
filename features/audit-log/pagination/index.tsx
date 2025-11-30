"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AuditLogPaginationProps } from "./types";
import { getPaginationVariant } from "./functions/getPaginationVariant";
import { paginationByVariant } from "./functions/paginationByVariant";

const getPageNumbers = (page: number, totalPages: number) => {
  const maxVisible = 7;
  const variant = getPaginationVariant(page, totalPages, maxVisible);

  return paginationByVariant[variant](page, totalPages);
};

export function AuditLogPagination({
  page,
  totalPages,
  total,
  currentLimit,
  onPageChange,
}: AuditLogPaginationProps) {
  if (totalPages === 0) {
    return null;
  }

  const pageNumbers = getPageNumbers(page, totalPages);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="text-sm text-muted-foreground">
        Showing {Math.min((page - 1) * currentLimit + 1, total)} -{" "}
        {Math.min(page * currentLimit, total)} of {total} results
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(page - 1)}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {pageNumbers.map((pageNum, index) => {
            if (pageNum === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(pageNum)}
                  isActive={pageNum === page}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(page + 1)}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
