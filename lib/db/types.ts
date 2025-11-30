export enum Type {
  Added = 1,
  Deleted = 2,
  Modified = 3,
}

export enum EntityType {
  Unknown = 0,
  ContractHeaderEntity = 1,
  AnnexHeaderEntity = 2,
  AnnexChangeEntity = 3,
  FileEntity = 4,
  InvoiceEntity = 5,
  PaymentScheduleEntity = 6,
  ContractFundingEntity = 7,
}

export interface AuditLog {
  id: string;
  correlation_id: string;
  organization_id: string;
  user_id: string | null;
  user_email: string | null;
  entity_type: EntityType;
  type: Type;
  created_date: string;
}

export interface Database {
  audit_log: AuditLog;
}
