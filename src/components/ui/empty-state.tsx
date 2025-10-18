import type { ReactNode } from "react";
import { FileQuestion, Search, AlertTriangle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type EmptyStateVariant = "default" | "search" | "error" | "inbox";

export type EmptyStateProps = {
  variant?: EmptyStateVariant;
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
};

const VARIANT_CONFIG: Record<
  EmptyStateVariant,
  {
    icon: typeof FileQuestion;
    iconColor: string;
  }
> = {
  default: {
    icon: FileQuestion,
    iconColor: "text-text-muted",
  },
  search: {
    icon: Search,
    iconColor: "text-brand-accent",
  },
  error: {
    icon: AlertTriangle,
    iconColor: "text-rose-500",
  },
  inbox: {
    icon: Inbox,
    iconColor: "text-text-muted",
  },
};

/**
 * EmptyState - Unified empty state component for lists and content areas
 *
 * @example
 * ```tsx
 * <EmptyState
 *   variant="search"
 *   title="No results found"
 *   description="Try adjusting your search criteria"
 *   action={{ label: "Clear filters", onClick: handleClear }}
 * />
 * ```
 */
export function EmptyState({
  variant = "default",
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  const config = VARIANT_CONFIG[variant];
  const IconComponent = icon ? null : config.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface-muted p-12 text-center",
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "mb-4 flex size-16 items-center justify-center rounded-full bg-surface",
          config.iconColor
        )}
      >
        {icon || (IconComponent && <IconComponent className="size-8" aria-hidden="true" />)}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>

      {/* Description */}
      {description && (
        <p className="mb-6 max-w-sm text-sm text-text-secondary">{description}</p>
      )}

      {/* Action Button */}
      {action && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
