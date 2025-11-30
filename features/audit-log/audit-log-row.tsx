"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { entityTypeLabels } from "./constants/entityTypeLabels";
import { typeLabels } from "./constants/typeLabels";
import { AuditLog } from "@/lib/db/types";

const AuditLogRow = ({ log }: { log: AuditLog }) => {
  const formattedDate = new Date(log.created_date).toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <TableRow key={log.id}>
      <TableCell className="font-mono text-xs">{log.id}</TableCell>
      <TableCell className="font-mono text-xs">{log.correlation_id}</TableCell>
      <TableCell>{log.user_email || "-"}</TableCell>
      <TableCell>{entityTypeLabels[log.entity_type]}</TableCell>
      <TableCell>{typeLabels[log.type]}</TableCell>
      <TableCell>{formattedDate}</TableCell>
    </TableRow>
  );
};

export default AuditLogRow;
