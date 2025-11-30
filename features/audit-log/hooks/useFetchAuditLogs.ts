"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { AuditLog } from "@/lib/db/types";
import { paramsSchema } from "@/app/api/audit-logs/schemas/paramsSchema";
import { getQueryFn } from "@/utils/getQueryFn";

type AuditLogsResponse = {
  data: AuditLog[];
  total: number;
  page: number;
  totalPages: number;
};

export const useFetchAuditLogs = () => {
  const searchParams = useSearchParams();

  const queryStringParam = searchParams.toString();
  const rawParams = queryString.parse(queryStringParam, {
    parseNumbers: false,
    parseBooleans: false,
  });

  paramsSchema.safeParse(rawParams);
  const query = `/api/audit-logs${
    queryStringParam ? `?${queryStringParam}` : ""
  }`;

  const { data, isLoading } = useQuery<AuditLogsResponse>({
    queryKey: ["audit-logs", queryStringParam],
    queryFn: getQueryFn(query),
  });

  return {
    auditLogs: data?.data || [],
    isLoading,
    total: data?.total || 0,
    page: data?.page || 1,
    totalPages: data?.totalPages || 0,
  };
};
