import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

type ProfilePageProps = {
  params: { locale: string };
  searchParams?: { tab?: string };
};

type ProfileTab = {
  id: string;
  label: string;
  heading: string;
  body: string;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const t = await getTranslations("profile");
  const tabs = t.raw("tabs") as ProfileTab[];
  const activeTabId = typeof searchParams?.tab === "string" ? searchParams?.tab : undefined;
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  return (
    <>
      <PageHero title={t("title")} description={t("description")} />

      <Section padding="lg" className="space-y-8">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              asChild
              variant={tab.id === activeTab.id ? "primary" : "secondary"}
            >
              <Link href={{ pathname: "/profile", query: { tab: tab.id } }}>{tab.label}</Link>
            </Button>
          ))}
        </div>

        <div className="card space-y-4 p-6">
          <h2 className="text-xl font-semibold text-brand-primary">{activeTab.heading}</h2>
          <p className="text-sm text-text-secondary">{activeTab.body}</p>
        </div>
      </Section>
    </>
  );
}
