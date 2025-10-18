import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { LandingSectionLayout } from "@/components/layout/landing-section-layout";

type Action = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "danger";
};

type PageHeroProps = {
  title: string;
  description: string;
  badge?: string;
  actions?: Action[];
  illustration?: ReactNode;
  className?: string;
};

export function PageHero({
  title,
  description,
  badge,
  actions,
  illustration,
  className,
}: PageHeroProps) {
  return (
    <LandingSectionLayout
      badge={badge}
      title={<span className="text-surface-contrast">{title}</span>}
      description={
        description ? (
          <span className="max-w-3xl text-base text-surface-contrast/80 lg:text-lg">{description}</span>
        ) : undefined
      }
      actions={
        actions && actions.length > 0 ? (
          <>
            {actions.map((action) => (
              <Button key={action.href} asChild variant={action.variant ?? "primary"} size="lg">
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ))}
          </>
        ) : undefined
      }
      illustration={illustration}
      className={className}
    />
  );
}
