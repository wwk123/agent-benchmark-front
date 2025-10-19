import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { Section } from "@/components/layout/section";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");

  const hero = t.raw("hero") as {
    badge?: string;
    title: string;
    description: string;
    actions?: Array<{ label: string; href: string; variant?: string }>;
  };

  const overview = t.raw("overview") as {
    metrics: Array<{ label: string; value: string; description: string }>;
  };

  const recentSubmissions = t.raw("recentSubmissions") as {
    title: string;
    items: Array<{ id: string; name: string; status: string; updatedAt: string; channel: string }>;
    cta: { label: string; href: string };
  };

  const actions = t.raw("actions") as {
    title: string;
    items: Array<{ label: string; description: string; href: string }>;
    ctaLabel: string;
  };

  const treasury = t.raw("treasury") as {
    title: string;
    description: string;
    entries: Array<{ label: string; value: string }>;
    note?: string;
  };

  return (
    <>
      <PageHero
        badge={hero.badge}
        title={hero.title}
        description={hero.description}
        actions={hero.actions?.map((action) => ({
          ...action,
          variant: (action.variant as "primary" | "secondary" | "tertiary" | "ghost" | "danger") ?? "primary",
        }))}
      />

      <DashboardOverview metrics={overview.metrics} recentSubmissions={recentSubmissions} actions={actions} />

      <Section id="treasury" padding="lg" className="bg-surface">
        <div className="card space-y-6 p-6">
          <div>
            <h2 className="text-2xl font-semibold text-brand-primary">{treasury.title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{treasury.description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {treasury.entries.map((entry) => (
              <div key={entry.label} className="rounded-xl border border-border/60 bg-surface-contrast p-4 shadow-sm">
                <p className="text-sm font-medium text-text-secondary">{entry.label}</p>
                <p className="text-xl font-semibold text-brand-primary">{entry.value}</p>
              </div>
            ))}
          </div>
          {treasury.note && (
            <p className="text-xs text-text-muted">{treasury.note}</p>
          )}
        </div>
      </Section>
    </>
  );
}
