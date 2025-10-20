import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Link } from "@/navigation";

type DashboardMetric = {
  label: string;
  value: string;
  description: string;
};

type SubmissionItem = {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
  channel: string;
};

type QuickAction = {
  label: string;
  description: string;
  href: string;
};

type DashboardOverviewProps = {
  metrics: DashboardMetric[];
  recentSubmissions: {
    title: string;
    items: SubmissionItem[];
    cta: { label: string; href: string };
  };
  actions: {
    title: string;
    items: QuickAction[];
    ctaLabel: string;
  };
  illustration?: ReactNode;
};

export function DashboardOverview({ metrics, recentSubmissions, actions, illustration }: DashboardOverviewProps) {
  return (
    <div className="space-y-10">
      <Section padding="sm">
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="card space-y-2 p-5">
              <p className="text-sm font-medium uppercase tracking-wide text-text-muted">{metric.label}</p>
              <p className="text-3xl font-semibold text-brand-primary">{metric.value}</p>
              <p className="text-sm text-text-secondary">{metric.description}</p>
            </div>
          ))}
        </div>
        {illustration && (
          <div className="mt-6 rounded-2xl border border-border bg-hero-gradient from-brand-gradient-start via-brand-gradient-mid to-brand-gradient-end p-6 text-surface-contrast shadow-brand-glow">
            {illustration}
          </div>
        )}
      </Section>

      <Section padding="sm">
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="card space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-brand-primary">{recentSubmissions.title}</h3>
              <Button asChild size="sm" variant="secondary">
                <Link href={recentSubmissions.cta.href}>{recentSubmissions.cta.label}</Link>
              </Button>
            </div>
            <ul className="space-y-4">
              {recentSubmissions.items.map((item) => (
                <li key={item.id} className="rounded-xl border border-border/60 bg-surface-elevated px-4 py-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-brand-primary">{item.name}</div>
                      <p className="text-xs text-text-secondary">{item.updatedAt} · {item.channel}</p>
                    </div>
                    <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
                      {item.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-lg font-semibold text-brand-primary">{actions.title}</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              {actions.items.map((action) => (
                <li key={action.href} className="rounded-xl border border-dashed border-border/60 bg-surface-muted/40 p-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-text-primary">{action.label}</span>
                    <span>{action.description}</span>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={action.href}>{actions.ctaLabel}</Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
