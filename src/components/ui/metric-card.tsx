import type { ReactNode } from "react";
import clsx from "clsx";

export type MetricCardProps = {
  label: string;
  value: string;
  icon?: ReactNode;
  orientation?: "vertical" | "horizontal";
  className?: string;
  trend?: {
    direction: "up" | "down";
    value: string;
  };
  lastUpdated?: string;
};

export function MetricCard({
  label,
  value,
  icon,
  orientation = "vertical",
  className,
  trend,
  lastUpdated,
}: MetricCardProps) {
  return (
    <article
      className={clsx(
        "card flex gap-4 px-6 py-5",
        orientation === "vertical" ? "flex-col" : "items-center",
        className,
      )}
      aria-label={`${label}: ${value}`}
    >
      {icon && <span className="text-brand-highlight">{icon}</span>}
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-wide text-text-muted">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold text-brand-primary lg:text-3xl">{value}</p>
          {trend && (
            <span
              className={clsx(
                "text-sm font-medium",
                trend.direction === "up" ? "text-status-success" : "text-status-danger"
              )}
            >
              {trend.direction === "up" ? "↑" : "↓"} {trend.value}
            </span>
          )}
        </div>
        {lastUpdated && (
          <p className="text-xs text-text-muted">{lastUpdated}</p>
        )}
      </div>
    </article>
  );
}
