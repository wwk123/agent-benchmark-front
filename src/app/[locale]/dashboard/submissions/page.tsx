import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { DashboardSubmissionsClient } from "./submissions-client";

export default async function DashboardSubmissionsPage() {
  const global = await getTranslations("dashboard");
  const copy = global.raw("pages.submissions") as {
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    ctaLabel?: string;
    backLabel?: string;
  };
  const submissionsCopy = global.raw("recentSubmissions") as {
    cta: { label: string; href: string };
  };

  return (
    <>
      <PageHero title={copy.title} description={copy.description} />
      <DashboardSubmissionsClient
        empty={copy}
        cta={submissionsCopy.cta}
      />
    </>
  );
}
