import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { SecurityClient } from "./security-client";

export default async function DashboardSecurityPage() {
  const global = await getTranslations("dashboard");
  const copy = global.raw("pages.security") as {
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    ctaLabel?: string;
  };

  return (
    <>
      <PageHero title={copy.title} description={copy.description} />
      <SecurityClient
        empty={{
          title: copy.emptyTitle,
          description: copy.emptyDescription,
          ctaLabel: copy.ctaLabel,
        }}
      />
    </>
  );
}
