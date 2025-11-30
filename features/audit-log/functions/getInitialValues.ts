import { DateRange } from "react-day-picker";
import { FormValues } from "../audit-log-filters/types";
import { parseISO } from "date-fns";

export const getInitialValues = (searchParams: URLSearchParams): FormValues => {
  const userEmail = searchParams.get("userEmail") || "";
  const entityType = searchParams.get("entityType") || "";
  const type = searchParams.get("type") || "";
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  let dateRange: DateRange | undefined = undefined;

  if (dateFrom || dateTo) {
    dateRange = {
      from: dateFrom ? parseISO(dateFrom) : undefined,
      to: dateTo ? parseISO(dateTo) : undefined,
    };
  }

  return {
    userEmail,
    entityType,
    type,
    dateRange,
  };
};
