"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { entityTypeLabels } from "../constants/entityTypeLabels";
import { typeLabels } from "../constants/typeLabels";
import { cn } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { useMemo } from "react";
import { getInitialValues } from "../functions/getInitialValues";
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FormValues } from "./types";
import queryString from "query-string";

const AuditLogFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultValues = useMemo(
    () => getInitialValues(searchParams),
    [searchParams]
  );

  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    const params: Record<string, string | undefined> = {
      userEmail: data.userEmail,
      entityType: data.entityType,
      type: data.type,
      dateFrom: data.dateRange?.from
        ? format(data.dateRange.from, "yyyy-MM-dd")
        : undefined,
      dateTo: data.dateRange?.to
        ? format(data.dateRange.to, "yyyy-MM-dd")
        : undefined,
    };

    const query = queryString.stringify(params, {
      skipNull: true,
      skipEmptyString: true,
    });

    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  const handleReset = () => {
    reset({
      userEmail: "",
      entityType: "",
      type: "",
      dateRange: undefined,
    });
    router.push(pathname);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="email" className="text-sm font-medium mb-1 block">
            User Email
          </label>
          <Input
            id="email"
            type="text"
            placeholder="Search by email..."
            {...register("userEmail")}
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="entityType"
            className="text-sm font-medium mb-1 block"
          >
            Entity Type
          </label>
          <Controller
            name="entityType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="entityType" className="w-full">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(entityTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex-1">
          <label htmlFor="type" className="text-sm font-medium mb-1 block">
            Type
          </label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(typeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Created Date</label>
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value?.from ? (
                      field.value.to ? (
                        <>
                          {format(field.value.from, "LLL dd, y")} -{" "}
                          {format(field.value.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(field.value.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="submit">Filter</Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default AuditLogFilters;
