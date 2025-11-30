import { DateRange } from "react-day-picker";

export type FormValues = {
  userEmail: string;
  entityType: string;
  type: string;
  dateRange: DateRange | undefined;
};
