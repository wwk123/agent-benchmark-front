import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");

  const hero = t.raw("hero") as {
    badge?: string;
    title: string;
    description: string;
    actions?: Array<{ label: string; href: string; variant?: string }>;
  };

  const overview = t.raw("overview") as {
    metrics: Array<{ id: string; label: string; value: string; description: string }>;
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
    entries: Array<{ id: string; label: string; value?: string }>;
    note?: string;
  };

  const pages = t.raw("pages") as {
    submissions: {
      title: string;
      description: string;
      emptyTitle: string;
      emptyDescription: string;
      ctaLabel?: string;
      actionHref?: string;
    };
  };

  const submissionsEmptyCopy = {
    title: pages.submissions.emptyTitle,
    description: pages.submissions.emptyDescription,
    actionLabel: pages.submissions.ctaLabel,
    actionHref: pages.submissions.actionHref ?? recentSubmissions.cta.href,
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

      <DashboardClient
        overviewCopy={overview}
        submissionsCopy={recentSubmissions}
        actionsCopy={actions}
        treasuryCopy={treasury}
        submissionsEmptyCopy={submissionsEmptyCopy}
      />
    </>
  );
}
