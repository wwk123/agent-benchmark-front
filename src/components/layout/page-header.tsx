import type { ComponentProps, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

type LinkHref = ComponentProps<typeof Link>["href"];

export type Breadcrumb = {
  label: string;
  href?: LinkHref;
};

export type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  className?: string;
};

/**
 * PageHeader - Reusable page header component with breadcrumbs, title, description, and actions
 *
 * @example
 * ```tsx
 * <PageHeader
 *   title="Benchmark Details"
 *   description="View comprehensive benchmark information"
 *   breadcrumbs={[
 *     { label: "Home", href: "/" },
 *     { label: "Benchmarks", href: "/benchmarks" },
 *     { label: "GAIA Level 1" }
 *   ]}
 *   actions={<Button>Submit Agent</Button>}
 * />
 * ```
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-text-secondary transition-colors hover:text-brand-primary"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      isLast ? "font-medium text-text-primary" : "text-text-secondary"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}

                {!isLast && (
                  <ChevronRight
                    className="size-4 text-text-muted"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </nav>
      )}

      {/* Title and Actions Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-3xl text-base text-text-secondary md:text-lg">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
