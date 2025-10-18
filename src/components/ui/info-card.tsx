import type { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type Trend = {
  direction: "up" | "down";
  value: string;
};

export type InfoCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: Trend;
  orientation?: "vertical" | "horizontal";
  className?: string;
};

/**
 * InfoCard - Display metric information with optional trend indicators
 *
 * @example
 * ```tsx
 * <InfoCard
 *   title="Total Submissions"
 *   value="1,234"
 *   description="Last 30 days"
 *   trend={{ direction: "up", value: "+12.5%" }}
 *   icon={<TrendingUp className="size-5" />}
 * />
 * ```
 */
export function InfoCard({
  title,
  value,
  description,
  icon,
  trend,
  orientation = "vertical",
  className,
}: InfoCardProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "card p-6",
        isHorizontal && "flex items-center gap-4",
        className
      )}
    >
      {/* Icon Section */}
      {icon && (
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-primary",
            !isHorizontal && "mb-4"
          )}
        >
          {icon}
        </div>
      )}

      {/* Content Section */}
      <div className={cn("space-y-1", isHorizontal && "flex-1")}>
        <p className="text-sm font-medium text-text-secondary">{title}</p>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-text-primary lg:text-3xl">
            {value}
          </span>

          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium",
                trend.direction === "up" && "text-emerald-600",
                trend.direction === "down" && "text-rose-600"
              )}
            >
              {trend.direction === "up" ? (
                <ArrowUp className="size-4" aria-hidden="true" />
              ) : (
                <ArrowDown className="size-4" aria-hidden="true" />
              )}
              <span>{trend.value}</span>
              <span className="sr-only">
                {trend.direction === "up" ? "increase" : "decrease"}
              </span>
            </span>
          )}
        </div>

        {description && (
          <p className="text-sm text-text-muted">{description}</p>
        )}
      </div>
    </div>
  );
}
