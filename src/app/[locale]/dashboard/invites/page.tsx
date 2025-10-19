import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

export default async function DashboardInvitesPage() {
  const t = await getTranslations("dashboard.pages.invites");

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
          <Button variant="secondary" disabled>
            {t("ctaLabel")}
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">{t("backLabel")}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
