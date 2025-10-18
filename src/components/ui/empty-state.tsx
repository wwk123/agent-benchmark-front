import type { ReactNode } from "react";
import Image from "next/image";
import { FileQuestion, Search, AlertTriangle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getIllustration, type IllustrationKey } from "@/lib/illustrations";

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
  illustrationKey?: IllustrationKey;
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
  illustrationKey,
  className,
}: EmptyStateProps) {
  const config = VARIANT_CONFIG[variant];
  const IconComponent = icon ? null : config.icon;
  const illustration = illustrationKey ? getIllustration(illustrationKey) : undefined;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-surface-muted/70 p-12 text-center backdrop-blur",
        className
      )}
    >
      {/* Illustration or Icon */}
      {illustration ? (
        <Image src={illustration} alt="" width={96} height={96} className="size-24 animate-float-slow" />
      ) : (
        <div
          className={cn(
            "flex size-16 items-center justify-center rounded-full bg-surface",
            config.iconColor
          )}
        >
          {icon || (IconComponent && <IconComponent className="size-8" aria-hidden="true" />)}
        </div>
      )}

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
