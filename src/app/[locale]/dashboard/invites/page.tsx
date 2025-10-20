import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { InvitesClient } from "./invites-client";

export default async function DashboardInvitesPage() {
  const global = await getTranslations("dashboard");
  const copy = global.raw("pages.invites") as {
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    ctaLabel?: string;
  };
  const submissionsCopy = global.raw("recentSubmissions") as {
    cta: { label: string; href: string };
  };

  return (
    <>
      <PageHero title={copy.title} description={copy.description} />
      <InvitesClient
        empty={{
          title: copy.emptyTitle,
          description: copy.emptyDescription,
          ctaLabel: copy.ctaLabel,
        }}
        cta={submissionsCopy.cta}
      />
    </>
  );
}
