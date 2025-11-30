"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchAuditLogs } from "./hooks/useFetchAuditLogs";
import AuditLogRow from "./audit-log-row";
import AuditLogPlaceholder from "./audit-log-placeholder";
import AuditLogFilters from "./audit-log-filters";
import { AuditLogPagination } from "./pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";

const ITEMS_PER_PAGE = 100;

export function AuditLogTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { auditLogs, isLoading, page, totalPages, total } = useFetchAuditLogs();

  const currentLimit = Number(searchParams.get("limit")) || ITEMS_PER_PAGE;

  const handlePageChange = (newPage: number) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const offset = (newPage - 1) * currentLimit;

    const params: Record<string, string | undefined> = {
      ...currentParams,
      offset: offset.toString(),
      limit: currentLimit.toString(),
    };

    const query = queryString.stringify(params, {
      skipNull: true,
      skipEmptyString: true,
    });

    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  return (
    <div className="w-full space-y-4">
      <AuditLogFilters />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Correlation ID</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Entity Type</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogs.length === 0 ? (
            <AuditLogPlaceholder />
          ) : (
            auditLogs.map((log) => <AuditLogRow key={log.id} log={log} />)
          )}
        </TableBody>
      </Table>

      <AuditLogPagination
        page={page}
        totalPages={totalPages}
        total={total}
        currentLimit={currentLimit}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
