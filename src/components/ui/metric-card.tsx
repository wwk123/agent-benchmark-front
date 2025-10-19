import type { ReactNode } from "react";
import clsx from "clsx";

type MetricCardTone = "default" | "inverted";

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
  tone?: MetricCardTone;
};

export function MetricCard({
  label,
  value,
  icon,
  orientation = "vertical",
  className,
  trend,
  lastUpdated,
  tone = "default",
}: MetricCardProps) {
  const isInverted = tone === "inverted";

  return (
    <article
      className={clsx(
        "flex gap-4 px-6 py-5 transition-shadow duration-200 ease-out",
        isInverted
          ? "rounded-xl border border-white/15 bg-white/10 shadow-brand-glow backdrop-blur-md hover:shadow-brand-glow"
          : "card",
        orientation === "vertical" ? "flex-col" : "items-center",
        className,
      )}
      aria-label={`${label}: ${value}`}
    >
      {icon && (
        <span className={clsx(isInverted ? "text-surface-contrast" : "text-brand-highlight")}>
          {icon}
        </span>
      )}
      <div className="space-y-1">
        <p
          className={clsx(
            "text-sm uppercase tracking-wide",
            isInverted ? "text-surface-contrast/70" : "text-text-muted",
          )}
        >
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <p
            className={clsx(
              "text-2xl font-semibold lg:text-3xl",
              isInverted ? "text-surface-contrast" : "text-brand-primary",
            )}
          >
            {value}
          </p>
          {trend && (
            <span
              className={clsx(
                "text-sm font-medium",
                trend.direction === "up"
                  ? isInverted
                    ? "text-emerald-200"
                    : "text-status-success"
                  : isInverted
                    ? "text-rose-200"
                    : "text-status-danger",
              )}
            >
              {trend.direction === "up" ? "↑" : "↓"} {trend.value}
            </span>
          )}
        </div>
        {lastUpdated && (
          <p className={clsx("text-xs", isInverted ? "text-surface-contrast/60" : "text-text-muted")}>
            {lastUpdated}
          </p>
        )}
      </div>
    </article>
  );
}
