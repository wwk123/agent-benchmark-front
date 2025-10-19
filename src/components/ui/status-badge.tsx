import { cn } from "@/lib/utils";

export type Status =
  | "pending"
  | "queued"
  | "running"
  | "scoring"
  | "completed"
  | "failed"
  | "cancelled";

export type StatusBadgeProps = {
  status: Status;
  showDot?: boolean;
  className?: string;
};

const STATUS_CONFIG: Record<
  Status,
  {
    label: string;
    color: string;
    dotColor: string;
  }
> = {
  pending: {
    label: "Pending",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    dotColor: "bg-amber-500",
  },
  queued: {
    label: "Queued",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    dotColor: "bg-amber-400",
  },
  running: {
    label: "Running",
    color: "bg-sky-100 text-sky-800 border-sky-200",
    dotColor: "bg-sky-500 animate-pulse",
  },
  scoring: {
    label: "Scoring",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    dotColor: "bg-indigo-500 animate-pulse",
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dotColor: "bg-emerald-500",
  },
  failed: {
    label: "Failed",
    color: "bg-rose-100 text-rose-800 border-rose-200",
    dotColor: "bg-rose-500",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    dotColor: "bg-gray-500",
  },
};

/**
 * StatusBadge - Display status with color coding and optional animated dot
 *
 * @example
 * ```tsx
 * <StatusBadge status="running" showDot />
 * <StatusBadge status="completed" />
 * <StatusBadge status="failed" showDot />
 * ```
 */
export function StatusBadge({ status, showDot = true, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        config.color,
        className
      )}
    >
      {showDot && (
        <span
          className={cn("size-1.5 rounded-full", config.dotColor)}
          aria-hidden="true"
        />
      )}
      <span>{config.label}</span>
    </span>
  );
}
