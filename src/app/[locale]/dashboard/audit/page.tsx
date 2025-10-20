import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { AuditClient } from "./audit-client";

export default async function DashboardAuditPage() {
  const global = await getTranslations("dashboard");
  const copy = global.raw("pages.audit") as {
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    ctaLabel?: string;
  };

  return (
    <>
      <PageHero title={copy.title} description={copy.description} />
      <AuditClient
        empty={{ title: copy.emptyTitle, description: copy.emptyDescription }}
        ctaLabel={copy.ctaLabel}
      />
    </>
  );
}
