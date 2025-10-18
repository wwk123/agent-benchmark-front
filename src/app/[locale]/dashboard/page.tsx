import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

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
    </>
  );
}
