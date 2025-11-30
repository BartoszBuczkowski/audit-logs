import { EntityType } from "@/lib/db/types";

export const entityTypeLabels: Record<EntityType, string> = {
  [EntityType.Unknown]: "Unknown",
  [EntityType.ContractHeaderEntity]: "Contract Header",
  [EntityType.AnnexHeaderEntity]: "Annex Header",
  [EntityType.AnnexChangeEntity]: "Annex Change",
  [EntityType.FileEntity]: "File",
  [EntityType.InvoiceEntity]: "Invoice",
  [EntityType.PaymentScheduleEntity]: "Payment Schedule",
  [EntityType.ContractFundingEntity]: "Contract Funding",
};
