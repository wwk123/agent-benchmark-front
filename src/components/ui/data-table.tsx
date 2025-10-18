/**
 * DataTable - Generic reusable data table with sorting
 * Based on approved Stage 3 plan
 */

"use client";

import React, { useState, type ReactNode } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/loading-skeleton";

export type ColumnDef<T> = {
  key: string;
  header: string | ReactNode;
  accessor: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
};

export type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (columnKey: string, sortable?: boolean) => {
    if (!sortable) return;

    setSortConfig((current) => {
      if (current?.key === columnKey) {
        return {
          key: columnKey,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: columnKey, direction: "asc" };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    const sorted = [...data];
    const column = columns.find((col) => col.key === sortConfig.key);
    if (!column) return data;

    return sorted.sort((a, b) => {
      const aValue = column.accessor(a);
      const bValue = column.accessor(b);

      const aStr = String(aValue);
      const bStr = String(bValue);

      if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, columns]);

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height="48px" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-12 text-center">
        <p className="text-text-secondary">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto rounded-lg border border-border", className)}>
      <table className="w-full">
        <thead className="sticky top-0 bg-surface-muted">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "border-b border-border px-4 py-3 text-sm font-semibold",
                  column.sortable && "cursor-pointer select-none hover:bg-surface",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right",
                  !column.align && "text-left"
                )}
                style={{ width: column.width }}
                onClick={() => handleSort(column.key, column.sortable)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && sortConfig?.key === column.key && (
                    <span className="text-brand-primary">
                      {sortConfig.direction === "asc" ? (
                        <ArrowUp className="size-4" />
                      ) : (
                        <ArrowDown className="size-4" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                "border-b border-border last:border-b-0 transition-colors",
                rowIndex % 2 === 0 ? "bg-surface" : "bg-surface-muted",
                onRowClick && "cursor-pointer hover:bg-brand-accent/5"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "px-4 py-3 text-sm",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    !column.align && "text-left"
                  )}
                >
                  {column.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
