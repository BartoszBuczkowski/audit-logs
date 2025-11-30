import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { AuditLog } from "@/lib/db/types";
import { EntityType, Type } from "@/lib/db/types";
import { paramsSchema } from "./schemas/paramsSchema";

type OrderBy = Extract<keyof AuditLog, "created_date">;

export async function GET(request: NextRequest) {
  try {
    let query = db.selectFrom("audit_log").selectAll();
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const params = paramsSchema.parse(searchParams);

    const orderBy = (params?.orderBy || "created_date") as OrderBy;
    const order = params?.order || "desc";
    const limit = params?.limit || 100;
    const offset = params?.offset || 0;

    if (params.userEmail) {
      query = query.where("user_email", "ilike", `%${params.userEmail}%`);
    }

    if (params.entityType !== undefined) {
      query = query.where("entity_type", "=", params.entityType as EntityType);
    }

    if (params.type !== undefined) {
      query = query.where("type", "=", params.type as Type);
    }

    if (params.dateFrom) {
      query = query.where("created_date", ">=", params.dateFrom);
    }

    if (params.dateTo) {
      query = query.where("created_date", "<=", params.dateTo);
    }

    let countQuery = db
      .selectFrom("audit_log")
      .select(({ fn }) => fn.countAll().as("count"));

    if (params.userEmail) {
      countQuery = countQuery.where(
        "user_email",
        "ilike",
        `%${params.userEmail}%`
      );
    }

    if (params.entityType !== undefined) {
      countQuery = countQuery.where(
        "entity_type",
        "=",
        params.entityType as EntityType
      );
    }

    if (params.type !== undefined) {
      countQuery = countQuery.where("type", "=", params.type as Type);
    }

    if (params.dateFrom) {
      countQuery = countQuery.where("created_date", ">=", params.dateFrom);
    }

    if (params.dateTo) {
      countQuery = countQuery.where("created_date", "<=", params.dateTo);
    }

    const [auditLogs, countResult] = await Promise.all([
      query.limit(limit).offset(offset).orderBy(orderBy, order).execute(),
      countQuery.executeTakeFirst(),
    ]);

    const total = Number(countResult?.count || 0);

    return NextResponse.json({
      data: auditLogs,
      total,
      page: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching audit logs:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch audit logs",
      },
      { status: 500 }
    );
  }
}
