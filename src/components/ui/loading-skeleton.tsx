import { cn } from "@/lib/utils";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export type SkeletonProps = {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  className?: string;
};

/**
 * Skeleton - Base loading placeholder component
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" width="60%" />
 * <Skeleton variant="rectangular" height="200px" />
 * <Skeleton variant="circular" className="size-12" />
 * ```
 */
export function Skeleton({
  variant = "text",
  width,
  height,
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-surface-muted",
        variant === "text" && "h-4 rounded",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-lg",
        className
      )}
      style={{
        width: width || undefined,
        height: height || undefined,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * CardSkeleton - Loading placeholder for card layouts
 */
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card space-y-4 p-6">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rectangular" height="120px" />
          <div className="space-y-2">
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
          </div>
          <div className="flex gap-2">
            <Skeleton variant="text" width="60px" height="24px" />
            <Skeleton variant="text" width="60px" height="24px" />
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * TableSkeleton - Loading placeholder for table layouts
 */
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {/* Table Header */}
      <div className="grid gap-4 border-b border-border bg-surface-muted p-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={`header-${index}`} variant="text" width="80%" />
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className={cn(
            "grid gap-4 border-b border-border p-4 last:border-b-0",
            rowIndex % 2 === 0 ? "bg-surface" : "bg-surface-muted"
          )}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" width="90%" />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * ListSkeleton - Loading placeholder for list layouts
 */
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-start gap-4 rounded-lg border border-border bg-surface p-4">
          <Skeleton variant="circular" className="size-12 shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
}
