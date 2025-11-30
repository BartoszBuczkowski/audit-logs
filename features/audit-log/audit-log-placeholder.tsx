import { TableCell, TableRow } from "@/components/ui/table";

const AuditLogPlaceholder = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
        No audit logs found
      </TableCell>
    </TableRow>
  );
};

export default AuditLogPlaceholder;
