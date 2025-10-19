import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

export default async function DashboardSubmissionsPage() {
  const t = await getTranslations("dashboard.pages.submissions");

  return (
    <>
      <PageHero title={t("title")} description={t("description")} />

      <Section padding="lg">
        <EmptyState
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          illustrationKey="sparkles"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/submit">{t("ctaLabel")}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">{t("backLabel")}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
